// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';

// Helpers
import { fetchSelectedBlock } from '@/src/core/block/instance/helper/fetch';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

/**
 * Gets the currently selected block ID from the store.
 * @returns The selected block ID or null
 * @example
 * const selectedID = getSelectedBlockID(); // 'block-123' | null
 */
export function getSelectedBlockID(): BlockID | null {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getSelectedBlockID]')
		.fetch(() => ({
			selectedBlockID: fetchSelectedBlock(blockStore.selectedBlockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return null;

	return safeParams.selectedBlockID;
}
