// Types
import type { HighlightedNode } from '@/core/block/node/types/instance';
import type { PickResult } from '@/shared/types/result';
import type { BlockStoreState } from '@/core/block/node/states/store';

/**
 * Fetch the currently highlighted node from the block store state.
 *
 * This function retrieves the highlight information that represents the currently
 * selected or highlighted text range within the editor. The highlight data includes
 * the node ID, element key, selected text, and offset positions.
 *
 * @param blockStoreState - The current state of the block store containing highlight information
 * @returns A PickResult containing the highlighted node data or an error if no highlight is active
 */
export function pickHighlightedNode(blockStoreState: BlockStoreState): PickResult<HighlightedNode> {
	// 	Check if highlightedNode is undefined
	if (blockStoreState.highlightedNode === undefined) return { success: false, error: 'Highlighted node data is undefined in the store.' };

	// Return the highlightedNode data
	return { success: true, data: blockStoreState.highlightedNode };
}
