// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Utilities
import { isBlockDescendant } from '@/src/page-builder/core/block/block/utilities';
import { validateOrLog } from '@/src/shared/utilities/validation';

// Types
import type { BlockType, BlockID } from '@/src/page-builder/core/block/block/types';

// Helpers
import { validateBlockID } from '@/src/page-builder/services/helpers/block/validation';

/**
 * Reactive hook to check if a specific block is currently selected.
 * @param blockID - The block identifier to check
 * @returns True if the block is selected, false otherwise
 * @example
 * const isSelected = useIsBlockSelected('block-123'); // true/false
 */
export function useIsBlockSelected(blockID: BlockID): boolean {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useIsBlockSelected]`);
	if (!safeParams) return false;

	return useBlockStore((state) => state.selectedBlockID === safeParams.blockID);
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
	return useBlockStore((state) => state.selectedBlockID || null);
}

/**
 * Reactive hook to check if a block contains the currently selected block as a descendant.
 * @param blockID - The block identifier to check
 * @returns True if the block contains the selected block as a descendant
 * @example
 * const hasSelectedContent = useHasBlockSelectedContent('block-123'); // true/false
 */
export function useHasBlockSelectedContent(blockID: BlockID): boolean {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useHasBlockSelectedContent]`);
	if (!safeParams) return false;

	return useBlockStore((state) => {
		const selectedBlockID = state.selectedBlockID;
		if (!selectedBlockID || selectedBlockID === safeParams.blockID) return false;

		const currentBlock = state.getBlock(safeParams.blockID);
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
	const store = useBlockStore.getState();
	if (blockID === null) return store.selectBlock(null);

	const selectedBlockID = store.selectedBlockID;
	if (blockID === selectedBlockID) return;

	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → selectBlock]`);
	if (!safeParams) return;

	store.selectBlock(safeParams.blockID);
}
