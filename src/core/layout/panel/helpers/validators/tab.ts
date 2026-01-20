// Types
import type { TabDefinition, TabKey, TabTitle, TabComponent, TabIcon, TabOrder } from '@/src/core/layout/panel/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { validateString, validateObject, validateElement, validateInteger, validateFunction } from '@/src/shared/helpers/validators';

// Helpers
import { validatePanelKey } from '@/src/core/layout/panel/helpers/validators/panel';

/**
 * Validates a tab ID for tab operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param tabKey - The tab ID to validate
 */
export function validateTabKey(tabKey: unknown): ValidateResult<TabKey> {
	const stringValidation = validateString(tabKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: tabKey as TabKey };
}

/**
 * Validates a tab title for tab operations.
 * Checks if the title is a valid string.
 *
 * @param tabTitle - The tab title to validate
 */
export function validateTabTitle(tabTitle: unknown): ValidateResult<TabTitle> {
	const stringValidation = validateString(tabTitle);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: tabTitle as TabTitle };
}

/**
 * Validates a tab component for tab operations.
 * Checks if the component is a valid React component.
 *
 * @param tabComponent - The tab component to validate
 */
export function validateTabComponent(tabComponent: unknown): ValidateResult<TabComponent> {
	const functionValidation = validateFunction(tabComponent);
	if (!functionValidation.valid) return functionValidation;

	return { valid: true, value: tabComponent as TabComponent };
}

/**
 * Validates a tab icon for tab operations.
 * Checks if the icon is a valid React icon.
 *
 * @param tabIcon - The tab icon to validate
 */
export function validateTabIcon(tabIcon: unknown): ValidateResult<TabIcon> {
	const elementValidation = validateElement(tabIcon);
	if (!elementValidation.valid) return elementValidation;

	return { valid: true, value: tabIcon as TabIcon };
}

/**
 * Validates a tab order for tab operations.
 * Checks if the order is a valid number.
 *
 * @param tabOrder - The tab order to validate
 */
export function validateTabOrder(tabOrder: unknown): ValidateResult<TabOrder> {
	const integerValidation = validateInteger(tabOrder);
	if (!integerValidation.valid) return integerValidation;

	return { valid: true, value: tabOrder as TabOrder };
}

/**
 * Validates a complete tab definition for tab operations.
 * Checks if the definition has all required valid properties including ID, title, component, icon, order, and panel ID.
 *
 * @param TabDefinition - The tab definition to validate
 */
export function validateTabDefinition(TabDefinition: unknown): ValidateResult<TabDefinition> {
	const objectValidation = validateObject(TabDefinition, ['key', 'title', 'component', 'icon', 'order', 'panelKey']);
	if (!objectValidation.valid) return objectValidation;

	const keyValidation = validateTabKey(objectValidation.value.key);
	if (!keyValidation.valid) return keyValidation;

	const titleValidation = validateTabTitle(objectValidation.value.title);
	if (!titleValidation.valid) return titleValidation;

	const componentValidation = validateTabComponent(objectValidation.value.component);
	if (!componentValidation.valid) return componentValidation;

	const iconValidation = validateTabIcon(objectValidation.value.icon);
	if (!iconValidation.valid) return iconValidation;

	const orderValidation = validateTabOrder(objectValidation.value.order);
	if (!orderValidation.valid) return orderValidation;

	const panelKeyValidation = validatePanelKey(objectValidation.value.panelKey);
	if (!panelKeyValidation.valid) return panelKeyValidation;

	return { valid: true, value: TabDefinition as TabDefinition };
}
