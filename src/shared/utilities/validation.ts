// Types
import type { ValidateResult, FetchResult } from '@/src/shared/types/result';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Batch validates multiple ValidateResult objects.
 * Returns the first error encountered, or an object with all validated values if all pass.
 */
export function validate<T extends Record<string, ValidateResult<any>>>(validations: T): { valid: true; values: { [K in keyof T]: T[K] extends ValidateResult<infer U> ? U : never } } | { valid: false; message: string } {
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
 * Batch fetches multiple FetchResult objects.
 * Returns the first error encountered, or an object with all fetched data if all succeed.
 */
export function fetch<T extends Record<string, FetchResult<any>>>(fetches: T): { success: true; data: { [K in keyof T]: T[K] extends FetchResult<infer U> ? U : never } } | { success: false; error: string } {
	const data: any = {};

	for (const key in fetches) {
		const result = fetches[key];
		if (!result.success) {
			return { success: false, error: result.error };
		}
		data[key] = result.data;
	}

	return { success: true, data };
}

/**
 * Batch validates, logs an error on failure, and returns values on success.
 * On failure, logs the error message and returns null.
 * On success, returns an object with the validated values.
 */
export function validateOrLog<T extends Record<string, ValidateResult<any>>>(validations: T, logPrefix = '[Validation]'): { [K in keyof T]: T[K] extends ValidateResult<infer U> ? U : never } | null {
	const result = validate(validations);
	if (!result.valid) return devLog.error(`${logPrefix} ${result.message}`), null;

	return result.values;
}

/**
 * Validation pipeline for chaining dependent validations.
 * Allows building complex validation flows where each step can use results from previous steps.
 * Maintains type safety by accumulating types as data is added to the pipeline.
 */
export class ValidationPipeline<TData extends Record<string, any> = {}> {
	private context: string;
	private validatedData: Record<string, any> = {};
	private hasFailed: boolean = false;

	constructor(context: string) {
		this.context = context;
	}

	/**
	 * Add a validation phase that can depend on previous validated data.
	 * @param validations - Either a validation object or a function that receives previous data
	 * @returns The pipeline with extended type information
	 */
	validate<TValidations extends Record<string, ValidateResult<any>>>(
		validations: TValidations | ((data: TData) => TValidations)
	): ValidationPipeline<TData & { [K in keyof TValidations]: TValidations[K] extends ValidateResult<infer U> ? U : never }> {
		if (this.hasFailed) return this as any; // Skip if already failed

		// Allow validations to be a function that receives previous validated data
		const validationObj = typeof validations === 'function' ? validations(this.validatedData as TData) : validations;

		const result = validate(validationObj);
		if (!result.valid) {
			devLog.error(`${this.context} ${result.message}`);
			this.hasFailed = true;
			return this as any;
		}

		// Merge validated values into pipeline data
		Object.assign(this.validatedData, result.values);
		return this as any;
	}

	/**
	 * Add a fetch phase that can depend on previous validated data.
	 * @param fetches - Either a fetch object or a function that receives previous data
	 * @returns The pipeline with extended type information
	 */
	fetch<TFetches extends Record<string, FetchResult<any>>>(
		fetches: TFetches | ((data: TData) => TFetches)
	): ValidationPipeline<TData & { [K in keyof TFetches]: TFetches[K] extends FetchResult<infer U> ? U : never }> {
		if (this.hasFailed) return this as any; // Skip if already failed

		// Allow fetches to be a function that receives previous validated data
		const fetchObj = typeof fetches === 'function' ? fetches(this.validatedData as TData) : fetches;

		const result = fetch(fetchObj);
		if (!result.success) {
			devLog.error(`${this.context} ${result.error}`);
			this.hasFailed = true;
			return this as any;
		}

		// Merge fetched data into pipeline data
		Object.assign(this.validatedData, result.data);
		return this as any;
	}

	/**
	 * Add a derivation phase that computes values from previous validated data.
	 * @param derivations - Either a derivation object or a function that receives previous data
	 * @returns The pipeline with extended type information
	 */
	derive<TDerivations extends Record<string, any>>(
		derivations: TDerivations | ((data: TData) => TDerivations)
	): ValidationPipeline<TData & TDerivations> {
		if (this.hasFailed) return this as any; // Skip if already failed

		// Allow derivations to be a function that receives previous validated data
		const derivationObj = typeof derivations === 'function' ? derivations(this.validatedData as TData) : derivations;

		// Merge derived values into pipeline data
		Object.assign(this.validatedData, derivationObj);
		return this as any;
	}

	/**
	 * Execute the pipeline and return validated data.
	 * Returns null if any validation failed (errors already logged).
	 * @returns Validated data or null if validation failed
	 */
	execute(): TData | null {
		return this.hasFailed ? null : (this.validatedData as TData);
	}
}
