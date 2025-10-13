// Types
import type { TabDefinition, TabID, TabTitle, TabComponent, TabIcon, TabOrder } from '@/src/page-builder/core/editor/layout/types/tab';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isTabDefinitionValid, isTabIDValid, isTabTitleValid, isTabComponentValid, isTabIconValid, isTabOrderValid, isPanelIDValid } from '@/src/page-builder/core/editor/layout/utilities';

// Helpers
import { validatePanelID } from '@/src/page-builder/services/helpers/validate';

/**
 * Validates a tab ID for tab operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param tabID - The tab ID to validate
 * @returns ValidateResult containing validity and the validated TabID if valid
 *
 * @example
 * validateTabID('tab-123') → { valid: true, value: 'tab-123' }
 */
export function validateTabID(tabID: unknown): ValidateResult<TabID> {
	if (!isTabIDValid(tabID)) return { valid: false, message: `Tab ID must be a valid string, got: ${tabID}` };
	return { valid: true, value: tabID as TabID };
}

/**
 * Validates a tab title for tab operations.
 * Checks if the title is a valid string.
 *
 * @param tabTitle - The tab title to validate
 * @returns ValidateResult containing validity and the validated TabTitle if valid
 *
 * @example
 * validateTabTitle('My Tab') → { valid: true, value: 'My Tab' }
 */
export function validateTabTitle(tabTitle: unknown): ValidateResult<TabTitle> {
	if (!isTabTitleValid(tabTitle)) return { valid: false, message: `Tab title must be a valid string, got: ${tabTitle}` };
	return { valid: true, value: tabTitle as TabTitle };
}

/**
 * Validates a tab component for tab operations.
 * Checks if the component is a valid React component.
 *
 * @param tabComponent - The tab component to validate
 * @returns ValidateResult containing validity and the validated TabComponent if valid
 *
 * @example
 * validateTabComponent(MyComponent) → { valid: true, value: MyComponent }
 */
export function validateTabComponent(tabComponent: unknown): ValidateResult<TabComponent> {
	if (!isTabComponentValid(tabComponent)) return { valid: false, message: `Tab component must be a valid React component, got: ${tabComponent}` };
	return { valid: true, value: tabComponent as TabComponent };
}

/**
 * Validates a tab icon for tab operations.
 * Checks if the icon is a valid React icon.
 *
 * @param tabIcon - The tab icon to validate
 * @returns ValidateResult containing validity and the validated TabIcon if valid
 *
 * @example
 * validateTabIcon(<Icon name="star" />) → { valid: true, value: <Icon name="star" /> }
 */
export function validateTabIcon(tabIcon: unknown): ValidateResult<TabIcon> {
	if (!isTabIconValid(tabIcon)) return { valid: false, message: `Tab icon must be a valid React icon, got: ${tabIcon}` };
	return { valid: true, value: tabIcon as TabIcon };
}

/**
 * Validates a tab order for tab operations.
 * Checks if the order is a valid number.
 *
 * @param tabOrder - The tab order to validate
 * @returns ValidateResult containing validity and the validated TabOrder if valid
 *
 * @example
 * validateTabOrder(1) → { valid: true, value: 1 }
 */
export function validateTabOrder(tabOrder: unknown): ValidateResult<TabOrder> {
	if (!isTabOrderValid(tabOrder)) return { valid: false, message: `Tab order must be a valid number, got: ${tabOrder}` };
	return { valid: true, value: tabOrder as TabOrder };
}

/**
 * Validates a complete tab definition for tab operations.
 * Checks if the definition has all required valid properties including ID, title, component, icon, order, and panel ID.
 *
 * @param tabDefinition - The tab definition to validate
 * @returns ValidateResult containing validity and the validated TabDefinition if valid
 *
 * @example
 * validateTabDefinition({ id: 'tab-1', title: 'My Tab', component: MyComponent, icon: <Icon />, order: 1, panelID: 'panel-1' }) → { valid: true, value: {...} }
 */
export function validateTabDefinition(tabDefinition: unknown): ValidateResult<TabDefinition> {
	if (!isTabDefinitionValid(tabDefinition)) return { valid: false, message: `Invalid tab definition shape: ${JSON.stringify(tabDefinition)}` };

	const idValidation = validateTabID(tabDefinition.id);
	if (!idValidation.valid) return { valid: false, message: idValidation.message };

	const titleValidation = validateTabTitle(tabDefinition.title);
	if (!titleValidation.valid) return { valid: false, message: titleValidation.message };

	const componentValidation = validateTabComponent(tabDefinition.component);
	if (!componentValidation.valid) return { valid: false, message: componentValidation.message };

	const iconValidation = validateTabIcon(tabDefinition.icon);
	if (!iconValidation.valid) return { valid: false, message: iconValidation.message };

	const orderValidation = validateTabOrder(tabDefinition.order);
	if (!orderValidation.valid) return { valid: false, message: orderValidation.message };

	const panelIDValidation = validatePanelID(tabDefinition.panelID);
	if (!panelIDValidation.valid) return { valid: false, message: panelIDValidation.message };

	return { valid: true, value: tabDefinition as TabDefinition };
}
