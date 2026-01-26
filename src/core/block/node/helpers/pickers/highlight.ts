// Types
import type { HighlightedNode } from '@/core/block/node/types/instance';
import type { PickResult } from '@/shared/types/result';
import type { BlockStoreState } from '@/core/block/node/states/store';

/**
 * Fetch the highlighted node from the block store state.
 *
 * @param blockStoreState - the block store state
 */
export function pickHighlightedNode(blockStoreState: BlockStoreState): PickResult<HighlightedNode> {
	// 	Check if highlightedNode is undefined
	if (blockStoreState.highlightedNode === undefined) return { success: false, error: 'Highlighted node data is undefined in the store.' };

	// Return the highlightedNode data
	return { success: true, data: blockStoreState.highlightedNode };
}
