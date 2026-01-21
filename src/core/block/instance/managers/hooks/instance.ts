// Stores
import { useBlockStore } from '@/state/block/block';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

// Types
import type { BlockID, BlockInstance } from '@/core/block/instance/types';

// Helpers
import { validateBlockID, pickBlockInstance } from '@/core/block/instance/helpers';

/**
 * Reactive hook to get a complete block instance in block queries.
 * Returns the block data and updates reactively when it changes.
 *
 * @param blockID - The block identifier to retrieve
 */
export function useBlock(blockID: BlockID): BlockInstance | undefined {
	// Validate parameters first
	const results = new ResultPipeline('[BlockQueries → useBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!results) return undefined;

	// Return a reactive block instance
	return useBlockStore((state) => {
		// Pick and operate on necessary data
		const blockResult = pickBlockInstance(results.blockID, state.allBlocks);
		if (!blockResult.success) return devLog.error(`[BlockQueries → useBlock] Block not found: ${results.blockID}`), undefined;

		// Return the block instance data
		return blockResult.data;
	});
}
