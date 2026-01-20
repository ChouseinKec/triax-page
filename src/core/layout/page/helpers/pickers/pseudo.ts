import type { PseudoKey, PseudoDefinition, PseudoDefinitionRecord } from '@/src/core/layout/page/types';
import type { PickResult } from '@/src/shared/types/result';

/**
 * Fetches a pseudo instance from the pseudo registry by its ID.
 * @param pseudoKey - The unique identifier of the pseudo to fetch
 * @param registeredPseudos - The record of registered pseudos
 */
export function pickPseudo(pseudoKey: PseudoKey, registeredPseudos: PseudoDefinitionRecord): PickResult<PseudoDefinition> {
	// Find the pseudo by ID
	const pseudo = registeredPseudos[pseudoKey];
	if (!pseudo) return { success: false, error: `Pseudo not found: '${pseudoKey}' does not exist in the pseudo registry` };

	// Return the found pseudo
	return { success: true, data: pseudo };
}
