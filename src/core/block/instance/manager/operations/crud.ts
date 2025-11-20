// Stores
import { useBlockStore } from '@/src/core/block/store';

// Helpers
import { validateBlockType, validateBlockID } from '@/src/core/block/instance/helper/validate';
import { fetchBlockDefinition } from '@/src/core/block/instance/helper/fetch';
import { createBlock, deleteBlockFromParent, cloneBlock, addBlockToTree, deleteBlockFromTree } from '@/src/core/block/instance/helper/crud';

// Types
import type { BlockType, BlockID } from '@/src/core/block/instance/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

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
			blockDefinition: fetchBlockDefinition(data.blockType),
		}))
		.execute();
	if (!safeData) return;

	// Add block to tree (adds to collection and updates parent relationship)
	blockStore.updateBlocks(
		addBlockToTree(
			createBlock(safeData.blockDefinition, safeData.parentID), //
			blockStore.allBlocks
		)
	);
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
		.execute();
	if (!safeData) return;

	// Remove block from parent relationship
	blockStore.updateBlocks(
		deleteBlockFromParent(
			safeData.blockID, //
			blockStore.allBlocks
		)
	);

	// Queue deletion with timeout for React unmounting
	setTimeout(() => {
		const currentStore = useBlockStore.getState();

		// Delete block tree and update selected block if needed
		const blocksAfterDeletion = deleteBlockFromTree(safeData.blockID, currentStore.allBlocks);
		const finalSelectedID = currentStore.selectedBlockID === safeData.blockID ? null : currentStore.selectedBlockID;

		// Update store with final state
		currentStore.setBlocks(blocksAfterDeletion);
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
		.execute();
	if (!safeData) return;

	// Clone the block and position it after the original
	const updatedBlocks = cloneBlock(safeData.blockID, blockStore.allBlocks);
	blockStore.updateBlocks(updatedBlocks);
}
