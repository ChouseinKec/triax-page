// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Helpers
import { pickSelectedNodeID } from '@/core/block/node/helpers/pickers';

/**
 * Gets the currently selected block ID from the store.
 * @returns The selected block ID or null
 */
export function getSelectedNodeID(): NodeID {
	// Pick the selected node ID from the store state
	const result = pickSelectedNodeID(useBlockStore.getState());
	if (result.success) return result.data;

	// Fallback, though it should always succeed
	return 'body'; // or throw error
}
