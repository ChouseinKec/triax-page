// Types
import type { NodeInstance } from '@/core/block/node/types/instance';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { findNodeChildIndex } from '@/core/block/node/helpers/finders/child';

/**
 * Calculates the insertion index for moving a source node as the last child of a target parent node.
 * Used when performing "move into" operations to append to the end of a parent's child list.
 * @param sourceNodeInstance - The node instance being moved
 * @param targetNodeInstance - The node instance that will become the new parent
 * @returns FindResult containing the insertion index (length of target's child list)
 */
export function findNodeMoveIntoIndex(sourceNodeInstance: NodeInstance, targetNodeInstance: NodeInstance): FindResult<number> {
	// If the source is the same as the target, cannot move into itself
	if (sourceNodeInstance.id === targetNodeInstance.id) return { status: 'error', error: 'Source and target blocks are the same.' };

	// If the source is already inside the target, there is nothing to do
	if (sourceNodeInstance.parentID === targetNodeInstance.id) return { status: 'not-found' };

	// Insert after the last existing child -> use the length as the index
	return { status: 'found', data: targetNodeInstance.childNodeIDs.length };
}

/**
 * Calculates the insertion index for moving a source node to appear immediately before a target node.
 * Handles complex index adjustments when the source and target share the same parent.
 * Essential for precise positioning in drag-and-drop and reordering operations.
 * @param sourceNodeInstance - The node instance being moved
 * @param targetNodeInstance - The reference node that the source should be placed before
 * @param parentNodeInstance - The parent node containing both source and target nodes
 * @returns FindResult containing the calculated insertion index
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
 * Calculates the insertion index for moving a source node to appear immediately after a target node.
 * Handles complex index adjustments when the source and target share the same parent.
 * Essential for precise positioning in drag-and-drop and reordering operations.
 * @param sourceNodeInstance - The node instance being moved
 * @param targetNodeInstance - The reference node that the source should be placed after
 * @param parentNodeInstance - The parent node containing both source and target nodes
 * @returns FindResult containing the calculated insertion index
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
