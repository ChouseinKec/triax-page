import type { PseudoID, PseudoInstance, PseudoRecord } from '@/src/core/layout/page/types';
import type { PickResult } from '@/src/shared/types/result';

/**
 * Fetches a pseudo instance from the pseudo registry by its ID.
 * @param pseudoID - The unique identifier of the pseudo to fetch
 * @param registeredPseudos - The record of registered pseudos
 */
export function pickPseudo(pseudoID: PseudoID, registeredPseudos: PseudoRecord): PickResult<PseudoInstance> {
	// Find the pseudo by ID
	const pseudo = registeredPseudos[pseudoID];
	if (!pseudo) return { success: false, error: `Pseudo not found: '${pseudoID}' does not exist in the pseudo registry` };

	// Return the found pseudo
	return { success: true, data: pseudo };
}
