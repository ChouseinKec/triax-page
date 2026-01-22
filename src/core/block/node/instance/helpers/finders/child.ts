// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/instance/types/instance';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/instance/helpers/pickers';

/**
 * Find the index position of a child block inside its parent's contentIDs array.
 *
 * @param sourceNodeInstance - the child block instance whose index we're finding
 * @param parentNodeInstance - the parent instance that contains contentIDs
 */
export function findNodeChildIndex(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): FindResult<number> {
	// Compute index in parent's contentIDs array
	const currentIndex = parentNodeInstance.contentIDs.indexOf(sourceNodeInstance.id);

	// If missing, return not-found to let callers handle the absence explicitly
	if (currentIndex === -1) return { status: 'not-found' };

	// Otherwise return the found index
	return { status: 'found', data: currentIndex };
}

/**
 * Return the first child NodeInstance of the provided block, if any.
 *
 * @param sourceNodeInstance - parent block instance to inspect
 * @param storedNodes - block record to resolve child instances from
 */
export function findNodeFirstChild(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance> {
	// If there are no children, short-circuit with not-found
	if (sourceNodeInstance.contentIDs.length === 0) return { status: 'not-found' };

	// Resolve the first child id and fetch the NodeInstance
	const firstChildID = sourceNodeInstance.contentIDs[0];
	const firstChildResult = pickNodeInstance(firstChildID, storedNodes);
	if (!firstChildResult.success) return { status: 'error', error: firstChildResult.error };

	// Return the NodeInstance
	return { status: 'found', data: firstChildResult.data };
}

/**
 * Return the last child NodeInstance of the provided block, if any.
 *
 * @param sourceNodeInstance - parent block instance to inspect
 * @param storedNodes - block record to resolve child instances from
 */
export function findNodeLastChild(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance> {
	// If there are no children, short-circuit with not-found
	if (sourceNodeInstance.contentIDs.length === 0) return { status: 'not-found' };

	// Resolve the last child id and fetch the NodeInstance
	const lastChildID = sourceNodeInstance.contentIDs[sourceNodeInstance.contentIDs.length - 1];
	const lastChildResult = pickNodeInstance(lastChildID, storedNodes);
	if (!lastChildResult.success) return { status: 'error', error: lastChildResult.error };

	// Return the NodeInstance
	return { status: 'found', data: lastChildResult.data };
}
