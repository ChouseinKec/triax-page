// Stores
import { useLayoutStore } from '@/src/state/layout/layout';

// Types
import type { BarInstance } from '@/src/core/layout/bar/types';
import type { WorkbenchKey } from '@/src/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateWorkbenchKey } from '@/src/core/layout/workbench/helpers';
import { pickBarsByWorkbench } from '@/src/core/layout/bar/helpers/pickers';

/**
 * Gets all bar instances filtered by workbench ID for layout queries.
 * Returns an array of bars associated with the specified workbench.
 *
 * @param workbenchKey - The workbench identifier to filter bars
 * @returns Array of bar instances or undefined if validation fails
 *
 * @example
 * const bars = getBarsByWorkbench('workbench-123') // Returns bars for specific workbench
 */
export function getBarsByWorkbench(workbenchKey: WorkbenchKey): BarInstance[] | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeParams = new ResultPipeline('[LayoutQueries → getBarsByWorkbench]')
		.validate({
			workbenchKey: validateWorkbenchKey(workbenchKey),
		})
		.pick((data) => ({
			barsByWorkbench: pickBarsByWorkbench(data.workbenchKey, layoutStore.allBars),
		}))
		.execute();
	if (!safeParams) return undefined;

	return safeParams.barsByWorkbench;
}
