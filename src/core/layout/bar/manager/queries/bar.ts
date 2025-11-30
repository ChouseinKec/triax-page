// Stores
import { useLayoutStore } from '@/src/core/layout/store';

// Types
import type { BarInstance } from '@/src/core/layout/bar/types';
import type { WorkbenchID } from '@/src/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateWorkbenchID } from '@/src/core/layout/workbench/helper';
import { fetchBarsByWorkbench } from '@/src/core/layout/bar/helper/fetchers';

/**
 * Gets all bar instances filtered by workbench ID for layout queries.
 * Returns an array of bars associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter bars
 * @returns Array of bar instances or undefined if validation fails
 *
 * @example
 * const bars = getBarsByWorkbench('workbench-123') // Returns bars for specific workbench
 */
export function getBarsByWorkbench(workbenchID: WorkbenchID): BarInstance[] | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeParams = new ResultPipeline('[LayoutQueries → getBarsByWorkbench]')
		.validate({
			workbenchID: validateWorkbenchID(workbenchID),
		})
		.pick((data) => ({
			barsByWorkbench: fetchBarsByWorkbench(data.workbenchID, layoutStore.allBars),
		}))
		.execute();
	if (!safeParams) return undefined;

	return safeParams.barsByWorkbench;
}
