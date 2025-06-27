import { create } from 'zustand';

// Types
import { usePseudoStoreProps, Pseudo } from '@/stores/pseudo/type';

// Defaults
const DEFAULT_PSEUDOS: Pseudo[] = [
	{ name: 'default', value: 'default' },
	{ name: 'hover', value: 'hover' },
	{ name: 'active', value: 'active' },
];

/**
 * Zustand store for managing page editor state, including device, orientation, and pseudo state.
 * Provides functions for selecting and manipulating the current device, orientation, and pseudo classes.
 */
const usePseudoStore = create<usePseudoStoreProps>()((set, get) => ({
	/**
	 * List of all available pseudos.
	 */
	allPseudos: DEFAULT_PSEUDOS,

	/**
	 * The currently selected pseudo class.
	 */
	currentPseudo: DEFAULT_PSEUDOS[0],

	/**
	 * Retrieves all available pseudos.
	 *
	 * @returns {Pseudo[]} - The list of all pseudos.
	 */
	getPseudos: (): Pseudo[] => get().allPseudos,

	/**
	 * Retrieves the currently selected pseudo class.
	 *
	 * @returns {Pseudo} - The current pseudo class object.
	 */
	getPseudo: (): Pseudo => get().currentPseudo,

	/**
	 * Sets the current pseudo class based on the provided value.
	 * Throws an error if the pseudo value is invalid.
	 *
	 * @param {string} value - The value of the pseudo to select.
	 * @throws Will throw an error if the value is invalid.
	 */
	setPseudo: (value: string) => {
		const allPseudos = get().allPseudos;
		const pseudo = allPseudos.find((pse) => {
			return pse.value === value;
		});

		if (!pseudo) {
			throw new Error(`Invalid pseudo: ${value}. Available pseudos: ${allPseudos.map((pse) => pse.name).join(',')}`);
		}

		// Only update if the device actually changed
		if (get().currentPseudo.value !== pseudo.value) {
			set({ currentPseudo: pseudo });
		}
	},
}));

export default usePseudoStore;
