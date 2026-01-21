// Stores
import { useWorkbenchStore } from '@/core/layout/workbench/state/store';

// Types
import type { BenchKey } from '@/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateBenchKey } from '@/core/layout/workbench/helpers/validators';

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
