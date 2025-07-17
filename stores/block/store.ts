import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Types
import type { BlockEditorStoreProps } from './types';
import type { BlockStyleData, BlockData } from '@/types/block/block';
import type { BlockTagKeys } from '@/types/block/tag';

// Constants
import { BlockStyleDefaults } from '@/constants/block/style';
import { BlockTagDefinitions } from '@/constants/block/tag';

function createBlockDefaultStyles(): BlockStyleData {
	const defaults = {
		...BlockStyleDefaults,
		default: {
			...BlockStyleDefaults.default,
		},
	};

	const pseudos = {
		default: {},
		active: {},
		hover: {},
	};

	const orientations = {
		default: pseudos,
		portrait: pseudos,
		landscape: pseudos,
	};

	const devices = {
		default: {
			default: defaults,
			portrait: pseudos,
			landscape: pseudos,
		},
		mobile: orientations,
		tablet: orientations,
		desktop: orientations,
	};

	return devices;
}

function createDefaultBlock(tag: BlockTagKeys, parentBlock?: string): BlockData {
	const permittedContent = BlockTagDefinitions[tag]?.permittedContent || [];
	const permittedParent = BlockTagDefinitions[tag]?.permittedParent || [];

	return {
		id: uuidv4(),
		styles: createBlockDefaultStyles(),
		parentID: parentBlock ?? null,
		contentIDs: [],
		tag,
		permittedContent,
		permittedParent,
	};
}

const defaultBlocks = {
	'dc829b55-db25-432b-a835-9d1c8515b310': {
		id: 'dc829b55-db25-432b-a835-9d1c8515b310',
		styles: createBlockDefaultStyles(),
		parentID: null,
		contentIDs: [],
		tag: 'div',
		permittedContent: BlockTagDefinitions.div?.permittedContent || [],
		permittedParent: [],
	} as BlockData,
};

/**
 * Zustand hook for accessing and updating the block editor state.
 */
const useBlockStore = create<BlockEditorStoreProps>((set, get) => ({
	/**
	 * The currently selected block ID.
	 */
	selectedBlockID: 'dc829b55-db25-432b-a835-9d1c8515b310',

	/**
	 * A record of all allBlocks with their associated styles.
	 */
	allBlocks: defaultBlocks,

	/**
	 * Sets the currently selected block by ID.
	 *
	 * @param {string} id - The ID of the block to select.
	 */
	selectBlock: (blockID: string): void => set({ selectedBlockID: blockID }),

	/**
	 * Retrieves the block data for a given block ID.
	 *
	 * @param {string} blockID - The ID of the block to retrieve.
	 * @returns {BlockData | undefined} - The block data if found, otherwise undefined.
	 */
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
	 * Sets a specific style property for the currently selected block.
	 *
	 * @param {string} blockID - The ID of the block to update.
	 * @param {string} device - The device type (e.g., 'desktop', 'mobile').
	 * @param {string} orientation - The orientation (e.g., 'portrait', 'landscape').
	 * @param {string} pseudo - The pseudo-class (e.g., 'default', 'hover', 'active').
	 * @param {string} property - The CSS property to set.
	 * @param {string} value - The value to set for the CSS property.
	 */
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

	/**
	 * Adds a new block to the editor.
	 *
	 * @param parentID - Optional ID of the parent block to add the new block under.
	 * @returns
	 */
	addBlock: (tag: BlockTagKeys, parentID?: string): void => {
		set((state) => {
			const newBlock = createDefaultBlock(tag, parentID);

			// If a parent ID is provided, add the new block to the parent's children
			if (parentID) {
				const parentBlock = get().getBlock(parentID);
				if (parentBlock) {
					parentBlock.contentIDs.push(newBlock.id);
				}
			}

			// Optionally, you can select the new block after adding it
			// get().selectBlock(newBlock.id);

			// Add the new block to the allBlocks state
			return {
				allBlocks: {
					...state.allBlocks,
					[newBlock.id]: newBlock,
				},
			};
		});
	},

	/**
	 * Deletes a block from the editor.
	 *
	 * @param {string} blockID - The ID of the block to delete.
	 */
	deleteBlock: (blockID: string): void => {
		set((state) => {
			if (!blockID) return state;

			const block = get().getBlock(blockID);
			if (!block) return state;

			// Create a shallow copy of allBlocks
			let updatedBlocks = { ...state.allBlocks };

			// Remove this block from its parent's children array (immutably)
			if (block.parentID) {
				const parentBlock = updatedBlocks[block.parentID];
				if (parentBlock) {
					updatedBlocks[block.parentID] = {
						...parentBlock,
						contentIDs: parentBlock.contentIDs.filter((childID) => childID !== blockID),
					};
				}
			}

			// Remove all children recursively
			const removeChildren = (childrenIDs: string[]) => {
				childrenIDs.forEach((childID) => {
					const childBlock = updatedBlocks[childID];
					if (childBlock) {
						if (childBlock.contentIDs && childBlock.contentIDs.length > 0) {
							removeChildren(childBlock.contentIDs);
						}
						delete updatedBlocks[childID];
					}
				});
			};

			if (block.contentIDs && block.contentIDs.length > 0) {
				removeChildren(block.contentIDs);
			}

			// Delete the block itself
			delete updatedBlocks[blockID];

			// If the deleted block was selected, clear selection
			const selectedBlockID = state.selectedBlockID === blockID ? null : state.selectedBlockID;

			if (Object.keys(updatedBlocks).length === 0) {
				updatedBlocks = defaultBlocks;
			}

			return {
				allBlocks: updatedBlocks,
				selectedBlockID,
			};
		});
	},
}));

export default useBlockStore;
