// Types
import type { NodeInstance } from '@/core/block/node/types/instance';
import type { CheckResult } from '@/shared/types/result';

// Helpers
import { findNodeChildIndex } from '@/core/block/node/helpers/finders';

/**
 * Validates whether a source node is a direct child of a target parent node.
 * Performs hierarchical relationship checking to determine parent-child connectivity.
 * @param sourceNodeInstance - The node instance to check as a potential child
 * @param parentNodeInstance - The node instance to check as a potential parent
 * @returns CheckResult indicating success/failure and whether the relationship exists
 */
export function isNodeChild(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): CheckResult {
	// Find the child index to determine if it's a child
	const childIndex = findNodeChildIndex(sourceNodeInstance, parentNodeInstance);
	if (childIndex.status === 'error') return { success: false, error: childIndex.error };
	if (childIndex.status === 'not-found') return { success: true, passed: false, message: 'Node is not a child of the specified parent' };

	// Return true since the child was found
	return { success: true, passed: true };
}

/**
 * Determines whether a source node is the last child in its parent's child list.
 * Useful for layout logic, styling decisions, and hierarchical operations.
 * @param sourceNodeInstance - The node instance to check for last-child position
 * @param parentNodeInstance - The parent node instance containing the child list to check against
 * @returns CheckResult indicating success/failure and whether the node is the last child
 */
export function isNodeLastChild(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): CheckResult {
	// Find the child's index inside the parent
	const childIndex = findNodeChildIndex(sourceNodeInstance, parentNodeInstance);
	if (childIndex.status === 'error') return { success: false, error: childIndex.error };
	if (childIndex.status === 'not-found') return { success: true, passed: false, message: 'Node is not a child of the specified parent' };

	// Compare index with parent's length to determine last-child status.
	if (childIndex.data === parentNodeInstance.childNodeIDs.length - 1) {
		return { success: true, passed: true };
	} else {
		return { success: true, passed: false, message: 'Node is not the last child' };
	}
}

/**
 * Determines whether a source node is the first child in its parent's child list.
 * Useful for layout logic, styling decisions, and hierarchical operations.
 * @param sourceNodeInstance - The node instance to check for first-child position
 * @param parentNodeInstance - The parent node instance containing the child list to check against
 * @returns CheckResult indicating success/failure and whether the node is the first child
 */
export function isNodeFirstChild(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): CheckResult {
	// Find the child's index inside the parent
	const childIndex = findNodeChildIndex(sourceNodeInstance, parentNodeInstance);
	if (childIndex.status === 'error') return { success: false, error: childIndex.error };
	if (childIndex.status === 'not-found') return { success: true, passed: false, message: 'Node is not a child of the specified parent' };

	// Return true if the index is 0
	if (childIndex.data === 0) {
		return { success: true, passed: true };
	} else {
		return { success: true, passed: false, message: 'Node is not the first child' };
	}
}
