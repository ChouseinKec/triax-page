// Types
import type { AttributeKey } from '@/core/block/attribute/types';

/**
 * Normalizes HTML attribute values for React compatibility.
 * Converts string representations of booleans to actual boolean values.
 *
 * @param value - Raw HTML attribute value (always a string)
 */
export function normalizeAttributeValue(attributeValue: string): string | boolean {
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

/**
 * Normalizes HTML attribute property names for React compatibility.
 * Converts HTML-specific property names to their React equivalents.
 *
 * @param property - Raw HTML attribute property name
 */
export function normalizeAttributeKey(attributeKey: AttributeKey): string {
	switch (attributeKey) {
		case 'class':
			return 'className';
		default:
			// Return attribute names as-is for most cases
			return attributeKey;
	}
}
