// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID, BlockContent } from '@/src/core/block/instance/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper';

/**
 * Sets the content data for a specific block.
 * Merges the new content with existing content.
 *
 * @param blockID - The block identifier
 * @param content - The content data to set
 * @returns void
 *
 * @example
 * setBlockContent('block-123', { text: 'New text', format: 'bold' })
 */
export function setBlockContent(blockID: BlockID, content: BlockContent): void {
	const safeData = new ResultPipeline('[BlockCommands → setBlockContent]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!safeData) return;

	const currentBlock = useBlockStore.getState().allBlocks[safeData.blockID];
	if (!currentBlock) return;

	useBlockStore.getState().updateBlocks({ [safeData.blockID]: { ...currentBlock, content } });
}
