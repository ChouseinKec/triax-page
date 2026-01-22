// Types
import type { TokenDefinition, TokenKey, TokenDefault, TokenTypeKey, TokenTypeDefinition, TokenPriority, TokenGetTokenComponent, TokenGetValueTypeFn, TokenGetTokenCanonicalFn, TokenGetTokenTypeFn, TokenGetValueTokenFn, TokenCreateOptionFn } from '@/core/block/style/definition/types/';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateObject, validateString, validateFunction, validateInteger, validateElement } from '@/shared/helpers';

export function validateTokenType(tokenType: unknown): ValidateResult<TokenTypeKey> {
	const validation = validateString(tokenType);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as TokenTypeKey };
}

/**
 * Validates a CSS data type token key.
 * @param tokenKey - The token key to validate
 */
export function validateTokenKey(tokenKey: unknown): ValidateResult<TokenKey> {
	const stringResult = validateString(tokenKey);
	if (!stringResult.valid) return stringResult;

	return { valid: true, value: stringResult.value as TokenKey };
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
export function validateTokenDefault(tokenDefault: unknown): ValidateResult<TokenDefault> {
	const stringResult = validateString(tokenDefault);
	if (!stringResult.valid) return stringResult;

	return { valid: true, value: stringResult.value as TokenDefault };
}

export function validateTokenComponentFn(tokenComponent: unknown): ValidateResult<TokenGetTokenComponent> {
	const functionResult = validateFunction(tokenComponent);
	if (!functionResult.valid) return functionResult;

	return { valid: true, value: functionResult.value as TokenGetTokenComponent };
}

/**
 * Validates a CSS data type token priority.
 * @param tokenPriority - The token priority to validate
 */
export function validateTokenPriority(tokenPriority: unknown): ValidateResult<TokenPriority> {
	const functionResult = validateInteger(tokenPriority);
	if (!functionResult.valid) return functionResult;

	return { valid: true, value: functionResult.value as TokenPriority };
}

/**
 * Validates a CSS data type token canonical function.
 * @param tokenCanonicalFn - The token canonical function to validate
 */
export function validateTokenCanonicalFn(tokenCanonicalFn: unknown): ValidateResult<TokenGetTokenCanonicalFn> {
	const functionResult = validateFunction(tokenCanonicalFn);
	if (!functionResult.valid) return functionResult;

	return { valid: true, value: functionResult.value as TokenGetTokenCanonicalFn };
}

/**
 * Validates a CSS data type token match function.
 * @param tokenMatchFn - The token match function to validate
 */
export function validateTokenTypeFn(tokenTypeFn: unknown): ValidateResult<TokenGetTokenTypeFn> {
	const functionResult = validateFunction(tokenTypeFn);
	if (!functionResult.valid) return functionResult;

	return { valid: true, value: functionResult.value as TokenGetTokenTypeFn };
}

/**
 * Validates a CSS data type token validate function.
 * @param tokenValidateFn - The token validate function to validate
 */
export function validateValueTypeFn(valueTypeFn: unknown): ValidateResult<TokenGetValueTypeFn> {
	const functionResult = validateFunction(valueTypeFn);
	if (!functionResult.valid) return functionResult;

	return { valid: true, value: functionResult.value as TokenGetValueTypeFn };
}

/**
 * Validates a CSS data type token option function.
 * @param tokenOptionFn - The token option function to validate
 */
export function validateValueTokenFn(valueTokenFn: unknown): ValidateResult<TokenGetValueTokenFn> {
	const functionResult = validateFunction(valueTokenFn);
	if (!functionResult.valid) return functionResult;

	return { valid: true, value: functionResult.value as TokenGetValueTokenFn };
}

/**
 * Validates a CSS data type token option creation function.
 * @param tokenOptionFn - The token option creation function to validate
 */
export function validateTokenOptionFn(tokenOptionFn: unknown): ValidateResult<TokenCreateOptionFn> {
	const functionResult = validateFunction(tokenOptionFn);
	if (!functionResult.valid) return functionResult;

	return { valid: true, value: functionResult.value as TokenCreateOptionFn };
}

/**
 * Validates a CSS data type token definition.
 * @param tokenDefinition - The token definition to validate
 */
export function validateTokenDefinition(tokenDefinition: unknown): ValidateResult<TokenDefinition> {
	const objectResult = validateObject(tokenDefinition, ['type', 'syntax']);
	if (!objectResult.valid) return objectResult;

	const keyResult = validateString(objectResult.value.key);
	if (!keyResult.valid) return { valid: false, message: `Token definition "key" is invalid: ${keyResult.message}` };

	const syntaxResult = validateTokenSyntax(objectResult.value.syntax);
	if (!syntaxResult.valid) return { valid: false, message: `Token definition "syntax" is invalid: ${syntaxResult.message}` };

	const typeResult = validateTokenType(objectResult.value.type);
	if (!typeResult.valid) return { valid: false, message: `Token definition "type" is invalid: ${typeResult.message}` };

	if (objectResult.value.default !== undefined) {
		const defaultValidation = validateTokenDefault(objectResult.value.default);
		if (!defaultValidation.valid) return { valid: false, message: `Token definition "default" is invalid: ${defaultValidation.message}` };
	}

	return { valid: true, value: objectResult.value as unknown as TokenDefinition };
}

export function validateTokenTypeDefinition(tokenTypeDefinition: unknown): ValidateResult<TokenTypeDefinition> {
	const objectResult = validateObject(tokenTypeDefinition, ['key', 'priority', 'getTokenComponent', 'getValueType', 'getTokenType', 'getValueToken', 'createOption']);
	if (!objectResult.valid) return objectResult;

	const keyResult = validateTokenType(objectResult.value.key);
	if (!keyResult.valid) return { valid: false, message: `Token type definition "key" is invalid: ${keyResult.message}` };

	const priorityResult = validateTokenPriority(objectResult.value.priority);
	if (!priorityResult.valid) return { valid: false, message: `Token type definition "priority" is invalid: ${priorityResult.message}` };

	const componentResult = validateTokenComponentFn(objectResult.value.getTokenComponent);
	if (!componentResult.valid) return { valid: false, message: `Token type definition "getTokenComponent" is invalid: ${componentResult.message}` };

	const getValueTypeResult = validateValueTypeFn(objectResult.value.getValueType);
	if (!getValueTypeResult.valid) return { valid: false, message: `Token type definition "getValueType" is invalid: ${getValueTypeResult.message}` };

	const getTokenCanonicalResult = validateTokenCanonicalFn(objectResult.value.getTokenCanonical);
	if (!getTokenCanonicalResult.valid) return { valid: false, message: `Token type definition "getTokenCanonical" is invalid: ${getTokenCanonicalResult.message}` };

	const getTokenTypeResult = validateTokenTypeFn(objectResult.value.getTokenType);
	if (!getTokenTypeResult.valid) return { valid: false, message: `Token type definition "getTokenType" is invalid: ${getTokenTypeResult.message}` };

	const getValueTokenResult = validateValueTokenFn(objectResult.value.getValueToken);
	if (!getValueTokenResult.valid) return { valid: false, message: `Token type definition "getValueToken" is invalid: ${getValueTokenResult.message}` };

	const createOptionResult = validateTokenOptionFn(objectResult.value.createOption);
	if (!createOptionResult.valid) return { valid: false, message: `Token type definition "createOption" is invalid: ${createOptionResult.message}` };

	return { valid: true, value: objectResult.value as unknown as TokenTypeDefinition };
}
