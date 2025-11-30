// Types
import type { DeviceID, DeviceInstance, DeviceRecord } from '@/src/core/layout/page/types';
import type { PickResult } from '@/src/shared/types/result';

/**
 * Fetches a device instance from the device registry by its ID.
 * @param deviceID - The unique identifier of the device to fetch
 * @param registeredDevices - The record of registered devices
 */
export function pickDevice(deviceID: DeviceID, registeredDevices: DeviceRecord): PickResult<DeviceInstance> {
	// Find the specific device by its ID
	const device = registeredDevices[deviceID];
	if (!device) return { success: false, error: `Device not found: '${deviceID}' does not exist in the device registry` };

	// Return the found device
	return { success: true, data: device };
}
