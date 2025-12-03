// Stores
import { useBlockStore } from '@/src/state/block/block';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { ElementTag } from '@/src/core/block/element/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateBlockTag, validateBlockID, pickBlockInstance } from '@/src/core/block/instance/helper';

/**
 * Sets the HTML tag for a specific block.
 * Updates the block's primary HTML element tag.
 *
 * @param blockID - The block identifier
 * @param tag - The new HTML tag to set
 */
export function setBlockTag(blockID: BlockID, blockTag: ElementTag): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockCommands → setBlockTag]')
		.validate({
			blockID: validateBlockID(blockID),
			blockTag: validateBlockTag(blockTag),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, useBlockStore.getState().allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the block tag in the store
	useBlockStore.getState().updateBlocks({ [blockID]: { ...results.blockInstance, tag: results.blockTag } });
}
