// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { DeviceDefinition, DeviceID } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredDevices } from '@/src/core/layout/page/registry';


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
