// Stores
import { useLayoutStore } from '@/src/page-builder/state/stores/layout';

// React
import { useMemo } from 'react';

// Types
import type { PanelID, PanelInstance, BarID, BarInstance, BarActionInstance, InfoID, InfoInstance, InfoDataInstance } from '@/src/page-builder/core/editor/layout/types';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateWorkbenchID, validateBarID, validateInfoID, validatePanelID } from '@/src/page-builder/services/helpers/validate';

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
	const safeData = new ValidationPipeline('[LayoutQueries → getBarsByWorkbench]')
		.validate({
			workbenchID: validateWorkbenchID(workbenchID),
		})
		.execute();
	if (!safeData) return undefined;

	return Object.values(layoutStore.layoutBars).filter((b: BarInstance) => b.workbenchID === safeData.workbenchID);
}

/**
 * Gets a bar instance by its unique identifier for layout queries.
 * Retrieves the complete bar object from the layout store.
 *
 * @param barID - The bar identifier
 * @returns The bar instance or undefined if not found or validation fails
 *
 * @example
 * const bar = getBarById('bar-123') // Returns bar instance or undefined
 */
export function getBarById(barID: BarID): BarInstance | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeData = new ValidationPipeline('[LayoutQueries → getBarById]')
		.validate({
			barID: validateBarID(barID),
		})
		.execute();
	if (!safeData) return undefined;

	return layoutStore.getBar(safeData.barID);
}

/**
 * Reactive hook to get all action instances for a specific bar in layout queries.
 * Returns a memoized array of actions that updates when the bar's actions change.
 *
 * @param barID - The bar identifier
 * @returns Reactive array of action instances or undefined if bar not found
 *
 * @example
 * const actions = useBarActions('bar-123') // Returns reactive array of actions
 */
export function useBarActions(barID: BarID): BarActionInstance[] | undefined {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[LayoutQueries → useBarActions]')
				.validate({
					barID: validateBarID(barID),
				})
				.execute(),
		[barID]
	);

	if (!safeData) return undefined;
	const actionsRecord = useLayoutStore((state) => state.getBar(safeData.barID)?.actions);

	return useMemo(() => {
		if (!actionsRecord) {
			return undefined;
		}

		return Object.values(actionsRecord);
	}, [actionsRecord, safeData.barID]);
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
	const safeData = new ValidationPipeline('[LayoutQueries → isBarActionRegistered]')
		.validate({
			barID: validateBarID(barID),
		})
		.execute();
	if (!safeData) return false;

	const bar = layoutStore.getBar(safeData.barID);
	if (!bar) return false;

	return !!bar.actions[actionID];
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
	const safeData = new ValidationPipeline('[LayoutQueries → getInfosByWorkbench]')
		.validate({
			workbenchID: validateWorkbenchID(workbenchID),
		})
		.execute();
	if (!safeData) return undefined;

	return Object.values(layoutStore.layoutInfos).filter((info: InfoInstance) => info.workbenchID === safeData.workbenchID);
}

/**
 * Gets an info instance by its unique identifier for layout queries.
 * Retrieves the complete info object from the layout store.
 *
 * @param infoID - The info identifier
 * @returns The info instance or undefined if not found or validation fails
 *
 * @example
 * const info = getInfoById('info-123') // Returns info instance or undefined
 */
export function getInfoById(infoID: InfoID): InfoInstance | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeData = new ValidationPipeline('[LayoutQueries → getInfoById]')
		.validate({
			infoID: validateInfoID(infoID),
		})
		.execute();
	if (!safeData) return undefined;

	return layoutStore.getInfo(safeData.infoID);
}

/**
 * Reactive hook to get all data item instances for a specific info in layout queries.
 * Returns a memoized array of data items that updates when the info's data changes.
 *
 * @param infoID - The info identifier
 * @returns Reactive array of data item instances or undefined if info not found
 *
 * @example
 * const dataItems = useInfoData('info-123') // Returns reactive array of data items
 */
export function useInfoData(infoID: InfoID): InfoDataInstance[] | undefined {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[LayoutQueries → useInfoData]')
				.validate({
					infoID: validateInfoID(infoID),
				})
				.execute(),
		[infoID]
	);

	const dataRecord = useLayoutStore((state) => {
		if (!safeData) return undefined;
		return state.getInfo(safeData.infoID)?.data;
	});

	return useMemo(() => {
		if (!safeData || !dataRecord) {
			if (!safeData) return undefined;
			return undefined;
		}
		return Object.values(dataRecord);
	}, [dataRecord, safeData]);
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
	const safeData = new ValidationPipeline('[LayoutQueries → getPanelById]')
		.validate({
			panelID: validatePanelID(panelID),
		})
		.derive((data) => ({
			panel: layoutStore.getPanel(data.panelID),
		}))
		.execute();
	if (!safeData) return;

	return safeData.panel;
}

/**
 * Reactive hook to get all panel instances filtered by workbench for layout queries.
 * Returns a memoized array of panels associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter panels
 * @returns Reactive array of panel instances or undefined if validation fails
 *
 * @example
 * const panels = useAllPanels('workbench-123') // Returns all panels for workbench
 */
export function useAllPanels(workbenchID: WorkbenchID): PanelInstance[] | undefined {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[LayoutQueries → useAllPanels]')
				.validate({
					workbenchID: validateWorkbenchID(workbenchID),
				})
				.execute(),
		[workbenchID]
	);

	const panels = useLayoutStore((state) => state.layoutPanels);

	return useMemo(() => {
		if (!safeData) return undefined;
		return Object.values(panels).filter((p: PanelInstance) => p.workbenchID === safeData.workbenchID);
	}, [panels, safeData]);
}

/**
 * Reactive hook to get all open panel instances filtered by workbench for layout queries.
 * Returns a memoized array of panels that are currently open and associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter panels
 * @returns Reactive array of open panel instances or undefined if validation fails
 *
 * @example
 * const openPanels = useOpenPanels('workbench-123') // Returns open panels for workbench
 */
export function useOpenPanels(workbenchID: WorkbenchID): PanelInstance[] | undefined {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[LayoutQueries → useOpenPanels]')
				.validate({
					workbenchID: validateWorkbenchID(workbenchID),
				})
				.execute(),
		[workbenchID]
	);

	const panels = useLayoutStore((state) => state.layoutPanels);

	return useMemo(() => {
		if (!safeData) return undefined;
		const all = Object.values(panels).filter((p: PanelInstance) => p.isOpen);
		return all.filter((p: PanelInstance) => p.workbenchID === safeData.workbenchID);
	}, [panels, safeData]);
}
