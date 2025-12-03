// Types
import type { WorkbenchID } from 'src/core/layout/workbench/types';

// Stores
import { usePageStore } from '@/src/state/layout/page';

/**
 * Gets the currently selected workbench ID for page queries.
 */
export function getSelectedWorkbenchID(): WorkbenchID {
	return usePageStore.getState().selected.workbenchID;
}
