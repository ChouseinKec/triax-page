// Types
import { BarActionInstance, BarActionID, BarActionTitle, BarActionOrder, BarActionRender } from '@/src/core/layout/bar/types';

/**
 * Validates if a value is a valid bar action identifier.
 * Checks if the value is a non-empty string.
 * @param actionID - The value to validate
 * @returns True if valid BarActionID, false otherwise
 * @example
 * isBarActionIDValid('save-action') → true
 */
export function isBarActionIDValid(actionID: unknown): actionID is BarActionID {
	return typeof actionID === 'string' && actionID.length > 0;
}

/**
 * Validates if a value is a valid bar action title.
 * Checks if the value is a non-empty string.
 * @param actionTitle - The value to validate
 * @returns True if valid BarActionTitle, false otherwise
 * @example
 * isBarActionTitleValid('Save File') → true
 */
export function isBarActionTitleValid(actionTitle: unknown): actionTitle is BarActionTitle {
	return typeof actionTitle === 'string' && actionTitle.length > 0;
}

/**
 * Validates if a value is a valid bar action order.
 * Checks if the value is a non-negative integer.
 * @param actionOrder - The value to validate
 * @returns True if valid BarActionOrder, false otherwise
 * @example
 * isBarActionOrderValid(5) → true
 * isBarActionOrderValid(-1) → false
 */
export function isBarActionOrderValid(actionOrder: unknown): actionOrder is BarActionOrder {
	return typeof actionOrder === 'number' && Number.isInteger(actionOrder) && actionOrder >= 0;
}

/**
 * Validates if a value is a valid bar action render function.
 * Checks if the value is a function.
 * @param actionRender - The value to validate
 * @returns True if valid BarActionRender, false otherwise
 * @example
 * isBarActionRenderValid(() => <div />) → true
 */
export function isBarActionRenderValid(actionRender: unknown): actionRender is BarActionRender {
	return typeof actionRender === 'function';
}

/**
 * Validates if a value is a valid bar action instance.
 * Checks if the value is an object with required action properties.
 * @param action - The value to validate
 * @returns True if valid BarActionInstance, false otherwise
 * @example
 * isBarActionInstanceValid({ id: 'action1', title: 'Save', order: 1, render: () => {} }) → true
 */
export function isBarActionInstanceValid(actionInstance: unknown): actionInstance is BarActionInstance {
	return (
		typeof actionInstance === 'object' && //
		actionInstance !== null &&
		'id' in actionInstance &&
		'title' in actionInstance &&
		'order' in actionInstance &&
		'render' in actionInstance
	);
}
