// Stores
import { useLayoutStore } from '@/src/page/layout/state/store/layout';

// Types
import type { PanelID, PanelInstance, BarID, BarInstance, InfoID, InfoInstance } from '@/src/page/layout/core/types';
import type { WorkbenchID } from '@/src/page/core/workbench/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateBarID, validateInfoID, validatePanelID } from '@/src/page/layout/service/helper/validate';
import { validateWorkbenchID } from '@/src/page/service/helpers/editor/validate';
import { fetchBarsByWorkbench, fetchInfosByWorkbench, fetchInfo, fetchPanel, fetchBarActions } from '@/src/page/layout/service/helper/fetch';

// ------------------------- BAR -------------------------

/**
 * Gets all bar instances filtered by workbench ID for layout queries.
 * Returns an array of bars associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter bars
 * @returns Array of bar instances or undefined if validation fails
 *
 * @example
 * const bars = getBarsByWorkbench('workbench-123') // Returns bars for specific workbench
 */
export function getBarsByWorkbench(workbenchID: WorkbenchID): BarInstance[] | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeParams = new ValidationPipeline('[LayoutQueries → getBarsByWorkbench]')
		.validate({
			workbenchID: validateWorkbenchID(workbenchID),
		})
		.fetch((data) => ({
			barsByWorkbench: fetchBarsByWorkbench(data.workbenchID, layoutStore.allBars),
		}))
		.execute();
	if (!safeParams) return undefined;

	return safeParams.barsByWorkbench;
}

/**
 * Checks if a specific action is registered in a bar for layout queries.
 * Returns true if the action exists in the bar's actions collection.
 *
 * @param barID - The bar identifier
 * @param actionID - The action identifier to check
 * @returns True if the action is registered, false otherwise
 *
 * @example
 * const isRegistered = isBarActionRegistered('bar-123', 'action-456') // Returns true/false
 */
export function isBarActionRegistered(barID: BarID, actionID: string): boolean {
	const layoutStore = useLayoutStore.getState();
	const safeParams = new ValidationPipeline('[LayoutQueries → isBarActionRegistered]')
		.validate({
			barID: validateBarID(barID),
		})
		.fetch((data) => ({
			barActions: fetchBarActions(data.barID, layoutStore.allBars),
		}))
		.execute();
	if (!safeParams) return false;

	return safeParams.barActions.some((action) => action.id === actionID);
}

// ------------------------- INFO -------------------------

/**
 * Gets all info instances filtered by workbench ID for layout queries.
 * Returns an array of infos associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter infos
 * @returns Array of info instances or undefined if validation fails
 *
 * @example
 * const infos = getInfosByWorkbench('workbench-123') // Returns infos for specific workbench
 */
export function getInfosByWorkbench(workbenchID: WorkbenchID): InfoInstance[] | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeParams = new ValidationPipeline('[LayoutQueries → getInfosByWorkbench]')
		.validate({
			workbenchID: validateWorkbenchID(workbenchID),
		})
		.fetch((data) => ({
			infosByWorkbench: fetchInfosByWorkbench(data.workbenchID, layoutStore.allInfos),
		}))
		.execute();
	if (!safeParams) return undefined;

	return safeParams.infosByWorkbench;
}

/**
 * Gets an info instance by its unique identifier for layout queries.
 * Retrieves the complete info object from the layout store.
 *
 * @param infoID - The info identifier
 * @returns The info instance or undefined if not found or validation fails
 *
 * @example
 * const info = getInfo('info-123') // Returns info instance or undefined
 */
export function getInfo(infoID: InfoID): InfoInstance | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeParams = new ValidationPipeline('[LayoutQueries → getInfo]')
		.validate({
			infoID: validateInfoID(infoID),
		})
		.fetch((data) => ({
			info: fetchInfo(data.infoID, layoutStore.allInfos),
		}))
		.execute();
	if (!safeParams) return undefined;

	return safeParams.info;
}

// ------------------------- PANEL -------------------------

/**
 * Gets a panel instance by its unique identifier for layout queries.
 * Retrieves the complete panel object from the layout store.
 *
 * @param panelID - The panel identifier
 * @returns The panel instance or undefined if not found or validation fails
 *
 * @example
 * const panel = getPanelById('panel-123') // Returns panel instance or undefined
 */
export function getPanelById(panelID: PanelID): PanelInstance | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeParams = new ValidationPipeline('[LayoutQueries → getPanelById]')
		.validate({
			panelID: validatePanelID(panelID),
		})
		.fetch((data) => ({
			panel: fetchPanel(data.panelID, layoutStore.allPanels),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.panel;
}
