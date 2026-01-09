// Types
import type { BarID, BarInstance, BarRecord } from '@/src/core/layout/bar/types';
import type { PickResult } from '@/src/shared/types/result';
import type { WorkbenchKey } from '@/src/core/layout/workbench/types';

/**
 * Fetches a bar instance from the layout store by its ID.
 * Returns a result object indicating success with the bar data or failure with an error message.
 * @param barID - The unique identifier of the bar to fetch
 * @param layoutStore - The layout store instance
 */
export function pickBar(barID: BarID, allBars: BarRecord): PickResult<BarInstance> {
	const bar = allBars[barID];
	if (!bar) return { success: false, error: `Bar not found: '${barID}' does not exist in the layout store` };

	return { success: true, data: bar };
}

/**
 * Fetches all bar instances filtered by workbench ID from the layout store.
 * Returns a result object indicating success with the filtered bars or failure with an error message.
 * @param workbenchKey - The workbench identifier to filter bars
 * @param layoutStore - The layout store instance
 */
export function pickBarsByWorkbench(workbenchKey: WorkbenchKey, allBars: BarRecord): PickResult<BarInstance[]> {
	const workbenchBars = Object.values(allBars).filter((bar: BarInstance) => bar.workbenchKey === workbenchKey);
	if (!workbenchBars) return { success: false, error: `No bars found for workbench: '${workbenchKey}'` };

	return { success: true, data: workbenchBars };
}
