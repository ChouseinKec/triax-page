// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { PseudoKey } from '@/src/core/layout/page/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validatePseudoKey } from '@/src/core/layout/page/helpers/validators';

// Managers
import { getDefaultPseudoKey } from '@/src/core/layout/page/managers/queries';

/**
 * Sets the currently selected pseudo by ID for page commands.
 * Updates the page store with the new pseudo selection.
 *
 * @param pseudoKey - The pseudo ID to set as current
 */
export function setSelectedPseudoKey(pseudoKey: PseudoKey): void {
	if (!pseudoKey) pseudoKey = getDefaultPseudoKey();
	const safeData = new ResultPipeline('[PageCommands → setSelectedPseudoKey]')
		.validate({
			pseudoKey: validatePseudoKey(pseudoKey),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelected({ pseudoKey: safeData.pseudoKey });
}
