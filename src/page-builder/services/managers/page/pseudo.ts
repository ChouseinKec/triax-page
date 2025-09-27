import { useMemo } from 'react';

// Stores
import { usePageStore } from '@/src/page-builder/state/stores/page';

// Types
import type { PseudoID, PseudoInstance } from '@/src/page-builder/core/page/types/pseudo';

// Registry
import { getRegisteredPseudos, getRegisteredPseudo } from '@/src/page-builder/state/registries/page';

/**
 * Reactive hook to get the current pseudo.
 * @returns The current pseudo object
 * @example
 * const pseudo = useSelectedPseudo(); // { id: 'all', name: 'all', value: 'all' }
 */
export function useSelectedPseudo(): PseudoInstance | undefined {
	const selectedPseudoID = usePageStore((state) => state.selectedPseudoID);
	return getRegisteredPseudo(selectedPseudoID);
}

/**
 * Gets the current pseudo synchronously.
 * @returns The current pseudo object
 * @example
 * const pseudo = getSelectedPseudo(); // { id: 'all', name: 'all', value: 'all' }
 */
export function getSelectedPseudo(): PseudoInstance | undefined {
	const selectedPseudoID = usePageStore.getState().selectedPseudoID;
	return getRegisteredPseudo(selectedPseudoID);
}

/**
 * Reactive hook to get the current pseudo ID.
 * @returns The current pseudo ID
 * @example
 * const pseudoID = useSelectedPseudoID(); // 'all'
 */
export function useSelectedPseudoID(): PseudoID | undefined {
	return usePageStore((state) => state.selectedPseudoID);
}

/**
 * Gets the current pseudo ID.
 * @returns The current pseudo ID
 * @example
 * const pseudoID = getSelectedPseudoID(); // 'all'
 */
export function getSelectedPseudoID(): PseudoID | undefined {
	const selectedPseudoID = usePageStore.getState().selectedPseudoID;
	const pseudo = getRegisteredPseudo(selectedPseudoID);
	return pseudo?.id;
}

/**
 * Sets the current pseudo by ID.
 * @param pseudoID - The pseudo ID to set
 * @example
 * setSelectedPseudoID('hover'); // Sets current pseudo to hover
 */
export function setSelectedPseudoID(pseudoID: PseudoID): void {
	usePageStore.getState().setSelectedPseudoID(pseudoID);
}

/**
 * Gets all available pseudos.
 * @returns Array of all pseudo objects
 * @example
 * const pseudos = getAllPseudos(); // [{ name: 'all', value: 'all' }, { name: 'hover', value: 'hover' }, ...]
 */
export function getAllPseudos(): PseudoInstance[] {
	return useMemo(() => Object.values(getRegisteredPseudos()), []);
}

/**
 * Gets a specific pseudo by ID.
 * @param pseudoID - The pseudo ID to retrieve
 * @returns The pseudo object or undefined if not found
 * @example
 * const pseudo = getPseudo('hover'); // { id: 'hover', name: 'hover', value: 'hover' }
 */
export function getPseudo(pseudoID: PseudoID): PseudoInstance | undefined {
	return useMemo(() => getRegisteredPseudo(pseudoID), [pseudoID]);
}

/** * Gets the default pseudo ID.
 * @returns The default pseudo ID
 * @example
 * const defaultPseudoID = getPseudoDefaultID(); // 'all'
 */
export function getPseudoDefaultID() {
	return 'all';
}
