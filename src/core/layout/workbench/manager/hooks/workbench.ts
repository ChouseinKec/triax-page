// Helpers
import { fetchAllWorkbenches } from '@/src/core/layout/workbench/helper/fetchers';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Types
import type { WorkbenchDefinition } from '@/src/core/layout/workbench/types';

/**
 * Reactive hook to get all registered workbenches.
 * Returns a stable reference to the workbenches record.
 *
 * @returns Record of all registered workbenches keyed by their IDs
 */
export function useWorkbenchs(): Record<string, WorkbenchDefinition> {
    const safeData = new ValidationPipeline('[WorkbenchManager → useWorkbenchs]')
        .fetch(() => ({
            workbenches: fetchAllWorkbenches(),
        }))
        .execute();
    if (!safeData) return {};

    return safeData.workbenches;
}
