// Stores
import { useWorkbenchStore } from '@/src/core/layout/workbench/state/store';

// Types
import type { BenchKey } from '@/src/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateBenchKey } from '@/src/core/layout/workbench/helpers/validators';

/**
 * Sets the currently selected workbench by ID for page commands.
 * Updates the page store with the new workbench selection.
 *
 * @param workbenchKey - The workbench ID to set as current
 */
export function setSelectedWorkbenchKey(workbenchKey: BenchKey): void {
	const safeData = new ResultPipeline('[PageCommands → setSelectedWorkbenchKey]')
		.validate({
			workbenchKey: validateBenchKey(workbenchKey),
		})
		.execute();
	if (!safeData) return;

	useWorkbenchStore.getState().setSelectedKey(safeData.workbenchKey);
}
