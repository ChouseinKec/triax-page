// Types
import type { BlockInstance } from '@/src/core/block/instance/types';
import type { FindResult } from '@/src/shared/types/result';

// Helpers
import { findBlockChildIndex } from '@/src/core/block/instance/helper/finders/child';

/**
 * Compute the index to use when moving `sourceBlockInstance` *into* the
 * `targetBlockInstance` (i.e., as a new child of the target).
 *
 * @param sourceBlockInstance - block being moved
 * @param targetBlockInstance - block that will become the new parent
 */
export function findBlockMoveIntoIndex(sourceBlockInstance: BlockInstance, targetBlockInstance: BlockInstance): FindResult<number> {
	// If the source is already inside the target, there is nothing to do
	if (sourceBlockInstance.parentID === targetBlockInstance.id) return { status: 'not-found' };

	// Insert after the last existing child -> use the length as the index
	return { status: 'found', data: targetBlockInstance.contentIDs.length };
}

/**
 * Compute the insertion index for moving `sourceBlockInstance` so it ends
 * up immediately *before* `targetBlockInstance` within `parentBlockInstance`.
 *
 * @param sourceBlockInstance - block being moved
 * @param targetBlockInstance - block to insert before
 * @param parentBlockInstance - parent that contains the target block
 */
export function findBlockMoveBeforeIndex(sourceBlockInstance: BlockInstance, targetBlockInstance: BlockInstance, parentBlockInstance: BlockInstance): FindResult<number> {
	// Resolve the target first and fail fast if it's missing. The target
	// must be a child of the provided parent for this operation to make sense.
	const targetIndexResult = findBlockChildIndex(targetBlockInstance, parentBlockInstance);
	if (targetIndexResult.status === 'error') return targetIndexResult;
	if (targetIndexResult.status === 'not-found') return { status: 'error', error: 'Target block not found in parent.' };

	// Resolve the source index. A 'not-found' here means the source isn't a
	// child of the parent (i.e. it's coming from a different parent) — that
	// is a valid scenario and should NOT short-circuit.
	const sourceIndexResult = findBlockChildIndex(sourceBlockInstance, parentBlockInstance);
	if (sourceIndexResult.status === 'error') return sourceIndexResult;

	// Resolve indexes
	const sourceIndex = sourceIndexResult.status === 'found' ? sourceIndexResult.data : -1;
	const targetIndex = targetIndexResult.data;

	// If the source is from a different parent, inserting before the target
	// just uses the target's current index (no shift needed).
	if (sourceBlockInstance.parentID !== parentBlockInstance.id) return { status: 'found', data: targetIndex };

	// If the source claims to be a child of the parent, but we can't find it,
	// signal an error — inconsistent state.
	if (sourceIndex === -1) return { status: 'error', error: 'Source block not found in parent.' };

	// Moving an item to the position immediately before its current spot
	// (source immediately before target) is a no-op.
	if (sourceIndex === targetIndex - 1) return { status: 'not-found' };

	// If the source is located before the target the target's index will
	// shift left once after removal; otherwise it remains unchanged.
	const insertIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;

    // Return the computed index
	return { status: 'found', data: insertIndex };
}

/**
 * Compute the insertion index for moving `sourceBlockInstance` so it ends
 * up immediately *after* `targetBlockInstance` within `parentBlockInstance`.
 *
 * @param sourceBlockInstance - block being moved
 * @param targetBlockInstance - block to insert after
 * @param parentBlockInstance - parent that contains the target block
 */
export function findBlockMoveAfterIndex(sourceBlockInstance: BlockInstance, targetBlockInstance: BlockInstance, parentBlockInstance: BlockInstance): FindResult<number> {
	// Resolve the target first and fail fast if it's missing. The target
	// must be a child of the provided parent for this operation to make sense.
	const targetIndexResult = findBlockChildIndex(targetBlockInstance, parentBlockInstance);
	if (targetIndexResult.status === 'error') return targetIndexResult;
	if (targetIndexResult.status === 'not-found') return { status: 'error', error: 'Target block not found in parent.' };

	// The source may not belong to the parent — treat not-found as -1.
	const sourceIndexResult = findBlockChildIndex(sourceBlockInstance, parentBlockInstance);
	if (sourceIndexResult.status === 'error') return sourceIndexResult;

    // Resolve indexes
	const sourceIndex = sourceIndexResult.status === 'found' ? sourceIndexResult.data : -1;
	const targetIndex = targetIndexResult.data;

	// If the source is from a different parent, inserting after the target
	// is just targetIndex + 1 (simple append after target)
	if (sourceBlockInstance.parentID !== parentBlockInstance.id) return { status: 'found', data: targetIndex + 1 };

	// Verify source exists under the parent if we believed it did
	if (sourceIndex === -1) return { status: 'error', error: 'Source block not found in parent.' };

	// If the source is already immediately after the target, it's a no-op
	if (sourceIndex === targetIndex + 1) return { status: 'not-found' };

	// When the source is located before the target the removal will cause the
	// target index to move left; insertion after must account for that shift.
	const insertIndex = sourceIndex < targetIndex ? targetIndex : targetIndex + 1;

    // Return the computed index
	return { status: 'found', data: insertIndex };
}
