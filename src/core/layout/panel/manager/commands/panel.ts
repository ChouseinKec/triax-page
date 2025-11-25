// Stores
import { useLayoutStore } from '@/src/core/layout/store';

// Types
import type { PanelID } from '@/src/core/layout/panel/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/pipeline/validation';

// Helpers
import { validatePanelID } from '@/src/core/layout/panel/helper/validators';
import { fetchPanel } from '@/src/core/layout/panel/helper/fetchers';

/**
 * Toggles the open/closed state of a panel for layout commands.
 * Switches the panel's isOpen property between true and false.
 *
 * @param panelID - The panel identifier to toggle
 * @returns void
 *
 * @example
 * togglePanel('panel-123') // Toggles panel open/closed state
 */
export function togglePanel(panelID: PanelID): void {
    const layoutStore = useLayoutStore.getState();
    const safeData = new ValidationPipeline('[LayoutCommands → togglePanel]')
        .validate({
            panelID: validatePanelID(panelID),
        })
        .fetch((data) => ({
            panel: fetchPanel(data.panelID, layoutStore.allPanels),
        }))
        .execute();
    if (!safeData) return;

    layoutStore.updatePanel(safeData.panelID, { isOpen: !safeData.panel.isOpen });
}
