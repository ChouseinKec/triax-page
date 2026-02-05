// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/types/instance';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';

/**
 * Determines the positional index of a child node within its parent's child list.
 * Essential for ordering operations, move calculations, and hierarchical positioning.
 * @param sourceNodeInstance - The child node instance whose position should be found
 * @param parentNodeInstance - The parent node instance containing the child list to search
 * @returns FindResult containing the zero-based index position, or not-found if the child doesn't exist in the parent's list
 */
export function findNodeChildIndex(sourceNodeInstance: NodeInstance, parentNodeInstance: NodeInstance): FindResult<number> {
	// Compute index in parent's childNodeIDs array
	const currentIndex = parentNodeInstance.childNodeIDs.indexOf(sourceNodeInstance.id);

	// If missing, return not-found to let callers handle the absence explicitly
	if (currentIndex === -1) return { status: 'not-found', message: 'Node is not a child of the parent.' };

	// Otherwise return the found index
	return { status: 'found', data: currentIndex };
}

/**
 * Retrieves the first child node instance of a given parent node.
 * Useful for depth-first traversals, layout calculations, and hierarchical navigation.
 * @param sourceNodeInstance - The parent node instance whose first child should be retrieved
 * @param storedNodes - The complete record of all node instances for resolving the child relationship
 * @returns FindResult containing the first child node instance, or not-found if the parent has no children
 */
export function findNodeFirstChild(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance> {
	// If there are no children, short-circuit with not-found
	if (sourceNodeInstance.childNodeIDs.length === 0) return { status: 'not-found', message: 'Parent has no children.' };

	// Resolve the first child id and fetch the NodeInstance
	const firstChildID = sourceNodeInstance.childNodeIDs[0];
	const firstChildResult = pickNodeInstance(firstChildID, storedNodes);
	if (!firstChildResult.success) return { status: 'error', error: firstChildResult.error };

	// Return the NodeInstance
	return { status: 'found', data: firstChildResult.data };
}

/**
 * Retrieves the last child node instance of a given parent node.
 * Useful for depth-first traversals, layout calculations, and finding terminal nodes in hierarchies.
 * @param sourceNodeInstance - The parent node instance whose last child should be retrieved
 * @param storedNodes - The complete record of all node instances for resolving the child relationship
 * @returns FindResult containing the last child node instance, or not-found if the parent has no children
 */
export function findNodeLastChild(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance> {
	// If there are no children, short-circuit with not-found
	if (sourceNodeInstance.childNodeIDs.length === 0) return { status: 'not-found', message: 'Parent has no children.' };

	// Resolve the last child id and fetch the NodeInstance
	const lastChildID = sourceNodeInstance.childNodeIDs[sourceNodeInstance.childNodeIDs.length - 1];
	const lastChildResult = pickNodeInstance(lastChildID, storedNodes);
	if (!lastChildResult.success) return { status: 'error', error: lastChildResult.error };

	// Return the NodeInstance
	return { status: 'found', data: lastChildResult.data };
}
