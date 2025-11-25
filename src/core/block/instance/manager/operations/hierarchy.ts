// Stores
import { useBlockStore } from '@/src/core/block/store';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validators';
import { fetchBlockInstance, fetchBlockDefinition } from '@/src/core/block/instance/helper/fetchers';
import { findBlockFirstChild, findBlockNextSibling, findBlockPreviousSibling, findBlockLastDescendant, findBlockNextParentSibling, findBlockMoveBeforeIndex, findBlockMoveAfterIndex, findBlockMoveIntoIndex } from '@/src/core/block/instance/helper/finders';
import { moveBlock } from '@/src/core/block/instance/helper/operations';
import { canBlockMove } from '@/src/core/block/instance/helper/checkers';
import { fetchElementDefinition } from '@/src/core/block/element/helper/fetchers';

// Types
import type { BlockInstance, BlockID } from '@/src/core/block/instance/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/pipeline/validation';

// Registry
import { getRegisteredBlocks } from '@/src/core/block/instance/registry';

// Constants
import { getElementDefinitions } from '@/src/core/block/element/constants';

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
			blockInstance: fetchBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			parentBlockInstance: fetchBlockInstance(data.blockInstance.parentID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// If it has children, return the first child
	const firstChild = findBlockFirstChild(safeData.blockInstance, blockStore.allBlocks);
	if (firstChild.status === 'found') return firstChild.data;

	// If no children, get the next sibling
	const nextSibling = findBlockNextSibling(safeData.blockInstance, blockStore.allBlocks);
	if (nextSibling.status === 'found') return nextSibling.data;

	// If no next sibling, recursively climb up to find the parent's next sibling
	const nextParentSibling = findBlockNextParentSibling(safeData.blockInstance, blockStore.allBlocks);
	if (nextParentSibling.status === 'found') return nextParentSibling.data;

	return null;
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
			blockInstance: fetchBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			parentBlockInstance: fetchBlockInstance(data.blockInstance.parentID, blockStore.allBlocks),
		}))

		.execute();
	if (!safeData) return;

	// If previous sibling exists, return its last descendant (or itself if no children)
	const prevSibling = findBlockPreviousSibling(safeData.blockInstance, blockStore.allBlocks);

	if (prevSibling.status === 'found') {
		const lastDescResult = findBlockLastDescendant(prevSibling.data, blockStore.allBlocks);
		if (lastDescResult.status === 'found') return lastDescResult.data;
		return null;
	}

	// If no previous sibling, return the parent instance fetched earlier (may be undefined)
	return safeData.parentBlockInstance;
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
			sourceBlock: fetchBlockInstance(data.sourceBlockID, blockStore.allBlocks),
			targetBlock: fetchBlockInstance(data.targetBlockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			targetParentBlock: fetchBlockInstance(data.targetBlock.parentID!, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			parentBlockDefinition: fetchBlockDefinition(data.targetParentBlock.type, getRegisteredBlocks()),
			sourceBlockDefinition: fetchElementDefinition(data.sourceBlock.tag, getElementDefinitions()),
		}))
		.execute();
	if (!safeData) return;

	// Check if move is needed
	const targetIndexResult = findBlockMoveAfterIndex(safeData.sourceBlock, safeData.targetBlock, safeData.targetParentBlock);
	if (targetIndexResult.status !== 'found') return devLog.warn(`[BlockManager → moveBlockAfter] Block is already positioned after target or invalid operation`);

	// Check if move is valid
	const isChildBlockPermitted = canBlockMove(safeData.sourceBlock, safeData.targetParentBlock, safeData.parentBlockDefinition, safeData.sourceBlockDefinition, blockStore.allBlocks, targetIndexResult.data + 1);
	if (!isChildBlockPermitted.success) return devLog.error(`[BlockManager → moveBlockAfter] ${isChildBlockPermitted.error}`);
	if (!isChildBlockPermitted.ok) return devLog.error(`[BlockManager → moveBlockAfter] Block type not allowed as sibling`);

	// Use the target's parent as the attachment point — moveBlock expects the
	// destination parent instance rather than a sibling instance.
	const moveResult = moveBlock(safeData.sourceBlock, safeData.targetParentBlock, blockStore.allBlocks, targetIndexResult.data + 1);
	if (moveResult.success) blockStore.updateBlocks(moveResult.data);
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
			sourceBlock: fetchBlockInstance(data.sourceBlockID, blockStore.allBlocks),
			targetBlock: fetchBlockInstance(data.targetBlockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			targetParentBlock: fetchBlockInstance(data.targetBlock.parentID!, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			parentBlockDefinition: fetchBlockDefinition(data.targetParentBlock.type, getRegisteredBlocks()),
			sourceBlockDefinition: fetchElementDefinition(data.sourceBlock.tag, getElementDefinitions()),
		}))
		.execute();
	if (!safeData) return;

	// Check if move is needed
	const targetIndexResult = findBlockMoveBeforeIndex(safeData.sourceBlock, safeData.targetBlock, safeData.targetParentBlock);
	if (targetIndexResult.status !== 'found') return devLog.warn(`[BlockManager → moveBlockBefore] Block is already positioned before target or invalid operation`);

	// Check if move is valid
	const isChildBlockPermitted = canBlockMove(safeData.sourceBlock, safeData.targetParentBlock, safeData.parentBlockDefinition, safeData.sourceBlockDefinition, blockStore.allBlocks, targetIndexResult.data);
	if (!isChildBlockPermitted.success) return devLog.error(`[BlockManager → moveBlockBefore] ${isChildBlockPermitted.error}`);
	if (!isChildBlockPermitted.ok) return devLog.error(`[BlockManager → moveBlockBefore] Block type not allowed as sibling`);

	const moveResult = moveBlock(safeData.sourceBlock, safeData.targetParentBlock, blockStore.allBlocks, targetIndexResult.data);
	if (moveResult.success) blockStore.updateBlocks(moveResult.data);
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
		.validate({
			sourceBlockID: validateBlockID(sourceBlockID),
			targetBlockID: validateBlockID(targetBlockID),
		})
		.fetch((data) => ({
			sourceBlock: fetchBlockInstance(data.sourceBlockID, blockStore.allBlocks),
			targetBlock: fetchBlockInstance(data.targetBlockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			parentBlockDefinition: fetchBlockDefinition(data.targetBlock.type, getRegisteredBlocks()),
			sourceBlockDefinition: fetchElementDefinition(data.sourceBlock.tag, getElementDefinitions()),
		}))
		.execute();
	if (!safeData) return;

	// Calculate target index (append to end)
	const targetIndexResult = findBlockMoveIntoIndex(safeData.sourceBlock, safeData.targetBlock);
	if (targetIndexResult.status !== 'found') return devLog.warn(`[BlockManager → moveBlockInto] Block cannot be moved into target or invalid operation`);

	// If child is not compatible with parent (validate with target index)
	const isChildBlockPermitted = canBlockMove(safeData.sourceBlock, safeData.targetBlock, safeData.parentBlockDefinition, safeData.sourceBlockDefinition, blockStore.allBlocks, targetIndexResult.data);
	if (!isChildBlockPermitted.success) return devLog.error(`[BlockManager → moveBlockInto] ${isChildBlockPermitted.error}`);
	if (!isChildBlockPermitted.ok) return devLog.error(`[BlockManager → moveBlockInto] Block type not allowed as child`);

	// For move-into the `targetBlock` *is* the destination parent and is
	// already passed as the second argument.
	const moveResult = moveBlock(safeData.sourceBlock, safeData.targetBlock, blockStore.allBlocks, targetIndexResult.data);
	if (moveResult.success) blockStore.updateBlocks(moveResult.data);
}
