// Types
import type { ActionDefinition, ActionID, ActionOrder, ActionComponent } from '@/core/layout/page/types/action';

// Utilities
import { validateString, validateInteger, validateFunction, validateObject } from '@/shared/helpers/validators';
import type { ValidateResult } from '@/shared/types/result';

/**
 * Validates a PageAction ID for action operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param actionID - The PageAction ID to validate
 */
export function validateActionID(actionID: unknown): ValidateResult<ActionID> {
	const stringValidation = validateString(actionID);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ActionID };
}

/**
 * Validates a PageAction order for action operations.
 * Checks if the order is a valid number.
 *
 * @param actionOrder - The PageAction order to validate
 */
export function validateActionOrder(actionOrder: unknown): ValidateResult<ActionOrder> {
	const integerValidation = validateInteger(actionOrder);
	if (!integerValidation.valid) return integerValidation;

	return { valid: true, value: integerValidation.value as ActionOrder };
}

/**
 * Validates a PageAction render for action operations.
 * Checks if the render is a valid function.
 *
 * @param component - The PageAction component to validate
 */
export function validateActionComponent(actionComponent: unknown): ValidateResult<ActionComponent> {
	const functionValidation = validateFunction(actionComponent);
	if (!functionValidation.valid) return functionValidation;

	return { valid: true, value: functionValidation.value as ActionComponent };
}

/**
 * Validates a PageAction instance for action operations.
 * Checks if the instance has valid ID, order, and render properties.
 *
 * @param actionDefinition - The PageAction instance to validate
 */
export function validateActionDefinition(actionDefinition: unknown): ValidateResult<ActionDefinition> {
	const objectValidation = validateObject(actionDefinition, ['id', 'order', 'component']);
	if (!objectValidation.valid) return objectValidation;

	const idValidation = validateActionID(objectValidation.value.id);
	if (!idValidation.valid) return idValidation;

	const orderValidation = validateActionOrder(objectValidation.value.order);
	if (!orderValidation.valid) return orderValidation;

	const componentValidation = validateActionComponent(objectValidation.value.component);
	if (!componentValidation.valid) return componentValidation;

	return { valid: true, value: objectValidation.value as unknown as ActionDefinition };
}
