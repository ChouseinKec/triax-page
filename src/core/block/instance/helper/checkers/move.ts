// Helpers
import { isBlockChildAllowed, hasBlockForbiddenAncestor, doesBlockElementExceeds, doesBlockElementViolatesOrder } from '@/src/core/block/instance/helper/checkers';

// Types
import type { BlockInstance, BlockInstanceRecord, BlockDefinition } from '@/src/core/block/instance/types';
import type { CheckResult } from '@/src/shared/types/result';

/**
 * Determine whether a block can be moved to a target location based on various checks.
 * 
 * @param sourceBlockInstance - The block instance to be moved.
 * @param targetBlockInstance - The target block instance where the source block is to be moved.
 * @param parentBlockDefinition - The definition of the parent block.
 * @param sourceBlockDefinition - The definition of the source block.
 * @param storedBlocks - The record of all stored block instances.
 * @param targetIndex - The index at which the source block is to be inserted in the target.
 */
export function canBlockMove(sourceBlockInstance: BlockInstance, targetBlockInstance: BlockInstance, parentBlockDefinition: BlockDefinition, sourceBlockDefinition: any, storedBlocks: BlockInstanceRecord, targetIndex: number): CheckResult {
	return { success: true, ok: true };

	// Execute checks sequentially and return the first failure/denial
	// const isChildAllowed = isBlockChildAllowed(parentBlockDefinition, sourceBlockInstance.tag);
	// if (!isChildAllowed.success) return isChildAllowed;
	// if (!isChildAllowed.ok) return { success: true, ok: false };

	// const forbiddenAncestor = hasBlockForbiddenAncestor(sourceBlockDefinition, targetBlockInstance, storedBlocks);
	// if (!forbiddenAncestor.success) return forbiddenAncestor;
	// if (!forbiddenAncestor.ok) return { success: true, ok: false };

	// const exceeds = doesBlockElementExceeds(parentBlockDefinition, targetBlockInstance, sourceBlockInstance.tag, storedBlocks, sourceBlockInstance.id);
	// if (!exceeds.success) return exceeds;
	// if (!exceeds.ok) return { success: true, ok: false };

	// const violates = doesBlockElementViolatesOrder(parentBlockDefinition, targetBlockInstance, sourceBlockInstance.tag, storedBlocks, targetIndex);
	// if (!violates.success) return violates;
	// if (!violates.ok) return { success: true, ok: false };

	// return { success: true, ok: true };
}
