// Stores
import { useBlockStore } from '@/state/block/block';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Types
import type { BlockID, BlockType } from '@/core/block/instance/types';

// Helpers
import { validateBlockID, pickBlockInstance } from '@/core/block/instance/helpers';

/**
 * Reactive hook to check if a specific block is currently selected.
 * @param blockID - The block identifier to check
 * @returns True if the block is selected, false otherwise
 */
export function useIsBlockSelected(blockID: BlockID): boolean {
	// Validate parameters first
	const results = new ResultPipeline('[BlockQueries → useIsBlockSelected]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!results) return false;

	// Return a reactive selection status
	return useBlockStore((state) => state.selectedBlockID === results.blockID);
}

/**
 * Reactive hook to get the type of the currently selected block.
 * @returns The selected block type or undefined if no block is selected
 */
export function useSelectedBlockType(): BlockType | null {
	// Return a reactive block type
	return useBlockStore((state) => {
		// Get the selected block ID
		const selectedBlockID = state.selectedBlockID;
		if (!selectedBlockID) return null;

		// Pick the block instance
		const selectedBlock = pickBlockInstance(selectedBlockID, state.allBlocks);
		if (!selectedBlock.success) return null;

		// Return the block type
		return selectedBlock.data.type;
	});
}

/**
 * Reactive hook to get the ID of the currently selected block.
 * @returns The selected block ID or undefined if no block is selected
 */
export function useSelectedBlockID(): BlockID | null {
	return useBlockStore((state) => state.selectedBlockID);
}
