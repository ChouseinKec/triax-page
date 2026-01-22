// Types
import type { NodeInstance } from '@/core/block/node/instance/types';
import type { CheckResult } from '@/shared/types/result';

// Helpers
import { findNodeChildIndex } from '@/core/block/node/instance/helpers/finders';

/**
 * Check whether `sourceNodeInstance` is a direct child of
 * `parentNodeInstance`.
 * @param sourceNodeInstance - block to check
 * @param parentNodeInstance - parent to check against
 */
export function isNodeChild(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): CheckResult {
	// Find the child index to determine if it's a child
	const childIndex = findNodeChildIndex(sourceNodeInstance, parentNodeInstance);
	if (childIndex.status === 'error') return { success: false, error: childIndex.error };
	if (childIndex.status === 'not-found') return { success: true, passed: false };

	// Return true since the child was found
	return { success: true, passed: true };
}

/**
 * Determine whether a given block is the last child of a provided parent.
 * @param sourceNodeInstance - block to check
 * @param parentNodeInstance - parent to check against
 */
export function isNodeLastChild(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): CheckResult {
	// Find the child's index inside the parent
	const childIndex = findNodeChildIndex(sourceNodeInstance, parentNodeInstance);
	if (childIndex.status === 'error') return { success: false, error: childIndex.error };
	if (childIndex.status === 'not-found') return { success: true, passed: false };

	// Compare index with parent's length to determine last-child status.
	return { success: true, passed: childIndex.data === parentNodeInstance.contentIDs.length - 1 };
}

/**
 * Determine whether a given block is the first child of a provided parent.
 * @param sourceNodeInstance - block to check
 * @param parentNodeInstance - parent to check against
 */
export function isNodeFirstChild(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): CheckResult {
	// Find the child's index inside the parent
	const childIndex = findNodeChildIndex(sourceNodeInstance, parentNodeInstance);
	if (childIndex.status === 'error') return { success: false, error: childIndex.error };
	if (childIndex.status === 'not-found') return { success: true, passed: false };

	// Return true if the index is 0
	return { success: true, passed: childIndex.data === 0 };
}
