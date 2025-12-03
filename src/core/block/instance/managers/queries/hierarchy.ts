// Stores
import { useBlockStore } from '@/src/state/block/block';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helpers/validators';
import { pickBlockInstance } from '@/src/core/block/instance/helpers/pickers';
import { findBlockFirstChild, findBlockNextSibling, findBlockPreviousSibling, findBlockLastDescendant, findBlockNextParentSibling } from '@/src/core/block/instance/helpers/finders';

// Types
import type { BlockInstance, BlockID } from '@/src/core/block/instance/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

/**
 * Retrieves the next block in the hierarchy for block hierarchy operations.
 * Checks for children first, then siblings, and finally parent's next sibling.
 *
 * @param blockID - The block identifier to find the next block for
 */
export function getNextBlock(blockID: BlockID): BlockInstance | null | undefined {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockManager → getNextBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			parentBlockInstance: pickBlockInstance(data.blockInstance.parentID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// If it has children, return the first child
	const firstChild = findBlockFirstChild(results.blockInstance, blockStore.allBlocks);
	if (firstChild.status === 'found') return firstChild.data;

	// If no children, get the next sibling
	const nextSibling = findBlockNextSibling(results.blockInstance, blockStore.allBlocks);
	if (nextSibling.status === 'found') return nextSibling.data;

	// If no next sibling, recursively climb up to find the parent's next sibling
	const nextParentSibling = findBlockNextParentSibling(results.blockInstance, blockStore.allBlocks);
	if (nextParentSibling.status === 'found') return nextParentSibling.data;

	return null;
}

/**
 * Retrieves the previous block in the hierarchy for block hierarchy operations.
 * Checks for previous sibling's last descendant, then the sibling itself, or the parent.
 *
 * @param blockID - The block identifier to find the previous block for
 */
export function getPreviousBlock(blockID: BlockID): BlockInstance | null | undefined {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and find necessary data
	const results = new ResultPipeline('[BlockManager → getPreviousBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			parentBlockInstance: pickBlockInstance(data.blockInstance.parentID, blockStore.allBlocks),
		}))
		.find((data) => ({
			prevSiblingInstance: findBlockPreviousSibling(data.blockInstance, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// If there is a previous sibling, return its last descendant
	if (results.prevSiblingInstance) {
		const lastDescResult = findBlockLastDescendant(results.prevSiblingInstance, blockStore.allBlocks);
		if (lastDescResult.status === 'found') return lastDescResult.data;
		return null;
	}

	// If no previous sibling, return the parent instance fetched earlier (may be undefined)
	return results.parentBlockInstance;
}
