// Stores
import { useBlockStore } from '@/src/state/block/block';

// Types
import type { BlockID, BlockContent } from '@/src/core/block/instance/types';

// Helpers
import { pickBlockContent } from '@/src/core/block/instance/helper/pickers';
import { validateBlockID } from '@/src/core/block/instance/helper/validators';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

/**
 * Gets the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param blockID - The block identifier
 */
export function getBlockContent(blockID: BlockID): BlockContent | undefined {
	const blockStore = useBlockStore.getState();

	// Validate and pick the block content
	const results = new ResultPipeline('[BlockQueries → getBlockContent]')
		.validate({ blockID: validateBlockID(blockID) })
		.pick((data) => ({
			content: pickBlockContent(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return undefined;

	// Return the block content
	return results.content;
}
