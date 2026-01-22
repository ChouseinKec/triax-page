import { create } from 'zustand';

// Types
import type { NodeID, NodeInstance, StoredNodes } from '@/core/block/node/instance/types';

// Default
import { DefaultBlocks } from '@/state/block/defaults';

export interface BlockStoreProps {
	selectedNodeID: NodeID | null;
	allBlocks: StoredNodes;

	/**
	 * Sets the currently selected block by ID.
	 * Accepts null to clear selection.
	 * Pure data mutation without validation
	 *
	 * @param NodeID - The block ID to select or null to clear
	 *
	 * @example
	 * selectNode('block-123') // Select block
	 * selectNode(null) // Clear selection
	 */
	selectNode: (NodeID: NodeID | null) => void;

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
	updateBlocks: (blocks: Record<NodeID, NodeInstance>) => void;

	/**
	 * Replaces the entire blocks collection in the store.
	 * Pure data mutation without validation
	 * @param blocks - New complete record of blocks to set in the store
	 *
	 * @example
	 * setBlocks({ 'block-123': blockInstance, 'block-456': anotherBlock })
	 */
	setBlocks: (blocks: Record<NodeID, NodeInstance>) => void;
}

/**
 * Creates the block store after initialization.
 * @returns The initialized Zustand store
 */
export function createNodeStore() {
	return create<BlockStoreProps>((set, get) => ({
		// Currently selected block ID
		selectedNodeID: 'body',

		// Collection of all blocks in the store
		allBlocks: DefaultBlocks,

		// Sets the currently selected block by ID
		selectNode: (NodeID) => set({ selectedNodeID: NodeID }),

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
export let useBlockStore: ReturnType<typeof createNodeStore>;

/**
 * Initialize the block store.
 */
export function initializeBlockStore(): Promise<void> {
	return new Promise((resolve) => {
		useBlockStore = createNodeStore();
		resolve();
	});
}
