// Stores
import { useLayoutStore } from '@/src/page-builder/state/stores/layout';

// React
import { useMemo } from 'react';

// Types
import type { PanelID, PanelInstance, TabInstance } from '@/src/page-builder/core/editor/layout/types';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Toggles the open state of a panel.
 * @param panelID - The panel identifier to toggle
 * @example
 * togglePanel('panel-123'); // Toggles the panel open/closed
 */
export function togglePanel(panelID: PanelID) {
    if (!panelID || typeof panelID !== "string") {
        devLog.error("[PanelManager → togglePanel] Panel ID is required to toggle a panel.");
        return;
    }

    const store = useLayoutStore.getState();
    const panel = store.layoutPanels[panelID];
    if (!panel) {
        devLog.error(`[PanelManager → togglePanel] Panel with ID "${panelID}" not found. Skipping toggle.`);
        return;
    }

    store.updatePanel(panelID, { isOpen: !panel.isOpen });
}

/**
 * Gets a panel instance by its ID.
 * @param panelID - The panel identifier
 * @returns The panel instance or undefined if not found
 * @example
 * const panel = getPanelById('panel-123');
 */
export function getPanelById(panelID: PanelID): PanelInstance | undefined {
    const store = useLayoutStore.getState();
    return store.layoutPanels[panelID];
}

/**
 * Gets all tabs for a specific panel.
 * @param panelID - The panel identifier
 * @returns Array of tab instances
 * @example
 * const tabs = getPanelTabs('panel-123');
 */
export function getPanelTabs(panelID: PanelID): TabInstance[] {
    const store = useLayoutStore.getState();
    const panel = store.layoutPanels[panelID];
    if (!panel) return [];
    return Object.values(panel.tabs);
}

/**
 * Gets all panels, optionally filtered by workbench.
 * @param workbenchID - Optional workbench identifier to filter panels
 * @returns Array of panel instances
 * @example
 * const allPanels = getAllPanels();
 * const workbenchPanels = getAllPanels('workbench-123');
 */
export function getAllPanels(workbenchID?: WorkbenchID): PanelInstance[] {
    const store = useLayoutStore.getState();
    const panels = Object.values(store.layoutPanels);
    if (!workbenchID) return panels;
    return panels.filter((p: PanelInstance) => p.workbenchID === workbenchID);
}

/**
 * Gets all open panels, optionally filtered by workbench.
 * @param workbenchID - Optional workbench identifier to filter panels
 * @returns Array of open panel instances
 * @example
 * const openPanels = getOpenPanels();
 * const openWorkbenchPanels = getOpenPanels('workbench-123');
 */
export function getOpenPanels(workbenchID?: WorkbenchID): PanelInstance[] {
    const store = useLayoutStore.getState();
    const panels = Object.values(store.layoutPanels).filter((p: PanelInstance) => p.isOpen);
    if (!workbenchID) return panels;
    return panels.filter((p: PanelInstance) => p.workbenchID === workbenchID);
}

/**
 * Reactive hook to get all panels, optionally filtered by workbench.
 * @param workbenchID - Optional workbench identifier to filter panels
 * @returns Reactive array of panel instances
 * @example
 * const allPanels = useAllPanels();
 * const workbenchPanels = useAllPanels('workbench-123');
 */
export function useAllPanels(workbenchID?: WorkbenchID): PanelInstance[] {
    const panels = useLayoutStore(state => state.layoutPanels);

    return useMemo(() => {
        const all = Object.values(panels);
        if (!workbenchID) return all;
        return all.filter((p: PanelInstance) => p.workbenchID === workbenchID);
    }, [panels, workbenchID]);
}

/**
 * Reactive hook to get all open panels, optionally filtered by workbench.
 * @param workbenchID - Optional workbench identifier to filter panels
 * @returns Reactive array of open panel instances
 * @example
 * const openPanels = useOpenPanels();
 * const openWorkbenchPanels = useOpenPanels('workbench-123');
 */
export function useOpenPanels(workbenchID?: WorkbenchID): PanelInstance[] {
    const panels = useLayoutStore(state => state.layoutPanels);

    return useMemo(() => {
        const all = Object.values(panels).filter((p: PanelInstance) => p.isOpen);
        if (!workbenchID) return all;
        return all.filter((p: PanelInstance) => p.workbenchID === workbenchID);
    }, [panels, workbenchID]);
}

