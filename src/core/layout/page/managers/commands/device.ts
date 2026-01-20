// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { DeviceKey } from '@/src/core/layout/page/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateDeviceKey } from '@/src/core/layout/page/helpers/validators';

// Managers
import { getDefaultDeviceKey } from '@/src/core/layout/page/managers/queries';

/**
 * Sets the currently selected device by ID for page commands.
 * Updates the page store with the new device selection.
 *
 * @param deviceKey - The device ID to set as current
 */
export function setSelectedDeviceKey(deviceKey: DeviceKey): void {
	if (!deviceKey) deviceKey = getDefaultDeviceKey();

	const safeData = new ResultPipeline('[PageCommands → setSelectedDeviceKey]')
		.validate({
			deviceKey: validateDeviceKey(deviceKey),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelected({ deviceKey: safeData.deviceKey });
}
