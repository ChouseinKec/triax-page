// Types
import type { WorkbenchDefinition, WorkbenchKey, WorkbenchIcon, WorkbenchOrder, WorkbenchTitle, WorkbenchComponent } from '@/src/core/layout/workbench/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { validateString, validateInteger, validateElement, validateObject } from '@/src/shared/helpers/validators';

/**
 * Validates a workbench ID for workbench operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param workbenchKey - The workbench key to validate
 */
export function validateWorkbenchKey(workbenchKey: unknown): ValidateResult<WorkbenchKey> {
	const stringValidation = validateString(workbenchKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as WorkbenchKey };
}

/**
 * Validates a workbench order for workbench operations.
 * Checks if the order is a valid number.
 *
 * @param order - The workbench order to validate
 */
export function validateWorkbenchOrder(workbenchOrder: unknown): ValidateResult<WorkbenchOrder> {
	const integerValidation = validateInteger(workbenchOrder);
	if (!integerValidation.valid) return integerValidation;

	return { valid: true, value: integerValidation.value as WorkbenchOrder };
}

/**
 * Validates a workbench title for workbench operations.
 * Checks if the title is a valid string.
 *
 * @param title - The workbench title to validate
 */
export function validateWorkbenchTitle(workbenchTitle: unknown): ValidateResult<WorkbenchTitle> {
	const stringValidation = validateString(workbenchTitle);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as WorkbenchTitle };
}

/**
 * Validates a workbench render for workbench operations.
 * Checks if the render is a valid function.
 *
 * @param render - The workbench render to validate
 */
export function validateWorkbenchComponent(workbenchComponent: unknown): ValidateResult<WorkbenchComponent> {
	const objectValidation = validateObject(workbenchComponent);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: workbenchComponent as WorkbenchComponent };
}

/**
 * Validates a workbench icon for workbench operations.
 * Checks if the icon is valid.
 *
 * @param icon - The workbench icon to validate
 */
export function validateWorkbenchIcon(workbenchIcon: unknown): ValidateResult<WorkbenchIcon> {
	const elementValidation = validateElement(workbenchIcon);
	if (elementValidation.valid) return { valid: true, value: elementValidation.value as WorkbenchIcon };

	const stringValidation = validateString(workbenchIcon);
	if (stringValidation.valid) return { valid: true, value: stringValidation.value as WorkbenchIcon };

	return { valid: false, message: `Workbench icon must be a string or React element, got: ${typeof workbenchIcon}` };
}

/**
 * Validates a complete workbench definition for workbench operations.
 * Checks if the definition has all required valid properties including ID, title, icon, order, and render.
 *
 * @param workbench - The workbench definition to validate
 */
export function validateWorkbenchDefinition(workbench: unknown): ValidateResult<WorkbenchDefinition> {
	const objectValidation = validateObject(workbench, ['key', 'title', 'icon', 'order', 'component']);
	if (!objectValidation.valid) return objectValidation;

	const idValidation = validateWorkbenchKey(objectValidation.value.key);
	if (!idValidation.valid) return idValidation;

	const titleValidation = validateWorkbenchTitle(objectValidation.value.title);
	if (!titleValidation.valid) return titleValidation;

	const iconValidation = validateWorkbenchIcon(objectValidation.value.icon);
	if (!iconValidation.valid) return iconValidation;

	const orderValidation = validateWorkbenchOrder(objectValidation.value.order);
	if (!orderValidation.valid) return orderValidation;

	const componentValidation = validateWorkbenchComponent(objectValidation.value.component);
	if (!componentValidation.valid) return componentValidation;

	return { valid: true, value: objectValidation.value as unknown as WorkbenchDefinition };
}
