// Types
import { PanelPosition, PanelSize, PanelID, PanelTitle, PanelIcon, PanelOrder, PanelDefinition } from '@/src/page-builder/core/editor/layout/types';

/**
 * Validates if a panel ID is valid
 * @param id - The panel ID to validate
 * @returns true if valid, false otherwise
 */
export function isPanelIDValid(panelID: unknown): panelID is PanelID {
	return typeof panelID === 'string' && panelID.length > 0;
}

/**
 * Validates if a panel title is valid
 * @param title - The panel title to validate
 * @returns true if valid, false otherwise
 */
export function isPanelTitleValid(panelTitle: unknown): panelTitle is PanelTitle {
	return typeof panelTitle === 'string' && panelTitle.length > 0;
}

/**
 * Validates if a panel position is valid
 * @param position - The panel position to validate
 * @returns true if valid, false otherwise
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
 * Validates if a panel size is valid
 * @param size - The panel size to validate
 * @returns true if valid, false otherwise
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
 * Validates if a number is valid
 * @param value - The number to validate
 * @returns true if valid, false otherwise
 */
export function isPanelOrderValid(panelOrder: unknown): panelOrder is PanelOrder {
	return typeof panelOrder === 'number' && !isNaN(panelOrder);
}

/**
 * Validates if a React icon is valid
 * @param icon - The React icon to validate
 * @returns true if valid, false otherwise
 */
export function isPanelIconValid(panelIcon: unknown): panelIcon is PanelIcon {
	return panelIcon != null;
}

/**
 * Validates if a boolean is valid
 * @param value - The boolean to validate
 * @returns true if valid, false otherwise
 */
export function isPanelLockedValid(panelLocked: unknown): panelLocked is boolean {
	return typeof panelLocked === 'boolean';
}

export function isPanelOpenValid(panelOpen: unknown): panelOpen is boolean {
	return typeof panelOpen === 'boolean';
}

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
