// Stores
import { useBlockStore } from '@/src/state/block/block';

// Types
import type { BlockID } from '@/src/core/block/instance/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper';

/**
 * Selects a block as the currently active block for editing in block CRUD operations.
 * Sets the selected block ID in the store.
 *
 * @param blockID - The block identifier to select, or null to clear selection
 */
export function selectBlock(blockID: BlockID | null): void {
	const blockStore = useBlockStore.getState();

	// If null, clear selection
	if (blockID === null) return blockStore.selectBlock(null);

	// If already selected, do nothing
	if (blockID === blockStore.selectedBlockID) return;

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockCommands → selectBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!results) return;

	// Select the block in the store
	blockStore.selectBlock(results.blockID);
}
