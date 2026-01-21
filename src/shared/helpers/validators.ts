// Types
import type { ValidateResult } from '@/shared/types/result';
import type { ReactElement } from 'react';

/**
 * Validates if a value is a non-empty string.
 * Checks if the value is a string type and contains at least one non-whitespace character.
 * @param input - The value to validate
 * @returns ValidateResult with valid status and value or error message
 * @example
 * validateString('hello') → { valid: true, value: 'hello' }
 * validateString('') → { valid: false, message: '...' }
 */
export function validateString(input: unknown): ValidateResult<string> {
	if (typeof input !== 'string' || input.trim().length === 0) {
		return { valid: false, message: `Invalid string: expected non-empty string, got ${typeof input === 'string' ? `"${input}"` : typeof input}` };
	}

	return { valid: true, value: input };
}

/**
 * Validates if a value is a non-empty array of strings.
 * Checks if the value is an array, is not empty, and all items are strings.
 * @param input - The value to validate
 * @returns ValidateResult with valid status and array of strings or error message
 * @example
 * validateArray(['a', 'b']) → { valid: true, value: ['a', 'b'] }
 * validateArray([]) → { valid: false, message: '...' }
 */
export function validateArray(input: unknown): ValidateResult<unknown[]> {
	if (!Array.isArray(input)) return { valid: false, message: `Invalid array: expected an array, got ${typeof input}` };

	if (input.length === 0) return { valid: false, message: 'Invalid array: array cannot be empty' };

	return { valid: true, value: input };
}

/**
 * Validates if a value is a function.
 * Checks if the value is of function type.
 * @param input - The value to validate
 * @returns ValidateResult with valid status and typed function or error message
 * @example
 * validateFunction(() => {}) → { valid: true, value: function }
 * validateFunction('not-a-function') → { valid: false, message: '...' }
 */
export function validateFunction<T extends (...args: unknown[]) => unknown>(input: unknown): ValidateResult<T> {
	if (typeof input !== 'function') return { valid: false, message: `Invalid function: expected a function, got ${typeof input}` };

	return { valid: true, value: input as T };
}

/**
 * Validates if a value is an object, optionally checking for required keys.
 * Checks if the value is a plain object (not array or null), and optionally verifies required keys exist.
 * @param input - The value to validate
 * @param keys - Optional array of required key names
 * @returns ValidateResult with valid status and object or error message
 * @example
 * validateObject({ a: 1 }) → { valid: true, value: { a: 1 } }
 * validateObject({ a: 1 }, ['a', 'b']) → { valid: false, message: 'missing required keys: b' }
 */
export function validateObject(input: unknown): ValidateResult<Record<string, unknown>>;
export function validateObject(input: unknown, keys: string[]): ValidateResult<Record<string, unknown>>;
export function validateObject(input: unknown, keys?: string[]): ValidateResult<Record<string, unknown>> {
	if (!input || typeof input !== 'object' || Array.isArray(input)) {
		return { valid: false, message: `Invalid object: expected an object, got ${typeof input}` };
	}

	const obj = input as Record<string, unknown>;

	if (keys) {
		const missingKeys = keys.filter((key) => !(key in obj));
		if (missingKeys.length > 0) {
			return { valid: false, message: `Invalid object: missing required keys: ${missingKeys.join(', ')}` };
		}
	}

	return { valid: true, value: obj };
}

export function validateBoolean(input: unknown): ValidateResult<boolean> {
	if (typeof input !== 'boolean') return { valid: false, message: `Invalid boolean: expected a boolean, got ${typeof input}` };

	return { valid: true, value: input };
}

/**
 * Validates if a value is a React element.
 * Checks if the value has the React element structure ($$typeof property).
 * @param input - The value to validate
 * @returns ValidateResult with valid status and ReactElement or error message
 * @example
 * validateElement(<div />) → { valid: true, value: ReactElement }
 * validateElement('string') → { valid: false, message: '...' }
 */
export function validateElement(input: unknown): ValidateResult<ReactElement> {
	if (input !== null && typeof input === 'object' && '$$typeof' in input) {
		return { valid: true, value: input as unknown as ReactElement };
	}

	return { valid: false, message: `Invalid component: expected a React element, got ${typeof input}` };
}

export function validateInteger(input: unknown): ValidateResult<number> {
	const numberValue = Number(input);
	if (!Number.isInteger(numberValue)) return { valid: false, message: `Invalid integer: expected an integer, got ${input}` };

	return { valid: true, value: numberValue };
}
