// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { WorkbenchKey, WorkbenchDefinition } from '@/src/core/layout/workbench/types';

// Registry
import { getRegisteredWorkbench } from '@/src/core/layout/workbench/registries';

/**
 * Reactive hook to get the currently selected workbench ID for page queries.
 * Returns the workbench identifier from the page store state.
 *
 * @returns The current workbench ID
 *
 * @example
 * const workbenchKey = useSelectedWorkbenchKey() // Returns 'workbench-123'
 */
export function useSelectedWorkbenchKey(): WorkbenchKey {
	return usePageStore((state) => state.selected.workbenchKey);
}

export function useSelectedWorkbench(): WorkbenchDefinition | undefined {
	const selectedWorkbenchKey = usePageStore((state) => state.selected.workbenchKey);
	return getRegisteredWorkbench(selectedWorkbenchKey);
}
