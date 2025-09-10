/**
 * Validates if an attribute value is valid for setting on a block.
 * Ensures the value is a string type as required by the attribute system.
 *
 * @param value - The attribute value to validate
 * @param context - The context/component name for error logging
 * @returns True if value is valid, false otherwise
 *
 * @example
 * isValueValid('my-class', 'BlockStore') → true
 * isValueValid(123, 'BlockStore') → false (logs error)
 * isValueValid('', 'BlockStore') → true (empty strings are allowed)
 */
export function isValueValid(value: string): boolean {
	if (typeof value !== 'string') return false;
	return true;
}

/**
 * Normalizes HTML attribute values for React compatibility.
 * Converts string representations of booleans to actual boolean values.
 *
 * @param value - Raw HTML attribute value (always a string)
 * @returns Normalized value with proper type conversion
 *
 * @example
 * normalizeKeyValue('true') // → true
 * normalizeKeyValue('false') // → false
 * normalizeKeyValue('my-class') // → 'my-class'
 * normalizeKeyValue('') // → ''
 */
export function normalizeValue(value: string): string | boolean {
	// Handle edge cases gracefully
	if (typeof value !== 'string') return value;

	// Convert string boolean values to actual booleans
	if (value === 'true') {
		return true;
	} else if (value === 'false') {
		return false;
	} else {
		// Return string values as-is
		return value;
	}
}

export default {
	validate: isValueValid,
	normalize: normalizeValue,
} as const;
