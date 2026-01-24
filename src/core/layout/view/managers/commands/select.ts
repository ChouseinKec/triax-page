// Stores
import { useViewEditorStore } from '@/core/layout/view/state/store';

// Types
import type { ViewKey } from '@/core/layout/view/types';
import type { BenchKey } from '@/core/layout/bench/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateObject } from '@/shared/helpers';

// Helpers
import { validateViewKey } from '@/core/layout/view/helpers/validators';
import { validateBenchKey } from '@/core/layout/bench/helpers/validators';

/**
 * Sets the currently selected view for a specific bench.
 * Updates the viewport store with the new view selection for the given bench.
 *
 * @param benchKey - The bench key
 * @param viewKey - The view key to set as current for the bench
 */
export function setSelectedViewKey(benchKey: BenchKey, viewKey: ViewKey): void {
	const safeData = new ResultPipeline('[ViewEditorCommands → setSelectedViewKey]')
		.validate({
			viewKey: validateViewKey(viewKey),
			benchKey: validateBenchKey(benchKey),
			currentKeys: validateObject<Record<BenchKey, ViewKey>>(useViewEditorStore.getState().data.global?.selectedKeys),
		})
		.execute();
	if (!safeData) return;

	useViewEditorStore.setState((state) => ({
		data: {
			...state.data,
			global: {
				...state.data.global,
				selectedKeys: {
					...safeData.currentKeys,
					[safeData.benchKey]: safeData.viewKey,
				},
			},
		},
	}));
}
