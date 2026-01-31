// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers/validators';
import { pickNodeInstance, pickNodeStoreState } from '@/core/block/node/helpers/pickers';
import { findNodeFirstChild, findNodeNextSibling, findNodePreviousSibling, findNodeLastDescendant, findNodeNextParentSibling } from '@/core/block/node/helpers/finders';

// Types
import type { NodeInstance, NodeID } from '@/core/block/node/types/instance';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Retrieves the next node in the document hierarchy for navigation and traversal operations.
 *
 * This function implements depth-first traversal to find the node that appears immediately
 * after the specified node in the document order. It first checks for the first child of the
 * current node, then the next sibling, or recursively climbs up to find the parent's next sibling.
 * Used for keyboard navigation, selection operations, and hierarchical movement through the document structure.
 *
 * @param sourceNodeID - The unique identifier of the node to find the next node for
 * @returns The next node instance in the hierarchy, null if at the end of the document, or undefined if the input node is invalid
 * @see {@link getPreviousNode} - For retrieving the previous node in the hierarchy
 * @see {@link findNodeNextSibling} - Helper function used to find the next sibling of a node
 * @see {@link findNodeFirstChild} - Helper function used to find the first child of a node
 */
export function getNextNode(sourceNodeID: NodeID): NodeInstance | null | undefined {
	const validData = new ResultPipeline('[BlockManager → getNextNode]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick({
			nodeStore: pickNodeStoreState(useNodeStore.getState()),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStore.storedNodes),
		}))
		.execute();
	if (!validData) return;

	// If it has children, return the first child
	const firstChild = findNodeFirstChild(validData.blockInstance, validData.nodeStore.storedNodes);
	if (firstChild.status === 'found') return firstChild.data;

	// If no children, get the next sibling
	const nextSibling = findNodeNextSibling(validData.blockInstance, validData.nodeStore.storedNodes);
	if (nextSibling.status === 'found') return nextSibling.data;

	// If no next sibling, recursively climb up to find the parent's next sibling
	const nextParentSibling = findNodeNextParentSibling(validData.blockInstance, validData.nodeStore.storedNodes);
	if (nextParentSibling.status === 'found') return nextParentSibling.data;

	return null;
}

/**
 * Retrieves the previous node in the document hierarchy for navigation and traversal operations.
 *
 * This function implements reverse depth-first traversal to find the node that appears immediately
 * before the specified node in the document order. It first checks for the last descendant of the
 * previous sibling, then the previous sibling itself, or finally returns the parent node if no
 * previous sibling exists. If the node is the root 'html', null is returned as there is no previous node.
 *
 * @param sourceNodeID - The unique identifier of the node to find the previous node for
 * @returns The previous node instance in the hierarchy, null if at the beginning of the document or if sourceNodeID is 'html', or undefined if the input node is invalid
 * @see {@link getNextNode} - For retrieving the next node in the hierarchy
 * @see {@link findNodePreviousSibling} - Helper function used to find the previous sibling of a node
 * @see {@link findNodeLastDescendant} - Helper function used to find the last descendant of a node
 */
export function getPreviousNode(sourceNodeID: NodeID): NodeInstance | null | undefined {
	if (sourceNodeID === 'html') return null;

	const validData = new ResultPipeline('[BlockManager → getPreviousNode]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick({
			nodeStore: pickNodeStoreState(useNodeStore.getState()),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStore.storedNodes),
		}))
		.pick((data) => ({
			parentNodeInstance: pickNodeInstance(data.blockInstance.parentID, data.nodeStore.storedNodes),
		}))
		.find((data) => ({
			prevSiblingInstance: findNodePreviousSibling(data.blockInstance, data.nodeStore.storedNodes),
		}))
		.execute();
	if (!validData) return;

	// If there is a previous sibling, return its last descendant
	if (validData.prevSiblingInstance) {
		const lastDescResult = findNodeLastDescendant(validData.prevSiblingInstance, validData.nodeStore.storedNodes);
		if (lastDescResult.status === 'found') return lastDescResult.data;
		return null;
	}

	// If no previous sibling, return the parent instance fetched earlier
	return validData.parentNodeInstance;
}
