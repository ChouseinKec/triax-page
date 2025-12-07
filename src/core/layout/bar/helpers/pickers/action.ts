// Types
import type { BarID, BarActionInstance, BarRecord } from '@/src/core/layout/bar/types';
import type { PickResult } from '@/src/shared/types/result';

// Helper
import { pickBar } from '@/src/core/layout/bar/helpers/pickers/bar';

/**
 * Fetches all action instances for a specific bar from the layout store.
 * Returns a result object indicating success with the bar actions or failure with an error message.
 * @param barID - The unique identifier of the bar to fetch actions from
 * @param layoutStore - The layout store instance
 */
export function pickBarActions(barID: BarID, allBars: BarRecord): PickResult<BarActionInstance[]> {
	const barResult = pickBar(barID, allBars);
	if (!barResult.success) return barResult;

	const actions = Object.values(barResult.data.actions);
	if (!actions) return { success: false, error: `No actions found for bar: '${barID}'` };

	return { success: true, data: actions };
}
