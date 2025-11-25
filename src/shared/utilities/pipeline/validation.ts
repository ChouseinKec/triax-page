// Types
import type { ValidateResult, FetchResult, OperationResult } from '@/src/shared/types/result';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Batch validates multiple ValidateResult objects.
 * Returns the first error encountered, or an object with all validated values if all pass.
 */
export function validate<T extends Record<string, ValidateResult<unknown>>>(validations: T): { valid: true; values: { [K in keyof T]: T[K] extends ValidateResult<infer U> ? U : never } } | { valid: false; message: string } {
    const values = {} as { [K in keyof T]: T[K] extends ValidateResult<infer U> ? U : never };

    for (const key in validations) {
        const result = validations[key];
        if (!result.valid) {
            return { valid: false, message: result.message };
        }
        (values as Record<string, unknown>)[key] = result.value;
    }

    return { valid: true, values };
}

/**
 * Batch fetches multiple FetchResult objects.
 * Returns the first error encountered, or an object with all fetched data if all succeed.
 */
export function fetch<T extends Record<string, FetchResult<unknown>>>(fetches: T): { success: true; data: { [K in keyof T]: T[K] extends FetchResult<infer U> ? U : never } } | { success: false; error: string } {
    const data = {} as { [K in keyof T]: T[K] extends FetchResult<infer U> ? U : never };

    for (const key in fetches) {
        const result = fetches[key];
        if (!result.success) {
            return { success: false, error: result.error };
        }
        (data as Record<string, unknown>)[key] = result.data;
    }

    return { success: true, data };
}

/**
 * Batch validates, logs an error on failure, and returns values on success.
 * On failure, logs the error message and returns null.
 * On success, returns an object with the validated values.
 */
export function validateOrLog<T extends Record<string, ValidateResult<unknown>>>(validations: T, logPrefix = '[Validation]'): { [K in keyof T]: T[K] extends ValidateResult<infer U> ? U : never } | null {
    const result = validate(validations);
    if (!result.valid) return devLog.error(`${logPrefix} ${result.message}`), null;

    return result.values;
}

/**
 * Validation pipeline for chaining dependent validations.
 * Allows building complex validation flows where each step can use results from previous steps.
 * Maintains type safety by accumulating types as data is added to the pipeline.
 */
export class ValidationPipeline<TData extends Record<string, unknown> = Record<string, never>> {
    private context: string;
    private validatedData: Record<string, unknown> = {};
    private hasFailed: boolean = false;

    constructor(context: string) {
        this.context = context;
    }

    validate<TValidations extends Record<string, ValidateResult<unknown>>>(validations: TValidations | ((data: TData) => TValidations)): ValidationPipeline<TData & { [K in keyof TValidations]: TValidations[K] extends ValidateResult<infer U> ? U : never }> {
        if (this.hasFailed) return this as ValidationPipeline<TData & { [K in keyof TValidations]: TValidations[K] extends ValidateResult<infer U> ? U : never }>; // Skip if already failed

        const validationObj = typeof validations === 'function' ? validations(this.validatedData as TData) : validations;

        const result = validate(validationObj);
        if (!result.valid) {
            devLog.error(`${this.context} ${result.message}`);
            this.hasFailed = true;
            return this as ValidationPipeline<TData & { [K in keyof TValidations]: TValidations[K] extends ValidateResult<infer U> ? U : never }>;
        }

        Object.assign(this.validatedData, result.values);
        return this as ValidationPipeline<TData & { [K in keyof TValidations]: TValidations[K] extends ValidateResult<infer U> ? U : never }>;
    }

    fetch<TFetches extends Record<string, FetchResult<unknown>>>(fetches: TFetches | ((data: TData) => TFetches)): ValidationPipeline<TData & { [K in keyof TFetches]: TFetches[K] extends FetchResult<infer U> ? U : never }> {
        if (this.hasFailed) return this as ValidationPipeline<TData & { [K in keyof TFetches]: TFetches[K] extends FetchResult<infer U> ? U : never }>; // Skip if already failed

        const fetchObj = typeof fetches === 'function' ? fetches(this.validatedData as TData) : fetches;

        const result = fetch(fetchObj);
        if (!result.success) {
            devLog.error(`${this.context} ${result.error}`);
            this.hasFailed = true;
            return this as ValidationPipeline<TData & { [K in keyof TFetches]: TFetches[K] extends FetchResult<infer U> ? U : never }>;
        }

        Object.assign(this.validatedData, result.data);
        return this as ValidationPipeline<TData & { [K in keyof TFetches]: TFetches[K] extends FetchResult<infer U> ? U : never }>;
    }

    derive<TDerives extends Record<string, OperationResult<unknown>>>(derives: TDerives | ((data: TData) => TDerives)): ValidationPipeline<TData & { [K in keyof TDerives]: TDerives[K] extends OperationResult<infer U> ? U : never }> {
        if (this.hasFailed) return this as ValidationPipeline<TData & { [K in keyof TDerives]: TDerives[K] extends OperationResult<infer U> ? U : never }>; // Skip if already failed

        const deriveObj = typeof derives === 'function' ? derives(this.validatedData as TData) : derives;

        const result = fetch(deriveObj as unknown as Record<string, FetchResult<unknown>>);
        if (!result.success) {
            devLog.error(`${this.context} ${result.error}`);
            this.hasFailed = true;
            return this as ValidationPipeline<TData & { [K in keyof TDerives]: TDerives[K] extends OperationResult<infer U> ? U : never }>;
        }

        Object.assign(this.validatedData, result.data);
        return this as ValidationPipeline<TData & { [K in keyof TDerives]: TDerives[K] extends OperationResult<infer U> ? U : never }>;
    }

    mutate<TMutations extends Record<string, OperationResult<unknown>>>(mutations: TMutations | ((data: TData) => TMutations)): ValidationPipeline<TData & { [K in keyof TMutations]: TMutations[K] extends OperationResult<infer U> ? U : never }> {
        if (this.hasFailed) return this as ValidationPipeline<TData & { [K in keyof TMutations]: TMutations[K] extends OperationResult<infer U> ? U : never }>; // Skip if already failed

        const mutateObj = typeof mutations === 'function' ? mutations(this.validatedData as TData) : mutations;

        const result = fetch(mutateObj as unknown as Record<string, FetchResult<unknown>>);
        if (!result.success) {
            devLog.error(`${this.context} ${result.error}`);
            this.hasFailed = true;
            return this as ValidationPipeline<TData & { [K in keyof TMutations]: TMutations[K] extends OperationResult<infer U> ? U : never }>;
        }

        Object.assign(this.validatedData, result.data);
        return this as ValidationPipeline<TData & { [K in keyof TMutations]: TMutations[K] extends OperationResult<infer U> ? U : never }>;
    }

    execute(): TData | null {
        return this.hasFailed ? null : (this.validatedData as TData);
    }
}
