

/**
 * Result type for validation operations.
 * Indicates whether validation passed or failed with details.
 * On success, includes the validated value for type narrowing.
 */
export type ValidationResult<T> = { valid: true; value: T } | { valid: false; message: string };

/**
 * Result type for creation operations that return data.
 * Includes the created data on success or error details on failure.
 */
export type CreationResult<T> = { success: true; data: T } | { success: false; error: string };
