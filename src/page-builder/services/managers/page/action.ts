// Registry
import { registerAction, getRegisteredActions, getRegisteredAction } from '@/src/page-builder/state/registries/page';

// React
import { useMemo } from 'react';

// Types
import type { ActionInstance, ActionID } from '@/src/page-builder/core/page/types/action';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Gets all registered page actions.
 * @returns Array of action instances sorted by order
 * @example
 * const allActions = getAllActions();
 */
export function getAllActions(): ActionInstance[] {
	const actions = Object.values(getRegisteredActions());
	return actions.sort((a, b) => a.order - b.order);
}

/**
 * Gets a specific action by its ID.
 * @param actionID - The action identifier
 * @returns The action instance or undefined if not found
 * @example
 * const action = getActionById('action-123');
 */
export function getActionById(actionID: ActionID): ActionInstance | undefined {
	return getRegisteredAction(actionID);
}

/**
 * Registers a new page action.
 * @param action - The action instance to register
 * @example
 * registerPageAction(actionInstance);
 */
export function registerPageAction(action: ActionInstance) {
	if (!action || typeof action !== 'object') {
		devLog.error('[PageActionManager → registerPageAction] Action object is required to register an action.');
		return;
	}
	if (!action.id || typeof action.id !== 'string') {
		devLog.error('[PageActionManager → registerPageAction] Action must have a unique string ID.');
		return;
	}

	const result = registerAction(action);
	if (!result.success) {
		devLog.error(`[PageActionManager → registerPageAction] Failed to register action "${action.id}": ${result.error}`);
	} else {
		devLog.info(`[PageActionManager → registerPageAction] Registered action "${action.id}"`);
	}
}

/**
 * Unregisters a page action.
 * @param actionID - The action identifier to unregister
 * @example
 * unregisterPageAction('action-123');
 */
export function unregisterPageAction(actionID: ActionID) {
	if (!actionID || typeof actionID !== 'string') {
		devLog.error('[PageActionManager → unregisterPageAction] Action ID is required to unregister an action.');
		return;
	}

	// Note: The registry doesn't have an unregister method, so we can't actually remove it
	// This is a limitation of the current registry design
	devLog.warn(`[PageActionManager → unregisterPageAction] Unregister not implemented for action "${actionID}"`);
}

/**
 * Reactive hook to get all page actions.
 * @returns Reactive array of action instances sorted by order
 * @example
 * const actions = useAllActions();
 */
export function useAllActions(): ActionInstance[] {
	const actions = getAllActions();
	return useMemo(() => actions, [actions.length]);
}
