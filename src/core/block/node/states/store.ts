import { create } from 'zustand';

// Types
import type { NodeID, StoredNodes } from '@/core/block/node/types/instance';

// Default
import { DefaultBlocks } from '@/core/block/node/states/defaults';

export type BlockStoreData = {
	global: {};
};

export type HighlightedNodeText = {
	text: string;
	startOffset: number;
	endOffset: number;
} | null;

export interface BlockStoreProps {
	data: BlockStoreData;
	storedNodes: StoredNodes;
	selectedNodeID: NodeID;
	highlightedNodeText: HighlightedNodeText;
}

/**
 * Creates the block store after initialization.
 * @returns The initialized Zustand store
 */
export function createNodeStore() {
	return create<BlockStoreProps>((set, get) => ({
		// Data structure
		data: {
			global: {},
		},

		storedNodes: DefaultBlocks,
		selectedNodeID: 'body',
		highlightedNodeText: null,
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
