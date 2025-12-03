// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { DeviceID } from '@/src/core/layout/page/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateDeviceID } from '@/src/core/layout/page/helper/validators';

// Managers
import { getDeviceDefaultID } from '@/src/core/layout/page/manager/queries';

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
	if (!deviceID) deviceID = getDeviceDefaultID();

	const safeData = new ResultPipeline('[PageCommands → setSelectedDeviceID]')
		.validate({
			deviceID: validateDeviceID(deviceID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelected({ deviceID: safeData.deviceID });
}
