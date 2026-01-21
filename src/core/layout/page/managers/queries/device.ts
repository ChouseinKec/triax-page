// Stores
import { usePageStore } from '@/state/layout/page';

// Types
import type { DeviceDefinition, DeviceKey } from '@/core/layout/page/types';

// Registry
import { getRegisteredDevices, getRegisteredDevice, getDefaultDeviceKey } from '@/core/layout/page/registries';

/**
 * Gets the currently selected device ID from the page store for page queries.
 */
export function getSelectedDeviceKey(): DeviceKey {
	return usePageStore.getState().selected.deviceKey;
}

/**
 * Gets all available device definitions for page queries.
 */
export function getDeviceDefinitions(): DeviceDefinition[] {
	return Object.values(getRegisteredDevices());
}

/**
 * Gets a specific device definition by its key for page queries.
*/
export function getDeviceDefinition(key: DeviceKey): DeviceDefinition | undefined {
	return getRegisteredDevice(key);
}

export { getDefaultDeviceKey };
