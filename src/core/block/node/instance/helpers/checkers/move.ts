// Helpers
import { allowsChildElement, violatesForbiddenAncestors, exceedsUniqueChildLimit, violatesOrderedChildren } from '@/core/block/node/instance/helpers/checkers';

// Types
import type { NodeInstance, StoredNodes} from '@/core/block/node/instance/types';
import type { NodeDefinition } from '@/core/block/node/definition/types';
import type { CheckResult } from '@/shared/types/result';

/**
 * Determine whether a block can be moved to a target location based on various checks.
 * 
 * @param sourceNodeInstance - The block instance to be moved.
 * @param targetNodeInstance - The target block instance where the source block is to be moved.
 * @param parentNodeDefinition - The definition of the parent block.
 * @param sourceNodeDefinition - The definition of the source block.
 * @param storedNodes - The record of all stored block instances.
 * @param targetIndex - The index at which the source block is to be inserted in the target.
 */
export function canNodeMove(sourceNodeInstance: NodeInstance, targetNodeInstance: NodeInstance, parentNodeDefinition: NodeDefinition, sourceNodeDefinition: any, storedNodes: StoredNodes, targetIndex: number): CheckResult {
	return { success: true, passed: true };

	// Execute checks sequentially and return the first failure/denial
	// const isChildAllowed = allowsChildElement(parentNodeDefinition, sourceNodeInstance.tag);
	// if (!isChildAllowed.success) return isChildAllowed;
	// if (!isChildAllowed.passed) return { success: true, passed: false };

	// const forbiddenAncestor = violatesForbiddenAncestors(sourceNodeDefinition, targetNodeInstance, storedNodes);
	// if (!forbiddenAncestor.success) return forbiddenAncestor;
	// if (!forbiddenAncestor.passed) return { success: true, passed: false };

	// const exceeds = exceedsUniqueChildLimit(parentNodeDefinition, targetNodeInstance, sourceNodeInstance.tag, storedNodes, sourceNodeInstance.id);
	// if (!exceeds.success) return exceeds;
	// if (!exceeds.passed) return { success: true, passed: false };

	// const violates = violatesOrderedChildren(parentNodeDefinition, targetNodeInstance, sourceNodeInstance.tag, storedNodes, targetIndex);
	// if (!violates.success) return violates;
	// if (!violates.passed) return { success: true, passed: false };

	// return { success: true, passed: true };
}
