// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type {  PseudoID, PseudoInstance } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredPseudo } from '@/src/core/layout/page/registry';

/**
 * Reactive hook to get the currently selected pseudo instance for page queries.
 * Returns the complete pseudo object based on the current selection in the page store.
 *
 * @returns The current pseudo instance or undefined if not found
 *
 * @example
 * const pseudo = useSelectedPseudo() // Returns { id: 'hover', name: 'Hover', ... }
 */
export function useSelectedPseudo(): PseudoInstance | undefined {
	const selectedPseudoID = usePageStore((state) => state.selected.pseudoID);
	return getRegisteredPseudo(selectedPseudoID);
}

/**
 * Reactive hook to get the currently selected pseudo ID for page queries.
 * Returns the pseudo identifier from the page store state.
 *
 * @returns The current pseudo ID or undefined if not set
 *
 * @example
 * const pseudoID = useSelectedPseudoID() // Returns 'hover' or undefined
 */
export function useSelectedPseudoID(): PseudoID {
	return usePageStore((state) => state.selected.pseudoID);
}
