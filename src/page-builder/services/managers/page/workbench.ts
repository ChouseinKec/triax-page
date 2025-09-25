// Stores
import usePageStore from '@/src/page-builder/state/stores/page';

// Types
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

/**
 * Reactive hook to get the current workbench.
 * @returns The current workbench ID
 */
export function useSelectedWorkbenchID() {
	return usePageStore((state) => state.selectedWorkbenchID);
}

/**
 * Gets the current workbench.
 * @returns The current workbench ID
 */
export function getSelectedWorkbenchID() {
	return usePageStore.getState().selectedWorkbenchID;
}

/**
 * Sets the current workbench by ID.
 * @param id - The workbench ID to set
 */
export function setSelectedWorkbenchID(workbenchID: WorkbenchID) {
	usePageStore.getState().setSelectedWorkbenchID(workbenchID);
}