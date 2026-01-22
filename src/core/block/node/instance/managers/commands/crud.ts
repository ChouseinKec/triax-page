// Stores
import { useBlockStore } from '@/state/block/block';

// Helpers
import { validateNodeID } from '@/core/block/node/instance/helpers';
import { validateNodeKey } from '@/core/block/node/definition/helpers/validators';
import { pickNodeDefinition, pickNodeInstance } from '@/core/block/node/instance/helpers/pickers';
import { createNode, detachNodeFromParent } from '@/core/block/node/instance/helpers/operations';
import { duplicateNodeInTree, addNodeToTree, deleteNodeFromTree } from '@/core/block/node/instance/helpers/operations/tree';

// Types
import type {  NodeID } from '@/core/block/node/instance/types/instance';
import type { NodeKey } from '@/core/block/node/definition/types/definition';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredNodes } from '@/core/block/node/definition/states/registry';

/**
 * Adds a new block of the specified type to the page in block CRUD operations.
 * Creates and inserts a block instance under the specified parent.
 *
 * @param nodeKey - The block type to create
 * @param parentID - The parent block ID to add the new block under
 */
export function addNode(nodeKey: NodeKey, parentID: NodeID): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → addNode]')
		.validate({
			nodeKey: validateNodeKey(nodeKey),
			parentID: validateNodeID(parentID),
		})
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.nodeKey, getRegisteredNodes()),
		}))
		.operate((data) => ({
			addedBlocks: addNodeToTree(createNode(data.NodeDefinition, data.parentID), blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Add block to store
	blockStore.updateBlocks(results.addedBlocks);
}

/**
 * Deletes a block and all its descendants from the page in block CRUD operations.
 * Removes the block and its children from the store.
 *
 * @param nodeID - The block identifier to delete
 */
export function deleteNode(nodeID: NodeID): void {
	if (nodeID === 'body') return devLog.error(`[BlockManager → deleteNode] Cannot delete root body block`), undefined;
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → deleteNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			parentInstance: pickNodeInstance(data.blockInstance.parentID, blockStore.allBlocks),
		}))
		.operate((data) => ({
			deletedBlocks: detachNodeFromParent(data.blockInstance, data.parentInstance, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Apply the deletion to the store
	blockStore.updateBlocks(results.deletedBlocks);

	// Queue deletion with timeout for React unmounting
	setTimeout(() => {
		const currentStore = useBlockStore.getState();

		// Re-validate and pick necessary data
		const currentResults = new ResultPipeline('[BlockManager → deleteNode → Timeout] ')
			.pick(() => ({
				blockInstance: pickNodeInstance(nodeID, currentStore.allBlocks),
			}))
			.operate((data) => ({
				blocksAfterDeletion: deleteNodeFromTree(data.blockInstance, currentStore.allBlocks),
			}))
			.execute();
		if (!currentResults) return;

		// Calculate final selected ID
		const finalSelectedID = currentStore.selectedNodeID === nodeID ? null : currentStore.selectedNodeID;
		// Update store with final state
		currentStore.setBlocks(currentResults.blocksAfterDeletion);
		currentStore.selectNode(finalSelectedID);
	}, 100);
}

/**
 * Duplicates a block and all its descendants in block CRUD operations.
 * Copies the block and pastes it as a new instance.
 *
 * @param nodeID - The block identifier to duplicate
 */
export function duplicateNode(nodeID: NodeID): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → duplicateNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.allBlocks),
		}))
		.operate((data) => ({
			clonedBlocks: duplicateNodeInTree(data.blockInstance, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Apply the cloned tree returned by the helper
	blockStore.updateBlocks(results.clonedBlocks);
}
