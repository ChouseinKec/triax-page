// Stores
import { useLayoutStore } from '@/src/core/layout/store';

// Types
import type { BarID } from '@/src/core/layout/bar/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateBarID } from '@/src/core/layout/bar/helper/validators';
import { fetchBarActions } from '@/src/core/layout/bar/helper/fetchers';

/**
 * Checks if a specific action is registered in a bar for layout queries.
 * Returns true if the action exists in the bar's actions collection.
 *
 * @param barID - The bar identifier
 * @param actionID - The action identifier to check
 * @returns True if the action is registered, false otherwise
 *
 * @example
 * const isRegistered = isBarActionRegistered('bar-123', 'action-456') // Returns true/false
 */
export function isBarActionRegistered(barID: BarID, actionID: string): boolean {
	const layoutStore = useLayoutStore.getState();
	const safeParams = new ValidationPipeline('[LayoutQueries → isBarActionRegistered]')
		.validate({
			barID: validateBarID(barID),
		})
		.fetch((data) => ({
			barActions: fetchBarActions(data.barID, layoutStore.allBars),
		}))
		.execute();
	if (!safeParams) return false;

	return safeParams.barActions.some((action) => action.id === actionID);
}
