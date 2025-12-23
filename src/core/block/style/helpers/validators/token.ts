// Types
import type { TokenDefinition, TokenKey, TokenDefault } from '@/src/core/block/style/types/';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateObject, validateString } from '@/src/shared/helpers';

/**
 * Validates a CSS data type token key.
 * @param tokenKey - The token key to validate
 */
export function validateTokenKey(tokenKey: unknown): ValidateResult<TokenKey> {
	const validation = validateString(tokenKey);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as TokenKey };
}

/**
 * Validates a CSS data type token syntax.
 * @param tokenSyntax - The token syntax to validate
 */
export function validateTokenSyntax(tokenSyntax: unknown): ValidateResult<string> {
	const validation = validateString(tokenSyntax);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as string };
}

/**
 * Validates a CSS data type token default value.
 * @param tokenDefault - The token default value to validate
 */
export function validateTokenDefault(tokenDefault: unknown): ValidateResult<TokenDefault> {
	const validation = validateString(tokenDefault);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as TokenDefault };
}

/**
 * Validates a CSS data type token definition.
 * @param tokenDefinition - The token definition to validate
 */
export function validateTokenDefinition(tokenDefinition: unknown): ValidateResult<TokenDefinition> {
	const objectValidation = validateObject(tokenDefinition, ['type', 'syntax']);
	if (!objectValidation.valid) return objectValidation;

	const keyValidation = validateString(objectValidation.value.key);
	if (!keyValidation.valid) return { valid: false, message: `Token definition "key" is invalid: ${keyValidation.message}` };

	const syntaxValidation = validateTokenSyntax(objectValidation.value.syntax);
	if (!syntaxValidation.valid) return { valid: false, message: `Token definition "syntax" is invalid: ${syntaxValidation.message}` };

	if (objectValidation.value.default !== undefined) {
		const defaultValidation = validateTokenDefault(objectValidation.value.default);
		if (!defaultValidation.valid) return { valid: false, message: `Token definition "default" is invalid: ${defaultValidation.message}` };
	}

	return { valid: true, value: objectValidation.value as unknown as TokenDefinition };
}
