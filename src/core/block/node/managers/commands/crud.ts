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
function createAddNodePipeline(nodeKey: NodeKey, parentID: NodeID, nodeElementKey: ElementKey, options?: { data?: {} }) {
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
			parentElementDefinition: pickElementDefinition(data.parentNodeInstance.elementKey, getRegisteredElements()),
			sourceElementDefinition: pickElementDefinition(nodeElementKey, getRegisteredElements()),
		}))
		.operate((data) => ({
			createdBlock: createNode(data.nodeDefinition, data.parentID, nodeElementKey, options),
		}))
		.condition((data) => ({
			rulesPass: passesAllRules(data.createdBlock, data.parentNodeInstance, data.parentElementDefinition, data.sourceElementDefinition, useBlockStore.getState().storedNodes, data.parentNodeInstance.childNodeIDs.length),
		}));
}

/**
 * Adds a new block instance of the specified type to the page hierarchy.
 *
 * This operation creates a new node instance based on the provided node key and element key,
 * validates that it can be added as a child of the specified parent (checking element rules),
 * and inserts it into the block store. The new node is appended to the end of the parent's
 * child list. If validation fails, the operation is aborted and no changes are made.
 *
 * @param nodeKey - The unique key identifying the type of node to create (e.g., 'container', 'text')
 * @param parentNodeID - The unique identifier of the parent node where the new node will be added
 * @param nodeElementKey - The HTML element key that defines the node's rendering behavior
 * @param options - Optional configuration object containing initial data for the node
 * @returns The newly created node instance if successful, undefined if validation fails
 * @see {@link addNodes} - For adding multiple nodes atomically
 * @see {@link createNode} - The underlying node creation function
 * @see {@link addNodeToTree} - The tree insertion operation
 */
export function addNode(nodeKey: NodeKey, parentNodeID: NodeID, nodeElementKey: ElementKey, options?: { data?: {} }): NodeInstance | undefined {
	// Validate, pick, and operate on necessary data
	const validData = createAddNodePipeline(nodeKey, parentNodeID, nodeElementKey, options)
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
 * Adds multiple new block instances to the page hierarchy in a single atomic operation.
 *
 * This function validates all requested nodes before adding any of them. If any node
 * fails validation (due to invalid keys, parent relationships, or element rules), the
 * entire operation is aborted and no nodes are added. This ensures data consistency
 * when performing bulk insertions.
 *
 * @param nodeConfigs - Array of configuration tuples, each containing:
 *   - nodeKey: The type of node to create
 *   - parentNodeID: The parent node identifier
 *   - nodeElementKey: The HTML element key for rendering
 *   - options: Optional initial data configuration
 * @returns Array of successfully created node instances, or undefined if any validation failed
 * @see {@link addNode} - For adding a single node
 * @see {@link passesAllRules} - The validation function used to check node compatibility
 */
export function addNodes(nodeConfigs: [NodeKey, NodeID, ElementKey, { data?: {} }?][]): NodeInstance[] | undefined {
	let allPass = true;

	for (const [nodeKey, parentID, nodeElementKey, options] of nodeConfigs) {
		const validData = createAddNodePipeline(nodeKey, parentID, nodeElementKey, options).execute();
		if (!validData) {
			allPass = false;
			break;
		}
	}

	// If any addition failed validation, abort the entire operation
	if (!allPass) return undefined;

	// All passed, now add them using addNode
	const createdBlocks: NodeInstance[] = [];
	for (const [nodeKey, parentID, nodeElementKey, options] of nodeConfigs) {
		const block = addNode(nodeKey, parentID, nodeElementKey, options);
		if (block) createdBlocks.push(block);
	}

	return createdBlocks;
}

/**
 * Deletes a block instance and all its descendants from the page hierarchy.
 *
 * This operation performs a two-phase deletion: first, it detaches the node from its parent
 * to update the tree structure immediately, then after a short delay, it completely removes
 * the node and its subtree from the store. The delay allows React components to unmount
 * gracefully. The root 'body' node cannot be deleted to maintain page structure integrity.
 *
 * If the node is currently selected, the selection is cleared after deletion.
 *
 * @param nodeID - The unique identifier of the block instance to delete
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link deleteNodeFromTree} - The underlying tree deletion operation
 * @see {@link detachNodeFromParent} - The initial detachment operation
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
 * Duplicates a block instance and all its descendants, inserting the copy as a sibling.
 *
 * This operation creates a deep clone of the specified node and its entire subtree,
 * generating new unique IDs for all cloned nodes while preserving the hierarchical
 * structure and relationships. The duplicated subtree is inserted immediately after
 * the original node within its parent's child list, maintaining the same parent relationship.
 *
 * @param nodeID - The unique identifier of the block instance to duplicate
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link duplicateNodeInTree} - The underlying tree duplication operation
 * @see {@link cloneNode} - The deep cloning function used internally
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
