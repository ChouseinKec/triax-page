/**
 * Result type for validation operations.
 * Indicates whether validation passed or failed with details.
 * On success, includes the validated value for type narrowing.
 */
export type ValidationResult<T> = { valid: true; value: T } | { valid: false; message: string };
