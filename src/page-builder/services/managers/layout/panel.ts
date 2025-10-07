import { useMemo } from 'react';

// Stores
import { useLayoutStore } from '@/src/page-builder/state/stores/layout';

// Helpers
import { validatePanelID } from '@/src/page-builder/services/helpers/layout';
import { validateWorkbenchID } from '@/src/page-builder/services/helpers/workbench';

// Types
import type { PanelID, PanelInstance } from '@/src/page-builder/core/editor/layout/types';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { validateOrLog } from '@/src/shared/utilities/validation';

/**
 * Toggles the open/closed state of a panel for layout management operations.
 * Switches the panel's isOpen property between true and false.
 *
 * @param panelID - The panel identifier to toggle
 * @returns void
 *
 * @example
 * togglePanel('panel-123') // Toggles panel open/closed state
 */
export function togglePanel(panelID: PanelID): void {
	const safeParams = validateOrLog({ panelID: validatePanelID(panelID) }, `[LayoutManager → togglePanel]`);
	if (!safeParams) return;

	const store = useLayoutStore.getState();
	const panel = store.getPanel(safeParams.panelID);
	if (!panel) return devLog.error(`[LayoutManager → togglePanel] Panel with ID "${safeParams.panelID}" not found.`);

	store.updatePanel(safeParams.panelID, { isOpen: !panel.isOpen });
}

/**
 * Gets a panel instance by its unique identifier for layout management operations.
 * Retrieves the complete panel object from the layout store.
 *
 * @param panelID - The panel identifier
 * @returns The panel instance or undefined if not found or validation fails
 *
 * @example
 * const panel = getPanelById('panel-123') // Returns panel instance or undefined
 */
export function getPanelById(panelID: PanelID): PanelInstance | undefined {
	const safeParams = validateOrLog({ panelID: validatePanelID(panelID) }, `[LayoutManager → getPanelById]`);
	if (!safeParams) return;

	return useLayoutStore.getState().getPanel(safeParams.panelID);
}

/**
 * Reactive hook to get all panel instances filtered by workbench for layout management operations.
 * Returns a memoized array of panels associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter panels
 * @returns Reactive array of panel instances or undefined if validation fails
 *
 * @example
 * const panels = useAllPanels('workbench-123') // Returns all panels for workbench
 */
export function useAllPanels(workbenchID: WorkbenchID): PanelInstance[] | undefined {
	const safeParams = validateOrLog({ workbenchID: validateWorkbenchID(workbenchID) }, `[LayoutManager → useAllPanels]`);
	if (!safeParams) return;

	const panels = useLayoutStore((state) => state.layoutPanels);

	return useMemo(() => {
		const all = Object.values(panels);
		return all.filter((p: PanelInstance) => p.workbenchID === safeParams.workbenchID);
	}, [panels, safeParams.workbenchID]);
}

/**
 * Reactive hook to get all open panel instances filtered by workbench for layout management operations.
 * Returns a memoized array of panels that are currently open and associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter panels
 * @returns Reactive array of open panel instances or undefined if validation fails
 *
 * @example
 * const openPanels = useOpenPanels('workbench-123') // Returns open panels for workbench
 */
export function useOpenPanels(workbenchID: WorkbenchID): PanelInstance[] | undefined {
	const safeParams = validateOrLog({ workbenchID: validateWorkbenchID(workbenchID) }, `[LayoutManager → useOpenPanels]`);
	if (!safeParams) return;

	const panels = useLayoutStore((state) => state.layoutPanels);

	return useMemo(() => {
		const all = Object.values(panels).filter((p: PanelInstance) => p.isOpen);
		return all.filter((p: PanelInstance) => p.workbenchID === safeParams.workbenchID);
	}, [panels, safeParams.workbenchID]);
}
