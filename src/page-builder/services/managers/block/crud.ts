// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Helpers
import { fetchBlock, fetchRegisteredBlock } from '@/src/page-builder/services/helpers/fetch';
import { validateBlockType, validateBlockID } from '@/src/page-builder/services/helpers/validate';
import { createBlock, deleteBlockFromParent, cloneBlock, overwriteBlock, addBlockToTree, deleteBlockFromTree } from '@/src/page-builder/services/helpers/block';

// Types
import type { BlockInstance, BlockType, BlockID, BlockAttributes, BlockStyles } from '@/src/page-builder/core/block/block/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Clipboard storage for copy/paste operations
let blockClipboard: BlockInstance | null = null;
let stylesClipboard: BlockStyles | null = null;
let attributesClipboard: BlockAttributes | null = null;

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
			blockDefinition: fetchRegisteredBlock(data.blockType),
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
 * Copies a block and all its descendants to the clipboard in block CRUD operations.
 * Stores the complete block tree for later pasting.
 *
 * @param blockID - The block identifier to copy
 * @returns void
 *
 * @example
 * copyBlock('block-123')
 */
export function copyBlock(blockID: BlockID): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → copyBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// Store the entire block tree in clipboard
	blockClipboard = JSON.parse(JSON.stringify(safeData.block));
}

/**
 * Pastes a copied block by replacing the target block's content with clipboard content.
 * Maintains the target's position in the hierarchy while updating its type, styles, attributes, and content structure.
 *
 * @param blockID - The block identifier to replace with clipboard content
 * @returns void
 *
 * @example
 * pasteBlock('block-123')
 */
export function pasteBlock(blockID: BlockID): void {
	if (!blockClipboard) return devLog.error(`[BlockManager → pasteBlock] No block in clipboard`), undefined;
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → pasteBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			targetBlock: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// Overwrite the target block with the clipboard content, cloning the entire tree
	const blocksWithPaste = overwriteBlock(blockClipboard, safeData.blockID, blockStore.allBlocks);
	blockStore.updateBlocks(blocksWithPaste);
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

/**
 * Copies the styles of a block to the clipboard in block CRUD operations.
 * Stores the block styles for later pasting.
 *
 * @param blockID - The block identifier to copy styles from
 * @returns void
 *
 * @example
 * copyBlockStyles('block-123')
 */
export function copyBlockStyles(blockID: BlockID): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → copyBlockStyles]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	stylesClipboard = JSON.parse(JSON.stringify(safeData.block.styles));
}

/**
 * Pastes copied styles to a target block in block CRUD operations.
 * Applies the styles from clipboard to the specified block.
 *
 * @param blockID - The block identifier to paste styles to
 * @returns void
 *
 * @example
 * pasteBlockStyles('block-123')
 */
export function pasteBlockStyles(blockID: BlockID): void {
	if (!stylesClipboard) return devLog.error(`[BlockManager → pasteBlockStyles] No styles in clipboard`), undefined;
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → pasteBlockStyles]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			targetBlock: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	blockStore.updateBlocks({
		[safeData.blockID]: {
			...safeData.targetBlock,
			styles: JSON.parse(JSON.stringify(stylesClipboard)),
		},
	});
}

/**
 * Copies the attributes of a block to the clipboard in block CRUD operations.
 * Stores the block attributes for later pasting.
 *
 * @param blockID - The block identifier to copy attributes from
 * @returns void
 *
 * @example
 * copyBlockAttributes('block-123')
 */
export function copyBlockAttributes(blockID: BlockID): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → copyBlockAttributes]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	attributesClipboard = JSON.parse(JSON.stringify(safeData.block.attributes));
}

/**
 * Pastes copied attributes to a target block in block CRUD operations.
 * Applies the attributes from clipboard to the specified block.
 *
 * @param blockID - The block identifier to paste attributes to
 * @returns void
 *
 * @example
 * pasteBlockAttributes('block-123')
 */
export function pasteBlockAttributes(blockID: BlockID): void {
	if (!attributesClipboard) return devLog.error(`[BlockManager → pasteBlockAttributes] No attributes in clipboard`), undefined;
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → pasteBlockAttributes]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			targetBlock: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	safeData.targetBlock.attributes = JSON.parse(JSON.stringify(attributesClipboard));
	blockStore.updateBlocks({
		[safeData.blockID]: safeData.targetBlock,
	});
}
