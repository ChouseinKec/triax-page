/**
 * Result type for general operations.
 * Indicates whether the operation was successful or failed with details.
 * On success, includes the result data for type narrowing.
 */
/**
 * Operation-style result used for functions that mutate or compute new
 * values for the store.
 */
export type OperationResult<T> = { success: true; data: T } | { success: false; error: string };

/**
 * Result type for validation operations.
 * Indicates whether validation passed or failed with details.
 * On success, includes the validated value for type narrowing.
 */
export type ValidateResult<T> = { valid: true; value: T } | { valid: false; message: string };

/**
 * Result type for fetch operations.
 * Indicates whether the fetch was successful or failed with details.
 * On success, includes the fetched data for type narrowing.
 */
export type FetchResult<T> = { success: true; data: T } | { success: false; error: string };

/**
 * Result type for functions that look up an optional value.
 * Distinguishes between
 * (a) successful lookup with a found value,
 * (b) successful lookup but not found (a normal, non-error condition),
 * (c) failure with an error.
 */
/**
 * Result type for functions that look up an optional value.
 * Distinguishes between three explicit states:
 * - { status: 'found', data } — lookup successful and value present
 * - { status: 'not-found' } — lookup completed successfully but nothing was found (not an error)
 * - { status: 'error', error } — lookup failed with an error
 */
export type FindResult<T> = { status: 'found'; data: T } | { status: 'not-found' } | { status: 'error'; error: string };

/**
 * Check-style result used for boolean validations.
 * Returns success:true with ok:boolean on non-error cases, or failure with error message.
 */
export type CheckResult = { success: true; ok: boolean } | { success: false; error: string };
