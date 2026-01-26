import { create } from 'zustand';

// Types
import type { NodeID, StoredNodes, HighlightedNode } from '@/core/block/node/types/instance';

// Default
import { DefaultBlocks } from '@/core/block/node/states/defaults';

type BlockStoreData = {
	global: {};
};

interface BlockStoreProps {
	data: BlockStoreData;
	storedNodes: StoredNodes;
	selectedNodeID: NodeID;
	highlightedNode: HighlightedNode;
}

export interface BlockStoreState extends BlockStoreProps {}

/**
 * Creates the block store after initialization.
 * @returns The initialized Zustand store
 */
export function createBlockStore() {
	return create<BlockStoreProps>((set, get) => ({
		// Data structure
		data: {
			global: {},
		},

		storedNodes: DefaultBlocks,
		selectedNodeID: 'body',
		highlightedNode: null,
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
