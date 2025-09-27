// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Utilities
import { isBlockDescendant } from '@/src/page-builder/core/block/block/utilities';

// Types
import type { BlockTypes, BlockID } from '@/src/page-builder/core/block/block/types';

/**
 * Reactive hook to check if a specific block is currently selected.
 * @param blockID - The block identifier to check
 * @returns True if the block is selected, false otherwise
 * @example
 * const isSelected = useIsBlockSelected('block-123'); // true/false
 */
export function useIsBlockSelected(blockID: BlockID): boolean {
	return useBlockStore((state) => state.selectedBlockID === blockID);
}

/**
 * Reactive hook to get the type of the currently selected block.
 * @returns The selected block type or undefined if no block is selected
 * @example
 * const selectedType = useSelectedBlockType(); // 'text' | undefined
 */
export function useSelectedBlockType(): BlockTypes | undefined {
	return useBlockStore((state) => {
		const id = state.selectedBlockID;
		if (!id) return undefined;
		return state.allBlocks[id]?.type;
	});
}

/**
 * Reactive hook to get the ID of the currently selected block.
 * @returns The selected block ID or undefined if no block is selected
 * @example
 * const selectedID = useSelectedBlockID(); // 'block-123' | undefined
 */
export function useSelectedBlockID(): BlockID | undefined {
	return useBlockStore((state) => state.selectedBlockID || undefined);
}

/**
 * Reactive hook to check if a block contains the currently selected block as a descendant.
 * @param blockID - The block identifier to check
 * @returns True if the block contains the selected block as a descendant
 * @example
 * const hasSelectedContent = useHasBlockSelectedContent('block-123'); // true/false
 */
export function useHasBlockSelectedContent(blockID: BlockID): boolean {
	return useBlockStore((state) => {
		const selectedBlockID = state.selectedBlockID;
		if (!selectedBlockID || selectedBlockID === blockID) return false;

		const currentBlock = state.allBlocks[blockID];
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
