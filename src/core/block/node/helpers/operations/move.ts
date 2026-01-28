// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/types/instance';
import type { OperateResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';
import { detachNodeFromParent, attachNodeToParent } from '@/core/block/node/helpers/operations';

/**
 * Move a block instance to be a child of a new parent at the specified index.
 *
 * This operation relocates a node within the block hierarchy by first detaching
 * it from its current parent and then attaching it to a new parent at the specified
 * position. The node's subtree (all its descendants) moves with it, maintaining
 * the hierarchical structure.
 *
 * @param sourceNodeInstance - The block instance to move to a new location
 * @param targetParentInstance - The new parent block instance to attach the source to
 * @param storedNodes - The current record of all block instances in the store
 * @param targetIndex - The index within the target parent's childNodeIDs to insert the moved node at
 * @returns An OperateResult containing the updated store with the node moved to its new position
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
