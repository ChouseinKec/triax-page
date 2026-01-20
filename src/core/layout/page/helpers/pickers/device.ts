// Types
import type { DeviceKey, DeviceDefinition, DeviceRecord } from '@/src/core/layout/page/types';
import type { PickResult } from '@/src/shared/types/result';

/**
 * Fetches a device instance from the device registry by its ID.
 * @param deviceKey - The unique identifier of the device to fetch
 * @param registeredDevices - The record of registered devices
 */
export function pickDevice(deviceKey: DeviceKey, registeredDevices: DeviceRecord): PickResult<DeviceDefinition> {
	// Find the specific device by its ID
	const device = registeredDevices[deviceKey];
	if (!device) return { success: false, error: `Device not found: '${deviceKey}' does not exist in the device registry` };

	// Return the found device
	return { success: true, data: device };
}
