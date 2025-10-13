// Stores
import { useLayoutStore } from '@/src/page-builder/state/stores/layout';

// React
import { useMemo } from 'react';

// Types
import type { BarID, BarInstance, BarActionInstance, BarActionID } from '@/src/page-builder/core/editor/layout/types/bar';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateWorkbenchID, validateBarActionInstance, validateBarID, validateBarActionID } from '@/src/page-builder/services/helpers/validate';

/**
 * Gets all bar instances filtered by workbench ID for layout management operations.
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
	const safeData = new ValidationPipeline('[LayoutManager → getBarsByWorkbench]')
		.validate({
			workbenchID: validateWorkbenchID(workbenchID),
		})
		.execute();
	if (!safeData) return undefined;

	return Object.values(layoutStore.layoutBars).filter((b: BarInstance) => b.workbenchID === safeData.workbenchID);
}

/**
 * Gets a bar instance by its unique identifier for layout management operations.
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
	const safeData = new ValidationPipeline('[LayoutManager → getBarById]')
		.validate({
			barID: validateBarID(barID),
		})
		.execute();
	if (!safeData) return undefined;

	return layoutStore.getBar(safeData.barID);
}

/**
 * Registers a new action instance to a bar for layout management operations.
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
	const safeData = new ValidationPipeline('[LayoutManager → registerBarAction]')
		.validate({
			barID: validateBarID(barID),
			action: validateBarActionInstance(action),
		})
		.execute();
	if (!safeData) return;

	const bar = layoutStore.getBar(safeData.barID);
	if (!bar) return devLog.error(`[LayoutManager → registerBarAction] Bar with ID "${safeData.barID}" not found.`);
	if (bar.actions[action.id]) return devLog.warn(`[LayoutManager → registerBarAction] Action with ID "${action.id}" already exists in bar "${barID}". Skipping.`);

	layoutStore.registerBarAction(barID, action);
}

/**
 * Unregisters an action from a bar for layout management operations.
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
	const safeData = new ValidationPipeline('[LayoutManager → unregisterBarAction]')
		.validate({
			barID: validateBarID(barID),
			actionID: validateBarActionID(actionID),
		})
		.execute();
	if (!safeData) return;

	const bar = layoutStore.getBar(safeData.barID);
	if (!bar) return devLog.warn(`[LayoutManager → unregisterBarAction] Bar with ID "${safeData.barID}" not found.`);
	if (!bar.actions) return devLog.warn(`[LayoutManager → unregisterBarAction] Action with ID "${safeData.actionID}" not found in bar "${safeData.barID}". Skipping.`);

	layoutStore.unregisterBarAction(safeData.barID, safeData.actionID);
}

/**
 * Reactive hook to get all action instances for a specific bar in layout management operations.
 * Returns a memoized array of actions that updates when the bar's actions change.
 *
 * @param barID - The bar identifier
 * @returns Reactive array of action instances or undefined if bar not found
 *
 * @example
 * const actions = useBarActions('bar-123') // Returns reactive array of actions
 */
export function useBarActions(barID: BarID): BarActionInstance[] | undefined {
	const safeData = new ValidationPipeline('[LayoutManager → useBarActions]')
		.validate({
			barID: validateBarID(barID),
		})
		.execute();
	if (!safeData) return undefined;

	const actionsRecord = useLayoutStore((state) => state.getBar(safeData.barID)?.actions);
	if (!actionsRecord) return devLog.warn(`[LayoutManager → useBarActions] Actions for bar with ID "${safeData.barID}" not found.`), undefined;

	return useMemo(() => Object.values(actionsRecord), [actionsRecord]);
}
