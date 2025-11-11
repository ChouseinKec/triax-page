// Types
import type { WorkbenchDefinition } from '@/src/page/core/workbench/types';
import type { FetchResult } from '@/src/shared/types/result';

// Registries
import { getRegisteredWorkbenchs } from '@/src/page/state/registries/workbench';


/**
 * Fetches all workbench definitions from the workbench registry.
 * Returns a result object indicating success with all workbench data or failure with an error message.
 * @returns FetchResult containing all workbench definitions or error message
 * @example
 * fetchAllWorkbenches() → { success: true, data: Record<string, WorkbenchDefinition> }
 */
export function fetchAllWorkbenches(): FetchResult<Record<string, WorkbenchDefinition>> {
	const workbenches = getRegisteredWorkbenchs();
	if (!workbenches) return { success: false, error: `No workbenches found in the workbench registry` };

    return { success: true, data: workbenches };
}

