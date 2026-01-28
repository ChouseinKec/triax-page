// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers';
import { validateNodeKey } from '@/core/block/node/helpers/validators';
import { pickNodeDefinition, pickNodeInstance } from '@/core/block/node/helpers/pickers';
import { createNode, detachNodeFromParent } from '@/core/block/node/helpers/operations';
import { duplicateNodeInTree, addNodeToTree, deleteNodeFromTree } from '@/core/block/node/helpers/operations/tree';

// Types
import type { NodeID, NodeKey, NodeInstance } from '@/core/block/node/types';
import type { ElementKey } from '@/core/block/element/types';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredNodes } from '@/core/block/node/states/registry';
import { getRegisteredElements } from '@/core/block/element/states/registry';
import { pickElementDefinition } from '@/core/block/element/helpers';
import { passesAllRules } from '@/core/block/node/helpers/checkers';

/**
 * Creates a ResultPipeline for adding a node, configured up to the rules check.
 * This is a private helper to avoid code duplication between addNode and addNodes.
 */
function createAddNodePipeline(nodeKey: NodeKey, parentID: NodeID, nodeTag: ElementKey, options?: { content?: {} }) {
	return new ResultPipeline('[BlockManager → addNode]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
			parentID: validateNodeID(parentID),
		})
		.pick((data) => ({
			nodeDefinition: pickNodeDefinition(data.nodeKey, getRegisteredNodes()),
		}))
		.pick((data) => ({
			parentNodeInstance: pickNodeInstance(data.parentID, useBlockStore.getState().storedNodes),
		}))
		.pick((data) => ({
			parentElementDefinition: pickElementDefinition(data.parentNodeInstance.tag, getRegisteredElements()),
			sourceElementDefinition: pickElementDefinition(nodeTag, getRegisteredElements()),
		}))
		.operate((data) => ({
			createdBlock: createNode(data.nodeDefinition, data.parentID, nodeTag, options),
		}))
		.condition((data) => ({
			rulesPass: passesAllRules(data.createdBlock, data.parentNodeInstance, data.parentElementDefinition, data.sourceElementDefinition, useBlockStore.getState().storedNodes, data.parentNodeInstance.contentIDs.length),
		}));
}

/**
 * Adds a new block of the specified type to the page in block CRUD operations.
 * Creates and inserts a block instance under the specified parent.
 *
 * @param nodeKey - The block type to create
 * @param parentID - The parent block ID to add the new block under
 */
export function addNode(nodeKey: NodeKey, parentID: NodeID, nodeTag: ElementKey, options?: { content?: {} }): NodeInstance | undefined {
	// Validate, pick, and operate on necessary data
	const validData = createAddNodePipeline(nodeKey, parentID, nodeTag, options)
		.operate((data) => ({
			addedBlocks: addNodeToTree(data.createdBlock, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!validData) return;

	// Add block to store
	useBlockStore.setState((state) => {
		return { storedNodes: { ...state.storedNodes, ...validData.addedBlocks } };
	});

	return validData.createdBlock;
}

/**
 * Adds multiple new blocks of the specified types to the page in block CRUD operations.
 * Creates and inserts block instances under the specified parents.
 * All blocks must pass validation, or none are added (atomic operation).
 *
 * @param nodeConfigs - Array of [nodeKey, parentID, nodeTag, options] tuples for each block
 */
export function addNodes(nodeConfigs: [NodeKey, NodeID, ElementKey, { content?: {} }?][]): NodeInstance[] | undefined {
	let allPass = true;

	for (const [nodeKey, parentID, nodeTag, options] of nodeConfigs) {
		const validData = createAddNodePipeline(nodeKey, parentID, nodeTag, options).execute();
		if (!validData) {
			allPass = false;
			break;
		}
	}

	// If any addition failed validation, abort the entire operation
	if (!allPass) return undefined;

	// All passed, now add them using addNode
	const createdBlocks: NodeInstance[] = [];
	for (const [nodeKey, parentID, nodeTag, options] of nodeConfigs) {
		const block = addNode(nodeKey, parentID, nodeTag, options);
		if (block) createdBlocks.push(block);
	}

	return createdBlocks;
}

/**
 * Deletes a block and all its descendants from the page in block CRUD operations.
 * Removes the block and its children from the store.
 *
 * @param nodeID - The block identifier to delete
 */
export function deleteNode(nodeID: NodeID): void {
	if (nodeID === 'body') return (devLog.error(`[BlockManager → deleteNode] Cannot delete root body block`), undefined);

	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → deleteNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useBlockStore.getState().storedNodes),
		}))
		.pick((data) => ({
			parentInstance: pickNodeInstance(data.blockInstance.parentID, useBlockStore.getState().storedNodes),
		}))
		.operate((data) => ({
			deletedBlocks: detachNodeFromParent(data.blockInstance, data.parentInstance, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!validData) return;

	// Apply the deletion to the store
	useBlockStore.setState((state) => {
		const updatedNodes = { ...state.storedNodes, ...validData.deletedBlocks };
		return { storedNodes: updatedNodes };
	});

	// Queue deletion with timeout for React unmounting
	setTimeout(() => {
		const currentStore = useBlockStore.getState();

		// Re-validate and pick necessary data
		const currentResults = new ResultPipeline('[BlockManager → deleteNode → Timeout] ')
			.pick(() => ({
				blockInstance: pickNodeInstance(nodeID, currentStore.storedNodes),
			}))
			.operate((data) => ({
				blocksAfterDeletion: deleteNodeFromTree(data.blockInstance, currentStore.storedNodes),
			}))
			.execute();
		if (!currentResults) return;

		// Calculate final selected ID
		const finalSelectedID = currentStore.selectedNodeID === nodeID ? null : currentStore.selectedNodeID;

		// Update store with final state
		useBlockStore.setState((state) => {
			const updatedNodes = { ...state.storedNodes, ...currentResults.blocksAfterDeletion };
			return { storedNodes: updatedNodes };
		});

		// Update selected node if needed
		useBlockStore.setState((state) => ({
			data: {
				...state.data,
				global: {
					...state.data.global,
					selectedNodeID: finalSelectedID,
				},
			},
		}));
	}, 100);
}

/**
 * Duplicates a block and all its descendants in block CRUD operations.
 * Copies the block and pastes it as a new instance.
 *
 * @param nodeID - The block identifier to duplicate
 */
export function duplicateNode(nodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockManager → duplicateNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useBlockStore.getState().storedNodes),
		}))
		.operate((data) => ({
			clonedBlocks: duplicateNodeInTree(data.blockInstance, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!validData) return;

	// Apply the cloned tree returned by the helper
	useBlockStore.setState((state) => {
		const updatedNodes = { ...state.storedNodes, ...validData.clonedBlocks };
		return { storedNodes: updatedNodes };
	});
}
