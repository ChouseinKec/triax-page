// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { BlockStoreState } from '@/core/block/node/states/store';
import type { PickResult } from '@/shared/types/result';

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
export function pickSelectedNodeID(blockStoreState: BlockStoreState): PickResult<NodeID> {
	// Confirm the selectedNodeID exists
	if (!blockStoreState.selectedNodeID) return { success: false, error: 'Selected node ID is not defined in the store state' };

	// Selected node ID is always defined in the store
	return { success: true, data: blockStoreState.selectedNodeID };
}
