import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Types
import type { BlockStoreProps } from './types';
import type { BlockStyleData, BlockInstance, BlockType } from '@/types/block/block';

// Constants
import { BlockStyleDefaults } from '@/constants/block/style';
import { DefaultBlocks } from './default';
function createBlockStyles(): BlockStyleData {
	const defaults = {
		...BlockStyleDefaults,
		all: {
			...BlockStyleDefaults.all,
		},
	};

	return {
		all: {
			all: defaults,
		},
	};
}

function createBlock(type: BlockType, parentBlock?: string): BlockInstance {
	const permittedContent = null;
	const permittedParent = null;

	return {
		id: uuidv4(),
		styles: createBlockStyles(),
		attributes: {},
		parentID: parentBlock ?? null,
		contentIDs: [],
		tag: 'div',
		tags: [],
		permittedContent,
		permittedParent,
		type,
	};
}

/**
 * Zustand hook for accessing and updating the block editor state.
 */
const useBlockStore = create<BlockStoreProps>((set, get) => ({
	/**
	 * The currently selected block ID.
	 */
	selectedBlockID: null,

	/**
	 * A record of all allBlocks with their associated styles.
	 */
	allBlocks: DefaultBlocks,

	/**
	 * Sets the currently selected block by ID.
	 *
	 * @param  blockID - The ID of the block to select.
	 */
	selectBlock: (blockID) => set({ selectedBlockID: blockID }),

	/**
	 * Adds a new block to the editor.
	 *
	 * @param parentID - Optional ID of the parent block to add the new block under.
	 * @returns - The newly created block instance.
	 */
	addBlock: (type, parentID) => {
		set((state) => {
			const newBlock = createBlock(type, parentID);

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
	 * @param blockID - The ID of the block to delete.
	 */
	deleteBlock: (blockID) => {
		set((state) => {
			if (!blockID) return state;

			const block = get().getBlock(blockID);
			if (!block) return state;

			// Create a shallow copy of allBlocks
			const updatedBlocks = { ...state.allBlocks };

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

			return {
				allBlocks: updatedBlocks,
				selectedBlockID,
			};
		});
	},

	/**
	 * Retrieves the block data for a given block ID.
	 *
	 * @param blockID - The ID of the block to retrieve.
	 * @returns - The block data if found, otherwise undefined.
	 */
	getBlock: (blockID) => {
		if (!blockID) return undefined;

		return get().allBlocks[blockID];
	},

	/**
	 * Updates the style object for the currently selected block.
	 *
	 * @param blockID - The ID of the block to update.
	 * @param styles - The updated style object.
	 * @return - The updated block instance with new styles.
	 */
	setBlockStyles: (blockID, styles) => {
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
	 * Sets a specific style property for a specific block.
	 *
	 * @param blockID - The ID of the block to update.
	 * @param device - The device type (e.g., 'desktop', 'mobile').
	 * @param orientation - The orientation (e.g., 'portrait', 'landscape').
	 * @param pseudo - The pseudo-class (e.g., 'default', 'hover', 'active').
	 * @param property - The CSS property to set.
	 * @param value - The value to set for the CSS property.
	 * @return - The updated block instance with the new style property.
	 */
	setBlockStyle: (blockID, device, orientation, pseudo, property, value) => {
		set((state) => {
			if (!blockID) return state;

			const block = get().getBlock(blockID);
			if (!block) return state;

			if (!block.styles) return state;

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
	 * Sets a specific attribute for a specific block.
	 *
	 * @param blockID - The ID of the block to update.
	 * @param attribute - The attribute name to set.
	 * @param value - The value to set for the attribute.
	 */
	setBlockAttribute: (blockID, attribute, value) => {
		set((state) => {
			if (!blockID) return state;

			const block = get().getBlock(blockID);
			if (!block) return state;

			return {
				allBlocks: {
					...state.allBlocks,
					[blockID]: {
						...block,
						attributes: {
							...block.attributes,
							[attribute]: value,
						},
					},
				},
			};
		});
	},
}));

export default useBlockStore;
