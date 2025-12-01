// Types
import type { BlockInstance } from '@/src/core/block/instance/types';
import type { CheckResult } from '@/src/shared/types/result';

// Helpers
import { findBlockChildIndex } from '@/src/core/block/instance/helper/finders';

/**
 * Check whether `sourceBlockInstance` is a direct child of
 * `parentBlockInstance`.
 * @param sourceBlockInstance - block to check
 * @param parentBlockInstance - parent to check against
 */
export function isBlockChild(sourceBlockInstance: BlockInstance, parentBlockInstance: BlockInstance): CheckResult {
	// Find the child index to determine if it's a child
	const childIndex = findBlockChildIndex(sourceBlockInstance, parentBlockInstance);
	if (childIndex.status === 'error') return { success: false, error: childIndex.error };
	if (childIndex.status === 'not-found') return { success: true, passed: false };

	// Return true since the child was found
	return { success: true, passed: true };
}

/**
 * Determine whether a given block is the last child of a provided parent.
 * @param sourceBlockInstance - block to check
 * @param parentBlockInstance - parent to check against
 */
export function isBlockLastChild(sourceBlockInstance: BlockInstance, parentBlockInstance: BlockInstance): CheckResult {
	// Find the child's index inside the parent
	const childIndex = findBlockChildIndex(sourceBlockInstance, parentBlockInstance);
	if (childIndex.status === 'error') return { success: false, error: childIndex.error };
	if (childIndex.status === 'not-found') return { success: true, passed: false };

	// Compare index with parent's length to determine last-child status.
	return { success: true, passed: childIndex.data === parentBlockInstance.contentIDs.length - 1 };
}

/**
 * Determine whether a given block is the first child of a provided parent.
 * @param sourceBlockInstance - block to check
 * @param parentBlockInstance - parent to check against
 */
export function isBlockFirstChild(sourceBlockInstance: BlockInstance, parentBlockInstance: BlockInstance): CheckResult {
	// Find the child's index inside the parent
	const childIndex = findBlockChildIndex(sourceBlockInstance, parentBlockInstance);
	if (childIndex.status === 'error') return { success: false, error: childIndex.error };
	if (childIndex.status === 'not-found') return { success: true, passed: false };

	// Return true if the index is 0
	return { success: true, passed: childIndex.data === 0 };
}
