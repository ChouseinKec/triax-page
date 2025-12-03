// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { OrientationID, OrientationInstance } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredOrientation } from '@/src/core/layout/page/registries';

/**
 * Reactive hook to get the currently selected orientation instance for page queries.
 * Returns the complete orientation object based on the current selection in the page store.
 *
 * @returns The current orientation instance or undefined if not found
 *
 * @example
 * const orientation = useSelectedOrientation() // Returns { id: 'portrait', name: 'Portrait', ... }
 */
export function useSelectedOrientation(): OrientationInstance | undefined {
	const selectedOrientationID = usePageStore((state) => state.selected.orientationID);
	return getRegisteredOrientation(selectedOrientationID);
}

/**
 * Reactive hook to get the currently selected orientation ID for page queries.
 * Returns the orientation identifier from the page store state.
 *
 * @returns The current orientation ID or undefined if not set
 *
 * @example
 * const orientationID = useSelectedOrientationID() // Returns 'portrait' or undefined
 */
export function useSelectedOrientationID(): OrientationID {
	return usePageStore((state) => state.selected.orientationID);
}
