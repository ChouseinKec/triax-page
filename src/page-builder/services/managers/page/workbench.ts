// Stores
import { usePageStore } from '@/src/page-builder/state/stores/page';

// Types
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateWorkbenchID } from '@/src/page-builder/services/helpers/validate';

/**
 * Reactive hook to get the currently selected workbench ID for page management operations.
 * Returns the workbench identifier from the page store state.
 *
 * @returns The current workbench ID
 *
 * @example
 * const workbenchID = useSelectedWorkbenchID() // Returns 'workbench-123'
 */
export function useSelectedWorkbenchID(): WorkbenchID {
	return usePageStore((state) => state.selectedWorkbenchID);
}

/**
 * Sets the currently selected workbench by ID for page management operations.
 * Updates the page store with the new workbench selection.
 *
 * @param workbenchID - The workbench ID to set as current
 * @returns void
 *
 * @example
 * setSelectedWorkbenchID('workbench-123') // Sets current workbench to workbench-123
 */
export function setSelectedWorkbenchID(workbenchID: WorkbenchID): void {
	const safeData = new ValidationPipeline('[PageManager → setSelectedWorkbenchID]')
		.validate({
			workbenchID: validateWorkbenchID(workbenchID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelectedWorkbenchID(safeData.workbenchID);
}
