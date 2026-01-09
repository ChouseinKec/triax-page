// Types
import type { WorkbenchKey } from 'src/core/layout/workbench/types';

// Stores
import { usePageStore } from '@/src/state/layout/page';

/**
 * Gets the currently selected workbench ID for page queries.
 */
export function getSelectedWorkbenchID(): WorkbenchKey {
	return usePageStore.getState().selected.workbenchKey;
}
