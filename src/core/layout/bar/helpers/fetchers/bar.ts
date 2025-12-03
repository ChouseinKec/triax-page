// Types
import type { BarID, BarInstance, BarRecord } from '@/src/core/layout/bar/types';
import type { PickResult } from '@/src/shared/types/result';
import type { WorkbenchID } from '@/src/core/layout/workbench/types';

/**
 * Fetches a bar instance from the layout store by its ID.
 * Returns a result object indicating success with the bar data or failure with an error message.
 * @param barID - The unique identifier of the bar to fetch
 * @param layoutStore - The layout store instance
 * @returns PickResult containing the bar instance or error message
 * @example
 * fetchBar('bar-123', useLayoutStore.getState()) → { success: true, data: BarInstance }
 * fetchBar('invalid-id', useLayoutStore.getState()) → { success: false, error: 'Bar not found...' }
 */
export function fetchBar(barID: BarID, allBars: BarRecord): PickResult<BarInstance> {
	const bar = allBars[barID];
	if (!bar) return { success: false, error: `Bar not found: '${barID}' does not exist in the layout store` };

	return { success: true, data: bar };
}

/**
 * Fetches all bar instances filtered by workbench ID from the layout store.
 * Returns a result object indicating success with the filtered bars or failure with an error message.
 * @param workbenchID - The workbench identifier to filter bars
 * @param layoutStore - The layout store instance
 * @returns PickResult containing the filtered bar instances array or error message
 * @example
 * fetchBarsByWorkbench('workbench-123', useLayoutStore.getState()) → { success: true, data: BarInstance[] }
 * fetchBarsByWorkbench('invalid-workbench', useLayoutStore.getState()) → { success: true, data: [] }
 */
export function fetchBarsByWorkbench(workbenchID: WorkbenchID, allBars: BarRecord): PickResult<BarInstance[]> {
	const workbenchBars = Object.values(allBars).filter((bar: BarInstance) => bar.workbenchID === workbenchID);
	if (!workbenchBars) return { success: false, error: `No bars found for workbench: '${workbenchID}'` };

	return { success: true, data: workbenchBars };
}
