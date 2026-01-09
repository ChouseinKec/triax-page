// Types
import type { WorkbenchKey } from '@/src/core/layout/workbench/types';

// Stores
import { usePageStore } from '@/src/state/layout/page';

/**
 * Gets the currently selected workbench ID from the page store for page queries.
 */
export function getWorkbenchSelectedKey(): WorkbenchKey {
	return usePageStore.getState().selected.workbenchKey;
}
