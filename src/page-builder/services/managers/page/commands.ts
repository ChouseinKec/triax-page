// Stores
import { usePageStore } from '@/src/page-builder/state/stores/page';

// Types
import type { DeviceID, OrientationID, PseudoID } from '@/src/page-builder/core/page/types/';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateDeviceID, validateOrientationID, validatePseudoID } from '@/src/page-builder/services/helpers/page/validate';
import { validateWorkbenchID } from '@/src/page-builder/services/helpers/editor/validate';

// Constants
import { DEFAULT_DEVICE_ID, DEFAULT_ORIENTATION_ID, DEFAULT_PSEUDO_ID } from '@/src/page-builder/core/page/constants';

// ------------------------- DEVICE -------------------------

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

// ------------------------- ORIENTATION -------------------------

/**
 * Sets the currently selected orientation by ID for page commands.
 * Updates the page store with the new orientation selection.
 *
 * @param orientationID - The orientation ID to set as current
 * @returns void
 *
 * @example
 * setSelectedOrientationID('portrait') // Sets current orientation to portrait
 */
export function setSelectedOrientationID(orientationID: OrientationID): void {
	if (!orientationID) orientationID = DEFAULT_ORIENTATION_ID;

	const safeData = new ValidationPipeline('[PageCommands → setSelectedOrientationID]')
		.validate({
			orientationID: validateOrientationID(orientationID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelectedOrientationID(safeData.orientationID);
}

// ------------------------- PSEUDO -------------------------

/**
 * Sets the currently selected pseudo by ID for page commands.
 * Updates the page store with the new pseudo selection.
 *
 * @param pseudoID - The pseudo ID to set as current
 * @returns void
 *
 * @example
 * setSelectedPseudoID('hover') // Sets current pseudo to hover
 */
export function setSelectedPseudoID(pseudoID: PseudoID): void {
	if (!pseudoID) pseudoID = DEFAULT_PSEUDO_ID;
	const safeData = new ValidationPipeline('[PageCommands → setSelectedPseudoID]')
		.validate({
			pseudoID: validatePseudoID(pseudoID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelectedPseudoID(safeData.pseudoID);
}

// WORKBENCH COMMANDS

/**
 * Sets the currently selected workbench by ID for page commands.
 * Updates the page store with the new workbench selection.
 *
 * @param workbenchID - The workbench ID to set as current
 * @returns void
 *
 * @example
 * setSelectedWorkbenchID('workbench-123') // Sets current workbench to workbench-123
 */
export function setSelectedWorkbenchID(workbenchID: WorkbenchID): void {
	const safeData = new ValidationPipeline('[PageCommands → setSelectedWorkbenchID]')
		.validate({
			workbenchID: validateWorkbenchID(workbenchID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelectedWorkbenchID(safeData.workbenchID);
}
