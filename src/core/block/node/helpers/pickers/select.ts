// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { BlockStoreState } from '@/core/block/node/states/store';
import type { PickResult } from '@/shared/types/result';

/**
 * Fetch the selected node ID from the block store state.
 *
 * @param blockStoreState - the block store state
 */
export function pickSelectedNodeID(blockStoreState: BlockStoreState): PickResult<NodeID> {
	// Confirm the selectedNodeID exists
	if (!blockStoreState.selectedNodeID) return { success: false, error: 'Selected node ID is not defined in the store state' };

	// Selected node ID is always defined in the store
	return { success: true, data: blockStoreState.selectedNodeID };
}
