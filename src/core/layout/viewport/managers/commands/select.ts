// Stores
import { useViewportStore } from '@/core/layout/viewport/state/store';

// Types
import type { ViewKey } from '@/core/layout/viewport/types';
import type { BenchKey } from '@/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateViewKey } from '@/core/layout/viewport/helpers/validators';
import { validateBenchKey } from '@/core/layout/workbench/helpers/validators';

/**
 * Sets the currently selected view for a specific bench.
 * Updates the viewport store with the new view selection for the given bench.
 *
 * @param benchKey - The bench key
 * @param viewKey - The view key to set as current for the bench
 */
export function setSelectedViewKey(benchKey: BenchKey, viewKey: ViewKey): void {
	const safeData = new ResultPipeline('[ViewportCommands → setSelectedViewKey]')
		.validate({
			viewKey: validateViewKey(viewKey),
			benchKey: validateBenchKey(benchKey),
		})
		.execute();
	if (!safeData) return;

	useViewportStore.getState().setSelectedKey(safeData.benchKey, safeData.viewKey);
}
