import type { OperateResult } from '@/src/shared/types/result';

/**
 * Resolves multiple shorthand style values into a single value.
 * If all values are identical, that value is returned.
 * If values differ, 'mixed' is returned to indicate inconsistency.
 *
 * @param styleShorthands - An array of shorthand style values to resolve.
 */
export function resolveStyleShorthand(styleShorthands: string[]): OperateResult<string> {
	// Get unique values
	const uniqueValues = Array.from(new Set(styleShorthands));

	// Determine resolved value
	const data = uniqueValues.length === 1 ? uniqueValues[0] : 'mixed';

	// Return the resolved value
	return { success: true, data };
}
