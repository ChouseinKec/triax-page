// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type {  DeviceInstance, DeviceID } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredDevice } from '@/src/core/layout/page/registry';

/**
 * Reactive hook to get the currently selected device instance for page queries.
 * Returns the complete device object based on the current selection in the page store.
 *
 * @returns The current device instance or undefined if not found
 *
 * @example
 * const device = useSelectedDevice() // Returns { id: 'mobile', name: 'Mobile', ... }
 */
export function useSelectedDevice(): DeviceInstance | undefined {
	const selectedDeviceID = usePageStore((state) => state.selected.deviceID);
	return getRegisteredDevice(selectedDeviceID);
}

/**
 * Reactive hook to get the currently selected device ID for page queries.
 * Returns the device identifier from the page store state.
 *
 * @returns The current device ID or undefined if not set
 *
 * @example
 * const deviceID = useSelectedDeviceID() // Returns 'mobile' or undefined
 */
export function useSelectedDeviceID(): DeviceID {
	return usePageStore((state) => state.selected.deviceID);
}
