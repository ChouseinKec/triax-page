import { useMemo } from 'react';

// Stores
import usePageStore from '@/src/page-builder/state/stores/page';

// Types
import type { DeviceDefinition, DeviceInstance, DeviceID } from '@/src/page-builder/core/page/types/device';

// Registry
import { getRegisteredDevices, getRegisteredDevice } from '@/src/page-builder/state/registries/page';

/**
 * Reactive hook to get the current device.
 * @returns The current device object
 * @example
 * const device = useSelectedDevice(); // { id: 'all', name: 'all', value: 'all' }
 */
export function useSelectedDevice(): DeviceInstance | undefined {
	const selectedDeviceID = usePageStore((state) => state.selectedDeviceID);
	return getRegisteredDevice(selectedDeviceID);
}

/**
 * Gets the current device synchronously.
 * @returns The current device object
 * @example
 * const device = getSelectedDevice(); // { id: 'all', name: 'all', value: 'all' }
 */
export function getSelectedDevice(): DeviceInstance | undefined {
	const selectedDeviceID = usePageStore.getState().selectedDeviceID;
	return getRegisteredDevice(selectedDeviceID);
}

/**
 * Reactive hook to get the current device ID.
 * @returns The current device ID
 * @example
 * const deviceID = useSelectedDeviceID(); // 'all'
 */
export function useSelectedDeviceID(): DeviceID | undefined {
	return usePageStore((state) => state.selectedDeviceID);
}

/**
 * Gets the current device ID.
 * @returns The current device ID
 * @example
 * const deviceID = getSelectedDeviceID(); // 'all'
 */
export function getSelectedDeviceID(): DeviceID | undefined {
	const selectedDeviceID = usePageStore.getState().selectedDeviceID;
	const device = getRegisteredDevice(selectedDeviceID);
	return device?.id;
}

/**
 * Sets the current device by ID.
 * @param deviceID - The device ID to set
 * @example
 * setSelectedDeviceID('mobile'); // Sets current device to mobile
 */
export function setSelectedDeviceID(deviceID: DeviceID): void {
	if (!deviceID) deviceID = getDeviceDefaultID();
	usePageStore.getState().setSelectedDeviceID(deviceID);
}

/**
 * Gets all available devices.
 * @returns Array of all device definitions
 * @example
 * const devices = getAllDevices(); // [{ name: 'all', value: 'all' }, { name: 'mobile', value: 'mobile' }, ...]
 */
export function getAllDevices(): DeviceDefinition[] {
	return Object.values(getRegisteredDevices());
}

/**
 * Gets a specific device by ID.
 * @param deviceID - The device ID to retrieve
 * @returns The device object or undefined if not found
 * @example
 * const device = getDevice('mobile'); // { id: 'mobile', name: 'mobile', value: 'mobile' }
 */
export function getDevice(deviceID: DeviceID): DeviceInstance | undefined {
	return getRegisteredDevice(deviceID);
}

/**
 * Gets the default device ID.
 * @returns The default device ID
 * @example
 * const defaultDeviceID = getDeviceDefaultID(); // 'all'
 */
export function getDeviceDefaultID() {
	return 'all ';
}
