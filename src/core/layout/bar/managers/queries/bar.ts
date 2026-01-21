// Stores
import { useBarStore } from '@/core/layout/bar/state/store';

// Types
import type { BarInstance } from '@/core/layout/bar/types';
import type { BenchKey } from '@/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateBenchKey } from '@/core/layout/workbench/helpers';
import { pickBarsByWorkbench } from '@/core/layout/bar/helpers/pickers';

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
export function getBarsByWorkbench(workbenchKey: BenchKey): BarInstance[] | undefined {
	const barStore = useBarStore.getState();
	const safeParams = new ResultPipeline('[LayoutQueries → getBarsByWorkbench]')
		.validate({
			workbenchKey: validateBenchKey(workbenchKey),
		})
		.pick((data) => ({
			barsByWorkbench: pickBarsByWorkbench(data.workbenchKey, barStore.allBars),
		}))
		.execute();
	if (!safeParams) return undefined;

	return safeParams.barsByWorkbench;
}
