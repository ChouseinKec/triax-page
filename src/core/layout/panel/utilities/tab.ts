// Types
import { PanelTabDefinition, PanelTabID, PanelTabTitle, PanelTabIcon, PanelTabComponent, PanelTabOrder } from '@/src/core/layout/panel/types';

/**
 * Validates if a value is a valid tab identifier.
 * Checks if the value is a non-empty string.
 * @param PanelTabID - The value to validate
 */
export function isPanelTabIDValid(PanelTabID: unknown): PanelTabID is PanelTabID {
	return typeof PanelTabID === 'string' && PanelTabID.length > 0;
}

/**
 * Validates if a value is a valid tab title.
 * Checks if the value is a non-empty string.
 * @param PanelTabTitle - The value to validate
 */
export function isPanelTabTitleValid(PanelTabTitle: unknown): PanelTabTitle is PanelTabTitle {
	return typeof PanelTabTitle === 'string' && PanelTabTitle.length > 0;
}

/**
 * Validates if a value is a valid tab component.
 * Checks if the value is a function (React component).
 * @param PanelTabComponent - The value to validate
 */
export function isPanelTabComponentValid(PanelTabComponent: unknown): PanelTabComponent is PanelTabComponent {
	return typeof PanelTabComponent === 'function';
}

/**
 * Validates if a value is a valid tab icon.
 * Checks if the value is not null or undefined.
 * @param PanelTabIcon - The value to validate
 */
export function isPanelTabIconValid(PanelTabIcon: unknown): PanelTabIcon is PanelTabIcon {
	return PanelTabIcon != null;
}

/**
 * Validates if a value is a valid tab order.
 * Checks if the value is a valid number (not NaN).
 * @param PanelTabOrder - The value to validate
 */
export function isPanelTabOrderValid(PanelTabOrder: unknown): PanelTabOrder is PanelTabOrder {
	return typeof PanelTabOrder === 'number' && !isNaN(PanelTabOrder);
}

/**
 * Validates if a value is a valid tab definition.
 * Checks if the value is an object with all required tab properties.
 * @param PanelTabDefinition - The value to validate
 */
export function isPanelTabDefinitionValid(PanelTabDefinition: unknown): PanelTabDefinition is PanelTabDefinition {
	return (
		typeof PanelTabDefinition === 'object' &&
		PanelTabDefinition !== null && //
		'id' in PanelTabDefinition &&
		'title' in PanelTabDefinition &&
		'component' in PanelTabDefinition &&
		'icon' in PanelTabDefinition &&
		'order' in PanelTabDefinition &&
		'panelID' in PanelTabDefinition
	);
}
