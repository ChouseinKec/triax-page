// Stores
import { useBlockStore } from '@/src/core/block/store';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validators';
import { pickBlockInstance, pickBlockDefinition } from '@/src/core/block/instance/helper/pickers';
import { findBlockMoveBeforeIndex, findBlockMoveAfterIndex, findBlockMoveIntoIndex } from '@/src/core/block/instance/helper/finders';
import { moveBlock } from '@/src/core/block/instance/helper/operations';
import { canBlockMove } from '@/src/core/block/instance/helper/checkers';
import { fetchElementDefinition } from '@/src/core/block/element/helper/fetchers';

// Types
import type { BlockID } from '@/src/core/block/instance/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Registry
import { getRegisteredBlocks } from '@/src/core/block/instance/registry';

// Constants
import { getElementDefinitions } from '@/src/core/block/element/constants';

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
	const safeData = new ResultPipeline('[BlockManager → moveBlockAfter]')
		.validate({
			sourceBlockID: validateBlockID(sourceBlockID),
			targetBlockID: validateBlockID(targetBlockID),
		})
		.pick((data) => ({
			sourceBlock: pickBlockInstance(data.sourceBlockID, blockStore.allBlocks),
			targetBlock: pickBlockInstance(data.targetBlockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			targetParentBlock: pickBlockInstance(data.targetBlock.parentID!, blockStore.allBlocks),
		}))
		.pick((data) => ({
			parentBlockDefinition: pickBlockDefinition(data.targetParentBlock.type, getRegisteredBlocks()),
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
	const safeData = new ResultPipeline('[BlockManager → moveBlockBefore]')
		.validate({
			sourceBlockID: validateBlockID(sourceBlockID),
			targetBlockID: validateBlockID(targetBlockID),
		})
		.pick((data) => ({
			sourceBlock: pickBlockInstance(data.sourceBlockID, blockStore.allBlocks),
			targetBlock: pickBlockInstance(data.targetBlockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			targetParentBlock: pickBlockInstance(data.targetBlock.parentID!, blockStore.allBlocks),
		}))
		.pick((data) => ({
			parentBlockDefinition: pickBlockDefinition(data.targetParentBlock.type, getRegisteredBlocks()),
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
	const safeData = new ResultPipeline('[BlockManager → moveBlockInto]')
		.validate({
			sourceBlockID: validateBlockID(sourceBlockID),
			targetBlockID: validateBlockID(targetBlockID),
		})
		.pick((data) => ({
			sourceBlock: pickBlockInstance(data.sourceBlockID, blockStore.allBlocks),
			targetBlock: pickBlockInstance(data.targetBlockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			parentBlockDefinition: pickBlockDefinition(data.targetBlock.type, getRegisteredBlocks()),
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
