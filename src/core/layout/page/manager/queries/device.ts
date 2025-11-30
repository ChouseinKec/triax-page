// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { DeviceDefinition, DeviceID } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredDevices } from '@/src/core/layout/page/registry';

// Constants
import { DEFAULT_DEVICE_ID } from '@/src/core/layout/page/constants';

/**
 * Gets the currently selected device ID from the page store for page queries.
 */
export function getSelectedDeviceID(): DeviceID {
	return usePageStore.getState().selected.deviceID;
}

/**
 * Gets all available device definitions for page queries.
 */
export function getDeviceDefinitions(): DeviceDefinition[] {
	return Object.values(getRegisteredDevices());
}

/**
 * Gets the default device ID used for page layout and style fallbacks.
 */
export function getDeviceDefaultID(): DeviceID {
	return DEFAULT_DEVICE_ID;
}
