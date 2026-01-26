// Types
import type { HighlightedNode } from '@/core/block/node/types/';

// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Helpers
import { pickHighlightedNode } from '@/core/block/node/helpers/pickers';

/**
 * Gets the highlighted text of the currently selected block from the store.
 * @returns The highlighted block text or null
 */
export function getHighlightedNode(): HighlightedNode | undefined {
	// Pick the highlighted node from the store state
	const result = pickHighlightedNode(useBlockStore.getState());
	
	if (result.success) return result.data;
	return undefined;
}
