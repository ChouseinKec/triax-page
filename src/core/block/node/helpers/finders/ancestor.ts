// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/types/instance';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';

/**
 * Traverses up the node hierarchy to find all ancestor nodes of a given source node.
 * Returns ancestors ordered from immediate parent upward to the root.
 * Useful for inheritance checks, permission validation, and hierarchical context.
 * @param sourceNodeInstance - The node instance whose ancestor chain should be traversed
 * @param storedNodes - The complete record of all node instances for resolving parent relationships
 * @returns FindResult containing an array of ancestor node instances, ordered from closest to farthest
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
	if (ancestors.length === 0) return { status: 'not-found', message: 'Node has no ancestors.' };

	// Return the list of ancestor instances
	return { status: 'found', data: ancestors };
}
