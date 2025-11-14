// Types
import type { BarID, BarActionInstance, BarRecord } from '@/src/core/layout/bar/types';
import type { FetchResult } from '@/src/shared/types/result';

// Helper
import { fetchBar } from '@/src/core/layout/bar/helper/fetchers/bar';

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
