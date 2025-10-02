import { create } from 'zustand';

// Types
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';
import type { DeviceID } from '@/src/page-builder/core/page/types/device';
import type { OrientationID } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoID } from '@/src/page-builder/core/page/types/pseudo';

export type PageStore = {
	selectedDeviceID: DeviceID;
	setSelectedDeviceID: (value: DeviceID) => void;
	getSelectedDeviceID: () => DeviceID;

	selectedOrientationID: OrientationID;
	setSelectedOrientationID: (value: OrientationID) => void;
	getSelectedOrientationID: () => OrientationID;

	selectedPseudoID: PseudoID;
	setSelectedPseudoID: (value: PseudoID) => void;
	getSelectedPseudoID: () => PseudoID;

	selectedWorkbenchID: WorkbenchID;
	setSelectedWorkbenchID: (id: WorkbenchID) => void;
	getSelectedWorkbenchID: () => WorkbenchID;
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

		getSelectedDeviceID: () => get().selectedDeviceID,

		/**
		 * Sets the current orientation based on the provided value.
		 * Throws an error if the orientation value is invalid.
		 *
		 * @param  value - The value of the orientation to select.
		 */
		setSelectedOrientationID: (value) => {
			set({ selectedOrientationID: value });
		},

		getSelectedOrientationID: () => get().selectedOrientationID,

		/**
		 * Sets the current pseudo class based on the provided value.
		 * Throws an error if the pseudo class value is invalid.
		 *
		 * @param  value - The value of the pseudo class to select.
		 */
		setSelectedPseudoID: (value: string) => {
			set({ selectedPseudoID: value });
		},

		getSelectedPseudoID: () => get().selectedPseudoID,

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
