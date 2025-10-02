// Stores
import { usePageStore } from '@/src/page-builder/state/stores/page';

// Types
import type { DeviceDefinition, DeviceInstance, DeviceID } from '@/src/page-builder/core/page/types/device';

// Registry
import { getRegisteredDevices, getRegisteredDevice } from '@/src/page-builder/state/registries/page';

// Utilities
import { validateOrLog } from '@/src/shared/utilities/validation';

// Helpers
import { validateDeviceID } from '@/src/page-builder/services/helpers/page/device';

/**
 * Reactive hook to get the currently selected device instance for page management operations.
 * Returns the complete device object based on the current selection in the page store.
 *
 * @returns The current device instance or undefined if not found
 *
 * @example
 * const device = useSelectedDevice() // Returns { id: 'mobile', name: 'Mobile', ... }
 */
export function useSelectedDevice(): DeviceInstance | undefined {
	const selectedDeviceID = usePageStore((state) => state.selectedDeviceID);
	return getRegisteredDevice(selectedDeviceID);
}

/**
 * Reactive hook to get the currently selected device ID for page management operations.
 * Returns the device identifier from the page store state.
 *
 * @returns The current device ID or undefined if not set
 *
 * @example
 * const deviceID = useSelectedDeviceID() // Returns 'mobile' or undefined
 */
export function useSelectedDeviceID(): DeviceID | undefined {
	return usePageStore((state) => state.selectedDeviceID);
}

/**
 * Gets the currently selected device ID from the page store for page management operations.
 * Returns the device identifier from the current store state.
 *
 * @returns The current device ID or undefined if not set
 *
 * @example
 * const deviceID = getSelectedDeviceID() // Returns 'mobile' or undefined
 */
export function getSelectedDeviceID(): DeviceID | undefined {
	return usePageStore.getState().getSelectedDeviceID();
}

/**
 * Sets the currently selected device by ID for page management operations.
 * Updates the page store with the new device selection.
 *
 * @param deviceID - The device ID to set as current
 * @returns void
 *
 * @example
 * setSelectedDeviceID('mobile') // Sets current device to mobile
 */
export function setSelectedDeviceID(deviceID: DeviceID): void {
	const safeParams = validateOrLog({ deviceID: validateDeviceID(deviceID) }, `[PageManager → setSelectedDeviceID]`);
	if (!safeParams) return;

	usePageStore.getState().setSelectedDeviceID(safeParams.deviceID);
}

/**
 * Gets all available device definitions for page management operations.
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

/**
 * Gets the default device ID for page management operations.
 * Returns the hardcoded default device identifier used as fallback.
 *
 * @returns The default device ID string
 *
 * @example
 * const defaultID = getDeviceDefaultID() // Returns 'all'
 */
export function getDeviceDefaultID(): string {
	return 'all';
}
