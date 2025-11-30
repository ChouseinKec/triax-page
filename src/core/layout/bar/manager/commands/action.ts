// Stores
import { useLayoutStore } from '@/src/core/layout/store';

// Types
import type {  BarActionID, BarID, BarActionInstance} from '@/src/core/layout/bar/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateBarActionInstance, validateBarID, validateBarActionID} from '@/src/core/layout/bar/helper/validators';
import { fetchBar } from '@/src/core/layout/bar/helper/fetchers';

/**
 * Registers a new action instance to a bar for layout commands.
 * Adds the action to the bar's actions collection if it doesn't already exist.
 *
 * @param barID - The bar identifier to register the action for
 * @param action - The action instance to register
 * @returns void
 *
 * @example
 * registerBarAction('bar-123', { id: 'action-456', ... }) // Registers action to bar
 */
export function registerBarAction(barID: BarID, action: BarActionInstance): void {
    const layoutStore = useLayoutStore.getState();
    const safeData = new ResultPipeline('[LayoutCommands → registerBarAction]')
        .validate({
            barID: validateBarID(barID),
            action: validateBarActionInstance(action),
        })
        .pick((data) => ({
            bar: fetchBar(data.barID, layoutStore.allBars),
        }))
        .execute();
    if (!safeData) return;
    if (safeData.bar.actions[action.id]) return devLog.warn(`[LayoutCommands → registerBarAction] Action with ID "${action.id}" already exists in bar "${barID}". Skipping.`);

    layoutStore.registerBarAction(barID, action);
}

/**
 * Unregisters an action from a bar for layout commands.
 * Removes the specified action from the bar's actions collection.
 *
 * @param barID - The bar identifier
 * @param actionID - The action identifier to unregister
 * @returns void
 *
 * @example
 * unregisterBarAction('bar-123', 'action-456') // Removes action from bar
 */
export function unregisterBarAction(barID: BarID, actionID: BarActionID): void {
    const layoutStore = useLayoutStore.getState();
    const safeData = new ResultPipeline('[LayoutCommands → unregisterBarAction]')
        .validate({
            barID: validateBarID(barID),
            actionID: validateBarActionID(actionID),
        })
        .pick((data) => ({
            bar: fetchBar(data.barID, layoutStore.allBars),
        }))
        .execute();
    if (!safeData) return;
    if (!safeData.bar.actions[actionID]) return devLog.warn(`[LayoutCommands → unregisterBarAction] Action with ID "${safeData.actionID}" not found in bar "${safeData.barID}". Skipping.`);

    layoutStore.unregisterBarAction(safeData.barID, safeData.actionID);
}
