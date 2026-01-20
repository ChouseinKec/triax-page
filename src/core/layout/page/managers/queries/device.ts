// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { DeviceDefinition, DeviceKey } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredDevices, getRegisteredDevice, getDefaultDeviceKey } from '@/src/core/layout/page/registries';

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
