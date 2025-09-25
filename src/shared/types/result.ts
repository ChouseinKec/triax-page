/**
 * Result type for validation operations.
 * Indicates whether validation passed or failed with error details.
 */
export type ValidationResult = { success: true } | { success: false; error: string };

/**
 * Result type for creation operations that return data.
 * Includes the created data on success or error details on failure.
 */
export type CreationResult<T> = { success: true; data: T } | { success: false; error: string };

