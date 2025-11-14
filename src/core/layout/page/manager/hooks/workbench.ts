// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { WorkbenchID } from '@/src/core/layout/workbench/types';


/**
 * Reactive hook to get the currently selected workbench ID for page queries.
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
