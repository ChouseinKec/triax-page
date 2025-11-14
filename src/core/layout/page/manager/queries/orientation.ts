// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { OrientationID, OrientationInstance } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredOrientations } from '@/src/core/layout/page/registry';

/**
 * Gets the currently selected orientation ID from the page store for page queries.
 * Returns the orientation identifier from the current store state.
 *
 * @returns The current orientation ID or undefined if not set
 *
 * @example
 * const orientationID = getSelectedOrientationID() // Returns 'portrait' or undefined
 */
export function getSelectedOrientationID(): OrientationID {
	return usePageStore.getState().selectedOrientationID;
}

/**
 * Gets all available orientation instances for page queries.
 * Returns an array of all registered orientation definitions from the registry.
 *
 * @returns Array of all orientation instances
 *
 * @example
 * const orientations = getAllOrientations() // Returns [{ id: 'all', name: 'All' }, { id: 'portrait', name: 'Portrait' }, ...]
 */
export function getAllOrientations(): OrientationInstance[] {
	return Object.values(getRegisteredOrientations());
}
