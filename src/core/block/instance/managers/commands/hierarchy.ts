// Stores
import { useBlockStore } from '@/state/block/block';

// Helpers
import { validateBlockID } from '@/core/block/instance/helpers/validators';
import { pickBlockInstance, pickBlockDefinition } from '@/core/block/instance/helpers/pickers';
import { findBlockMoveBeforeIndex, findBlockMoveAfterIndex, findBlockMoveIntoIndex } from '@/core/block/instance/helpers/finders';
import { moveBlock } from '@/core/block/instance/helpers/operations';
import { canBlockMove } from '@/core/block/instance/helpers/checkers';
import { fetchElementDefinition } from '@/core/block/element/helpers/fetchers';

// Types
import type { BlockID } from '@/core/block/instance/types';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredBlocks } from '@/core/block/instance/registries';
import { getRegisteredElements } from '@/core/block/element/registries';

/**
 * Moves a block to be positioned after a target block in block CRUD operations.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param sourceBlockID - The block ID to move
 * @param targetBlockID - The target block ID to position after
 */
export function moveBlockAfter(sourceBlockID: BlockID, targetBlockID: BlockID): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → moveBlockAfter]')
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
			sourceBlockDefinition: fetchElementDefinition(data.sourceBlock.tag, getRegisteredElements()),
		}))
		.execute();
	if (!results) return;

	// Check if move is needed
	const targetIndexResult = findBlockMoveAfterIndex(results.sourceBlock, results.targetBlock, results.targetParentBlock);
	if (targetIndexResult.status !== 'found') return devLog.warn(`[BlockManager → moveBlockAfter] Block is already positioned after target or invalid operation`);

	// Check if move is valid
	const isChildBlockPermitted = canBlockMove(results.sourceBlock, results.targetParentBlock, results.parentBlockDefinition, results.sourceBlockDefinition, blockStore.allBlocks, targetIndexResult.data + 1);
	if (!isChildBlockPermitted.success) return devLog.error(`[BlockManager → moveBlockAfter] ${isChildBlockPermitted.error}`);
	if (!isChildBlockPermitted.passed) return devLog.error(`[BlockManager → moveBlockAfter] Block type not allowed as sibling`);

	// Use the target's parent as the attachment point — moveBlock expects the
	// destination parent instance rather than a sibling instance.
	const moveResult = moveBlock(results.sourceBlock, results.targetParentBlock, blockStore.allBlocks, targetIndexResult.data + 1);
	if (moveResult.success) blockStore.updateBlocks(moveResult.data);
}

/**
 * Moves a block to be positioned before a target block in block CRUD operations.
 * Updates the parent's contentIDs array to reflect the new order.
 *
 * @param sourceBlockID - The block ID to move
 * @param targetBlockID - The target block ID to position before
 */
export function moveBlockBefore(sourceBlockID: BlockID, targetBlockID: BlockID): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → moveBlockBefore]')
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
			sourceBlockDefinition: fetchElementDefinition(data.sourceBlock.tag, getRegisteredElements()),
		}))
		.execute();
	if (!results) return;

	// Check if move is needed
	const targetIndexResult = findBlockMoveBeforeIndex(results.sourceBlock, results.targetBlock, results.targetParentBlock);
	if (targetIndexResult.status !== 'found') return devLog.warn(`[BlockManager → moveBlockBefore] Block is already positioned before target or invalid operation`);

	// Check if move is valid
	const isChildBlockPermitted = canBlockMove(results.sourceBlock, results.targetParentBlock, results.parentBlockDefinition, results.sourceBlockDefinition, blockStore.allBlocks, targetIndexResult.data);
	if (!isChildBlockPermitted.success) return devLog.error(`[BlockManager → moveBlockBefore] ${isChildBlockPermitted.error}`);
	if (!isChildBlockPermitted.passed) return devLog.error(`[BlockManager → moveBlockBefore] Block type not allowed as sibling`);

	// Use the target's parent as the attachment point — moveBlock expects the
	// destination parent instance rather than a sibling instance.
	const moveResult = moveBlock(results.sourceBlock, results.targetParentBlock, blockStore.allBlocks, targetIndexResult.data);
	if (moveResult.success) blockStore.updateBlocks(moveResult.data);
}

/**
 * Moves a block to be positioned as the last child of a target block in block CRUD operations.
 * Updates the target's contentIDs array to include the moved block at the end.
 *
 * @param sourceBlockID - The block ID to move
 * @param targetBlockID - The target block ID to move into as the last child
 */
export function moveBlockInto(sourceBlockID: BlockID, targetBlockID: BlockID): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → moveBlockInto]')
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
			sourceBlockDefinition: fetchElementDefinition(data.sourceBlock.tag, getRegisteredElements()),
		}))
		.execute();
	if (!results) return;

	// Calculate target index (append to end)
	const targetIndexResult = findBlockMoveIntoIndex(results.sourceBlock, results.targetBlock);
	if (targetIndexResult.status !== 'found') return devLog.warn(`[BlockManager → moveBlockInto] Block cannot be moved into target or invalid operation`);

	// If child is not compatible with parent (validate with target index)
	const isChildBlockPermitted = canBlockMove(results.sourceBlock, results.targetBlock, results.parentBlockDefinition, results.sourceBlockDefinition, blockStore.allBlocks, targetIndexResult.data);
	if (!isChildBlockPermitted.success) return devLog.error(`[BlockManager → moveBlockInto] ${isChildBlockPermitted.error}`);
	if (!isChildBlockPermitted.passed) return devLog.error(`[BlockManager → moveBlockInto] Block type not allowed as child`);

	// For move-into the `targetBlock` *is* the destination parent and is
	// already passed as the second argument.
	const moveResult = moveBlock(results.sourceBlock, results.targetBlock, blockStore.allBlocks, targetIndexResult.data);
	if (moveResult.success) blockStore.updateBlocks(moveResult.data);
}
