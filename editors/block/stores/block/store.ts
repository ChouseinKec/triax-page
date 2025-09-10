import { create } from 'zustand';

// Types
import type { BlockStoreProps } from './types';

// Default blocks
import { DefaultBlocks } from './default';

/**
 * Zustand store for block editor state management.
 * Provides pure data operations for blocks, selection, and CRUD operations.
 * All business logic and validation should be handled by managers.
 *
 * @example
 * const { allBlocks, selectBlock, addBlocks } = useBlockStore()
 */
export const useBlockStore = create<BlockStoreProps>((set, get) => ({
	// Currently selected block ID
	selectedBlockID: null,

	// Collection of all blocks in the store
	allBlocks: DefaultBlocks,

	// Memoized array of root blocks (blocks without a parent)
	rootBlocks: Object.values(DefaultBlocks).filter((block) => !block.parentID),

	// Sets the currently selected block by ID
	selectBlock: (blockID) => set({ selectedBlockID: blockID }),

	// Updates multiple blocks in the store
	updateBlocks: (blocks) => {
		set((state) => {
			const newAllBlocks = {
				...state.allBlocks,
				...blocks,
			};
			return {
				allBlocks: newAllBlocks,
			};
		});
	},

	// Updates a single block in the store
	updateBlock: (blockID, block) => {
		set((state) => {
			const newAllBlocks = {
				...state.allBlocks,
				[blockID]: block,
			};
			return {
				allBlocks: newAllBlocks,
			};
		});
	},

	// Deletes blocks from the store
	deleteBlocks: (blockIDs) => {
		set((state) => {
			const updatedBlocks = { ...state.allBlocks };
			let selectedBlockID = state.selectedBlockID;

			blockIDs.forEach((blockID) => {
				if (selectedBlockID === blockID) selectedBlockID = null;
				delete updatedBlocks[blockID];
			});


			return {
				allBlocks: updatedBlocks,
				selectedBlockID,
			};
		});
	},

	// Retrieves all blocks in the store
	getAllBlocks: () => {
		return get().allBlocks;
	},

	// Gets the currently selected block ID
	getSelectedBlockID: () => {
		return get().selectedBlockID;
	},

	// Retrieves a specific attribute value from a block
	getBlockAttribute: (blockID, attribute) => {
		return get().allBlocks[blockID]?.attributes?.[attribute];
	},
}));

export default useBlockStore;
