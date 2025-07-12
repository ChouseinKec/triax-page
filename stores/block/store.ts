import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Types
import type { BlockEditorStoreProps } from './types';
import type { BlockStyleData, BlockData } from '@/types/block/block';

function createBlockDefaultStyles(): BlockStyleData {
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

	const devices = {
		default: emptyOrientation,
		mobile: emptyOrientation,
		tablet: emptyOrientation,
		desktop: emptyOrientation,
	};

	return devices;
}

function createDefaultBlock(parentBlock: string | null): BlockData {
	return {
		id: uuidv4(),
		styles: createBlockDefaultStyles(),
		parent: parentBlock,
		children: [],
	};
}

/**
 * Zustand hook for accessing and updating the block editor state.
 */
const useBlockStore = create<BlockEditorStoreProps>((set, get) => ({
	/**
	 * The currently selected block ID.
	 */
	selectedBlock: null,

	/**
	 * A record of all allBlocks with their associated styles.
	 */
	allBlocks: {},

	/**
	 * Sets the currently selected block by ID.
	 *
	 * @param {string} id - The ID of the block to select.
	 */
	setSelected: (blockID: string): void => set({ selectedBlock: blockID }),

	getSelected: (): string | null => get().selectedBlock ?? null,

	getBlock: (blockID: string): BlockData | undefined => {
		if (!blockID) return undefined;

		return get().allBlocks[blockID];
	},

	/**
	 * Updates the style object for the currently selected block.
	 *
	 * @param {BlockStyleData} styles - The updated style object.
	 */
	setBlockStyles: (blockID: string, styles: BlockStyleData): void => {
		set((state) => {
			if (!blockID) return state; // Return unchanged state if invalid

			const block = get().getBlock(blockID);
			if (!block) return state; // Return unchanged state if invalid

			return {
				allBlocks: {
					...state.allBlocks,
					[blockID]: {
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
	 * @returns {BlockStyleData | null} - The current style object, or null if no block is selected.
	 */
	getBlockStyles: (blockID: string): BlockStyleData | undefined => {
		const block = get().getBlock(blockID);
		if (!block) return undefined;

		return block.styles;
	},

	setBlockStyle: (blockID: string, device: string, orientation: string, pseudo: string, property: string, value: string): void => {
		set((state) => {
			if (!blockID) return state;

			const block = get().getBlock(blockID);
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
				allBlocks: {
					...state.allBlocks,
					[blockID]: {
						...block,
						styles: updatedStyles,
					},
				},
			};
		});
	},

	addBlock: (parentID?: string): void =>
		set((state) => {
			const newBlock = createDefaultBlock(parentID ?? null);

			return {
				allBlocks: {
					...state.allBlocks,
					[newBlock.id]: newBlock,
				},
				selectedBlock: newBlock.id, // Automatically select the new block
			};
		}),
}));

export default useBlockStore;
