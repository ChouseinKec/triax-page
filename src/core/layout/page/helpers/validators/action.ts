// Types
import type { ActionDefinition, ActionID, ActionOrder, ActionRender } from '@/src/core/layout/page/types/action';

// Utilities
import { validateString, validateInteger, validateFunction, validateObject } from '@/src/shared/helpers/validators';
import type { ValidateResult } from '@/src/shared/types/result';

/**
 * Validates a PageAction ID for action operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param id - The PageAction ID to validate
 */
export function validateActionID(id: unknown): ValidateResult<ActionID> {
	const stringValidation = validateString(id);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ActionID };
}

/**
 * Validates a PageAction order for action operations.
 * Checks if the order is a valid number.
 *
 * @param order - The PageAction order to validate
 */
export function validateActionOrder(order: unknown): ValidateResult<ActionOrder> {
	const integerValidation = validateInteger(order);
	if (!integerValidation.valid) return integerValidation;

	return { valid: true, value: integerValidation.value as ActionOrder };
}

/**
 * Validates a PageAction render for action operations.
 * Checks if the render is a valid function.
 *
 * @param render - The PageAction render to validate
 */
export function validateActionRender(render: unknown): ValidateResult<ActionRender> {
	const functionValidation = validateFunction(render);
	if (!functionValidation.valid) return functionValidation;

	return { valid: true, value: functionValidation.value as ActionRender };
}

/**
 * Validates a PageAction instance for action operations.
 * Checks if the instance has valid ID, order, and render properties.
 *
 * @param action - The PageAction instance to validate
 */
export function validateActionDefinition(action: unknown): ValidateResult<ActionDefinition> {
	const objectValidation = validateObject(action, ['id', 'order', 'render']);
	if (!objectValidation.valid) return objectValidation;

	const idValidation = validateActionID(objectValidation.value.id);
	if (!idValidation.valid) return idValidation;

	const orderValidation = validateActionOrder(objectValidation.value.order);
	if (!orderValidation.valid) return orderValidation;

	const renderValidation = validateActionRender(objectValidation.value.render);
	if (!renderValidation.valid) return renderValidation;

	return { valid: true, value: objectValidation.value as unknown as ActionDefinition };
}
