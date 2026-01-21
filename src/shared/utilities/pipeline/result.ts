// Types
import type { ValidateResult, PickResult, FindResult, CollectResult, CheckResult, OperateResult } from '@/shared/types/result';

import { devLog } from '../dev';

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
 * Batch fetches multiple PickResult objects.
 * Returns the first error encountered, or an object with all fetched data if all succeed.
 */
export function pick<T extends Record<string, PickResult<unknown>>>(fetches: T): { success: true; data: { [K in keyof T]: T[K] extends PickResult<infer U> ? U : never } } | { success: false; error: string } {
	const data = {} as { [K in keyof T]: T[K] extends PickResult<infer U> ? U : never };

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
 * Batch finds multiple FindResult objects.
 * Returns the first error encountered, or an object with found data (null for not-found) if all succeed.
 */
export function find<T extends Record<string, FindResult<unknown>>>(finds: T): { success: true; data: { [K in keyof T]: T[K] extends FindResult<infer U> ? U | null : never } } | { success: false; error: string } {
	const data = {} as { [K in keyof T]: T[K] extends FindResult<infer U> ? U | null : never };

	for (const key in finds) {
		const result = finds[key];
		if (result.status === 'error') {
			return { success: false, error: result.error };
		}
		(data as Record<string, unknown>)[key] = result.status === 'found' ? result.data : null;
	}

	return { success: true, data };
}

/**
 * Batch collects multiple CollectResult objects.
 * Returns the first error encountered, or an object with all collected data if all succeed.
 */
export function collect<T extends Record<string, CollectResult<unknown>>>(collects: T): { success: true; data: { [K in keyof T]: T[K] extends CollectResult<infer U> ? U : never } } | { success: false; error: string } {
	const data = {} as { [K in keyof T]: T[K] extends CollectResult<infer U> ? U : never };

	for (const key in collects) {
		const result = collects[key];
		if (!result.success) {
			return { success: false, error: result.error };
		}
		(data as Record<string, unknown>)[key] = result.data;
	}

	return { success: true, data };
}

/**
 * Batch checks multiple CheckResult objects.
 * Returns the first error encountered, or an object with all check results (boolean) if all succeed.
 */
export function check<T extends Record<string, CheckResult>>(checks: T): { success: true; data: { [K in keyof T]: boolean } } | { success: false; error: string } {
	const data = {} as { [K in keyof T]: boolean };

	for (const key in checks) {
		const result = checks[key];
		if (!result.success) {
			return { success: false, error: result.error };
		}
		data[key] = result.passed;
	}

	return { success: true, data };
}

/**
 * Batch operates multiple OperateResult objects.
 * Returns the first error encountered, or an object with all operation results if all succeed.
 */
export function operate<T extends Record<string, OperateResult<unknown>>>(operations: T): { success: true; data: { [K in keyof T]: T[K] extends OperateResult<infer U> ? U : never } } | { success: false; error: string } {
	const data = {} as { [K in keyof T]: T[K] extends OperateResult<infer U> ? U : never };

	for (const key in operations) {
		const result = operations[key];
		if (!result.success) {
			return { success: false, error: result.error };
		}
		(data as Record<string, unknown>)[key] = result.data;
	}

	return { success: true, data };
}

/**
 * Validation pipeline for chaining dependent validations.
 * Allows building complex validation flows where each step can use results from previous steps.
 * Maintains type safety by accumulating types as data is added to the pipeline.
 */
export class ResultPipeline<TData extends Record<string, unknown> = Record<string, never>> {
	private context: string;
	private validatedData: Record<string, unknown> = {};
	private hasFailed: boolean = false;

	constructor(context: string) {
		this.context = context;
	}

	validate<TValidations extends Record<string, ValidateResult<unknown>>>(validations: TValidations | ((data: TData) => TValidations)): ResultPipeline<TData & { [K in keyof TValidations]: TValidations[K] extends ValidateResult<infer U> ? U : never }> {
		if (this.hasFailed) return this as ResultPipeline<TData & { [K in keyof TValidations]: TValidations[K] extends ValidateResult<infer U> ? U : never }>; // Skip if already failed

		const validationObj = typeof validations === 'function' ? validations(this.validatedData as TData) : validations;

		const result = validate(validationObj);
		if (!result.valid) {
			devLog.error(`${this.context} ${result.message}`);
			this.hasFailed = true;
			return this as ResultPipeline<TData & { [K in keyof TValidations]: TValidations[K] extends ValidateResult<infer U> ? U : never }>;
		}

		Object.assign(this.validatedData, result.values);
		return this as ResultPipeline<TData & { [K in keyof TValidations]: TValidations[K] extends ValidateResult<infer U> ? U : never }>;
	}

	pick<TFetches extends Record<string, PickResult<unknown>>>(fetches: TFetches | ((data: TData) => TFetches)): ResultPipeline<TData & { [K in keyof TFetches]: TFetches[K] extends PickResult<infer U> ? U : never }> {
		if (this.hasFailed) return this as ResultPipeline<TData & { [K in keyof TFetches]: TFetches[K] extends PickResult<infer U> ? U : never }>; // Skip if already failed

		const fetchObj = typeof fetches === 'function' ? fetches(this.validatedData as TData) : fetches;

		const result = pick(fetchObj);
		if (!result.success) {
			devLog.error(`${this.context} ${result.error}`);
			this.hasFailed = true;
			return this as ResultPipeline<TData & { [K in keyof TFetches]: TFetches[K] extends PickResult<infer U> ? U : never }>;
		}

		Object.assign(this.validatedData, result.data);
		return this as ResultPipeline<TData & { [K in keyof TFetches]: TFetches[K] extends PickResult<infer U> ? U : never }>;
	}

	find<TFinds extends Record<string, FindResult<unknown>>>(finds: TFinds | ((data: TData) => TFinds)): ResultPipeline<TData & { [K in keyof TFinds]: TFinds[K] extends FindResult<infer U> ? U | null : never }> {
		if (this.hasFailed) return this as ResultPipeline<TData & { [K in keyof TFinds]: TFinds[K] extends FindResult<infer U> ? U | null : never }>; // Skip if already failed

		const findObj = typeof finds === 'function' ? finds(this.validatedData as TData) : finds;

		const result = find(findObj);
		if (!result.success) {
			devLog.error(`${this.context} ${result.error}`);
			this.hasFailed = true;
			return this as ResultPipeline<TData & { [K in keyof TFinds]: TFinds[K] extends FindResult<infer U> ? U | null : never }>;
		}

		Object.assign(this.validatedData, result.data);
		return this as ResultPipeline<TData & { [K in keyof TFinds]: TFinds[K] extends FindResult<infer U> ? U | null : never }>;
	}

	collect<TCollects extends Record<string, CollectResult<unknown>>>(collects: TCollects | ((data: TData) => TCollects)): ResultPipeline<TData & { [K in keyof TCollects]: TCollects[K] extends CollectResult<infer U> ? U : never }> {
		if (this.hasFailed) return this as ResultPipeline<TData & { [K in keyof TCollects]: TCollects[K] extends CollectResult<infer U> ? U : never }>; // Skip if already failed

		const collectObj = typeof collects === 'function' ? collects(this.validatedData as TData) : collects;

		const result = collect(collectObj);
		if (!result.success) {
			devLog.error(`${this.context} ${result.error}`);
			this.hasFailed = true;
			return this as ResultPipeline<TData & { [K in keyof TCollects]: TCollects[K] extends CollectResult<infer U> ? U : never }>;
		}

		Object.assign(this.validatedData, result.data);
		return this as ResultPipeline<TData & { [K in keyof TCollects]: TCollects[K] extends CollectResult<infer U> ? U : never }>;
	}

	check<TChecks extends Record<string, CheckResult>>(checks: TChecks | ((data: TData) => TChecks)): ResultPipeline<TData & { [K in keyof TChecks]: boolean }> {
		if (this.hasFailed) return this as ResultPipeline<TData & { [K in keyof TChecks]: boolean }>; // Skip if already failed

		const checkObj = typeof checks === 'function' ? checks(this.validatedData as TData) : checks;

		const result = check(checkObj);
		if (!result.success) {
			devLog.error(`${this.context} ${result.error}`);
			this.hasFailed = true;
			return this as ResultPipeline<TData & { [K in keyof TChecks]: boolean }>;
		}

		Object.assign(this.validatedData, result.data);
		return this as ResultPipeline<TData & { [K in keyof TChecks]: boolean }>;
	}

	operate<TOperates extends Record<string, OperateResult<unknown>>>(operates: TOperates | ((data: TData) => TOperates)): ResultPipeline<TData & { [K in keyof TOperates]: TOperates[K] extends OperateResult<infer U> ? U : never }> {
		if (this.hasFailed) return this as ResultPipeline<TData & { [K in keyof TOperates]: TOperates[K] extends OperateResult<infer U> ? U : never }>; // Skip if already failed

		const operateObj = typeof operates === 'function' ? operates(this.validatedData as TData) : operates;

		const result = operate(operateObj);
		if (!result.success) {
			devLog.error(`${this.context} ${result.error}`);
			this.hasFailed = true;
			return this as ResultPipeline<TData & { [K in keyof TOperates]: TOperates[K] extends OperateResult<infer U> ? U : never }>;
		}

		Object.assign(this.validatedData, result.data);
		return this as ResultPipeline<TData & { [K in keyof TOperates]: TOperates[K] extends OperateResult<infer U> ? U : never }>;
	}

	run(sideEffect: (data: TData) => { success: boolean; error?: string } | void, failOnError: boolean = false): ResultPipeline<TData> {
		if (this.hasFailed) return this;

		const result = sideEffect(this.validatedData as TData);
		if (result && !result.success) {
			if (failOnError) {
				devLog.error(`${this.context} ${result.error}`);
				this.hasFailed = true;
			}
		}
		return this;
	}

	execute(): TData | null {
		return this.hasFailed ? null : (this.validatedData as TData);
	}
}
