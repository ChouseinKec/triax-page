/**
 * Validates if an attribute value is valid for setting on a block.
 * Ensures the value is a string type as required by the attribute system.
 *
 * @param value - The attribute value to validate
 * @param context - The context/component name for error logging
 * @returns True if value is valid, false otherwise
 *
 * @example
 * isAttributeValueValid('my-class', 'BlockStore') → true
 * isAttributeValueValid(123, 'BlockStore') → false (logs error)
 * isAttributeValueValid('', 'BlockStore') → true (empty strings are allowed)
 */
export function isAttributeValueValid(attributeValue: unknown): boolean {
	if (typeof attributeValue !== 'string') return false;
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
export function normalizeAttributeValue(attributeValue: string): string | boolean {
	// Handle edge cases gracefully
	if (typeof attributeValue !== 'string') return attributeValue;

	// Convert string boolean values to actual booleans
	if (attributeValue === 'true') {
		return true;
	} else if (attributeValue === 'false') {
		return false;
	} else {
		// Return string values as-is
		return attributeValue;
	}
}
