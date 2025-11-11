// Types
import type { BarID, BarInstance, BarActionInstance, BarRecord, InfoRecord, PanelRecord } from '@/src/page/layout/core/types';
import type { InfoID, InfoInstance } from '@/src/page/layout/core/types';
import type { PanelID, PanelInstance } from '@/src/page/layout/core/types';
import type { FetchResult } from '@/src/shared/types/result';
import type { WorkbenchID } from '@/src/page/core/workbench/types';

/**
 * Fetches a bar instance from the layout store by its ID.
 * Returns a result object indicating success with the bar data or failure with an error message.
 * @param barID - The unique identifier of the bar to fetch
 * @param layoutStore - The layout store instance
 * @returns FetchResult containing the bar instance or error message
 * @example
 * fetchBar('bar-123', useLayoutStore.getState()) → { success: true, data: BarInstance }
 * fetchBar('invalid-id', useLayoutStore.getState()) → { success: false, error: 'Bar not found...' }
 */
export function fetchBar(barID: BarID, allBars: BarRecord): FetchResult<BarInstance> {
	const bar = allBars[barID];
	if (!bar) return { success: false, error: `Bar not found: '${barID}' does not exist in the layout store` };

	return { success: true, data: bar };
}

/**
 * Fetches all bar instances filtered by workbench ID from the layout store.
 * Returns a result object indicating success with the filtered bars or failure with an error message.
 * @param workbenchID - The workbench identifier to filter bars
 * @param layoutStore - The layout store instance
 * @returns FetchResult containing the filtered bar instances array or error message
 * @example
 * fetchBarsByWorkbench('workbench-123', useLayoutStore.getState()) → { success: true, data: BarInstance[] }
 * fetchBarsByWorkbench('invalid-workbench', useLayoutStore.getState()) → { success: true, data: [] }
 */
export function fetchBarsByWorkbench(workbenchID: WorkbenchID, allBars: BarRecord): FetchResult<BarInstance[]> {
	const workbenchBars = Object.values(allBars).filter((bar: BarInstance) => bar.workbenchID === workbenchID);
	if (!workbenchBars) return { success: false, error: `No bars found for workbench: '${workbenchID}'` };

	return { success: true, data: workbenchBars };
}

/**
 * Fetches all action instances for a specific bar from the layout store.
 * Returns a result object indicating success with the bar actions or failure with an error message.
 * @param barID - The unique identifier of the bar to fetch actions from
 * @param layoutStore - The layout store instance
 * @returns FetchResult containing the bar actions array or error message
 * @example
 * fetchBarActions('bar-123', useLayoutStore.getState()) → { success: true, data: BarActionInstance[] }
 * fetchBarActions('invalid-id', useLayoutStore.getState()) → { success: false, error: 'Bar not found...' }
 */
export function fetchBarActions(barID: BarID, allBars: BarRecord): FetchResult<BarActionInstance[]> {
	const barResult = fetchBar(barID, allBars);
	if (!barResult.success) return barResult;

	const actions = Object.values(barResult.data.actions);
	if (!actions) return { success: false, error: `No actions found for bar: '${barID}'` };

	return { success: true, data: actions };
}

/**
 * Fetches an info instance from the layout store by its ID.
 * Returns a result object indicating success with the info data or failure with an error message.
 * @param infoID - The unique identifier of the info to fetch
 * @param layoutStore - The layout store instance
 * @returns FetchResult containing the info instance or error message
 * @example
 * fetchInfo('info-123', useLayoutStore.getState()) → { success: true, data: InfoInstance }
 * fetchInfo('invalid-id', useLayoutStore.getState()) → { success: false, error: 'Info not found...' }
 */
export function fetchInfo(infoID: InfoID, allInfos: InfoRecord): FetchResult<InfoInstance> {
	const info = allInfos[infoID];
	if (!info) return { success: false, error: `Info not found: '${infoID}' does not exist in the layout store` };

	return { success: true, data: info };
}

/**
 * Fetches all info instances filtered by workbench ID from the layout store.
 * Returns a result object indicating success with the filtered infos or failure with an error message.
 * @param workbenchID - The workbench identifier to filter infos
 * @param layoutStore - The layout store instance
 * @returns FetchResult containing the filtered info instances array or error message
 * @example
 * fetchInfosByWorkbench('workbench-123', useLayoutStore.getState()) → { success: true, data: InfoInstance[] }
 * fetchInfosByWorkbench('invalid-workbench', useLayoutStore.getState()) → { success: true, data: [] }
 */
export function fetchInfosByWorkbench(workbenchID: WorkbenchID, allInfos: InfoRecord): FetchResult<InfoInstance[]> {
	const workbenchInfos = Object.values(allInfos).filter((info: InfoInstance) => info.workbenchID === workbenchID);
	if (!workbenchInfos) return { success: false, error: `No infos found for workbench: '${workbenchID}'` };

	return { success: true, data: workbenchInfos };
}

/**
 * Fetches a panel instance from the layout store by its ID.
 * Returns a result object indicating success with the panel data or failure with an error message.
 * @param panelID - The unique identifier of the panel to fetch
 * @param layoutStore - The layout store instance
 * @returns FetchResult containing the panel instance or error message
 * @example
 * fetchPanel('panel-123', useLayoutStore.getState()) → { success: true, data: PanelInstance }
 * fetchPanel('invalid-id', useLayoutStore.getState()) → { success: false, error: 'Panel not found...' }
 */
export function fetchPanel(panelID: PanelID, allPanels: PanelRecord): FetchResult<PanelInstance> {
	const panel = allPanels[panelID];
	if (!panel) return { success: false, error: `Panel not found: '${panelID}' does not exist in the layout store` };

	return { success: true, data: panel };
}
