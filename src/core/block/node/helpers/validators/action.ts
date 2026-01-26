// Types
import type { ActionTitle, ActionDefinition, ActionKey, ActionOrder, ActionRender } from '@/core/block/node/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { validateString, validateObject, validateInteger } from '@/shared/helpers/validators';
import { validateNodeKey } from './definition';

/**
 * Validates an action ID for action operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param actionKey - The action key to validate
 */
export function validateActionKey(actionKey: unknown): ValidateResult<ActionKey> {
	const stringValidation = validateString(actionKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value };
}

/**
 * Validates an action component for action operations.
 * Checks if the component is a valid React component.
 *
 * @param actionComponent - The action component to validate
 */
export function validateActionComponent(actionRender: unknown): ValidateResult<ActionRender> {
	const objectValidation = validateObject(actionRender);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: actionRender as ActionRender };
}

/**
 * Validates an action order for action operations.
 * Checks if the order is a valid integer.
 *
 * @param actionOrder - The action order to validate
 */
export function validateActionOrder(actionOrder: unknown): ValidateResult<ActionOrder> {
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
export function validateActionTitle(actionTitle: unknown): ValidateResult<ActionTitle> {
	const stringValidation = validateString(actionTitle);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value };
}

/**
 * Validates a complete action definition for action operations.
 * Checks if the definition has all required valid properties including key, title, nodeKey, and component.
 *
 * @param action - The action definition to validate
 */
export function validateActionDefinition(action: unknown): ValidateResult<ActionDefinition> {
	const objectValidation = validateObject(action, ['key', 'title', 'nodeKey', 'component', 'order']);
	if (!objectValidation.valid) return objectValidation;

	const keyValidation = validateActionKey(objectValidation.value.key);
	if (!keyValidation.valid) return keyValidation;

	const titleValidation = validateActionTitle(objectValidation.value.title);
	if (!titleValidation.valid) return titleValidation;

	const nodeKeyValidation = validateNodeKey(objectValidation.value.nodeKey);
	if (!nodeKeyValidation.valid) return nodeKeyValidation;

	const componentValidation = validateActionComponent(objectValidation.value.component);
	if (!componentValidation.valid) return componentValidation;

	const orderValidation = validateActionOrder(objectValidation.value.order);
	if (!orderValidation.valid) return orderValidation;

	return { valid: true, value: objectValidation.value as unknown as ActionDefinition };
}
