// Stores
import { usePageStore } from '@/state/layout/page';

// Types
import type {  PseudoKey, PseudoDefinition } from '@/core/layout/page/types';

// Registry
import { getRegisteredPseudo } from '@/core/layout/page/registries';

/**
 * Reactive hook to get the currently selected pseudo instance for page queries.
 */
export function useSelectedPseudo(): PseudoDefinition | undefined {
	const selectedPseudoKey = usePageStore((state) => state.selected.pseudoKey);
	return getRegisteredPseudo(selectedPseudoKey);
}

/**
 * Reactive hook to get the currently selected pseudo ID for page queries.
 */
export function useSelectedPseudoKey(): PseudoKey {
	return usePageStore((state) => state.selected.pseudoKey);
}
