// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { BlockID, BlockContent } from '@/core/block/instance/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { pickBlockInstance, validateBlockID } from '@/core/block/instance/helpers';

/**
 * Sets the content data for a specific block.
 * Merges the new content with existing content.
 *
 * @param blockID - The block identifier
 * @param content - The content data to set
 */
export function setBlockContent(blockID: BlockID, content: BlockContent): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick the blockInstance to update
	const results = new ResultPipeline('[BlockCommands → setBlockContent]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the block content in the store
	blockStore.updateBlocks({
		[results.blockID]: { ...results.blockInstance, content },
	});
}
