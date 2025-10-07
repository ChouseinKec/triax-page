// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID, BlockInstance } from '@/src/page-builder/core/block/block/types';

// Utilities
import { moveBlock, findBlockNextSibling, findBlockPreviousSibling, findBlockLastDescendant } from '@/src/page-builder/core/block/block/utilities';
import { validateOrLog } from '@/src/shared/utilities/validation';
import { devLog } from '@/src/shared/utilities/dev';

// Helpers
import { validateBlockID } from '@/src/page-builder/services/helpers/block';
import { validateBlockExistence } from '@/src/page-builder/services/helpers/block/existence';

// Managers
import { canBlockAcceptChild } from '@/src/page-builder/services/managers/block';

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
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → getNextBlock]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();

	const selectedBlock = store.getBlock(safeParams.blockID);
	if (!selectedBlock) return null;

	// If it has children, return the first child
	if (selectedBlock.contentIDs?.length > 0) return store.getBlock(selectedBlock.contentIDs[0]);

	// If no children, get the next sibling
	const nextSibling = findBlockNextSibling(safeParams.blockID, store.allBlocks);
	if (nextSibling) return nextSibling;

	// If no next sibling, check the parent's next sibling
	return selectedBlock.parentID ? findBlockNextSibling(selectedBlock.parentID, store.allBlocks) : null;
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
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → getPreviousBlock]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();
	const selectedBlock = store.getBlock(safeParams.blockID);
	if (!selectedBlock) return null;

	// If previous sibling has children, return its last descendant
	const previousSibling = findBlockPreviousSibling(safeParams.blockID, store.allBlocks);
	if (previousSibling) return findBlockLastDescendant(previousSibling, store.allBlocks) || previousSibling;

	// If no previous sibling, return the parent
	return selectedBlock.parentID ? store.getBlock(selectedBlock.parentID) : null;
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
	const safeParams = validateOrLog({ sourceBlockID: validateBlockID(sourceBlockID), targetBlockID: validateBlockID(targetBlockID) }, `[BlockManager → moveBlockAfter]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();

	const targetBlock = store.getBlock(safeParams.targetBlockID);
	if (!targetBlock) return devLog.error(`[BlockManager → moveBlockBefore] Target block not found`);

	const targetParentBlock = store.getBlock(targetBlock.parentID);
	if (!targetParentBlock) return devLog.error(`[BlockManager → moveBlockBefore] Target parent block not found`);

	if (!canBlockAcceptChild(targetParentBlock.id, safeParams.sourceBlockID)) return devLog.error(`[BlockManager → moveBlockBefore] Block type not allowed as sibling`);

	// Find the target block's position and insert after it
	const targetIndex = targetParentBlock.contentIDs.indexOf(safeParams.targetBlockID);
	if (targetIndex === -1) return devLog.error(`[BlockManager → moveBlockBefore] Target block not found in parent's contentIDs`);

	const updatedBlocks = moveBlock(safeParams.sourceBlockID, targetParentBlock.id, targetIndex + 1, store.allBlocks);
	store.updateBlocks(updatedBlocks);
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
	const safeParams = validateOrLog({ sourceBlockID: validateBlockID(sourceBlockID), targetBlockID: validateBlockID(targetBlockID) }, `[BlockManager → moveBlockBefore]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();

	const targetBlock = store.getBlock(safeParams.targetBlockID);
	if (!targetBlock) return devLog.error(`[BlockManager → moveBlockBefore] Target block not found`);

	const targetParentBlock = store.getBlock(targetBlock.parentID);
	if (!targetParentBlock) return devLog.error(`[BlockManager → moveBlockBefore] Target parent block not found`);

	if (!canBlockAcceptChild(targetParentBlock.id, safeParams.sourceBlockID)) return devLog.error(`[BlockManager → moveBlockBefore] Block type not allowed as sibling`);

	// Find the target block's position and insert before it
	const targetIndex = targetParentBlock.contentIDs.indexOf(safeParams.targetBlockID);
	if (targetIndex === -1) return devLog.error(`[BlockManager → moveBlockBefore] Target block not found in parent's contentIDs`);

	const updatedBlocks = moveBlock(safeParams.sourceBlockID, targetParentBlock.id, targetIndex, store.allBlocks);
	store.updateBlocks(updatedBlocks);
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
	const safeParams = validateOrLog({ sourceBlockID: validateBlockID(sourceBlockID), targetBlockID: validateBlockID(targetBlockID) }, `[BlockManager → moveBlockInto]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();

	const targetBlock = store.getBlock(safeParams.targetBlockID);
	if (!targetBlock) return devLog.error(`[BlockManager → moveBlockInto] Target block not found`);

	if (!canBlockAcceptChild(safeParams.targetBlockID, safeParams.sourceBlockID)) return devLog.error(`[BlockManager → moveBlockInto] Block type not allowed as child`);

	// Insert as the last child of the target block
	const updatedBlocks = moveBlock(safeParams.sourceBlockID, safeParams.targetBlockID, targetBlock.contentIDs.length, store.allBlocks);
	store.updateBlocks(updatedBlocks);
}
