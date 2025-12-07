// Types
import { BarActionInstance, BarActionID, BarActionTitle, BarActionOrder, BarActionRender } from '@/src/core/layout/bar/types';

/**
 * Validates if a value is a valid bar action identifier.
 * Checks if the value is a non-empty string.
 * @param actionID - The value to validate
 */
export function isBarActionIDValid(actionID: unknown): actionID is BarActionID {
	return typeof actionID === 'string' && actionID.trim().length > 0;
}

/**
 * Validates if a value is a valid bar action title.
 * Checks if the value is a non-empty string.
 * @param actionTitle - The value to validate
 */
export function isBarActionTitleValid(actionTitle: unknown): actionTitle is BarActionTitle {
	return typeof actionTitle === 'string' && actionTitle.trim().length > 0;
}

/**
 * Validates if a value is a valid bar action order.
 * Checks if the value is a non-negative integer.
 * @param actionOrder - The value to validate
 */
export function isBarActionOrderValid(actionOrder: unknown): actionOrder is BarActionOrder {
	return typeof actionOrder === 'number' && Number.isInteger(actionOrder) && actionOrder >= 0;
}

/**
 * Validates if a value is a valid bar action render function.
 * Checks if the value is a function.
 * @param actionRender - The value to validate
 */
export function isBarActionRenderValid(actionRender: unknown): actionRender is BarActionRender {
	return typeof actionRender === 'function';
}

/**
 * Validates if a value is a valid bar action instance.
 * Checks if the value is an object with required action properties.
 * @param action - The value to validate
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
