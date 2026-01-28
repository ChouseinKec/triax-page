// Types
import type { NodeInstance, StoredNodes } from '@/core/block/node/types/instance';
import type { FindResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';
import { findNodeAncestors } from '@/core/block/node/helpers/finders/ancestor';
import { findNodeChildIndex } from '@/core/block/node/helpers/finders/child';
import { isNodeLastChild, isNodeFirstChild } from '@/core/block/node/helpers/checkers';

/**
 * Finds the immediately following sibling node instance of a given source node.
 * Essential for keyboard navigation, selection traversal, and hierarchical movement.
 * @param sourceNodeInstance - The node instance whose next sibling should be found
 * @param storedNodes - The complete record of all node instances for resolving sibling relationships
 * @returns FindResult containing the next sibling node instance, or not-found if source is the last child
 */
export function findNodeNextSibling(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance> {
	// Find the parent block instance
	const parentNodeInstance = pickNodeInstance(sourceNodeInstance.parentID, storedNodes);
	if (!parentNodeInstance.success) return { status: 'error', error: parentNodeInstance.error };

	// Find the source's position inside the parent's children.
	const currentIndexResult = findNodeChildIndex(sourceNodeInstance, parentNodeInstance.data);
	if (currentIndexResult.status === 'error') return { status: 'error', error: currentIndexResult.error };
	if (currentIndexResult.status === 'not-found') return { status: 'not-found' };

	// If the source is the last child there is no next sibling.
	const isNodeLastChildResult = isNodeLastChild(sourceNodeInstance, parentNodeInstance.data);
	if (!isNodeLastChildResult.success) return { status: 'error', error: isNodeLastChildResult.error };
	if (isNodeLastChildResult.passed === true) return { status: 'not-found' };

	// Fetch the sibling that immediately follows the source
	const nextSiblingID = parentNodeInstance.data.childNodeIDs[currentIndexResult.data + 1];
	const nextSiblingResult = pickNodeInstance(nextSiblingID, storedNodes);
	if (!nextSiblingResult.success) return { status: 'error', error: nextSiblingResult.error };

	// Return the next sibling
	return { status: 'found', data: nextSiblingResult.data };
}

/**
 * Finds the immediately preceding sibling node instance of a given source node.
 * Essential for keyboard navigation, selection traversal, and hierarchical movement.
 * @param sourceNodeInstance - The node instance whose previous sibling should be found
 * @param storedNodes - The complete record of all node instances for resolving sibling relationships
 * @returns FindResult containing the previous sibling node instance, or not-found if source is the first child
 */
export function findNodePreviousSibling(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance> {
	// Find the parent block instance
	const parentNodeInstance = pickNodeInstance(sourceNodeInstance.parentID, storedNodes);
	if (!parentNodeInstance.success) return { status: 'error', error: parentNodeInstance.error };

	// Find the source's position inside the parent's children.
	const currentIndexResult = findNodeChildIndex(sourceNodeInstance, parentNodeInstance.data);
	if (currentIndexResult.status === 'error') return { status: 'error', error: currentIndexResult.error };
	if (currentIndexResult.status === 'not-found') return { status: 'not-found' };

	// If the source is the first child there is no previous sibling.
	const isFirstChildResult = isNodeFirstChild(sourceNodeInstance, parentNodeInstance.data);
	if (!isFirstChildResult.success) return { status: 'error', error: isFirstChildResult.error };
	if (isFirstChildResult.passed === true) return { status: 'not-found' };

	// Fetch the sibling that immediately precedes the source
	const previousSiblingID = parentNodeInstance.data.childNodeIDs[currentIndexResult.data - 1];
	const previousSiblingResult = pickNodeInstance(previousSiblingID, storedNodes);
	if (!previousSiblingResult.success) return { status: 'error', error: previousSiblingResult.error };

	// Return the previous sibling
	return { status: 'found', data: previousSiblingResult.data };
}

/**
 * Finds the next sibling of the nearest ancestor that has one, enabling hierarchical navigation.
 * Climbs up the ancestor chain to find the first parent with a following sibling.
 * Used for advanced traversal scenarios and complex hierarchical movement patterns.
 * @param sourceNodeInstance - The node instance to start the ancestor search from
 * @param storedNodes - The complete record of all node instances for resolving ancestor and sibling relationships
 * @returns FindResult containing the next parent sibling node instance, or not-found if no ancestor has a next sibling
 */
export function findNodeNextParentSibling(sourceNodeInstance: NodeInstance, storedNodes: StoredNodes): FindResult<NodeInstance> {
	// Compute ancestor instances once (immediate parent first).
	const ancestorsResult = findNodeAncestors(sourceNodeInstance, storedNodes);
	if (ancestorsResult.status === 'error') return { status: 'error', error: ancestorsResult.error };
	if (ancestorsResult.status === 'not-found') return { status: 'not-found' };

	// Loop through ancestors to find the first with a next sibling.
	for (let i = 0; i < ancestorsResult.data.length - 1; i++) {
		const parent = ancestorsResult.data[i];
		const grandParent = ancestorsResult.data[i + 1];

		// Determine parent's index under grandParent and try to grab the next sibling.
		const parentIndexResult = findNodeChildIndex(parent, grandParent);
		if (parentIndexResult.status === 'error') return { status: 'error', error: parentIndexResult.error };
		if (parentIndexResult.status === 'not-found') continue; // something's wrong / inconsistent, skip

		// Try to fetch the next sibling
		const nextSiblingIndex = parentIndexResult.data + 1;
		if (nextSiblingIndex >= grandParent.childNodeIDs.length) continue; // parent is last child

		// Fetch the sibling block instance
		const siblingID = grandParent.childNodeIDs[nextSiblingIndex];
		const siblingResult = pickNodeInstance(siblingID, storedNodes);
		if (!siblingResult.success) return { status: 'error', error: siblingResult.error };

		// Return the found sibling
		return { status: 'found', data: siblingResult.data };
	}

	// No ancestor had a next sibling — return not-found.
	return { status: 'not-found' };
}
