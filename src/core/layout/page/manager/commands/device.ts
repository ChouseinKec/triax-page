// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { DeviceID } from '@/src/core/layout/page/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateDeviceID } from '@/src/core/layout/page/helper/validators';

// Constants
import { DEFAULT_DEVICE_ID } from '@/src/core/layout/page/constants';

/**
 * Sets the currently selected device by ID for page commands.
 * Updates the page store with the new device selection.
 *
 * @param deviceID - The device ID to set as current
 * @returns void
 *
 * @example
 * setSelectedDeviceID('mobile') // Sets current device to mobile
 */
export function setSelectedDeviceID(deviceID: DeviceID): void {
	if (!deviceID) deviceID = DEFAULT_DEVICE_ID;

	const safeData = new ValidationPipeline('[PageCommands → setSelectedDeviceID]')
		.validate({
			deviceID: validateDeviceID(deviceID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelectedDeviceID(safeData.deviceID);
}
