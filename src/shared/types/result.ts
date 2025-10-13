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
