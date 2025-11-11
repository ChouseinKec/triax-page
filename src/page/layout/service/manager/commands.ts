// Stores
import { useLayoutStore } from '@/src/page/layout/state/store/layout';

// Types
import type { PanelID, BarActionID, InfoDataID, BarID, BarActionInstance, InfoID, InfoDataInstance } from '@/src/page/layout/core/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateBarActionInstance, validateBarID, validateBarActionID, validateInfoID, validateInfoDataID, validatePanelID } from '@/src/page/layout/service/helper/validate';
import { fetchBar, fetchInfo, fetchPanel } from '@/src/page/layout/service/helper/fetch';

// ------------------------- BAR -------------------------

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
	const safeData = new ValidationPipeline('[LayoutCommands → registerBarAction]')
		.validate({
			barID: validateBarID(barID),
			action: validateBarActionInstance(action),
		})
		.fetch((data) => ({
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
	const safeData = new ValidationPipeline('[LayoutCommands → unregisterBarAction]')
		.validate({
			barID: validateBarID(barID),
			actionID: validateBarActionID(actionID),
		})
		.fetch((data) => ({
			bar: fetchBar(data.barID, layoutStore.allBars),
		}))
		.execute();
	if (!safeData) return;
	if (!safeData.bar.actions[actionID]) return devLog.warn(`[LayoutCommands → unregisterBarAction] Action with ID "${safeData.actionID}" not found in bar "${safeData.barID}". Skipping.`);

	layoutStore.unregisterBarAction(safeData.barID, safeData.actionID);
}

// ------------------------- INFO -------------------------

/**
 * Registers a new data item instance to an info for layout commands.
 * Adds the data item to the info's data collection if it doesn't already exist.
 *
 * @param infoID - The info identifier to register the data item for
 * @param dataItem - The data item instance to register
 * @returns void
 *
 * @example
 * registerInfoData('info-123', { id: 'data-456', ... }) // Registers data item to info
 */
export function registerInfoData(infoID: InfoID, dataItem: InfoDataInstance): void {
	const layoutStore = useLayoutStore.getState();
	const safeData = new ValidationPipeline('[LayoutCommands → registerInfoData]')
		.validate({
			infoID: validateInfoID(infoID),
		})
		.fetch((data) => ({
			info: fetchInfo(data.infoID, layoutStore.allInfos),
		}))
		.execute();
	if (!safeData) return;
	if (safeData.info.data[dataItem.id]) return devLog.warn(`[LayoutCommands → registerInfoData] Data item with ID "${dataItem.id}" already exists in info "${infoID}". Skipping.`);

	layoutStore.registerInfoData(infoID, dataItem);
}

/**
 * Unregisters a data item from an info for layout commands.
 * Removes the specified data item from the info's data collection.
 *
 * @param infoID - The info identifier
 * @param dataID - The data item identifier to unregister
 * @returns void
 *
 * @example
 * unregisterInfoData('info-123', 'data-456') // Removes data item from info
 */
export function unregisterInfoData(infoID: InfoID, dataID: InfoDataID): void {
	const layoutStore = useLayoutStore.getState();
	const safeData = new ValidationPipeline('[LayoutCommands → unregisterInfoData]')
		.validate({
			infoID: validateInfoID(infoID),
			dataID: validateInfoDataID(dataID),
		})
		.fetch((data) => ({
			info: fetchInfo(data.infoID, layoutStore.allInfos),
		}))
		.execute();
	if (!safeData) return;

	if (!safeData.info.data) return devLog.warn(`[LayoutCommands → unregisterInfoData] Data item with ID "${safeData.dataID}" not found in info "${safeData.infoID}". Skipping.`);

	layoutStore.unregisterInfoData(safeData.infoID, safeData.dataID);
}

// ------------------------- PANEL -------------------------

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
