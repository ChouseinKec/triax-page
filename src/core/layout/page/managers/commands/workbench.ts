// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { WorkbenchKey } from '@/src/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateWorkbenchKey } from '@/src/core/layout/workbench/helpers/validators';

/**
 * Sets the currently selected workbench by ID for page commands.
 * Updates the page store with the new workbench selection.
 *
 * @param workbenchKey - The workbench ID to set as current
 * @returns void
 *
 * @example
 * setSelectedWorkbenchID('workbench-123') // Sets current workbench to workbench-123
 */
export function setSelectedWorkbenchID(workbenchKey: WorkbenchKey): void {
    const safeData = new ResultPipeline('[PageCommands → setSelectedWorkbenchID]')
        .validate({
            workbenchKey: validateWorkbenchKey(workbenchKey),
        })
        .execute();
    if (!safeData) return;

    usePageStore.getState().setSelected({ workbenchKey: safeData.workbenchKey });
}
