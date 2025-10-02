// Stores
import { usePageStore } from '@/src/page-builder/state/stores/page';

// Types
import type { OrientationID, OrientationInstance } from '@/src/page-builder/core/page/types/orientation';

// Registry
import { getRegisteredOrientations, getRegisteredOrientation } from '@/src/page-builder/state/registries/page';

// Utilities
import { validateOrLog } from '@/src/shared/utilities/validation';

// Helpers
import { validateOrientationID } from '@/src/page-builder/services/helpers/page/orientation';

/**
 * Reactive hook to get the currently selected orientation instance for page management operations.
 * Returns the complete orientation object based on the current selection in the page store.
 *
 * @returns The current orientation instance or undefined if not found
 *
 * @example
 * const orientation = useSelectedOrientation() // Returns { id: 'portrait', name: 'Portrait', ... }
 */
export function useSelectedOrientation(): OrientationInstance | undefined {
	const selectedOrientationID = usePageStore((state) => state.selectedOrientationID);
	return getRegisteredOrientation(selectedOrientationID);
}

/**
 * Reactive hook to get the currently selected orientation ID for page management operations.
 * Returns the orientation identifier from the page store state.
 *
 * @returns The current orientation ID or undefined if not set
 *
 * @example
 * const orientationID = useSelectedOrientationID() // Returns 'portrait' or undefined
 */
export function useSelectedOrientationID(): OrientationID | undefined {
	return usePageStore((state) => state.selectedOrientationID);
}

/**
 * Gets the currently selected orientation ID from the page store for page management operations.
 * Returns the orientation identifier from the current store state.
 *
 * @returns The current orientation ID or undefined if not set
 *
 * @example
 * const orientationID = getSelectedOrientationID() // Returns 'portrait' or undefined
 */
export function getSelectedOrientationID(): OrientationID | undefined {
	const selectedOrientationID = usePageStore.getState().getSelectedOrientationID();
	const orientation = getRegisteredOrientation(selectedOrientationID);
	return orientation?.id;
}

/**
 * Sets the currently selected orientation by ID for page management operations.
 * Updates the page store with the new orientation selection.
 *
 * @param orientationID - The orientation ID to set as current
 * @returns void
 *
 * @example
 * setSelectedOrientationID('portrait') // Sets current orientation to portrait
 */
export function setSelectedOrientationID(orientationID: OrientationID): void {
	const safeParams = validateOrLog({ orientationID: validateOrientationID(orientationID) }, `[PageManager → setSelectedOrientationID]`);
	if (!safeParams) return;

	usePageStore.getState().setSelectedOrientationID(safeParams.orientationID);
}

/**
 * Gets all available orientation instances for page management operations.
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

/**
 * Gets the default orientation ID for page management operations.
 * Returns the hardcoded default orientation identifier used as fallback.
 *
 * @returns The default orientation ID string
 *
 * @example
 * const defaultID = getOrientationDefaultID() // Returns 'all'
 */
export function getOrientationDefaultID(): string {
	return 'all';
}
