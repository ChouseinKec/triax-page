// Types
import type { AttributeKeys } from '@/editors/block/types';

// Constants
import { AttributeDefinitions } from '@/constants/block/attribute';

/**
 * Validates if an attribute is a valid HTML attribute key.
 * Pure utility function - no side effects or logging.
 *
 * @param property - The HTML attribute key to validate
 * @returns True if property is valid, false otherwise
 *
 * @example
 * isKeyValid('className') → true
 * isKeyValid('invalidAttr') → false
 * isKeyValid('') → false
 */
export function isKeyValid(key: AttributeKeys): key is AttributeKeys {
	// Check if property is a non-empty string
	if (!key || typeof key !== 'string' || key.trim().length === 0) return false;

	// Check if property is a valid HTML attribute
	if (!(key in AttributeDefinitions)) return false;

	return true;
}

/**
 * Normalizes HTML attribute property names for React compatibility.
 * Converts HTML-specific property names to their React equivalents.
 *
 * @param property - Raw HTML attribute property name
 * @returns Normalized property name for React compatibility
 *
 * @example
 * normalizeKey('class') // → 'className'
 * normalizeKey('for') // → 'htmlFor'
 * normalizeKey('id') // → 'id'
 * normalizeKey('disabled') // → 'disabled'
 */
export function normalizeKey(attributeKey: AttributeKeys): string {
	if (!isKeyValid(attributeKey)) return attributeKey;

	switch (attributeKey) {
		case 'class':
			return 'className';
		default:
			// Return attribute names as-is for most cases
			return attributeKey;
	}
}

export default {
	validate: isKeyValid,
	normalize: normalizeKey,
} as const;
