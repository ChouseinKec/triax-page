import { create } from 'zustand';

// Types
import { ORIENTATION_STORE, ORIENTATION } from '@/stores/orientation/type';

// Defaults
const DEFAULT_ORIENTATIONS: ORIENTATION[] = [
	{ name: 'default', value: 'default' },
	{ name: 'portrait', value: 'portrait' },
	{ name: 'landscape', value: 'landscape' },
];

/**
 * Zustand store for managing page editor state, including device, orientation, and pseudo state.
 * Provides functions for selecting and manipulating the current device, orientation, and pseudo classes.
 */
const useOrientationStore = create<ORIENTATION_STORE>()((set, get) => ({
	/**
	 * List of all available orientations.
	 */
	allOrientations: DEFAULT_ORIENTATIONS,

	/**
	 * The currently selected orientation.
	 */
	currentOrientation: DEFAULT_ORIENTATIONS[0],

	/**
	 * Retrieves all available orientations.
	 *
	 * @returns {ORIENTATION[]} - The list of all orientations.
	 */
	getOrientations: (): ORIENTATION[] => get().allOrientations,

	/**
	 * Retrieves the currently selected orientation.
	 *
	 * @returns {ORIENTATION} - The current orientation object.
	 */
	getOrientation: (): ORIENTATION => get().currentOrientation,

	/**
	 * Sets the current orientation based on the provided value.
	 * Throws an error if the orientation value is invalid.
	 *
	 * @param {string} value - The value of the orientation to select.
	 * @throws Will throw an error if the value is invalid.
	 */
	setOrientation: (value: string) => {
		const allOrientations = get().allOrientations;
		const oriantation = allOrientations.find((pse) => {
			return pse.value === value;
		});

		if (!oriantation) {
			throw new Error(`Invalid orientation: ${value}. Available orientations: ${allOrientations.map((ort) => ort.name).join(',')}`);
		}

		// Only update if the device actually changed
		if (get().currentOrientation.value !== oriantation.value) {
			set({ currentOrientation: oriantation });
		}
	},
}));

export default useOrientationStore;
