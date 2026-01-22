// Helpers
import { isChildElementAllowed, hasForbiddenAncestor, hasExceededUniqueChildLimit, hasViolatedOrderedChildren } from '@/core/block/node/instance/helpers/checkers';

// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/instance/types/instance';
import type { ElementDefinition } from '@/core/block/element/definition/types';
import type { CheckResult } from '@/shared/types/result';

/**
 * Determine whether a block can be moved to a target location based on various checks.
 *
 * @param sourceNodeInstance - The block instance to be moved.
 * @param targetNodeInstance - The target block instance where the source block is to be moved.
 * @param parentElementDefinition - The element definition of the parent.
 * @param childElementDefinition - The element definition of the child.
 * @param storedNodes - The record of all stored block instances.
 * @param targetIndex - The index at which the source block is to be inserted in the target.
 */
export function canNodeMove(sourceNodeInstance: NodeInstance, targetNodeInstance: NodeInstance, parentElementDefinition: ElementDefinition, childElementDefinition: ElementDefinition, storedNodes: StoredNodes, targetIndex: number): CheckResult {
	// return { success: true, passed: true };

	const isChildAllowed = isChildElementAllowed(parentElementDefinition, sourceNodeInstance.tag);
	if (!isChildAllowed.success) return isChildAllowed;
	if (!isChildAllowed.passed) return { success: true, passed: false };

	const forbiddenAncestor = hasForbiddenAncestor(childElementDefinition, targetNodeInstance);
	if (!forbiddenAncestor.success) return forbiddenAncestor;
	if (forbiddenAncestor.passed) return { success: true, passed: false };

	const exceeds = hasExceededUniqueChildLimit(parentElementDefinition, targetNodeInstance, sourceNodeInstance.tag, storedNodes, sourceNodeInstance.id);
	if (!exceeds.success) return exceeds;
	if (exceeds.passed) return { success: true, passed: false };

	const violates = hasViolatedOrderedChildren(parentElementDefinition, targetNodeInstance, sourceNodeInstance.tag, storedNodes, targetIndex);
	if (!violates.success) return violates;
	if (violates.passed) return { success: true, passed: false };

	return { success: true, passed: true };
}
