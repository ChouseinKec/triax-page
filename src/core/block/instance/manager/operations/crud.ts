// Stores
import { useBlockStore } from '@/src/core/block/store';

// Helpers
import { validateBlockType, validateBlockID } from '@/src/core/block/instance/helper/validators';
import { fetchBlockDefinition, fetchBlockInstance } from '@/src/core/block/instance/helper/fetchers';
import { createBlock, detachBlockFromParent } from '@/src/core/block/instance/helper/operations';
import { duplicateBlockInTree, addBlockToTree, deleteBlockFromTree } from '@/src/core/block/instance/helper/operations/tree';

// Types
import type { BlockType, BlockID } from '@/src/core/block/instance/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/pipeline/validation';

// Registry
import { getRegisteredBlocks } from '@/src/core/block/instance/registry';

/**
 * Adds a new block of the specified type to the page in block CRUD operations.
 * Creates and inserts a block instance under the specified parent.
 *
 * @param blockType - The block type to create
 * @param parentID - The parent block ID to add the new block under
 * @returns void
 *
 * @example
 * addBlock('text', 'parent-123')
 */
export function addBlock(blockType: BlockType, parentID: BlockID): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → addBlock]')
		.validate({
			blockType: validateBlockType(blockType),
			parentID: validateBlockID(parentID),
		})
		.fetch((data) => ({
			blockDefinition: fetchBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.mutate((data) => ({
			addedBlocks: addBlockToTree(createBlock(data.blockDefinition, data.parentID), blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// Add block to store
	blockStore.updateBlocks(safeData.addedBlocks);
}

/**
 * Deletes a block and all its descendants from the page in block CRUD operations.
 * Removes the block and its children from the store.
 *
 * @param blockID - The block identifier to delete
 * @returns void
 *
 * @example
 * deleteBlock('block-123')
 */
export function deleteBlock(blockID: BlockID): void {
	if (blockID === 'body') return devLog.error(`[BlockManager → deleteBlock] Cannot delete root body block`), undefined;

	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → deleteBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			blockInstance: fetchBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			parentInstance: fetchBlockInstance(data.blockInstance.parentID, blockStore.allBlocks),
		}))
		.mutate((data) => ({
			deletedBlocks: detachBlockFromParent(data.blockInstance, data.parentInstance, blockStore.allBlocks),
		}))

		.execute();
	if (!safeData) return;

	// Apply the deletion to the store
	blockStore.updateBlocks(safeData.deletedBlocks);

	// Queue deletion with timeout for React unmounting
	setTimeout(() => {
		const currentStore = useBlockStore.getState();

		// Fetch the block instance to delete
		const blockInstanceResult = fetchBlockInstance(safeData.blockID, currentStore.allBlocks);
		if (!blockInstanceResult.success) return devLog.error(`[BlockManager → deleteBlock] Block not found during delete: ${blockInstanceResult.error}`), undefined;

		// Delete block tree and update selected block if needed
		const blocksAfterDeletionResult = deleteBlockFromTree(blockInstanceResult.data, currentStore.allBlocks);
		if (!blocksAfterDeletionResult.success) return devLog.error(`[BlockManager → deleteBlock] Failed to delete block tree: ${blocksAfterDeletionResult.error}`), undefined;

		// Calculate final selected ID
		const finalSelectedID = currentStore.selectedBlockID === safeData.blockID ? null : currentStore.selectedBlockID;

		// Update store with final state
		currentStore.setBlocks(blocksAfterDeletionResult.data);
		currentStore.selectBlock(finalSelectedID);
	}, 100);
}

/**
 * Duplicates a block and all its descendants in block CRUD operations.
 * Copies the block and pastes it as a new instance.
 *
 * @param blockID - The block identifier to duplicate
 * @returns void
 *
 * @example
 * duplicateBlock('block-123')
 */
export function duplicateBlock(blockID: BlockID): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → duplicateBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			blockInstance: fetchBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.mutate((data) => ({
			clonedBlocks: duplicateBlockInTree(data.blockInstance, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// Apply the cloned tree returned by the helper
	blockStore.updateBlocks(safeData.clonedBlocks);
}
