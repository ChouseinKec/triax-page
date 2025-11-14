// Types
import { PanelPosition, PanelSize, PanelID, PanelTitle, PanelIcon, PanelOrder, PanelDefinition } from '@/src/core/layout/panel/types';

/**
 * Validates if a value is a valid panel identifier.
 * Checks if the value is a non-empty string.
 * @param panelID - The value to validate
 * @returns True if valid PanelID, false otherwise
 * @example
 * isPanelIDValid('properties-panel') → true
 * isPanelIDValid('') → false
 */
export function isPanelIDValid(panelID: unknown): panelID is PanelID {
	return typeof panelID === 'string' && panelID.length > 0;
}

/**
 * Validates if a value is a valid panel title.
 * Checks if the value is a non-empty string.
 * @param panelTitle - The value to validate
 * @returns True if valid PanelTitle, false otherwise
 * @example
 * isPanelTitleValid('Properties Panel') → true
 */
export function isPanelTitleValid(panelTitle: unknown): panelTitle is PanelTitle {
	return typeof panelTitle === 'string' && panelTitle.length > 0;
}

/**
 * Validates if a value is a valid panel position.
 * Checks if the value is an object with top and left string properties.
 * @param panelPosition - The value to validate
 * @returns True if valid PanelPosition, false otherwise
 * @example
 * isPanelPositionValid({ top: '10px', left: '20px' }) → true
 */
export function isPanelPositionValid(panelPosition: unknown): panelPosition is PanelPosition {
	return (
		typeof panelPosition === 'object' &&
		panelPosition !== null && //
		typeof (panelPosition as Record<string, unknown>).top === 'string' &&
		typeof (panelPosition as Record<string, unknown>).left === 'string'
	);
}

/**
 * Validates if a value is a valid panel size configuration.
 * Checks if the value has width, height (strings) and minWidth, minHeight (numbers).
 * @param panelSize - The value to validate
 * @returns True if valid PanelSize, false otherwise
 * @example
 * isPanelSizeValid({ width: '300px', height: '400px', minWidth: 200, minHeight: 300 }) → true
 */
export function isPanelSizeValid(panelSize: unknown): panelSize is PanelSize {
	return (
		typeof panelSize === 'object' &&
		panelSize !== null && //
		typeof (panelSize as PanelSize).width === 'string' &&
		typeof (panelSize as PanelSize).height === 'string' &&
		typeof (panelSize as PanelSize).minWidth === 'number' &&
		typeof (panelSize as PanelSize).minHeight === 'number'
	);
}

/**
 * Validates if a value is a valid panel order.
 * Checks if the value is a valid number (not NaN).
 * @param panelOrder - The value to validate
 * @returns True if valid PanelOrder, false otherwise
 * @example
 * isPanelOrderValid(5) → true
 * isPanelOrderValid(NaN) → false
 */
export function isPanelOrderValid(panelOrder: unknown): panelOrder is PanelOrder {
	return typeof panelOrder === 'number' && !isNaN(panelOrder);
}

/**
 * Validates if a value is a valid panel icon.
 * Checks if the value is not null or undefined.
 * @param panelIcon - The value to validate
 * @returns True if valid PanelIcon, false otherwise
 * @example
 * isPanelIconValid(<Icon />) → true
 * isPanelIconValid(null) → false
 */
export function isPanelIconValid(panelIcon: unknown): panelIcon is PanelIcon {
	return panelIcon != null;
}

/**
 * Validates if a value is a valid panel locked state.
 * Checks if the value is a boolean.
 * @param panelLocked - The value to validate
 * @returns True if valid boolean, false otherwise
 * @example
 * isPanelLockedValid(true) → true
 * isPanelLockedValid('true') → false
 */
export function isPanelLockedValid(panelLocked: unknown): panelLocked is boolean {
	return typeof panelLocked === 'boolean';
}

/**
 * Validates if a value is a valid panel open state.
 * Checks if the value is a boolean.
 * @param panelOpen - The value to validate
 * @returns True if valid boolean, false otherwise
 * @example
 * isPanelOpenValid(false) → true
 */
export function isPanelOpenValid(panelOpen: unknown): panelOpen is boolean {
	return typeof panelOpen === 'boolean';
}

/**
 * Validates if a value is a valid panel definition.
 * Checks if the value is an object with all required panel properties.
 * @param panelDefinition - The value to validate
 * @returns True if valid PanelDefinition, false otherwise
 * @example
 * isPanelDefinitionValid({ id: 'panel1', title: 'Panel', order: 1, icon: <Icon />, workbenchID: 'main', ... }) → true
 */
export function isPanelDefinitionValid(panelDefinition: unknown): panelDefinition is PanelDefinition {
	return (
		typeof panelDefinition === 'object' && //
		panelDefinition !== null &&
		'id' in panelDefinition &&
		'title' in panelDefinition &&
		'order' in panelDefinition &&
		'icon' in panelDefinition &&
		'workbenchID' in panelDefinition &&
		'initialPosition' in panelDefinition &&
		'initialSize' in panelDefinition &&
		'initialLocked' in panelDefinition &&
		'initialOpen' in panelDefinition
	);
}
