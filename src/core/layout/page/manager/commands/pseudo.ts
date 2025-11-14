// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { PseudoID } from '@/src/core/layout/page/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validatePseudoID } from '@/src/core/layout/page/helper/validators';

// Constants
import { DEFAULT_PSEUDO_ID } from '@/src/core/layout/page/constants';

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
	if (!pseudoID) pseudoID = DEFAULT_PSEUDO_ID;
	const safeData = new ValidationPipeline('[PageCommands → setSelectedPseudoID]')
		.validate({
			pseudoID: validatePseudoID(pseudoID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelectedPseudoID(safeData.pseudoID);
}
