// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/instance/types/instance';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/instance/helpers/pickers';

/**
 * Find ancestor NodeInstance objects for the given block instance.
 * Returns an array of instances ordered from immediate parent upward.
 *
 * @param sourceNodeInstance - the instance whose ancestors we want
 * @param storedNodes - record used to resolve parent instances
 */
export function findNodeAncestors(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance[]> {
	const ancestors: NodeInstance[] = [];
	const seen = new Set<string>();

	// Loop up the parent chain
	let current: NodeInstance | undefined = sourceNodeInstance;
	while (current?.parentID) {
		// Detect circular dependencies
		if (seen.has(current.parentID)) return { status: 'error', error: 'Circular dependency detected in block hierarchy.' };
		seen.add(current.parentID);

		// Fetch the parent instance
		const parentResult = pickNodeInstance(current.parentID, storedNodes);
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
