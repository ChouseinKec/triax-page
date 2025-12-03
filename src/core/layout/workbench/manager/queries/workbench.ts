// Types
import type { WorkbenchInstance, WorkbenchID } from '@/src/core/layout/workbench/types';

// Registry
import { getRegisteredWorkbenchs } from '@/src/core/layout/workbench/registry';

// Constants
import { DEFAULT_WORKBENCH_ID } from '@/src/core/layout/workbench/constants';

// Stores
import { usePageStore } from '@/src/state/layout/page';

/**
 * Gets the currently selected workbench ID from the page store for page queries.
 */
export function getWorkbenchSelectedID(): WorkbenchID {
	return usePageStore.getState().selected.workbenchID;
}

/**
 * Gets all available device definitions for page queries.
 */
export function getWorkbenchInstances(): WorkbenchInstance[] {
	return Object.values(getRegisteredWorkbenchs());
}

/**
 * Gets a specific workbench definition by its ID.
 *
 * @param workbenchID - The ID of the workbench to retrieve.
 */
export function getWorkbenchInstance(workbenchID: WorkbenchID): WorkbenchInstance | null {
	const workbenchs = getRegisteredWorkbenchs();
	return workbenchs[workbenchID] || null;
}

/**
 * Gets the default workbench ID used for page layout and style fallbacks.
 */
export function getWorkbenchDefaultID(): WorkbenchID {
	return DEFAULT_WORKBENCH_ID;
}
