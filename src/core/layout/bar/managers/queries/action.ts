// Stores
import { useBarStore } from '@/core/layout/bar/state/store';

// Types
import type { BarID } from '@/core/layout/bar/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateBarID } from '@/core/layout/bar/helpers/validators';
import { pickBarActions } from '@/core/layout/bar/helpers/pickers';

/**
 * Checks if a specific action is registered in a bar for layout queries.
 * Returns true if the action exists in the bar's actions collection.
 *
 * @param barID - The bar identifier
 * @param actionID - The action identifier to check
 */
export function isBarActionRegistered(barID: BarID, actionID: string): boolean {
	const barStore = useBarStore.getState();
	const safeParams = new ResultPipeline('[LayoutQueries → isBarActionRegistered]')
		.validate({
			barID: validateBarID(barID),
		})
		.pick((data) => ({
			barActions: pickBarActions(data.barID, barStore.allBars),
		}))
		.execute();
	if (!safeParams) return false;

	return safeParams.barActions.some((action) => action.id === actionID);
}
