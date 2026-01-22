// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID } from '@/core/block/node/instance/types';

/**
 * Gets the currently selected block ID from the store.
 * @returns The selected block ID or null
 */
export function getSelectedNodeID(): NodeID | null {
	// Return the selected block ID
	return useBlockStore.getState().selectedNodeID;
}
