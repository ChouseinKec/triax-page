// Types
import type { BlockInstance, BlockID, BlockInstanceRecord } from '@/core/block/instance/types';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { pickBlockInstances } from '@/core/block/instance/helpers/pickers';
import { findBlockLastChild } from '@/core/block/instance/helpers/finders/child';

/**
 * Find the last descendant of a block following the last-child chain.
 *
 * @param sourceBlockInstance - block instance to start from
 * @param storedBlocks - record used to resolve child instances
 * @returns FindResult<BlockInstance> — the last descendant instance (always found)
 */
export function findBlockLastDescendant(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): FindResult<BlockInstance> {
	// Start at the source and walk the last-child links
	let currentBlock = sourceBlockInstance;

	while (true) {
		// Use the dedicated finder to resolve the last child instance
		const lastChild = findBlockLastChild(currentBlock, storedBlocks);

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
 * @param sourceBlockInstance - the root block instance whose descendants we want
 * @param storedBlocks - record of all block instances used to resolve children
 */
export function findBlockDescendants(sourceBlockInstance: BlockInstance, storedBlocks: BlockInstanceRecord): FindResult<BlockInstance[]> {
	// Fetch initial children
	const initialChildren = pickBlockInstances(sourceBlockInstance.contentIDs, storedBlocks);
	if (!initialChildren.success) return { status: 'error', error: `Failed to find descendants: ${initialChildren.error}` };

	// If there are no direct children, we don't have descendants
	if (initialChildren.data.length === 0) return { status: 'not-found' };

	// Loop until there are no more nodes to process
	const stack: BlockInstance[] = [...initialChildren.data];
	const visited = new Set<BlockID>(stack.map((s) => s.id));
	const descendants: BlockInstance[] = [];

	while (stack.length > 0) {
		const current = stack.pop()!;
		descendants.push(current);

		// Fetch children of the current node
		const childrenResult = pickBlockInstances(current.contentIDs, storedBlocks);
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
