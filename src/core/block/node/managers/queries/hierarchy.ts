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
 * Implements depth-first traversal: checks for children first, then next siblings, and finally parent's next sibling.
 * Used for keyboard navigation, selection operations, and hierarchical movement through the document structure.
 * @param nodeID - The unique identifier of the node to find the next node after in the hierarchy
 * @returns The next node instance in the hierarchy, null if at the end of the document, or undefined if the input node is invalid
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
		.pick((data) => ({
			parentNodeInstance: pickNodeInstance(data.blockInstance.parentID, blockStore.storedNodes),
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
 * Implements reverse depth-first traversal: checks for previous sibling's last descendant first, then the sibling itself, or finally the parent.
 * Used for keyboard navigation, selection operations, and hierarchical movement through the document structure.
 * @param nodeID - The unique identifier of the node to find the previous node before in the hierarchy
 * @returns The previous node instance in the hierarchy, null if at the beginning of the document, or undefined if the input node is invalid
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
		.pick((data) => ({
			parentNodeInstance: pickNodeInstance(data.blockInstance.parentID, blockStore.storedNodes),
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

	// If no previous sibling, return the parent instance fetched earlier (may be undefined)
	return results.parentNodeInstance;
}
