// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/instance/types';
import type { OperateResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/instance/helpers/pickers';
import { detachNodeFromParent, attachNodeToParent } from '@/core/block/node/instance/helpers/operations';

/**
 * Move a block instance to be a child of a new parent at the specified index.
 *
 * @param sourceNodeInstance - the block instance to move
 * @param targetParentInstance - the new parent block instance
 * @param storedNodes - the current block instance record
 * @param targetIndex - the index in the target parent's contentIDs to insert at
 */
export function moveNode(sourceNodeInstance: NodeInstance, targetParentInstance: NodeInstance, storedNodes: StoredNodes, targetIndex: number): OperateResult<StoredNodes> {
	// Create a shallow copy of the stored blocks to avoid mutating the original.
	const clonedBlocks = { ...storedNodes };

	// Fetch the source's parent instance
	const sourceParentResult = pickNodeInstance(sourceNodeInstance.parentID, clonedBlocks);
	if (!sourceParentResult.success) return { success: false, error: sourceParentResult.error };

	// Detach the source from its parent
	const deleteResult = detachNodeFromParent(sourceNodeInstance, sourceParentResult.data, clonedBlocks);
	if (!deleteResult.success) return deleteResult;

	// Fetch the target parent instance from the post-delete store.
	const targetParentResult = pickNodeInstance(targetParentInstance.id, deleteResult.data);
	if (!targetParentResult.success) return { success: false, error: targetParentResult.error };

	// Attach the source to the target parent at the desired index.
	const addResult = attachNodeToParent(sourceNodeInstance, targetParentResult.data, targetIndex, deleteResult.data as StoredNodes);
	if (!addResult.success) return addResult;

	// Return the final updated store.
	return { success: true, data: addResult.data };
}
