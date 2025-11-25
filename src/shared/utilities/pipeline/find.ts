// Types
import type { FindResult, OperationResult } from '@/src/shared/types/result';

/**
 * Run a sequence of FindResult-producing functions.
 * - Returns the first failure (success:false) encountered
 * - Returns the first successful 'found' result
 * - Returns { status: 'not-found' } if none of the finders locate a value
 */
export function runFinds<T>(...finders: Array<() => FindResult<T>>): FindResult<T> {
	for (const fn of finders) {
		const r = fn();
		if (r.status === 'error') return r;
		if (r.status === 'found') return r;
	}
	return { status: 'not-found' };
}

/**
 * Run a single FindResult-producing function, optionally converting a `found:false`
 * result into a failure with a custom error message. This reduces repetition where
 * callers treat `found:false` as an error.
 */
// Overload: calling without a notFoundError simply returns the FindResult
export function runFind<T>(fn: () => FindResult<T>): FindResult<T> {
	return fn();
}

/**
 * Run a single finder and convert a not-found result into a failure with a message.
 * Returns OperationResult<T> so callers can use success/data semantics.
 */
export function runFindOrFail<T>(fn: () => FindResult<T>, notFoundError: string): OperationResult<T> {
	const res = fn();
	if (res.status === 'error') return { success: false, error: res.error };
	if (res.status === 'not-found') return { success: false, error: notFoundError };
	return { success: true, data: res.data };
}
