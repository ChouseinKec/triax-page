// Types
import type { NodeInstance, NodeID, StoredNodes } from '@/core/block/node/instance/types/instance';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstances } from '@/core/block/node/instance/helpers/pickers';
import { findNodeLastChild } from '@/core/block/node/instance/helpers/finders/child';

/**
 * Find the last descendant of a block following the last-child chain.
 *
 * @param sourceNodeInstance - block instance to start from
 * @param storedNodes - record used to resolve child instances
 * @returns FindResult<NodeInstance> — the last descendant instance (always found)
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
 * Collect all descendant block IDs of the given block in depth-first order.
 *
 * @param sourceNodeInstance - the root block instance whose descendants we want
 * @param storedNodes - record of all block instances used to resolve children
 */
export function findNodeDescendants(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance[]> {
	// Fetch initial children
	const initialChildren = pickNodeInstances(sourceNodeInstance.contentIDs, storedNodes);
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
		const childrenResult = pickNodeInstances(current.contentIDs, storedNodes);
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
