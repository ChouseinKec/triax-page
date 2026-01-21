// Stores
import { useBlockStore } from '@/state/block/block';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

// Types
import type { BlockID, BlockContent } from '@/core/block/instance/types';

// Helpers
import { validateBlockID, pickBlockInstance } from '@/core/block/instance/helpers';

/**
 * React hook to get the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param blockID - The block identifier
 */
export function useBlockContent(blockID: BlockID): BlockContent | undefined {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → useBlockContent]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!results) return undefined;

	// Return a reactive content value
	return useBlockStore((state) => {
		// Pick and operate on necessary data
		const blockResult = pickBlockInstance(results.blockID, state.allBlocks);
		if (!blockResult.success) return devLog.error(`[BlockQueries → useBlockContent] Block not found: ${results.blockID}`), undefined;

		// Return the block content data
		return blockResult.data.content;
	});
}
