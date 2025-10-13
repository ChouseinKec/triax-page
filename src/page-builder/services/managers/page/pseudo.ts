// Stores
import { usePageStore } from '@/src/page-builder/state/stores/page';

// Types
import type { PseudoID, PseudoInstance } from '@/src/page-builder/core/page/types/pseudo';

// Registry
import { getRegisteredPseudos, getRegisteredPseudo } from '@/src/page-builder/state/registries/page';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validatePseudoID } from '@/src/page-builder/services/helpers/validate';

/**
 * Reactive hook to get the currently selected pseudo instance for page management operations.
 * Returns the complete pseudo object based on the current selection in the page store.
 *
 * @returns The current pseudo instance or undefined if not found
 *
 * @example
 * const pseudo = useSelectedPseudo() // Returns { id: 'hover', name: 'Hover', ... }
 */
export function useSelectedPseudo(): PseudoInstance | undefined {
	const selectedPseudoID = usePageStore((state) => state.selectedPseudoID);
	return getRegisteredPseudo(selectedPseudoID);
}

/**
 * Reactive hook to get the currently selected pseudo ID for page management operations.
 * Returns the pseudo identifier from the page store state.
 *
 * @returns The current pseudo ID or undefined if not set
 *
 * @example
 * const pseudoID = useSelectedPseudoID() // Returns 'hover' or undefined
 */
export function useSelectedPseudoID(): PseudoID | undefined {
	return usePageStore((state) => state.selectedPseudoID);
}

/**
 * Gets the currently selected pseudo ID from the page store for page management operations.
 * Returns the pseudo identifier from the current store state.
 *
 * @returns The current pseudo ID or undefined if not set
 *
 * @example
 * const pseudoID = getSelectedPseudoID() // Returns 'hover' or undefined
 */
export function getSelectedPseudoID(): PseudoID | undefined {
	const selectedPseudoID = usePageStore.getState().getSelectedPseudoID();
	const pseudo = getRegisteredPseudo(selectedPseudoID);
	return pseudo?.id;
}

/**
 * Sets the currently selected pseudo by ID for page management operations.
 * Updates the page store with the new pseudo selection.
 *
 * @param pseudoID - The pseudo ID to set as current
 * @returns void
 *
 * @example
 * setSelectedPseudoID('hover') // Sets current pseudo to hover
 */
export function setSelectedPseudoID(pseudoID: PseudoID): void {
	const safeData = new ValidationPipeline('[PageManager → setSelectedPseudoID]')
		.validate({
			pseudoID: validatePseudoID(pseudoID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelectedPseudoID(safeData.pseudoID);
}

/**
 * Gets all available pseudo instances for page management operations.
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

