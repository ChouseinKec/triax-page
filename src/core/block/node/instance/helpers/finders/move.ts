// Types
import type { NodeInstance } from '@/core/block/node/instance/types/instance';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { findNodeChildIndex } from '@/core/block/node/instance/helpers/finders/child';

/**
 * Compute the index to use when moving `sourceNodeInstance` *into* the
 * `targetNodeInstance` (i.e., as a new child of the target).
 *
 * @param sourceNodeInstance - block being moved
 * @param targetNodeInstance - block that will become the new parent
 */
export function findNodeMoveIntoIndex(sourceNodeInstance: NodeInstance, targetNodeInstance: NodeInstance): FindResult<number> {
	// If the source is the same as the target, cannot move into itself
	if (sourceNodeInstance.id === targetNodeInstance.id) return { status: 'error', error: 'Source and target blocks are the same.' };

	// If the source is already inside the target, there is nothing to do
	if (sourceNodeInstance.parentID === targetNodeInstance.id) return { status: 'not-found' };

	// Insert after the last existing child -> use the length as the index
	return { status: 'found', data: targetNodeInstance.contentIDs.length };
}

/**
 * Compute the insertion index for moving `sourceNodeInstance` so it ends
 * up immediately *before* `targetNodeInstance` within `parentNodeInstance`.
 *
 * @param sourceNodeInstance - block being moved
 * @param targetNodeInstance - block to insert before
 * @param parentNodeInstance - parent that contains the target block
 */
export function findNodeMoveBeforeIndex(sourceNodeInstance: NodeInstance, targetNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): FindResult<number> {
	// If the source is the same as the target, cannot move before itself
	if (sourceNodeInstance.id === targetNodeInstance.id) return { status: 'error', error: 'Source and target blocks are the same.' };

	// Resolve the target first and fail fast if it's missing. The target
	// must be a child of the provided parent for this operation to make sense.
	const targetIndexResult = findNodeChildIndex(targetNodeInstance, parentNodeInstance);
	if (targetIndexResult.status === 'error') return targetIndexResult;
	if (targetIndexResult.status === 'not-found') return { status: 'error', error: 'Target block not found in parent.' };

	// Resolve the source index. A 'not-found' here means the source isn't a
	// child of the parent (i.e. it's coming from a different parent) — that
	// is a valid scenario and should NOT short-circuit.
	const sourceIndexResult = findNodeChildIndex(sourceNodeInstance, parentNodeInstance);
	if (sourceIndexResult.status === 'error') return sourceIndexResult;

	// Resolve indexes
	const sourceIndex = sourceIndexResult.status === 'found' ? sourceIndexResult.data : -1;
	const targetIndex = targetIndexResult.data;

	// If the source is from a different parent, inserting before the target
	// just uses the target's current index (no shift needed).
	if (sourceNodeInstance.parentID !== parentNodeInstance.id) return { status: 'found', data: targetIndex };

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
 * Compute the insertion index for moving `sourceNodeInstance` so it ends
 * up immediately *after* `targetNodeInstance` within `parentNodeInstance`.
 *
 * @param sourceNodeInstance - block being moved
 * @param targetNodeInstance - block to insert after
 * @param parentNodeInstance - parent that contains the target block
 */
export function findNodeMoveAfterIndex(sourceNodeInstance: NodeInstance, targetNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): FindResult<number> {
	// If the source is the same as the target, cannot move after itself
	if (sourceNodeInstance.id === targetNodeInstance.id) return { status: 'error', error: 'Source and target blocks are the same.' };

	// Resolve the target first and fail fast if it's missing. The target
	// must be a child of the provided parent for this operation to make sense.
	const targetIndexResult = findNodeChildIndex(targetNodeInstance, parentNodeInstance);
	if (targetIndexResult.status === 'error') return targetIndexResult;
	if (targetIndexResult.status === 'not-found') return { status: 'error', error: 'Target block not found in parent.' };

	// The source may not belong to the parent — treat not-found as -1.
	const sourceIndexResult = findNodeChildIndex(sourceNodeInstance, parentNodeInstance);
	if (sourceIndexResult.status === 'error') return sourceIndexResult;

	// Resolve indexes
	const sourceIndex = sourceIndexResult.status === 'found' ? sourceIndexResult.data : -1;
	const targetIndex = targetIndexResult.data;

	// If the source is from a different parent, inserting after the target
	// is just targetIndex + 1 (simple append after target)
	if (sourceNodeInstance.parentID !== parentNodeInstance.id) return { status: 'found', data: targetIndex + 1 };

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
