import { useMemo } from 'react';

// Stores
import { useBlockStore } from '@/src/core/block/store';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Types
import type { BlockID, BlockType } from '@/src/core/block/instance/types';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validators';

/**
 * Reactive hook to check if a specific block is currently selected.
 * @param blockID - The block identifier to check
 * @returns True if the block is selected, false otherwise
 * @example
 * const isSelected = useIsBlockSelected('block-123'); // true/false
 */
export function useIsBlockSelected(blockID: BlockID): boolean {
	const safeParam = useMemo(
		() =>
			new ResultPipeline('[BlockQueries → useIsBlockSelected]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);
	if (!safeParam) return false;

	return useBlockStore((state) => state.selectedBlockID === safeParam.blockID);
}

/**
 * Reactive hook to get the type of the currently selected block.
 * @returns The selected block type or undefined if no block is selected
 * @example
 * const selectedType = useSelectedBlockType(); // 'text' | undefined
 */
export function useSelectedBlockType(): BlockType | null {
	return useBlockStore((state) => {
		const selectedBlockID = state.selectedBlockID;
		if (!selectedBlockID) return null;

		const selectedBlock = state.allBlocks[selectedBlockID];
		if (!selectedBlock) return null;

		return selectedBlock.type;
	});
}

/**
 * Reactive hook to get the ID of the currently selected block.
 * @returns The selected block ID or undefined if no block is selected
 * @example
 * const selectedID = useSelectedBlockID(); // 'block-123' | undefined
 */
export function useSelectedBlockID(): BlockID | null {
	return useBlockStore((state) => state.selectedBlockID);
}
