// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { ElementTag } from '@/src/core/block/element/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateBlockTag, validateBlockID } from '@/src/core/block/instance/helper';

/**
 * Sets the HTML tag for a specific block.
 * Updates the block's primary HTML element tag.
 *
 * @param blockID - The block identifier
 * @param tag - The new HTML tag to set
 * @returns void
 *
 * @example
 * setBlockTag('block-123', 'div')
 */
export function setBlockTag(blockID: BlockID, blockTag: ElementTag): void {
	const safeData = new ResultPipeline('[BlockCommands → setBlockTag]')
		.validate({
			blockID: validateBlockID(blockID),
			blockTag: validateBlockTag(blockTag),
		})
		.execute();
	if (!safeData) return;

	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!currentBlock) return;

	useBlockStore.getState().updateBlocks({ [blockID]: { ...currentBlock, tag: safeData.blockTag } });
}
