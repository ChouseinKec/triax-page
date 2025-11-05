// Types
import type { TabDefinition, TabID, TabTitle, TabIcon, TabComponent, TabOrder } from '@/src/page-builder/core/editor/layout/types/tab';

/**
 * Validates if a value is a valid tab identifier.
 * Checks if the value is a non-empty string.
 * @param tabID - The value to validate
 * @returns True if valid TabID, false otherwise
 * @example
 * isTabIDValid('properties-tab') → true
 * isTabIDValid('') → false
 */
export function isTabIDValid(tabID: unknown): tabID is TabID {
	return typeof tabID === 'string' && tabID.length > 0;
}

/**
 * Validates if a value is a valid tab title.
 * Checks if the value is a non-empty string.
 * @param tabTitle - The value to validate
 * @returns True if valid TabTitle, false otherwise
 * @example
 * isTabTitleValid('Properties') → true
 */
export function isTabTitleValid(tabTitle: unknown): tabTitle is TabTitle {
	return typeof tabTitle === 'string' && tabTitle.length > 0;
}

/**
 * Validates if a value is a valid tab component.
 * Checks if the value is a function (React component).
 * @param tabComponent - The value to validate
 * @returns True if valid TabComponent, false otherwise
 * @example
 * isTabComponentValid(() => <div />) → true
 * isTabComponentValid('string') → false
 */
export function isTabComponentValid(tabComponent: unknown): tabComponent is TabComponent {
	return typeof tabComponent === 'function';
}

/**
 * Validates if a value is a valid tab icon.
 * Checks if the value is not null or undefined.
 * @param tabIcon - The value to validate
 * @returns True if valid TabIcon, false otherwise
 * @example
 * isTabIconValid(<Icon />) → true
 * isTabIconValid(null) → false
 */
export function isTabIconValid(tabIcon: unknown): tabIcon is TabIcon {
	return tabIcon != null;
}

/**
 * Validates if a value is a valid tab order.
 * Checks if the value is a valid number (not NaN).
 * @param tabOrder - The value to validate
 * @returns True if valid TabOrder, false otherwise
 * @example
 * isTabOrderValid(3) → true
 * isTabOrderValid(NaN) → false
 */
export function isTabOrderValid(tabOrder: unknown): tabOrder is TabOrder {
	return typeof tabOrder === 'number' && !isNaN(tabOrder);
}

/**
 * Validates if a value is a valid tab definition.
 * Checks if the value is an object with all required tab properties.
 * @param tabDefinition - The value to validate
 * @returns True if valid TabDefinition, false otherwise
 * @example
 * isTabDefinitionValid({ id: 'tab1', title: 'Settings', component: TabComponent, icon: <Icon />, order: 1, panelID: 'panel1' }) → true
 */
export function isTabDefinitionValid(tabDefinition: unknown): tabDefinition is TabDefinition {
	return (
		typeof tabDefinition === 'object' &&
		tabDefinition !== null && //
		'id' in tabDefinition &&
		'title' in tabDefinition &&
		'component' in tabDefinition &&
		'icon' in tabDefinition &&
		'order' in tabDefinition &&
		'panelID' in tabDefinition
	);
}
