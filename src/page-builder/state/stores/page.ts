import { create } from 'zustand';

// Types
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';
import type { DeviceID } from '@/src/page-builder/core/page/types/device';
import type { OrientationID } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoID } from '@/src/page-builder/core/page/types/pseudo';
import type { ActionRecord } from '@/src/page-builder/core/page/types';

export type PageStore = {
	selectedDeviceID: DeviceID;
	setSelectedDeviceID: (value: DeviceID) => void;

	selectedOrientationID: OrientationID;
	setSelectedOrientationID: (value: OrientationID) => void;

	selectedPseudoID: PseudoID;
	setSelectedPseudoID: (value: PseudoID) => void;

	selectedWorkbenchID: WorkbenchID;
	setSelectedWorkbenchID: (id: WorkbenchID) => void;
};

/**
 * Zustand store for managing page editor state, including device, orientation, and pseudo state.
 * Provides functions for selecting and manipulating the current device, orientation, and pseudo classes.
 */
export const usePageStore = create<PageStore>()((set, get) => ({
	/**
	 * The currently selected workbench.
	 * Defaults to 'main'.
	 */
	selectedWorkbenchID: 'main',

	/**
	 * The currently selected device.
	 */
	selectedDeviceID: 'all',

	/**
	 * The currently selected orientation.
	 */
	selectedOrientationID: 'all',

	/**
	 * The currently selected pseudo class.
	 */
	selectedPseudoID: 'all',

	/**
	 * Sets the current device based on the provided value.
	 * Throws an error if the device value is invalid.
	 *
	 * @param device - The value of the device to select.
	 */
	setSelectedDeviceID: (device) => {
		set({ selectedDeviceID: device });
	},

	/**
	 * Sets the current orientation based on the provided value.
	 * Throws an error if the orientation value is invalid.
	 *
	 * @param  value - The value of the orientation to select.
	 */
	setSelectedOrientationID: (value) => {
		set({ selectedOrientationID: value });
	},

	/**
	 * Sets the current pseudo class based on the provided value.
	 * Throws an error if the pseudo class value is invalid.
	 *
	 * @param  value - The value of the pseudo class to select.
	 */
	setSelectedPseudoID: (value: string) => {
		set({ selectedPseudoID: value });
	},

	/**
	 * Sets the current workbench.
	 * @param id - The WorkbenchID to set as current
	 */
	setSelectedWorkbenchID: (workbenchID: WorkbenchID) => {
		set({ selectedWorkbenchID: workbenchID });
	},
}));

export default usePageStore;
