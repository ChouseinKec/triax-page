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
 * Retrieves the next block in the hierarchy for block hierarchy operations.
 * Checks for children first, then siblings, and finally parent's next sibling.
 *
 * @param nodeID - The block identifier to find the next block for
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
 * Retrieves the previous block in the hierarchy for block hierarchy operations.
 * Checks for previous sibling's last descendant, then the sibling itself, or the parent.
 *
 * @param nodeID - The block identifier to find the previous block for
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
