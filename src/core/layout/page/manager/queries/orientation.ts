// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { OrientationID, OrientationInstance } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredOrientations } from '@/src/core/layout/page/registry';

// Constants
import { DEFAULT_ORIENTATION_ID } from '@/src/core/layout/page/constants';

/**
 * Gets the currently selected orientation ID from the page store for page queries.
 */
export function getSelectedOrientationID(): OrientationID {
	return usePageStore.getState().selected.orientationID;
}

/**
 * Gets all available orientation instances for page queries.
 */
export function getAllOrientations(): OrientationInstance[] {
	return Object.values(getRegisteredOrientations());
}

/**
 * Gets the default orientation ID used for page layout and style fallbacks.
 */
export function getDefaultOrientationID(): OrientationID {
	return DEFAULT_ORIENTATION_ID;
}
