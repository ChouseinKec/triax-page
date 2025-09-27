import { useMemo } from 'react';

// Stores
import { usePageStore } from '@/src/page-builder/state/stores/page';

// Types
import type { OrientationID, OrientationInstance } from '@/src/page-builder/core/page/types/orientation';

// Registry
import { getRegisteredOrientations, getRegisteredOrientation } from '@/src/page-builder/state/registries/page';

/**
 * Reactive hook to get the current orientation.
 * @returns The current orientation object
 * @example
 * const orientation = useSelectedOrientation(); // { id: 'all', name: 'all', value: 'all' }
 */
export function useSelectedOrientation(): OrientationInstance | undefined {
	const selectedOrientationID = usePageStore((state) => state.selectedOrientationID);
	return getRegisteredOrientation(selectedOrientationID);
}

/**
 * Gets the current orientation synchronously.
 * @returns The current orientation object
 * @example
 * const orientation = getSelectedOrientation(); // { id: 'all', name: 'all', value: 'all' }
 */
export function getSelectedOrientation(): OrientationInstance | undefined {
	const selectedOrientationID = usePageStore.getState().selectedOrientationID;
	return getRegisteredOrientation(selectedOrientationID);
}

/**
 * Reactive hook to get the current orientation ID.
 * @returns The current orientation ID
 * @example
 * const orientationID = useSelectedOrientationID(); // 'all'
 */
export function useSelectedOrientationID(): OrientationID | undefined {
	return usePageStore((state) => state.selectedOrientationID);
}

/**
 * Gets the current orientation ID.
 * @returns The current orientation ID
 * @example
 * const orientationID = getSelectedOrientationID(); // 'all'
 */
export function getSelectedOrientationID(): OrientationID | undefined {
	const selectedOrientationID = usePageStore.getState().selectedOrientationID;
	const orientation = getRegisteredOrientation(selectedOrientationID);
	return orientation?.id;
}

/**
 * Sets the current orientation by ID.
 * @param orientationID - The orientation ID to set
 * @example
 * setSelectedOrientationID('portrait'); // Sets current orientation to portrait
 */
export function setSelectedOrientationID(orientationID: OrientationID): void {
	usePageStore.getState().setSelectedOrientationID(orientationID);
}

/**
 * Gets all available orientations.
 * @returns Array of all orientation objects
 * @example
 * const orientations = getAllOrientations(); // [{ name: 'all', value: 'all' }, { name: 'portrait', value: 'portrait' }, ...]
 */
export function getAllOrientations(): OrientationInstance[] {
	return useMemo(() => Object.values(getRegisteredOrientations()), []);
}

/**
 * Gets a specific orientation by ID.
 * @param orientationID - The orientation ID to retrieve
 * @returns The orientation object or undefined if not found
 * @example
 * const orientation = getOrientation('portrait'); // { id: 'portrait', name: 'portrait', value: 'portrait' }
 */
export function getOrientation(orientationID: OrientationID): OrientationInstance | undefined {
	return useMemo(() => getRegisteredOrientation(orientationID), [orientationID]);
}

/**
 * Gets the default orientation ID.
 * @returns The default orientation ID
 * @example
 * const defaultOrientationID = getOrientationDefaultID(); // 'all'
 */
export function getOrientationDefaultID() {
	return 'all';
}
