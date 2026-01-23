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
 * @param workbenchKey - The workbench ID to set as current
 */
export function setSelectedBenchEditorKey(workbenchKey: BenchKey): void {
	const safeData = new ResultPipeline('[PageCommands → setSelectedBenchEditorKey]')
		.validate({
			workbenchKey: validateBenchKey(workbenchKey),
		})
		.execute();
	if (!safeData) return;

	useBenchEditorStore.getState().setSelectedKey(safeData.workbenchKey);
}
