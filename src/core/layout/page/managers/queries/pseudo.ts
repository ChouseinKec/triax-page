// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { PseudoKey, PseudoDefinition } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredPseudos, getRegisteredPseudo, getDefaultPseudoKey } from '@/src/core/layout/page/registries';

/**
 * Gets the currently selected pseudo ID from the page store for page queries.
 */
export function getSelectedPseudoKey(): PseudoKey {
	return usePageStore.getState().selected.pseudoKey;
}

/**
 * Gets all available pseudo instances for page queries.
 */
export function getPseudoDefinitions(): PseudoDefinition[] {
	return Object.values(getRegisteredPseudos());
}

/**
 * Gets a specific pseudo definition by its key for page queries.
 */
export function getPseudoDefinition(key: PseudoKey): PseudoDefinition | undefined {
	return getRegisteredPseudo(key);
}

export { getDefaultPseudoKey };
