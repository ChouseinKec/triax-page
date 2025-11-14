// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { PseudoID, PseudoInstance } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredPseudos } from '@/src/core/layout/page/registry';

/**
 * Gets the currently selected pseudo ID from the page store for page queries.
 * Returns the pseudo identifier from the current store state.
 *
 * @returns The current pseudo ID or undefined if not set
 *
 * @example
 * const pseudoID = getSelectedPseudoID() // Returns 'hover' or undefined
 */
export function getSelectedPseudoID(): PseudoID {
	return usePageStore.getState().selectedPseudoID;
}

/**
 * Gets all available pseudo instances for page queries.
 * Returns an array of all registered pseudo definitions from the registry.
 *
 * @returns Array of all pseudo instances
 *
 * @example
 * const pseudos = getAllPseudos() // Returns [{ id: 'all', name: 'All' }, { id: 'hover', name: 'Hover' }, ...]
 */
export function getAllPseudos(): PseudoInstance[] {
	return Object.values(getRegisteredPseudos());
}
