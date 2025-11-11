import { create } from 'zustand';

// Types
import type { WorkbenchID } from '@/src/page/core/workbench/types';
import type { DeviceID } from '@/src/page/core/page/types/device';
import type { OrientationID } from '@/src/page/core/page/types/orientation';
import type { PseudoID } from '@/src/page/core/page/types/pseudo';

// Constants
import { DEFAULT_DEVICE_ID, DEFAULT_ORIENTATION_ID, DEFAULT_PSEUDO_ID } from '@/src/page/core/page/constants';
import { DEFAULT_WORKBENCH_ID } from '@/src/page/core/workbench/constants/defaults';

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
 * Creates the page store after initialization.
 * @returns The initialized Zustand store
 */
export function createPageStore() {
	return create<PageStore>()((set, get) => ({
		/**
		 * The currently selected workbench.
		 * Defaults to 'main'.
		 */
		selectedWorkbenchID: DEFAULT_WORKBENCH_ID,

		/**
		 * The currently selected device.
		 */
		selectedDeviceID: DEFAULT_DEVICE_ID,

		/**
		 * The currently selected orientation.
		 */
		selectedOrientationID: DEFAULT_ORIENTATION_ID,

		/**
		 * The currently selected pseudo class.
		 */
		selectedPseudoID: DEFAULT_PSEUDO_ID,

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

		getSelectedWorkbenchID: () => get().selectedWorkbenchID,
	}));
}

// Export a reference that will be set after initialization
export let usePageStore: ReturnType<typeof createPageStore>;

/**
 * Initialize the page store.
 */
export function initializePageStore(): Promise<void> {
	return new Promise((resolve) => {
		usePageStore = createPageStore();
		resolve();
	});
}
