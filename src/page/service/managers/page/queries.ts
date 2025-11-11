// Stores
import { usePageStore } from '@/src/page/state/stores/page';

// Types
import type { DeviceDefinition, DeviceID, PseudoID, PseudoInstance, OrientationID, OrientationInstance } from '@/src/page/core/page/types/';

// Registry
import { getRegisteredOrientations, getRegisteredDevices, getRegisteredPseudos } from '@/src/page/state/registries/page';

// ------------------------- DEVICE -------------------------

/**
 * Gets the currently selected device ID from the page store for page queries.
 * Returns the device identifier from the current store state.
 *
 * @returns The current device ID or undefined if not set
 *
 * @example
 * const deviceID = getSelectedDeviceID() // Returns 'mobile' or undefined
 */
export function getSelectedDeviceID(): DeviceID {
	return usePageStore.getState().selectedDeviceID;
}

/**
 * Gets all available device definitions for page queries.
 * Returns an array of all registered device definitions from the registry.
 *
 * @returns Array of all device definitions
 *
 * @example
 * const devices = getAllDevices() // Returns [{ id: 'all', name: 'All' }, { id: 'mobile', name: 'Mobile' }, ...]
 */
export function getAllDevices(): DeviceDefinition[] {
	return Object.values(getRegisteredDevices());
}

// ------------------------- ORIENTATION -------------------------

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

// ------------------------- PSEUDO -------------------------

/**
 * Gets the currently selected pseudo ID from the page store for page queries.
 * Returns the pseudo identifier from the current store state.
 *
 * @returns The current pseudo ID or undefined if not set
 *
 * @example
 * const pseudoID = getSelectedPseudoID() // Returns 'hover' or undefined
 */
export function getSelectedPseudoID(): PseudoID {
	return usePageStore.getState().selectedPseudoID;
}

/**
 * Gets all available pseudo instances for page queries.
 * Returns an array of all registered pseudo definitions from the registry.
 *
 * @returns Array of all pseudo instances
 *
 * @example
 * const pseudos = getAllPseudos() // Returns [{ id: 'all', name: 'All' }, { id: 'hover', name: 'Hover' }, ...]
 */
export function getAllPseudos(): PseudoInstance[] {
	return Object.values(getRegisteredPseudos());
}
