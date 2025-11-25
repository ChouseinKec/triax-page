// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';

// Helpers
import { fetchBlockAttributes, renderBlockAttributes, validateBlockID } from '@/src/core/block/instance/helper';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/pipeline/validation';

/**
 * Reactive hook to get rendered HTML attributes for a block in block rendering operations.
 * Processes block attributes for HTML rendering with any necessary transformations.
 *
 * @param blockID - The block identifier
 * @returns Rendered attributes object or undefined if block doesn't exist or has no attributes
 *
 * @example
 * getBlockRenderedAttributes('block-123') → { class: 'my-class', id: 'block-123' }
 */
export function getBlockRenderedAttributes(blockID: BlockID): Record<string, string | boolean> | undefined {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockRenderedAttributes]')
		.validate({ blockID: validateBlockID(blockID) })
		.fetch((data) => ({
			attributes: fetchBlockAttributes(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return undefined;

	return renderBlockAttributes(safeParams.attributes);
}
