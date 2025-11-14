// Types
import type { DeviceID, DeviceInstance } from '@/src/core/layout/page/types';
import type { FetchResult } from '@/src/shared/types/result';

// REGISTRY_DEFINITIONS
import { getRegisteredDevice } from '@/src/core/layout/page/registry';

/**
 * Fetches a device instance from the device registry by its ID.
 * Returns a result object indicating success with the device data or failure with an error message.
 * @param deviceID - The unique identifier of the device to fetch
 * @returns FetchResult containing the device instance or error message
 * @example
 * fetchDevice('mobile') → { success: true, data: DeviceInstance }
 * fetchDevice('invalid-id') → { success: false, error: 'Device not found...' }
 */
export function fetchDevice(deviceID: DeviceID): FetchResult<DeviceInstance> {
    const device = getRegisteredDevice(deviceID);
    if (!device) return { success: false, error: `Device not found: '${deviceID}' does not exist in the device registry` };

    return { success: true, data: device };
}
