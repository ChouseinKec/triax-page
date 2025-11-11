// Types
import { BarActionInstance, BarDefinition, BarID, BarTitle, BarPosition, BarSize, BarActionID, BarActionTitle, BarActionOrder, BarActionRender } from '@/src/page/layout/core/types';

/**
 * Validates if a value is a valid bar identifier.
 * Checks if the value is a non-empty string.
 * @param barID - The value to validate
 * @returns True if valid BarID, false otherwise
 * @example
 * isBarIDValid('top-bar') → true
 * isBarIDValid('') → false
 */
export function isBarIDValid(barID: unknown): barID is BarID {
	return typeof barID === 'string' && barID.length > 0;
}

/**
 * Validates if a value is a valid bar title.
 * Checks if the value is a non-empty string.
 * @param barTitle - The value to validate
 * @returns True if valid BarTitle, false otherwise
 * @example
 * isBarTitleValid('Main Toolbar') → true
 */
export function isBarTitleValid(barTitle: unknown): barTitle is BarTitle {
	return typeof barTitle === 'string' && barTitle.length > 0;
}

/**
 * Validates if a value is a valid bar position.
 * Checks if the value is an object with top and left string properties.
 * @param barPosition - The value to validate
 * @returns True if valid BarPosition, false otherwise
 * @example
 * isBarPositionValid({ top: '10px', left: '20px' }) → true
 */
export function isBarPositionValid(barPosition: unknown): barPosition is BarPosition {
	return (
		typeof barPosition === 'object' && //
		barPosition !== null &&
		typeof (barPosition as { top?: unknown }).top === 'string' &&
		typeof (barPosition as { left?: unknown }).left === 'string'
	);
}

/**
 * Validates if a value is a valid bar size configuration.
 * Checks for either BarSizeFixed (width only) or BarSizeAuto (minWidth and maxWidth).
 * @param barSize - The value to validate
 * @returns True if valid BarSize, false otherwise
 * @example
 * isBarSizeValid({ width: '200px' }) → true
 * isBarSizeValid({ minWidth: '100px', maxWidth: '300px' }) → true
 */
export function isBarSizeValid(barSize: unknown): barSize is BarSize {
	if (typeof barSize !== 'object' || barSize === null) return false;

	const size = barSize as Record<string, unknown>;

	// Check for BarSizeFixed: must have width as string
	if (typeof size.width === 'string') {
		// Ensure no other properties that would make it invalid
		const allowedKeys = new Set(['width']);
		const actualKeys = Object.keys(size);
		return actualKeys.every((key) => allowedKeys.has(key));
	}

	// Check for BarSizeAuto: must have both minWidth and maxWidth as strings
	const hasMinWidth = typeof size.minWidth === 'string';
	const hasMaxWidth = typeof size.maxWidth === 'string';

	if (hasMinWidth && hasMaxWidth) {
		// Ensure no other properties that would make it invalid
		const allowedKeys = new Set(['minWidth', 'maxWidth']);
		const actualKeys = Object.keys(size);
		return actualKeys.every((key) => allowedKeys.has(key));
	}

	// If neither condition is met, it's invalid
	return false;
}

/**
 * Validates if a value is a valid bar definition.
 * Checks if the value is an object with required bar properties.
 * @param barDefinition - The value to validate
 * @returns True if valid BarDefinition, false otherwise
 * @example
 * isBarDefinitionValid({ id: 'bar1', title: 'Top Bar', position: {...}, size: {...}, workbenchID: 'main' }) → true
 */
export function isBarDefinitionValid(barDefinition: unknown): barDefinition is BarDefinition {
	return (
		typeof barDefinition === 'object' && //
		barDefinition !== null &&
		'id' in barDefinition &&
		'title' in barDefinition &&
		'position' in barDefinition &&
		'size' in barDefinition &&
		'workbenchID' in barDefinition
	);
}

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
