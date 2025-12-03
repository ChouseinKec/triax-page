// Stores
import { useBlockStore } from '@/src/state/block/block';

// Types
import type { BlockID } from '@/src/core/block/instance/types';

/**
 * Gets the currently selected block ID from the store.
 * @returns The selected block ID or null
 */
export function getSelectedBlockID(): BlockID | null {
	// Return the selected block ID
	return useBlockStore.getState().selectedBlockID;
}
