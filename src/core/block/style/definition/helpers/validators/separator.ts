// Types
import type { SeparatorDefinition, SeparatorKey, SeparatorValue } from '@/core/block/style/definition/types/';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateObject, validateString } from '@/shared/helpers';

/**
 * Validates a CSS data type token key.
 * @param separatorKey - The separator key to validate
 */
export function validateSeparatorKey(separatorKey: unknown): ValidateResult<SeparatorKey> {
	const validation = validateString(separatorKey);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as SeparatorKey };
}

/**
 * Validates a CSS data type token syntax.
 * @param separatorValue - The separator value to validate
 */
export function validateSeparatorValue(separatorValue: unknown): ValidateResult<SeparatorValue> {
	const validation = validateString(separatorValue);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as SeparatorValue };
}

/**
 * Validates a CSS style separator for block style operations.
 *
 * @param separatorDefinition - The CSS style separator to validate
 */
export function validateSeparatorDefinition(separatorDefinition: unknown): ValidateResult<SeparatorDefinition> {
	const validation = validateObject(separatorDefinition, ['key', 'value']);
	if (!validation.valid) return validation;

	const keyValidation = validateSeparatorKey(validation.value.key);
	if (!keyValidation.valid) return { valid: false, message: `Separator definition "key" is invalid: ${keyValidation.message}` };

	const valueValidation = validateSeparatorValue(validation.value.value);
	if (!valueValidation.valid) return { valid: false, message: `Separator definition "value" is invalid: ${valueValidation.message}` };

	return { valid: true, value: validation.value as unknown as SeparatorDefinition };
}
