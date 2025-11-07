// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Helpers
import { fetchBlock, fetchRegisteredBlock } from '@/src/page-builder/services/helpers/fetch';
import { validateBlockType, validateBlockID } from '@/src/page-builder/services/helpers/validate';
import { moveBlock, findBlockNextSibling, findBlockPreviousSibling, findBlockLastDescendant, findBlockNextAncestorSibling, canBlockMoveBefore, canBlockMoveAfter, canBlockMoveInto, createBlock, deleteBlockFromParent, cloneBlock, overwriteBlock, addBlockToTree, deleteBlockFromTree } from '@/src/page-builder/services/helpers/block';

// Types
import type { BlockInstance, BlockType, BlockID, BlockAttributes, BlockStyles } from '@/src/page-builder/core/block/block/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Clipboard storage for copy/paste operations
let blockClipboard: BlockInstance | null = null;
let stylesClipboard: BlockStyles | null = null;
let attributesClipboard: BlockAttributes | null = null;

// ------------------------- CRUD OPERATIONS -------------------------

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

// ------------------------- HIERARCHY -------------------------

/**
 * Retrieves the next block in the hierarchy for block hierarchy operations.
 * Checks for children first, then siblings, and finally parent's next sibling.
 *
 * @param blockID - The block identifier to find the next block for
 * @returns The next block instance or null if not found
 *
 * @example
 * getNextBlock('block-123') → { id: 'child-1', ... }
 */
export function getNextBlock(blockID: BlockID): BlockInstance | null | undefined {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → getNextBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// If it has children, return the first child
	if (safeData.block.contentIDs?.length > 0) return blockStore.getBlock(safeData.block.contentIDs[0]);

	// If no children, get the next sibling
	const nextSibling = findBlockNextSibling(safeData.block.id, blockStore.allBlocks);
	if (nextSibling) return nextSibling;

	// If no next sibling, recursively climb up to find the parent's next sibling
	return findBlockNextAncestorSibling(safeData.block.id, blockStore.allBlocks);
}

/**
 * Retrieves the previous block in the hierarchy for block hierarchy operations.
 * Checks for previous sibling's last descendant, then the sibling itself, or the parent.
 *
 * @param blockID - The block identifier to find the previous block for
 * @returns The previous block instance or null if not found
 *
 * @example
 * getPreviousBlock('block-123') → { id: 'sibling-122', ... }
 */
export function getPreviousBlock(blockID: BlockID): BlockInstance | null | undefined {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → getPreviousBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			blockInstance: fetchBlock(data.blockID, blockStore.allBlocks),
		}))

		.execute();
	if (!safeData) return;

	// If previous sibling exists, return its last descendant (or itself if no children)
	const prevSibling = findBlockPreviousSibling(safeData.blockInstance.id, blockStore.allBlocks);
	if (prevSibling) return findBlockLastDescendant(prevSibling, blockStore.allBlocks);

	// If no previous sibling, return the parent
	return blockStore.getBlock(safeData.blockInstance.parentID);
}

/**
 * Moves a block to be positioned after a target block in block CRUD operations.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param sourceBlockID - The block ID to move
 * @param targetBlockID - The target block ID to position after
 * @returns void
 *
 * @example
 * moveBlockAfter('block-456', 'block-123')
 */
export function moveBlockAfter(sourceBlockID: BlockID, targetBlockID: BlockID): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → moveBlockAfter]')
		.validate({
			sourceBlockID: validateBlockID(sourceBlockID),
			targetBlockID: validateBlockID(targetBlockID),
		})
		.fetch((data) => ({
			sourceBlock: fetchBlock(data.sourceBlockID, blockStore.allBlocks),
			targetBlock: fetchBlock(data.targetBlockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			targetParentBlock: fetchBlock(data.targetBlock.parentID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// If child is not compatible
	const isChildBlockPermitted = canBlockMoveInto(safeData.targetParentBlock.tag, safeData.sourceBlock.tag);
	if (!isChildBlockPermitted) return devLog.error(`[BlockManager → moveBlockAfter] Block type not allowed as sibling`);

	// Check if move is needed
	const targetIndex = canBlockMoveAfter(safeData.sourceBlock, safeData.targetBlock, safeData.targetParentBlock);
	if (targetIndex === null) return devLog.warn(`[BlockManager → moveBlockAfter] Block is already positioned after target or invalid operation`);

	blockStore.updateBlocks(
		moveBlock(
			safeData.sourceBlockID, //
			safeData.targetParentBlock.id,
			targetIndex + 1,
			blockStore.allBlocks
		)
	);
}

/**
 * Moves a block to be positioned before a target block in block CRUD operations.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param sourceBlockID - The block ID to move
 * @param targetBlockID - The target block ID to position before
 * @returns void
 *
 * @example
 * moveBlockBefore('block-456', 'block-123')
 */
export function moveBlockBefore(sourceBlockID: BlockID, targetBlockID: BlockID): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → moveBlockBefore]')
		.validate({
			sourceBlockID: validateBlockID(sourceBlockID),
			targetBlockID: validateBlockID(targetBlockID),
		})
		.fetch((data) => ({
			sourceBlock: fetchBlock(data.sourceBlockID, blockStore.allBlocks),
			targetBlock: fetchBlock(data.targetBlockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			targetParentBlock: fetchBlock(data.targetBlock.parentID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// If child is not compatible
	const isChildBlockPermitted = canBlockMoveInto(safeData.targetParentBlock.tag, safeData.sourceBlock.tag);
	if (!isChildBlockPermitted) return devLog.error(`[BlockManager → moveBlockBefore] Block type not allowed as sibling`);

	// Check if move is needed
	const targetIndex = canBlockMoveBefore(safeData.sourceBlock, safeData.targetBlock, safeData.targetParentBlock);
	if (targetIndex === null) return devLog.warn(`[BlockManager → moveBlockBefore] Block is already positioned before target or invalid operation`);

	blockStore.updateBlocks(
		moveBlock(
			safeData.sourceBlockID, //
			safeData.targetParentBlock.id,
			targetIndex,
			blockStore.allBlocks
		)
	);
}

/**
 * Moves a block to be positioned as the last child of a target block in block CRUD operations.
 * Updates the target's contentIDs array to include the moved block at the end.
 *
 * @param sourceBlockID - The block ID to move
 * @param targetBlockID - The target block ID to move into as the last child
 * @returns void
 *
 * @example
 * moveBlockInto('block-456', 'block-123')
 */
export function moveBlockInto(sourceBlockID: BlockID, targetBlockID: BlockID): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → moveBlockInto]')
		.validate({ sourceBlockID: validateBlockID(sourceBlockID), targetBlockID: validateBlockID(targetBlockID) })
		.fetch((data) => ({
			sourceBlock: fetchBlock(data.sourceBlockID, blockStore.allBlocks),
			targetBlock: fetchBlock(data.targetBlockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// If child is not compatible
	const isChildBlockPermitted = canBlockMoveInto(safeData.targetBlock.tag, safeData.sourceBlock.tag);
	if (!isChildBlockPermitted) return devLog.error(`[BlockManager → moveBlockInto] Block type not allowed as child`);

	blockStore.updateBlocks(
		moveBlock(
			safeData.sourceBlockID, //
			safeData.targetBlockID,
			safeData.targetBlock.contentIDs.length,
			blockStore.allBlocks
		)
	);
}

// ------------------------- CLIPBOARD -------------------------

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
