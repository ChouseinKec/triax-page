// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID, BlockContent } from '@/src/core/block/instance/types';

// Helpers
import { fetchBlockContent } from '@/src/core/block/instance/helper/fetch';
import { validateBlockID } from '@/src/core/block/instance/helper/validate';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

/**
 * Gets the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param blockID - The block identifier
 * @returns The block's content data or undefined
 *
 * @example
 * const content = getBlockContent('block-123') // Returns { text: 'Hello World' }
 */
export function getBlockContent(blockID: BlockID): BlockContent | undefined {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockContent]')
		.validate({ blockID: validateBlockID(blockID) })
		.fetch((data) => ({
			content: fetchBlockContent(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return undefined;

	return safeParams.content;
}
