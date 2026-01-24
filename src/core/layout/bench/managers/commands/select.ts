// Stores
import { useBenchEditorStore } from '@/core/layout/bench/state/store';

// Types
import type { BenchKey } from '@/core/layout/bench/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateBenchKey } from '@/core/layout/bench/helpers/validators';

/**
 * Sets the currently selected workbench by ID for page commands.
 * Updates the page store with the new workbench selection.
 *
 * @param benchKey - The workbench ID to set as current
 */
export function setSelectedBenchKey(benchKey: BenchKey): void {
	const safeData = new ResultPipeline('[PageCommands → setSelectedBenchKey]')
		.validate({
			benchKey: validateBenchKey(benchKey),
		})
		.execute();
	if (!safeData) return;

	useBenchEditorStore.setState((state) => ({
		data: {
			...state.data,
			global: {
				...state.data.global,
				selectedKey: safeData.benchKey,
			},
		},
	}));
}
