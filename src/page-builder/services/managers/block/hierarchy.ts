// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID, BlockInstance } from '@/src/page-builder/core/block/block/types';

// Utilities
import { moveBlockAfter as moveBlockAfterUtil, moveBlockBefore as moveBlockBeforeUtil, findBlockDescendants, findBlockNextSibling, findBlockPreviousSibling, findBlockLastDescendant } from '@/src/page-builder/core/block/block/utilities';
import { validateOrLog } from '@/src/shared/utilities/validation';

// Helpers
import { validateBlockID } from '@/src/page-builder/services/helpers/block/validation';

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
 * Gets all descendant blocks of a given block recursively for block hierarchy operations.
 * Returns all child blocks at any depth level.
 *
 * @param blockID - The block identifier to get descendants for
 * @returns Array of all descendant block IDs or undefined if invalid
 *
 * @example
 * getBlockDescendants('parent-123') → ['child-1', 'child-2', 'grandchild-3']
 */
export function getBlockDescendants(blockID: BlockID): BlockID[] | undefined {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → getBlockDescendants]`);
	if (!safeParams) return undefined;

	const store = useBlockStore.getState();

	return findBlockDescendants([safeParams.blockID], store.allBlocks);
}

/**
 * Moves a block to be positioned after a target block in block CRUD operations.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param currentBlockID - The block ID to move
 * @param targetBlockID - The target block ID to position after
 * @returns void
 *
 * @example
 * moveBlockAfter('block-456', 'block-123')
 */
export function moveBlockAfter(currentBlockID: BlockID, targetBlockID: BlockID): void {
	const safeParams = validateOrLog({ currentBlockID: validateBlockID(currentBlockID), targetBlockID: validateBlockID(targetBlockID) }, `[BlockManager → moveBlockAfter]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();
	const updatedBlocks = moveBlockAfterUtil(safeParams.currentBlockID, safeParams.targetBlockID, store.allBlocks);
	store.updateBlocks(updatedBlocks);
}

/**
 * Moves a block to be positioned before a target block in block CRUD operations.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param currentBlockID - The block ID to move
 * @param targetBlockID - The target block ID to position before
 * @returns void
 *
 * @example
 * moveBlockBefore('block-456', 'block-123')
 */
export function moveBlockBefore(currentBlockID: BlockID, targetBlockID: BlockID): void {
	const safeParams = validateOrLog({ currentBlockID: validateBlockID(currentBlockID), targetBlockID: validateBlockID(targetBlockID) }, `[BlockManager → moveBlockBefore]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();
	const updatedBlocks = moveBlockBeforeUtil(safeParams.currentBlockID, safeParams.targetBlockID, store.allBlocks);
	store.updateBlocks(updatedBlocks);
}
