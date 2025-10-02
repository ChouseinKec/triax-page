// Types
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Batch validates multiple ValidationResult objects.
 * Returns the first error encountered, or an object with all validated values if all pass.
 */
export function validate<T extends Record<string, ValidationResult<any>>>(validations: T): { valid: true; values: { [K in keyof T]: T[K] extends ValidationResult<infer U> ? U : never } } | { valid: false; message: string } {
	const values: any = {};

	for (const key in validations) {
		const result = validations[key];
		if (!result.valid) {
			return { valid: false, message: result.message };
		}
		values[key] = result.value;
	}

	return { valid: true, values };
}

/**
 * Batch validates, logs an error on failure, and returns values on success.
 * On failure, logs the error message and returns undefined.
 * On success, returns an object with the validated values.
 */
export function validateOrLog<T extends Record<string, ValidationResult<any>>>(validations: T, logPrefix = '[Validation]'): { [K in keyof T]: T[K] extends ValidationResult<infer U> ? U : never } | undefined {
	const result = validate(validations);
	if (!result.valid) {
		return devLog.error(`${logPrefix} ${result.message}`, undefined);
	}
	return result.values;
}
