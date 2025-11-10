// Types
import type { DeviceID, DeviceInstance } from '@/src/page-builder/core/page/types';
import type { OrientationID, OrientationInstance } from '@/src/page-builder/core/page/types';
import type { PseudoID, PseudoInstance } from '@/src/page-builder/core/page/types';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';
import type { WorkbenchDefinition } from '@/src/page-builder/core/editor/workbench/types';
import type { FetchResult } from '@/src/shared/types/result';

// Registries
import { getRegisteredDevice, getRegisteredOrientation, getRegisteredPseudo } from '@/src/page-builder/state/registries/page';
import { getRegisteredWorkbench } from '@/src/page-builder/state/registries/workbench';

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

/**
 * Fetches an orientation instance from the orientation registry by its ID.
 * Returns a result object indicating success with the orientation data or failure with an error message.
 * @param orientationID - The unique identifier of the orientation to fetch
 * @returns FetchResult containing the orientation instance or error message
 * @example
 * fetchOrientation('portrait') → { success: true, data: OrientationInstance }
 * fetchOrientation('invalid-id') → { success: false, error: 'Orientation not found...' }
 */
export function fetchOrientation(orientationID: OrientationID): FetchResult<OrientationInstance> {
	const orientation = getRegisteredOrientation(orientationID);
	if (!orientation) return { success: false, error: `Orientation not found: '${orientationID}' does not exist in the orientation registry` };

	return { success: true, data: orientation };
}

/**
 * Fetches a pseudo instance from the pseudo registry by its ID.
 * Returns a result object indicating success with the pseudo data or failure with an error message.
 * @param pseudoID - The unique identifier of the pseudo to fetch
 * @returns FetchResult containing the pseudo instance or error message
 * @example
 * fetchPseudo('hover') → { success: true, data: PseudoInstance }
 * fetchPseudo('invalid-id') → { success: false, error: 'Pseudo not found...' }
 */
export function fetchPseudo(pseudoID: PseudoID): FetchResult<PseudoInstance> {
	const pseudo = getRegisteredPseudo(pseudoID);
	if (!pseudo) return { success: false, error: `Pseudo not found: '${pseudoID}' does not exist in the pseudo registry` };

	return { success: true, data: pseudo };
}

/**
 * Fetches a workbench definition from the workbench registry by its ID.
 * Returns a result object indicating success with the workbench data or failure with an error message.
 * @param workbenchID - The unique identifier of the workbench to fetch
 * @returns FetchResult containing the workbench definition or error message
 * @example
 * fetchWorkbench('workbench-123') → { success: true, data: WorkbenchDefinition }
 * fetchWorkbench('invalid-id') → { success: false, error: 'Workbench not found...' }
 */
export function fetchWorkbench(workbenchID: WorkbenchID): FetchResult<WorkbenchDefinition> {
	const workbench = getRegisteredWorkbench(workbenchID);
	if (!workbench) return { success: false, error: `Workbench not found: '${workbenchID}' does not exist in the workbench registry` };

	return { success: true, data: workbench };
}