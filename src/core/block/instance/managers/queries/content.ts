// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { BlockID, BlockContent } from '@/core/block/instance/types';

// Helpers
import { pickBlockContent } from '@/core/block/instance/helpers/pickers';
import { validateBlockID } from '@/core/block/instance/helpers/validators';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

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
