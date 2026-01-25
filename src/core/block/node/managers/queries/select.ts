// Stores
import { useBlockStore } from '@/core/block/node/states/store';
import type { HighlightedNodeText } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

/**
 * Gets the currently selected block ID from the store.
 * @returns The selected block ID or null
 */
export function getSelectedNodeID(): NodeID | null {
	// Return the selected block ID
	return useBlockStore.getState().selectedNodeID;
}

/**
 * Gets the highlighted text of the currently selected block from the store.
 * @returns The highlighted block text or null
 */
export function getHighlightedNodeText(): HighlightedNodeText {
	// Return the highlighted block text
	return useBlockStore.getState().highlightedNodeText;
}
