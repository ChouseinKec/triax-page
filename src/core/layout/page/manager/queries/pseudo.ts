// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { PseudoID, PseudoInstance } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredPseudos } from '@/src/core/layout/page/registry';

// Constants
import { DEFAULT_PSEUDO_ID } from '@/src/core/layout/page/constants';

/**
 * Gets the currently selected pseudo ID from the page store for page queries.
 */
export function getSelectedPseudoID(): PseudoID {
	return usePageStore.getState().selected.pseudoID;
}

/**
 * Gets all available pseudo instances for page queries.
 */
export function getAllPseudos(): PseudoInstance[] {
	return Object.values(getRegisteredPseudos());
}

/**
 * Gets the default pseudo ID used for page layout and style fallbacks.
 */
export function getDefaultPseudoID(): PseudoID {
	return DEFAULT_PSEUDO_ID;
}
