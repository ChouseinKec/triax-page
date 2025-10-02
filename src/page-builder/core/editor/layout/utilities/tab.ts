// Types
import type { TabDefinition, TabID, TabTitle, TabIcon, TabComponent, TabOrder } from '@/src/page-builder/core/editor/layout/types/tab';

/**
 * Validates if a tab ID is valid
 * @param id - The tab ID to validate
 * @returns true if valid, false otherwise
 */
export function isTabIDValid(tabID: unknown): tabID is TabID {
	return typeof tabID === 'string' && tabID.length > 0;
}

/**
 * Validates if a tab title is valid
 * @param title - The tab title to validate
 * @returns true if valid, false otherwise
 */
export function isTabTitleValid(tabTitle: unknown): tabTitle is TabTitle {
	return typeof tabTitle === 'string' && tabTitle.length > 0;
}

/**
 * Validates if a React component is valid
 * @param component - The React component to validate
 * @returns true if valid, false otherwise
 */
export function isTabComponentValid(tabComponent: unknown): tabComponent is TabComponent {
	return typeof tabComponent === 'function';
}

/**
 * Validates if a tab icon is valid
 * @param icon - The tab icon to validate
 * @returns true if valid, false otherwise
 */
export function isTabIconValid(tabIcon: unknown): tabIcon is TabIcon {
	return tabIcon != null;
}

/**
 * Validates if a tab order is valid
 * @param order - The tab order to validate
 * @returns true if valid, false otherwise
 */
export function isTabOrderValid(tabOrder: unknown): tabOrder is TabOrder {
	return typeof tabOrder === 'number' && !isNaN(tabOrder);
}

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
