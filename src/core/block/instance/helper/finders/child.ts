// Types
import type { BlockInstance, BlockInstanceRecord } from '@/src/core/block/instance/types';
import type { FindResult } from '@/src/shared/types/result';

// Helpers
import { pickBlockInstance } from '@/src/core/block/instance/helper/pickers';

/**
 * Find the index position of a child block inside its parent's contentIDs array.
 *
 * @param sourceBlockInstance - the child block instance whose index we're finding
 * @param parentBlockInstance - the parent instance that contains contentIDs
 */
export function findBlockChildIndex(sourceBlockInstance: BlockInstance, parentBlockInstance: BlockInstance): FindResult<number> {
	// Compute index in parent's contentIDs array
	const currentIndex = parentBlockInstance.contentIDs.indexOf(sourceBlockInstance.id);

	// If missing, return not-found to let callers handle the absence explicitly
	if (currentIndex === -1) return { status: 'not-found' };

	// Otherwise return the found index
	return { status: 'found', data: currentIndex };
}

/**
 * Return the first child BlockInstance of the provided block, if any.
 *
 * @param sourceBlockInstance - parent block instance to inspect
 * @param storedBlocks - block record to resolve child instances from
 */
export function findBlockFirstChild(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): FindResult<BlockInstance> {
	// If there are no children, short-circuit with not-found
	if (sourceBlockInstance.contentIDs.length === 0) return { status: 'not-found' };

	// Resolve the first child id and fetch the BlockInstance
	const firstChildID = sourceBlockInstance.contentIDs[0];
	const firstChildResult = pickBlockInstance(firstChildID, storedBlocks);
	if (!firstChildResult.success) return { status: 'error', error: firstChildResult.error };

	// Return the BlockInstance
	return { status: 'found', data: firstChildResult.data };
}

/**
 * Return the last child BlockInstance of the provided block, if any.
 *
 * @param sourceBlockInstance - parent block instance to inspect
 * @param storedBlocks - block record to resolve child instances from
 */
export function findBlockLastChild(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): FindResult<BlockInstance> {
	// If there are no children, short-circuit with not-found
	if (sourceBlockInstance.contentIDs.length === 0) return { status: 'not-found' };

	// Resolve the last child id and fetch the BlockInstance
	const lastChildID = sourceBlockInstance.contentIDs[sourceBlockInstance.contentIDs.length - 1];
	const lastChildResult = pickBlockInstance(lastChildID, storedBlocks);
	if (!lastChildResult.success) return { status: 'error', error: lastChildResult.error };

	// Return the BlockInstance
	return { status: 'found', data: lastChildResult.data };
}
