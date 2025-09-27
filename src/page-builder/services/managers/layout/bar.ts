// Stores
import { useLayoutStore } from '@/src/page-builder/state/stores/layout';

// React
import { useMemo } from 'react';

// Types
import type { BarID, BarInstance, ActionInstance, ActionID } from '@/src/page-builder/core/editor/layout/types/bar';
import type { WorkbenchID } from '@/src/page-builder/core/editor/workbench/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Gets all bars, optionally filtered by workbench.
 * @param workbenchID - Optional workbench identifier to filter bars
 * @returns Array of bar instances
 * @example
 * const allBars = getAllBars();
 * const workbenchBars = getAllBars('workbench-123');
 */
export function getAllBars(workbenchID?: WorkbenchID): BarInstance[] {
	if (!useLayoutStore) {
		devLog.warn('[BarManager → getAllBars] Layout store not initialized yet');
		return [];
	}
	const store = useLayoutStore.getState();
	const bars = Object.values(store.layoutBars);
	if (!workbenchID) return bars;
	return bars.filter((b: BarInstance) => b.workbenchID === workbenchID);
}

/**
 * Gets a bar instance by its ID.
 * @param barID - The bar identifier
 * @returns The bar instance or undefined if not found
 * @example
 * const bar = getBarById('bar-123');
 */
export function getBarById(barID: BarID): BarInstance | undefined {
	if (!useLayoutStore) {
		devLog.warn('[BarManager → getBarById] Layout store not initialized yet');
		return undefined;
	}
	const store = useLayoutStore.getState();
	return store.layoutBars[barID];
}

/**
 * Gets all actions for a specific bar.
 * @param barID - The bar identifier
 * @returns Array of action instances
 * @example
 * const actions = getBarActions('bar-123');
 */
export function getBarActions(barID: BarID): ActionInstance[] {
	if (!useLayoutStore) {
		devLog.warn('[BarManager → getBarActions] Layout store not initialized yet');
		return [];
	}
	const store = useLayoutStore.getState();
	const bar = store.layoutBars[barID];
	return bar ? Object.values(bar.actions) : [];
}

/**
 * Registers a new action for a bar.
 * @param barID - The bar identifier to register the action for
 * @param action - The action instance to register
 * @example
 * registerBarAction('bar-123', actionInstance);
 */
export function registerBarAction(barID: BarID, action: ActionInstance) {
	if (!useLayoutStore) {
		devLog.error('[BarManager → registerBarAction] Layout store not initialized yet');
		return;
	}

	const store = useLayoutStore.getState();

	if (!barID || typeof barID !== 'string') {
		devLog.error('[BarManager → registerBarAction] Bar ID is required to register an action.');
		return;
	}
	if (!action || typeof action !== 'object') {
		devLog.error('[BarManager → registerBarAction] Action object is required to register an action.');
		return;
	}
	if (!action.id || typeof action.id !== 'string') {
		devLog.error('[BarManager → registerBarAction] Action must have a unique string ID.');
		return;
	}

	if (!store.layoutBars[barID]) {
		devLog.error(`[BarManager → registerBarAction] Bar with ID "${barID}" does not exist.`);
		return;
	}

	const barActions = store.layoutBars[barID].actions;

	if (!barActions) {
		devLog.error(`[BarManager → registerBarAction] Bar with ID "${barID}" does not have an actions record.`);
		return;
	}

	if (barActions[action.id]) {
		devLog.warn(`[BarManager → registerBarAction] Action with ID "${action.id}" already exists in bar "${barID}". Skipping.`);
		return;
	}

	// Delegate to store for pure state update
	store.registerBarAction(barID, action);
}

/**
 * Unregisters an action from a bar.
 * @param barID - The bar identifier
 * @param actionID - The action identifier to unregister
 * @example
 * unregisterBarAction('bar-123', 'action-456');
 */
export function unregisterBarAction(barID: BarID, actionID: ActionID) {
	if (!useLayoutStore) {
		devLog.error('[BarManager → unregisterBarAction] Layout store not initialized yet');
		return;
	}

	if (!barID || typeof barID !== 'string') {
		devLog.error('[BarManager → unregisterBarAction] Bar ID is required to unregister an action.');
		return;
	}
	if (!actionID || typeof actionID !== 'string') {
		devLog.error('[BarManager → unregisterBarAction] Action ID is required to unregister an action.');
		return;
	}

	const store = useLayoutStore.getState();
	const barActions = store.layoutBars[barID]?.actions;
	if (!barActions || !barActions[actionID]) {
		return;
	}

	// Delegate to store for pure state update
	store.unregisterBarAction(barID, actionID);
}

/**
 * Reactive hook to get all actions for a specific bar.
 * @param barID - The bar identifier
 * @returns Reactive array of action instances
 * @example
 * const actions = useBarActions('bar-123');
 */
export function useBarActions(barID: BarID): ActionInstance[] {
	if (!useLayoutStore) {
		devLog.warn('[BarManager → useBarActions] Layout store not initialized yet');
		return [];
	}

	const actionsRecord = useLayoutStore((state) => state.layoutBars[barID]?.actions);

	return useMemo(() => Object.values(actionsRecord), [actionsRecord]);
}
