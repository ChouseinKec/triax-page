// Types
import type { BlockInstance, BlockInstanceRecord } from '@/core/block/instance/types';
import type { OperateResult } from '@/shared/types/result';

// Helpers
import { pickBlockInstance } from '@/core/block/instance/helpers/pickers';
import { detachBlockFromParent, attachBlockToParent } from '@/core/block/instance/helpers/operations';

/**
 * Move a block instance to be a child of a new parent at the specified index.
 *
 * @param sourceBlockInstance - the block instance to move
 * @param targetParentInstance - the new parent block instance
 * @param storedBlocks - the current block instance record
 * @param targetIndex - the index in the target parent's contentIDs to insert at
 */
export function moveBlock(sourceBlockInstance: BlockInstance, targetParentInstance: BlockInstance, storedBlocks: BlockInstanceRecord, targetIndex: number): OperateResult<BlockInstanceRecord> {
	// Create a shallow copy of the stored blocks to avoid mutating the original.
	const clonedBlocks = { ...storedBlocks };

	// Fetch the source's parent instance
	const sourceParentResult = pickBlockInstance(sourceBlockInstance.parentID, clonedBlocks);
	if (!sourceParentResult.success) return { success: false, error: sourceParentResult.error };

	// Detach the source from its parent
	const deleteResult = detachBlockFromParent(sourceBlockInstance, sourceParentResult.data, clonedBlocks);
	if (!deleteResult.success) return deleteResult;

	// Fetch the target parent instance from the post-delete store.
	const targetParentResult = pickBlockInstance(targetParentInstance.id, deleteResult.data);
	if (!targetParentResult.success) return { success: false, error: targetParentResult.error };

	// Attach the source to the target parent at the desired index.
	const addResult = attachBlockToParent(sourceBlockInstance, targetParentResult.data, targetIndex, deleteResult.data as BlockInstanceRecord);
	if (!addResult.success) return addResult;

	// Return the final updated store.
	return { success: true, data: addResult.data };
}
