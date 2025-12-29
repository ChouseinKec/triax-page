// Types
import type { WorkbenchDefinition, WorkbenchID, WorkbenchIcon, WorkbenchOrder, WorkbenchTitle, WorkbenchRender } from '@/src/core/layout/workbench/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { validateString, validateInteger, validateFunction, validateElement, validateObject } from '@/src/shared/helpers/validators';

/**
 * Validates a workbench ID for workbench operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param id - The workbench ID to validate
 */
export function validateWorkbenchID(id: unknown): ValidateResult<WorkbenchID> {
	const stringValidation = validateString(id);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as WorkbenchID };
}

/**
 * Validates a workbench order for workbench operations.
 * Checks if the order is a valid number.
 *
 * @param order - The workbench order to validate
 */
export function validateWorkbenchOrder(order: unknown): ValidateResult<WorkbenchOrder> {
	const integerValidation = validateInteger(order);
	if (!integerValidation.valid) return integerValidation;

	return { valid: true, value: integerValidation.value as WorkbenchOrder };
}

/**
 * Validates a workbench title for workbench operations.
 * Checks if the title is a valid string.
 *
 * @param title - The workbench title to validate
 */
export function validateWorkbenchTitle(title: unknown): ValidateResult<WorkbenchTitle> {
	const stringValidation = validateString(title);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as WorkbenchTitle };
}

/**
 * Validates a workbench render for workbench operations.
 * Checks if the render is a valid function.
 *
 * @param render - The workbench render to validate
 */
export function validateWorkbenchRender(render: unknown): ValidateResult<WorkbenchRender> {
	const functionValidation = validateFunction(render);
	if (!functionValidation.valid) return functionValidation;

	return { valid: true, value: functionValidation.value as WorkbenchRender };
}

/**
 * Validates a workbench icon for workbench operations.
 * Checks if the icon is valid.
 *
 * @param icon - The workbench icon to validate
 */
export function validateWorkbenchIcon(icon: unknown): ValidateResult<WorkbenchIcon> {
	const elementValidation = validateElement(icon);
	if (elementValidation.valid) return { valid: true, value: elementValidation.value as WorkbenchIcon };

	const stringValidation = validateString(icon);
	if (stringValidation.valid) return { valid: true, value: stringValidation.value as WorkbenchIcon };

	return { valid: false, message: `Workbench icon must be a string or React element, got: ${typeof icon}` };
}

/**
 * Validates a complete workbench definition for workbench operations.
 * Checks if the definition has all required valid properties including ID, title, icon, order, and render.
 *
 * @param workbench - The workbench definition to validate
 */
export function validateWorkbenchDefinition(workbench: unknown): ValidateResult<WorkbenchDefinition> {
	const objectValidation = validateObject(workbench, ['id', 'title', 'icon', 'order', 'render']);
	if (!objectValidation.valid) return objectValidation;

	const idValidation = validateWorkbenchID(objectValidation.value.id);
	if (!idValidation.valid) return idValidation;

	const titleValidation = validateWorkbenchTitle(objectValidation.value.title);
	if (!titleValidation.valid) return titleValidation;

	const iconValidation = validateWorkbenchIcon(objectValidation.value.icon);
	if (!iconValidation.valid) return iconValidation;

	const orderValidation = validateWorkbenchOrder(objectValidation.value.order);
	if (!orderValidation.valid) return orderValidation;

	const renderValidation = validateWorkbenchRender(objectValidation.value.render);
	if (!renderValidation.valid) return renderValidation;

	return { valid: true, value: objectValidation.value as unknown as WorkbenchDefinition };
}
