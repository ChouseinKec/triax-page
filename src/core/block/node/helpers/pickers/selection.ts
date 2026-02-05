// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { NodeStoreState } from '@/core/block/node/states/store';
import type { PickResult } from '@/shared/types/result';
import type { NodeHighlight } from '@/core/block/node/types/instance';

/**
 * Validate and fetch the block store state structure.
 *
 * This function checks that the provided block store state conforms to the expected
 * structure for managing block nodes, including properties like selectedNodeID
 * and highlightedNode. It ensures that the state can be safely used in further
 * operations without risking runtime errors due to malformed data.
 *
 * @param blockStoreState - The current state of the block store to validate
 * @returns A PickResult containing the validated block store state or an error if invalid
 */
export function pickNodeStoreState(blockStoreState: NodeStoreState): PickResult<NodeStoreState> {
	// Validate the block store state structure
	if (typeof blockStoreState !== 'object' || blockStoreState === null || !('selectedNodeID' in blockStoreState)) return { success: false, error: 'Invalid block store state structure' };

	// Return the validated block store state
	return { success: true, data: blockStoreState };
}

/**
 * Fetch the currently selected node ID from the block store state.
 *
 * This function retrieves the identifier of the node that is currently selected
 * in the editor interface. The selected node is the one that receives focus for
 * editing operations and user interactions.
 *
 * @param blockStoreState - The current state of the block store containing selection information
 * @returns A PickResult containing the selected node ID or an error if no node is selected
 */
export function pickSelectedNodeID(blockStoreState: NodeStoreState): PickResult<NodeID> {
	// Confirm the selectedNodeID exists
	if (!blockStoreState.selectedNodeID) return { success: false, error: 'Selected node ID is not defined in the store state' };

	// Selected node ID is always defined in the store
	return { success: true, data: blockStoreState.selectedNodeID };
}

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
export function pickHighlightedNode(blockStoreState: NodeStoreState): PickResult<NodeHighlight> {
	// 	Check if highlightedNode is undefined
	if (blockStoreState.highlightedNode === undefined) return { success: false, error: 'Highlighted node data is undefined in the store.' };

	// Return the highlightedNode data
	return { success: true, data: blockStoreState.highlightedNode };
}
