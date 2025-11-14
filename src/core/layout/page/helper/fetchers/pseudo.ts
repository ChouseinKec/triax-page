import type { PseudoID, PseudoInstance } from '@/src/core/layout/page/types';
import type { FetchResult } from '@/src/shared/types/result';

// REGISTRY_DEFINITIONS
import { getRegisteredPseudo } from '@/src/core/layout/page/registry';

/**
 * Fetches a pseudo instance from the pseudo registry by its ID.
 * Returns a result object indicating success with the pseudo data or failure with an error message.
 * @param pseudoID - The unique identifier of the pseudo to fetch
 * @returns FetchResult containing the pseudo instance or error message
 * @example
 * fetchPseudo('hover') → { success: true, data: PseudoInstance }
 * fetchPseudo('invalid-id') → { success: false, error: 'Pseudo not found...' }
 */
export function fetchPseudo(pseudoID: PseudoID): FetchResult<PseudoInstance> {
    const pseudo = getRegisteredPseudo(pseudoID);
    if (!pseudo) return { success: false, error: `Pseudo not found: '${pseudoID}' does not exist in the pseudo registry` };

    return { success: true, data: pseudo };
}
