// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// React
import { useMemo } from 'react';

// Utilities
import { isBlockDescendant } from '@/src/page-builder/services/helpers/block/hierarchy';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Types
import type { BlockType, BlockID } from '@/src/page-builder/core/block/block/types';

// Helpers
import { validateBlockID } from '@/src/page-builder/services/helpers/validate';

/**
 * Reactive hook to check if a specific block is currently selected.
 * @param blockID - The block identifier to check
 * @returns True if the block is selected, false otherwise
 * @example
 * const isSelected = useIsBlockSelected('block-123'); // true/false
 */
export function useIsBlockSelected(blockID: BlockID): boolean {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[BlockManager → useIsBlockSelected]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);

	return useBlockStore((state) => {
		if (!safeData) return false;
		return state.selectedBlockID === safeData.blockID;
	});
}

/**
 * Reactive hook to get the type of the currently selected block.
 * @returns The selected block type or undefined if no block is selected
 * @example
 * const selectedType = useSelectedBlockType(); // 'text' | undefined
 */
export function useSelectedBlockType(): BlockType | undefined {
	return useBlockStore((state) => {
		const id = state.selectedBlockID;
		if (!id) return undefined;
		return state.getBlock(id)?.type;
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

/**
 * Reactive hook to check if a block contains the currently selected block as a descendant.
 * @param blockID - The block identifier to check
 * @returns True if the block contains the selected block as a descendant
 * @example
 * const hasSelectedContent = useHasBlockSelectedContent('block-123'); // true/false
 */
export function useHasBlockSelectedContent(blockID: BlockID): boolean {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[BlockManager → useHasBlockSelectedContent]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);

	return useBlockStore((state) => {
		if (!safeData) return false;
		
		// If no block is selected or the blockID is the selected one
		const { selectedBlockID } = state;
		if (!selectedBlockID || selectedBlockID === safeData.blockID) return false;

		// If the block doesn't exist
		const currentBlock = state.getBlock(safeData.blockID);
		if (!currentBlock) return false;

		return isBlockDescendant(currentBlock, selectedBlockID, state.allBlocks);
	});
}

/**
 * Gets the currently selected block ID from the store.
 * @returns The selected block ID or null
 * @example
 * const selectedID = getSelectedBlockID(); // 'block-123' | null
 */
export function getSelectedBlockID(): BlockID | null {
	return useBlockStore.getState().selectedBlockID;
}

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

	const safeData = new ValidationPipeline('[BlockManager → selectBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!safeData) return;

	selectBlockAction(safeData.blockID);
}
