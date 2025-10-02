import { create } from 'zustand';

// Types
import type { BlockID, BlockInstance, BlockRecord } from '@/src/page-builder/core/block/block/types';

// Default
import { DefaultBlocks } from './block-defaults';

// Utilities
import { findBlockDescendants } from '@/src/page-builder/core/block/block/utilities';

export interface BlockStoreProps {
	selectedBlockID: BlockID | null;
	allBlocks: BlockRecord;
	deletionQueue: BlockID[];

	/**
	 * Retrieves a single block instance from the store.
	 *
	 * @param blockID - The ID of the block to retrieve.
	 * @returns The block instance if found, otherwise undefined.
	 *
	 * @example
	 * const block = getBlock('block-123');
	 */
	getBlock: (blockID: BlockID) => BlockInstance | undefined;

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
	 * Updates a single block in the store.
	 * Pure data mutation without validation
	 *
	 * @param blockID - The block ID to update
	 * @param block - Complete updated block instance
	 *
	 * @example
	 * updateBlock('block-123', updatedBlockInstance)
	 */
	updateBlock: (blockID: BlockID, block: BlockInstance) => void;

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
	 * Adds a new block to the store.
	 * Handles parent-child relationships automatically.
	 * Pure data mutation without validation
	 *
	 * @param block - The block instance to add
	 *
	 * @example
	 * addBlock(blockInstance)
	 */
	addBlock: (block: BlockInstance) => void;

	/**
	 * Queues a block for deferred deletion.
	 * Combines queuing and deletion logic for clean React unmounting.
	 *
	 * @param blockID - The block ID to queue for deletion
	 *
	 * @example
	 * deleteBlock('block-123')
	 */
	deleteBlock: (blockID: BlockID) => void;

	/**
	 * Processes all queued deletions.
	 * Called automatically after a delay to allow React unmounting.
	 *
	 * @example
	 * processDeletionQueue()
	 */
	processDeletionQueue: () => void;
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

		// Deletion queue for deferred deletion
		deletionQueue: [],

		// Retrieves a single block instance from the store
		getBlock: (blockID) => get().allBlocks[blockID],

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

		// Adds a new block to the store with parent-child relationship handling
		addBlock: (block) => {
			set((state) => {
				const newAllBlocks = {
					...state.allBlocks,
					[block.id]: block,
				};

				// If block has a parent, update parent's contentIDs
				if (block.parentID) {
					const parentBlock = newAllBlocks[block.parentID];
					if (parentBlock) {
						newAllBlocks[block.parentID] = {
							...parentBlock,
							contentIDs: [...parentBlock.contentIDs, block.id],
						};
					}
				}

				return {
					allBlocks: newAllBlocks,
				};
			});
		},

		// Updates a single block in the store
		updateBlock: (blockID, block) => {
			set((state) => ({
				allBlocks: {
					...state.allBlocks,
					[blockID]: block,
				},
			}));
		},

		// Queue a block for deletion
		deleteBlock: (blockID: BlockID) => {
			set((state) => {
				const blockToDelete = state.allBlocks[blockID];
				if (!blockToDelete) return state;

				const updatedBlocks = { ...state.allBlocks };

				// If block has a parent, remove it from parent's contentIDs
				if (blockToDelete.parentID) {
					const parentBlock = updatedBlocks[blockToDelete.parentID];
					if (parentBlock) {
						updatedBlocks[blockToDelete.parentID] = {
							...parentBlock,
							contentIDs: parentBlock.contentIDs.filter((childID: BlockID) => childID !== blockID),
						};
					}
				}

				return {
					allBlocks: updatedBlocks,
					deletionQueue: [...state.deletionQueue, blockID],
				};
			});

			// Process queue after delay to allow React unmounting
			setTimeout(() => {
				get().processDeletionQueue();
			}, 100);
		},

		// Process all queued deletions
		processDeletionQueue: () => {
			set((state) => {
				if (state.deletionQueue.length === 0) return state;

				const blocksToDelete = [...state.deletionQueue];
				const updatedBlocks = { ...state.allBlocks };
				let selectedBlockID = state.selectedBlockID;

				// Get all descendants for each queued block
				const allBlocksToDelete = new Set<BlockID>();
				blocksToDelete.forEach((blockID) => {
					allBlocksToDelete.add(blockID);
					// Add all descendants
					const descendants = findBlockDescendants([blockID], state.allBlocks);
					descendants.forEach((descendantId: BlockID) => allBlocksToDelete.add(descendantId));
				});

				// Delete all blocks
				allBlocksToDelete.forEach((blockID) => {
					if (selectedBlockID === blockID) selectedBlockID = null;
					delete updatedBlocks[blockID];
				});

				return {
					allBlocks: updatedBlocks,
					selectedBlockID,
					deletionQueue: [],
				};
			});
		},
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
