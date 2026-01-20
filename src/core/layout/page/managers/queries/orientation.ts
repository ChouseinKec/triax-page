// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { OrientationKey, OrientationDefinition } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredOrientations, getRegisteredOrientation, getDefaultOrientationKey } from '@/src/core/layout/page/registries';

/**
 * Gets the currently selected orientation ID from the page store for page queries.
 */
export function getSelectedOrientationKey(): OrientationKey {
	return usePageStore.getState().selected.orientationKey;
}

/**
 * Gets all available orientation instances for page queries.
 */
export function getOrientationDefinitions(): OrientationDefinition[] {
	return Object.values(getRegisteredOrientations());
}

/**
 * Gets a specific orientation definition by its key for page queries.
*/
export function getOrientationDefinition(key: OrientationKey): OrientationDefinition | undefined {
	return getRegisteredOrientation(key);
}

export { getDefaultOrientationKey };
