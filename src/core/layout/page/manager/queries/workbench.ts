// Types
import type { WorkbenchID } from 'src/core/layout/workbench/types';

// Stores
import { usePageStore } from '@/src/core/store';

/**
 * Gets the currently selected workbench ID for page queries.
 */
export function getSelectedWorkbenchID(): WorkbenchID {
	return usePageStore.getState().selected.workbenchID;
}
