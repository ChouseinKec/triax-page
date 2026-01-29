// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers/validators';
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';
import { findNodeFirstChild, findNodeNextSibling, findNodePreviousSibling, findNodeLastDescendant, findNodeNextParentSibling } from '@/core/block/node/helpers/finders';

// Types
import type { NodeInstance, NodeID } from '@/core/block/node/types/instance';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Retrieves the next node in the document hierarchy for navigation and traversal operations.
 *
 * This function implements a depth-first traversal strategy to find the subsequent node:
 * 1. First, checks if the current node has any child nodes; if so, returns the first child.
 * 2. If no children, looks for the next sibling of the current node.
 * 3. If no next sibling, recursively climbs up to the parent and finds its next sibling.
 * 4. Stops at the document root ('root') and returns null if no further nodes exist.
 * Used primarily for keyboard navigation (e.g., arrow keys), block selection, and hierarchical movement.
 *
 * @param nodeID - The unique identifier of the node from which to find the next node in the hierarchy
 * @returns The next NodeInstance in the hierarchy, or null if at the end of the document (e.g., no more nodes), or undefined if the input nodeID is invalid or not found
 * @see {@link getPreviousNode} - For retrieving the previous node in the hierarchy
 * @see {@link findNodeFirstChild} - Helper function used to find the first child of a node
 * @see {@link findNodeNextSibling} - Helper function used to find the next sibling of a node
 * @see {@link findNodeNextParentSibling} - Helper function used to find the next sibling of the parent
 */
export function getNextNode(nodeID: NodeID): NodeInstance | null | undefined {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockManager → getNextNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.storedNodes),
		}))
		.execute();
	if (!results) return;

	// If it has children, return the first child
	const firstChild = findNodeFirstChild(results.blockInstance, blockStore.storedNodes);
	if (firstChild.status === 'found') return firstChild.data;

	// If no children, get the next sibling
	const nextSibling = findNodeNextSibling(results.blockInstance, blockStore.storedNodes);
	if (nextSibling.status === 'found') return nextSibling.data;

	// If no next sibling, recursively climb up to find the parent's next sibling
	const nextParentSibling = findNodeNextParentSibling(results.blockInstance, blockStore.storedNodes);
	if (nextParentSibling.status === 'found') return nextParentSibling.data;

	return null;
}

/**
 * Retrieves the previous node in the document hierarchy for navigation and traversal operations.
 *
 * This function implements a reverse depth-first traversal strategy to find the preceding node:
 * 1. First, checks if the current node has a previous sibling; if so, returns the last descendant of that sibling.
 * 2. If no previous sibling, returns the parent node of the current node.
 * 3. Stops at the document root ('root') and returns null if attempting to go beyond the root.
 * Used primarily for keyboard navigation (e.g., arrow keys), block selection, and hierarchical movement.
 *
 * @param nodeID - The unique identifier of the node from which to find the previous node in the hierarchy
 * @returns The previous NodeInstance in the hierarchy, or null if at the beginning of the document (e.g., no previous nodes), or undefined if the input nodeID is invalid or not found
 * @see {@link getNextNode} - For retrieving the next node in the hierarchy
 * @see {@link findNodePreviousSibling} - Helper function used to find the previous sibling of a node
 * @see {@link findNodeLastDescendant} - Helper function used to find the last descendant of a node
 */
export function getPreviousNode(nodeID: NodeID): NodeInstance | null | undefined {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and find necessary data
	const results = new ResultPipeline('[BlockManager → getPreviousNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.storedNodes),
		}))
		.find((data) => ({
			prevSiblingInstance: findNodePreviousSibling(data.blockInstance, blockStore.storedNodes),
		}))
		.execute();
	if (!results) return;

	// If there is a previous sibling, return its last descendant
	if (results.prevSiblingInstance) {
		const lastDescResult = findNodeLastDescendant(results.prevSiblingInstance, blockStore.storedNodes);
		if (lastDescResult.status === 'found') return lastDescResult.data;
		return null;
	}

	// If no previous sibling, return the parent instance (null if root)
	const parentPick = results.blockInstance.parentID === 'root' ? { success: false as const, error: 'root' } : pickNodeInstance(results.blockInstance.parentID, blockStore.storedNodes);
	if (parentPick.success) return parentPick.data;
	return null;
}
