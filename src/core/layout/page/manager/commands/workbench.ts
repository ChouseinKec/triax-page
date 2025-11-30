// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { WorkbenchID } from '@/src/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateWorkbenchID } from '@/src/core/layout/workbench/helper/validators';

/**
 * Sets the currently selected workbench by ID for page commands.
 * Updates the page store with the new workbench selection.
 *
 * @param workbenchID - The workbench ID to set as current
 * @returns void
 *
 * @example
 * setSelectedWorkbenchID('workbench-123') // Sets current workbench to workbench-123
 */
export function setSelectedWorkbenchID(workbenchID: WorkbenchID): void {
    const safeData = new ResultPipeline('[PageCommands → setSelectedWorkbenchID]')
        .validate({
            workbenchID: validateWorkbenchID(workbenchID),
        })
        .execute();
    if (!safeData) return;

    usePageStore.getState().setSelected({ workbenchID: safeData.workbenchID });
}
