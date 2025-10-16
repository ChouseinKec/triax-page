// Types
import type { ValidateResult } from '@/src/shared/types/result';
import type { ReactElement } from 'react';

export function validateString(input: unknown): ValidateResult<string> {
	if (typeof input !== 'string' || input.trim().length === 0) {
		return { valid: false, message: `Invalid string: expected non-empty string, got ${typeof input === 'string' ? `"${input}"` : typeof input}` };
	}

	return { valid: true, value: input };
}

export function validateArray(input: unknown): ValidateResult<unknown[]> {
	if (!Array.isArray(input)) {
		return { valid: false, message: `Invalid array: expected an array, got ${typeof input}` };
	}

	if (input.length === 0) {
		return { valid: false, message: 'Invalid array: array cannot be empty' };
	}

	for (const item of input) {
		const itemValidation = validateString(item);
		if (!itemValidation.valid) return { valid: false, message: `Invalid array item (${item}): ${itemValidation.message}` };
	}

	return { valid: true, value: input };
}

export function validateFunction<T extends (...args: unknown[]) => unknown>(input: unknown): ValidateResult<T> {
	if (typeof input !== 'function') {
		return { valid: false, message: `Invalid function: expected a function, got ${typeof input}` };
	}

	return { valid: true, value: input as T };
}

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

export function validateElement(input: unknown): ValidateResult<ReactElement> {
	if (input !== null && typeof input === 'object' && '$$typeof' in input) {
		return { valid: true, value: input as unknown as ReactElement };
	}

	return { valid: false, message: `Invalid component: expected a React element, got ${typeof input}` };
}
