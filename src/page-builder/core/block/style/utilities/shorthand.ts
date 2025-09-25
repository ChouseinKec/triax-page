
/**
 * Resolves shorthand values by determining the appropriate return value.
 * Handles cases where all sides are the same, all are empty, or sides have different values.
 *
 * @param values - Array of CSS values from shorthand longhand properties
 * @returns The resolved CSS value
 */
export function resolveShorthand(values: string[]): string {
	const uniqueValues = Array.from(new Set(values.filter(Boolean)));

	if (uniqueValues.length === 1) {
		return uniqueValues[0]; // All sides are the same
	} else if (uniqueValues.length === 0) {
		return ''; // All sides are empty
	} else {
		return values[0]; // Sides have different values, return first value
	}
}