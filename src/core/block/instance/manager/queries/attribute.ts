// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';

// Helpers
import { pickBlockAttributes, renderBlockAttributes, validateBlockID } from '@/src/core/block/instance/helper';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

/**
 * Reactive hook to get rendered HTML attributes for a block in block rendering operations.
 * Processes block attributes for HTML rendering with any necessary transformations.
 *
 * @param blockID - The block identifier
 */
export function getBlockRenderedAttributes(blockID: BlockID): Record<string, string | boolean> | undefined {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → getBlockRenderedAttributes]')
		.validate({ blockID: validateBlockID(blockID) })
		.pick((data) => ({
			attributes: pickBlockAttributes(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return undefined;

	// Render and return the block attributes
	return renderBlockAttributes(results.attributes);
}
