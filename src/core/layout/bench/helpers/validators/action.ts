// Types
import type { ActionDefinition, BenchKey } from '@/core/layout/bench/types';
import type { ComponentType } from 'react';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { validateString, validateObject, validateInteger, validateFunction } from '@/shared/helpers/validators';
import { validateBenchKey } from './bench';

/**
 * Validates an action key for action operations.
 * Checks if the key is a valid string identifier.
 *
 * @param actionKey - The action key to validate
 */
export function validateActionKey(actionKey: unknown): ValidateResult<string> {
	const stringValidation = validateString(actionKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value };
}

/**
 * Validates an action bench key for action operations.
 * Checks if the bench key is a valid workbench key.
 *
 * @param benchKey - The bench key to validate
 */
export function validateActionBenchKey(benchKey: unknown): ValidateResult<BenchKey> {
	return validateBenchKey(benchKey);
}

/**
 * Validates an action component for action operations.
 * Checks if the component is a valid React component.
 *
 * @param actionComponent - The action component to validate
 */
export function validateActionComponent(actionComponent: unknown): ValidateResult<ComponentType<any>> {
	const objectValidation = validateObject(actionComponent);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: actionComponent as ComponentType<any> };
}

/**
 * Validates an action order for action operations.
 * Checks if the order is a valid integer.
 *
 * @param actionOrder - The action order to validate
 */
export function validateActionOrder(actionOrder: unknown): ValidateResult<number> {
	const integerValidation = validateInteger(actionOrder);
	if (!integerValidation.valid) return integerValidation;

	return { valid: true, value: integerValidation.value };
}

/**
 * Validates an action title for action operations.
 * Checks if the title is a valid string.
 *
 * @param actionTitle - The action title to validate
 */
export function validateActionTitle(actionTitle: unknown): ValidateResult<string> {
	const stringValidation = validateString(actionTitle);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value };
}

/**
 * Validates a complete action definition for action operations.
 * Checks if the definition has all required valid properties including key, benchKey, and component.
 *
 * @param action - The action definition to validate
 */
export function validateActionDefinition(action: unknown): ValidateResult<ActionDefinition> {
	const objectValidation = validateObject(action, ['key', 'benchKey', 'component', 'order', 'title']);
	if (!objectValidation.valid) return objectValidation;

	const keyValidation = validateActionKey(objectValidation.value.key);
	if (!keyValidation.valid) return keyValidation;

	const benchKeyValidation = validateActionBenchKey(objectValidation.value.benchKey);
	if (!benchKeyValidation.valid) return benchKeyValidation;

	const componentValidation = validateActionComponent(objectValidation.value.component);
	if (!componentValidation.valid) return componentValidation;

	const orderValidation = validateActionOrder(objectValidation.value.order);
	if (!orderValidation.valid) return orderValidation;

	const titleValidation = validateActionTitle(objectValidation.value.title);
	if (!titleValidation.valid) return titleValidation;

	return { valid: true, value: objectValidation.value as unknown as ActionDefinition };
}
