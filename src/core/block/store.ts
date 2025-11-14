import { create } from 'zustand';

// Types
import type { BlockID, BlockInstance, BlockRecord } from '@/src/core/block/instance/types';

// Default
import { DefaultBlocks } from './block-defaults';

export interface BlockStoreProps {
	selectedBlockID: BlockID | null;
	allBlocks: BlockRecord;

	/**
	 * Sets the currently selected block by ID.
	 * Accepts null to clear selection.
	 * Pure data mutation without validation
	 *
	 * @param blockID - The block ID to select or null to clear
	 *
	 * @example
	 * selectBlock('block-123') // Select block
	 * selectBlock(null) // Clear selection
	 */
	selectBlock: (blockID: BlockID | null) => void;

	/**
	 * Updates multiple blocks in the store.
	 * Can be used for adding new blocks or updating existing ones.
	 * Pure data mutation without validation
	 *
	 * @param blocks - Record of blocks to add/update in the store
	 *
	 * @example
	 * updateBlocks({ 'block-123': blockInstance, 'block-456': anotherBlock })
	 */
	updateBlocks: (blocks: Record<BlockID, BlockInstance>) => void;

	/**
	 * Replaces the entire blocks collection in the store.
	 * Pure data mutation without validation
	 * @param blocks - New complete record of blocks to set in the store
	 *
	 * @example
	 * setBlocks({ 'block-123': blockInstance, 'block-456': anotherBlock })
	 */
	setBlocks: (blocks: Record<BlockID, BlockInstance>) => void;
}

/**
 * Creates the block store after initialization.
 * @returns The initialized Zustand store
 */
export function createBlockStore() {
	return create<BlockStoreProps>((set, get) => ({
		// Currently selected block ID
		selectedBlockID: 'body',

		// Collection of all blocks in the store
		allBlocks: DefaultBlocks,

		// Sets the currently selected block by ID
		selectBlock: (blockID) => set({ selectedBlockID: blockID }),

		// Updates multiple blocks in the store
		updateBlocks: (blocks) => {
			set((state) => ({
				allBlocks: {
					...state.allBlocks,
					...blocks,
				},
			}));
		},

		// Replaces the entire blocks collection in the store
		setBlocks: (blocks) => set({ allBlocks: blocks }),
	}));
}

// Export a reference that will be set after initialization
export let useBlockStore: ReturnType<typeof createBlockStore>;

/**
 * Initialize the block store.
 */
export function initializeBlockStore(): Promise<void> {
	return new Promise((resolve) => {
		useBlockStore = createBlockStore();
		resolve();
	});
}
