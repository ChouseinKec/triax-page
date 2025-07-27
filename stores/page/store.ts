import { create } from 'zustand';

// Types
import type { PageStore } from '@/stores/page/types';

// Constants
import { DeviceDefinitions } from '@/constants/page/device';
import { OrientationDefinitions } from '@/constants/page/orientation';
import { PseudoDefinitions } from '@/constants/page/pseudo';

/**
 * Zustand store for managing page editor state, including device, orientation, and pseudo state.
 * Provides functions for selecting and manipulating the current device, orientation, and pseudo classes.
 */
const usePageStore = create<PageStore>()((set, get) => ({
	/**
	 * The currently selected device.
	 */
	currentDevice: DeviceDefinitions[0],

	/**
	 * List of all available devices.
	 */
	allDevices: DeviceDefinitions,

	/**
	 * Sets the current device based on the provided value.
	 * Throws an error if the device value is invalid.
	 *
	 * @param {string} value - The value of the device to select.
	 * @throws Will throw an error if the value is invalid.
	 */
	setDevice: (value: string) => {
		const allDevices = get().allDevices;
		const device = allDevices.find((dev) => {
			return dev.value === value;
		});

		if (!device) throw new Error(`Invalid device: ${value}. Available devices: ${allDevices.map((dev) => dev.name).join(',')}`);

		// Only update if the device actually changed
		if (get().currentDevice.value !== device.value) set({ currentDevice: device });
	},



	/**
	 * The currently selected orientation.
	 */
	currentOrientation: OrientationDefinitions[0],

	/**
	 * List of all available orientations.
	 */
	allOrientations: OrientationDefinitions,

	/**
	 * Sets the current orientation based on the provided value.
	 * Throws an error if the orientation value is invalid.
	 *
	 * @param {string} value - The value of the orientation to select.
	 * @throws Will throw an error if the value is invalid.
	 */
	setOrientation: (value: string) => {
		const allOrientations = get().allOrientations;
		const orientation = allOrientations.find((ori) => {
			return ori.value === value;
		});

		if (!orientation) throw new Error(`Invalid orientation: ${value}. Available orientations: ${allOrientations.map((ori) => ori.name).join(',')}`);

		// Only update if the orientation actually changed
		if (get().currentOrientation.value !== orientation.value) set({ currentOrientation: orientation });
	},


		/**
	 * The currently selected pseudo class.
	 */
	currentPseudo: PseudoDefinitions[0],

	/**
	 * List of all available pseudo classes.
	 */
	allPseudos: PseudoDefinitions,

	/**
	 * Sets the current pseudo class based on the provided value.
	 * Throws an error if the pseudo class value is invalid.
	 *
	 * @param {string} value - The value of the pseudo class to select.
	 * @throws Will throw an error if the value is invalid.
	 */
	setPseudo: (value: string) => {
		const allPseudos = get().allPseudos;
		const pseudo = allPseudos.find((p) => {
			return p.value === value;
		});

		if (!pseudo) throw new Error(`Invalid pseudo class: ${value}. Available pseudo classes: ${allPseudos.map((p) => p.name).join(',')}`);

		// Only update if the pseudo class actually changed
		if (get().currentPseudo.value !== pseudo.value) set({ currentPseudo: pseudo });
	},

}));

export default usePageStore;
