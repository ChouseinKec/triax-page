// Stores
import { useBlockStore } from '@/src/core/block/store';

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
 * @returns void
 *
 * @example
 * selectBlock('block-123')
 * selectBlock(null)
 */
export function selectBlock(blockID: BlockID | null): void {
	const { selectedBlockID, selectBlock: selectBlockAction } = useBlockStore.getState();

	// If null, clear selection
	if (blockID === null) return selectBlockAction(null);

	// If already selected, do nothing
	if (blockID === selectedBlockID) return;

	const safeData = new ResultPipeline('[BlockCommands → selectBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!safeData) return;

	selectBlockAction(safeData.blockID);
}
