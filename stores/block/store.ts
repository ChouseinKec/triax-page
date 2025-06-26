import { create } from 'zustand';

// Types
import { BLOCK_EDITOR_STORE, STYLE, BLOCK } from './types';

// Stores

// Helper function to create consistent block structure
function createDefaultBlock(id: string): BLOCK {
	const emptyPseudo = {
		default: {},
		active: {},
		hover: {},
	};

	const emptyOrientation = {
		default: emptyPseudo,
		portrait: emptyPseudo,
		landscape: emptyPseudo,
	};

	return {
		id,
		styles: {
			default: emptyOrientation,
			mobile: emptyOrientation,
			tablet: emptyOrientation,
			desktop: emptyOrientation,
		},
	};
}

/**
 * Zustand hook for accessing and updating the block editor state.
 */
const useBlockStore = create<BLOCK_EDITOR_STORE>((set, get) => ({
	/**
	 * The currently selected block ID.
	 */
	selectedBlock: '1',

	/**
	 * A record of all blocks with their associated styles.
	 */
	blocks: {
		1: createDefaultBlock('1'),
		2: createDefaultBlock('2'),
	},

	/**
	 * Sets the currently selected block by ID.
	 *
	 * @param {string} id - The ID of the block to select.
	 */
	setSelected: (id: string): void => set({ selectedBlock: id }),

	getSelected: (): string | null => get().selectedBlock ?? null,

	getBlock: (id?: string): BLOCK | null => {
		const _id = id ?? get().selectedBlock;
		return _id ? get().blocks[_id] ?? null : null;
	},

	/**
	 * Updates the style object for the currently selected block.
	 *
	 * @param {STYLE} styles - The updated style object.
	 */
	setBlockStyles: (styles: STYLE, id?: string): void => {
		set((state) => {
			const _id = id ?? state.selectedBlock;
			if (!_id) return state; // Return unchanged state if invalid

			const block = _id ? state.blocks[_id] : null;

			if (!block) return state; // Return unchanged state if invalid

			return {
				blocks: {
					...state.blocks,
					[_id]: {
						...block,
						styles,
					},
				},
			};
		});
	},

	/**
	 * Retrieves the style object of the currently selected block.
	 *
	 * @returns {STYLE | null} - The current style object, or null if no block is selected.
	 */
	getBlockStyles: (id?: string): STYLE | null => {
		const _id = id ?? get().selectedBlock;
		if (!_id) return null;
		return get().blocks[_id]?.styles ?? null;
	},

	setBlockStyle: (device: string, orientation: string, pseudo: string, property: string, value: string, id: string): void => {
		set((state) => {
			const blockId = id ?? state.selectedBlock;
			if (!blockId) return state;

			const block = state.blocks[blockId];
			if (!block) return state;

			const updatedStyles = {
				...block.styles,
				[device]: {
					...block.styles[device],
					[orientation]: {
						...block.styles[device]?.[orientation],
						[pseudo]: {
							...block.styles[device]?.[orientation]?.[pseudo],
							[property]: value,
						},
					},
				},
			};

			return {
				blocks: {
					...state.blocks,
					[blockId]: {
						...block,
						styles: updatedStyles,
					},
				},
			};
		});
	},
}));

export default useBlockStore;
