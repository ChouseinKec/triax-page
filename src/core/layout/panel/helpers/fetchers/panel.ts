// Types
import type { PanelRecord, PanelID, PanelInstance } from '@/src/core/layout/panel/types';
import type { PickResult } from '@/src/shared/types/result';

/**
 * Fetches a panel instance from the layout store by its ID.
 * Returns a result object indicating success with the panel data or failure with an error message.
 * @param panelID - The unique identifier of the panel to fetch
 * @param layoutStore - The layout store instance
 * @returns PickResult containing the panel instance or error message
 * @example
 * fetchPanel('panel-123', useLayoutStore.getState()) → { success: true, data: PanelInstance }
 * fetchPanel('invalid-id', useLayoutStore.getState()) → { success: false, error: 'Panel not found...' }
 */
export function fetchPanel(panelID: PanelID, allPanels: PanelRecord): PickResult<PanelInstance> {
    const panel = allPanels[panelID];
    if (!panel) return { success: false, error: `Panel not found: '${panelID}' does not exist in the layout store` };

    return { success: true, data: panel };
}
