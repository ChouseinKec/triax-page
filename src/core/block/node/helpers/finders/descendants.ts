// Types
import type { NodeInstance, NodeID, StoredNodes } from '@/core/block/node/types/instance';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstances } from '@/core/block/node/helpers/pickers';
import { findNodeLastChild } from '@/core/block/node/helpers/finders/child';

/**
 * Finds the deepest last descendant by following the last-child chain from a starting node.
 * Useful for finding terminal nodes, calculating tree depth, and hierarchical traversals.
 * @param sourceNodeInstance - The node instance to start the descent from
 * @param storedNodes - The complete record of all node instances for resolving descendant relationships
 * @returns FindResult containing the last descendant node instance (always returns found unless error)
 */
export function findNodeLastDescendant(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance> {
	// Start at the source and walk the last-child links
	let currentBlock = sourceNodeInstance;

	while (true) {
		// Use the dedicated finder to resolve the last child instance
		const lastChild = findNodeLastChild(currentBlock, storedNodes);

		// If there's no last child, we've reached the terminal node
		if (lastChild.status === 'not-found') break;

		// Stop descent on errors — otherwise descend
		if (lastChild.status === 'error') break;

		// Descend to the last child
		currentBlock = lastChild.data;
	}

	// Return the deepest block we reached
	return { status: 'found', data: currentBlock };
}

/**
 * Collects all descendant node instances of a given root node in depth-first order.
 * Performs a complete tree traversal to gather all nodes in the subtree.
 * Useful for bulk operations, tree analysis, and hierarchical data processing.
 * @param sourceNodeInstance - The root node instance whose complete descendant tree should be collected
 * @param storedNodes - The complete record of all node instances for resolving descendant relationships
 * @returns FindResult containing an array of all descendant node instances in depth-first order
 */
export function findNodeDescendants(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance[]> {
	// Fetch initial children
	const initialChildren = pickNodeInstances(sourceNodeInstance.childNodeIDs, storedNodes);
	if (!initialChildren.success) return { status: 'error', error: `Failed to find descendants: ${initialChildren.error}` };

	// If there are no direct children, we don't have descendants
	if (initialChildren.data.length === 0) return { status: 'not-found' };

	// Loop until there are no more nodes to process
	const stack: NodeInstance[] = [...initialChildren.data];
	const visited = new Set<NodeID>(stack.map((s) => s.id));
	const descendants: NodeInstance[] = [];

	while (stack.length > 0) {
		const current = stack.pop()!;
		descendants.push(current);

		// Fetch children of the current node
		const childrenResult = pickNodeInstances(current.childNodeIDs, storedNodes);
		if (!childrenResult.success) return { status: 'error', error: `Failed to find descendants: ${childrenResult.error}` };

		// Add unvisited children to the stack for processing
		for (const child of childrenResult.data) {
			if (visited.has(child.id)) continue;
			visited.add(child.id);
			stack.push(child);
		}
	}

	return { status: 'found', data: descendants };
}
