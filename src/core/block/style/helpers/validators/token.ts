// Types
import type { TerminalDefinition, TerminalKey, TerminalDefault, TerminalPriority, TerminalGetComponentFn, TerminalMatchValueFn, TerminalCreateOptionFn } from '@/core/block/style/types/';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateObject, validateString, validateFunction, validateInteger } from '@/shared/helpers';

/**
 * Validates a CSS data type token key.
 * @param tokenKey - The token key to validate
 */
export function validateTokenKey(tokenKey: unknown): ValidateResult<TerminalKey> {
	const stringResult = validateString(tokenKey);
	if (!stringResult.valid) return stringResult;
	return { valid: true, value: stringResult.value as TerminalKey };
}

/**
 * Validates a CSS data type token syntax.
 * @param tokenSyntax - The token syntax to validate
 */
export function validateTokenSyntax(tokenSyntax: unknown): ValidateResult<string> {
	const stringResult = validateString(tokenSyntax);
	if (!stringResult.valid) return stringResult;
	return { valid: true, value: stringResult.value as string };
}

/**
 * Validates a CSS data type token default value.
 * @param tokenDefault - The token default value to validate
 */
export function validateTokenDefault(tokenDefault: unknown): ValidateResult<TerminalDefault> {
	const stringResult = validateString(tokenDefault);
	if (!stringResult.valid) return stringResult;
	return { valid: true, value: stringResult.value as TerminalDefault };
}

export function validateTokenComponentFn(tokenComponent: unknown): ValidateResult<TerminalGetComponentFn> {
	const functionResult = validateFunction(tokenComponent);
	if (!functionResult.valid) return functionResult;
	return { valid: true, value: functionResult.value as TerminalGetComponentFn };
}

/**
 * Validates a CSS data type token priority.
 * @param tokenPriority - The token priority to validate
 */
export function validateTokenPriority(tokenPriority: unknown): ValidateResult<TerminalPriority> {
	const functionResult = validateInteger(tokenPriority);
	if (!functionResult.valid) return functionResult;
	return { valid: true, value: functionResult.value as TerminalPriority };
}

/**
 * Validates a CSS data type token option function.
 * @param valueTokenFn - The value token function to validate
 */
export function validateValueTokenFn(valueTokenFn: unknown): ValidateResult<TerminalMatchValueFn> {
	const functionResult = validateFunction(valueTokenFn);
	if (!functionResult.valid) return functionResult;
	return { valid: true, value: functionResult.value as TerminalMatchValueFn };
}

/**
 * Validates a CSS data type token option creation function.
 * @param tokenOptionFn - The token option creation function to validate
 */
export function validateTokenOptionFn(tokenOptionFn: unknown): ValidateResult<TerminalCreateOptionFn> {
	const functionResult = validateFunction(tokenOptionFn);
	if (!functionResult.valid) return functionResult;
	return { valid: true, value: functionResult.value as TerminalCreateOptionFn };
}

/**
 * Validates a CSS data type token definition.
 * @param tokenDefinition - The token definition to validate
 */
export function validateTokenDefinition(tokenDefinition: unknown): ValidateResult<TerminalDefinition> {
	const objectResult = validateObject(tokenDefinition, ['type', 'syntax']);
	if (!objectResult.valid) return objectResult;

	const keyResult = validateString(objectResult.value.key);
	if (!keyResult.valid) return { valid: false, message: `Token definition "key" is invalid: ${keyResult.message}` };

	const syntaxResult = validateTokenSyntax(objectResult.value.syntax);
	if (!syntaxResult.valid) return { valid: false, message: `Token definition "syntax" is invalid: ${syntaxResult.message}` };

	const priorityResult = validateTokenPriority(objectResult.value.priority);
	if (!priorityResult.valid) return { valid: false, message: `Token definition "priority" is invalid: ${priorityResult.message}` };

	const componentResult = validateTokenComponentFn(objectResult.value.getComponent);
	if (!componentResult.valid) return { valid: false, message: `Token definition "getComponent" is invalid: ${componentResult.message}` };

	const getValueTokenResult = validateValueTokenFn(objectResult.value.matchValue);
	if (!getValueTokenResult.valid) return { valid: false, message: `Token definition "matchValue" is invalid: ${getValueTokenResult.message}` };

	const createOptionResult = validateTokenOptionFn(objectResult.value.createOption);
	if (!createOptionResult.valid) return { valid: false, message: `Token definition "createOption" is invalid: ${createOptionResult.message}` };

	if (objectResult.value.default !== undefined) {
		const defaultValidation = validateTokenDefault(objectResult.value.default);
		if (!defaultValidation.valid) return { valid: false, message: `Token definition "default" is invalid: ${defaultValidation.message}` };
	}

	return { valid: true, value: objectResult.value as unknown as TerminalDefinition };
}
