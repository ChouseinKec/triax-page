// Types
import type { BlockInstance, BlockInstanceRecord } from '@/src/core/block/instance/types';
import type { FindResult } from '@/src/shared/types/result';

// Helpers
import { pickBlockInstance } from '@/src/core/block/instance/helpers/pickers';

/**
 * Find ancestor BlockInstance objects for the given block instance.
 * Returns an array of instances ordered from immediate parent upward.
 *
 * @param sourceBlockInstance - the instance whose ancestors we want
 * @param storedBlocks - record used to resolve parent instances
 */
export function findBlockAncestors(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): FindResult<BlockInstance[]> {
	const ancestors: BlockInstance[] = [];
	const seen = new Set<string>();

	// Loop up the parent chain
	let current: BlockInstance | undefined = sourceBlockInstance;
	while (current?.parentID) {
		// Detect circular dependencies
		if (seen.has(current.parentID)) return { status: 'error', error: 'Circular dependency detected in block hierarchy.' };
		seen.add(current.parentID);

		// Fetch the parent instance
		const parentResult = pickBlockInstance(current.parentID, storedBlocks);
		if (!parentResult.success) break; // Stop if parent not found (e.g., virtual root)

		// Add the parent instance to the ancestors list
		ancestors.push(parentResult.data);

		// Move up to the parent for the next iteration
		current = parentResult.data;
	}

	// No ancestors found
	if (ancestors.length === 0) return { status: 'not-found' };

	// Return the list of ancestor instances
	return { status: 'found', data: ancestors };
}
