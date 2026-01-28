// Types
import type { ActionTitle, ActionDefinition, ActionKey, ActionOrder, ActionRender } from '@/core/block/node/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { validateString, validateObject, validateInteger } from '@/shared/helpers/validators';
import { validateNodeKey } from './definition';

/**
 * Validates that the provided value is a valid action key.
 *
 * An action key must be a non-empty string that uniquely identifies an action
 * within the system. This validation ensures that only properly formatted
 * action identifiers are used.
 *
 * @param actionKey - The value to validate as an action key
 * @returns A ValidateResult indicating whether the value is a valid action key
 */
export function validateActionKey(actionKey: unknown): ValidateResult<ActionKey> {
	const stringValidation = validateString(actionKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value };
}

/**
 * Validates that the provided value is a valid action render component.
 *
 * An action render component must be a valid object that can be used to render
 * the action in the UI. This validation ensures that actions have proper
 * rendering capabilities.
 *
 * @param actionRender - The value to validate as an action render component
 * @returns A ValidateResult indicating whether the value is a valid action render component
 */
export function validateActionComponent(actionRender: unknown): ValidateResult<ActionRender> {
	const objectValidation = validateObject(actionRender);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: actionRender as ActionRender };
}

/**
 * Validates that the provided value is a valid action order.
 *
 * An action order must be an integer that determines the display sequence
 * of actions in the UI. This validation ensures that ordering values are
 * properly formatted.
 *
 * @param actionOrder - The value to validate as an action order
 * @returns A ValidateResult indicating whether the value is a valid action order
 */
export function validateActionOrder(actionOrder: unknown): ValidateResult<ActionOrder> {
	const integerValidation = validateInteger(actionOrder);
	if (!integerValidation.valid) return integerValidation;

	return { valid: true, value: integerValidation.value };
}

/**
 * Validates that the provided value is a valid action title.
 *
 * An action title must be a non-empty string that describes the action
 * for display in the UI. This validation ensures that user-facing text
 * is properly formatted.
 *
 * @param actionTitle - The value to validate as an action title
 * @returns A ValidateResult indicating whether the value is a valid action title
 */
export function validateActionTitle(actionTitle: unknown): ValidateResult<ActionTitle> {
	const stringValidation = validateString(actionTitle);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value };
}

/**
 * Validates that the provided value is a complete and valid action definition.
 *
 * This comprehensive validation checks that the action definition has all required
 * properties (key, title, nodeKey, component, order) and that each property conforms
 * to its expected type and validation rules. It ensures that only properly configured
 * action definitions can be registered in the system.
 *
 * @param action - The value to validate as an action definition
 * @returns A ValidateResult indicating whether the value is a valid action definition
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
