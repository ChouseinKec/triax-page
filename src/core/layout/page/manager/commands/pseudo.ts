// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { PseudoID } from '@/src/core/layout/page/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validatePseudoID } from '@/src/core/layout/page/helper/validators';

// Managers
import { getDefaultPseudoID } from '@/src/core/layout/page/manager/queries';

/**
 * Sets the currently selected pseudo by ID for page commands.
 * Updates the page store with the new pseudo selection.
 *
 * @param pseudoID - The pseudo ID to set as current
 * @returns void
 *
 * @example
 * setSelectedPseudoID('hover') // Sets current pseudo to hover
 */
export function setSelectedPseudoID(pseudoID: PseudoID): void {
	if (!pseudoID) pseudoID = getDefaultPseudoID();
	const safeData = new ResultPipeline('[PageCommands → setSelectedPseudoID]')
		.validate({
			pseudoID: validatePseudoID(pseudoID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelected({ pseudoID: safeData.pseudoID });
}
