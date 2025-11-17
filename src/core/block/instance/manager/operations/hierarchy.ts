// Stores
import { useBlockStore } from '@/src/core/block/store';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validate';
import { fetchBlock } from '@/src/core/block/instance/helper/fetch';
import { moveBlock, findBlockNextSibling, findBlockPreviousSibling, findBlockLastDescendant, findBlockNextAncestorSibling, canBlockMoveBefore, canBlockMoveAfter, canBlockMoveInto } from '@/src/core/block/instance/helper/hierarchy';

// Types
import type { BlockInstance, BlockID } from '@/src/core/block/instance/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

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
	if (safeData.block.contentIDs?.length > 0) return blockStore.allBlocks[safeData.block.contentIDs[0]];

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
	return blockStore.allBlocks[safeData.blockInstance.parentID];
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
	const isChildBlockPermitted = canBlockMoveInto(safeData.sourceBlock, safeData.targetParentBlock);
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
	const isChildBlockPermitted = canBlockMoveInto(safeData.sourceBlock, safeData.targetParentBlock);
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
	const isChildBlockPermitted = canBlockMoveInto(safeData.sourceBlock, safeData.targetBlock);
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
