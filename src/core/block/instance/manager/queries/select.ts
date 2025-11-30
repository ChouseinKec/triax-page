// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';

// Helpers
import { pickSelectedBlock } from '@/src/core/block/instance/helper/pickers';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

/**
 * Gets the currently selected block ID from the store.
 * @returns The selected block ID or null
 * @example
 * const selectedID = getSelectedBlockID(); // 'block-123' | null
 */
export function getSelectedBlockID(): BlockID | null {
	const blockStore = useBlockStore.getState();
	const safeParams = new ResultPipeline('[BlockQueries → getSelectedBlockID]')
		.pick(() => ({
			selectedBlockID: pickSelectedBlock(blockStore.selectedBlockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return null;

	return safeParams.selectedBlockID;
}
