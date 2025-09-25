// Types
import type { AttributeKeys } from '@/src/page-builder/core/block/attribute/types';

// Constants
import { AttributeDefinitions } from '@/src/page-builder/core/block/attribute/constants';

/**
 * Validates if an attribute is a valid HTML attribute key.
 * Pure utility function - no side effects or logging.
 *
 * @param property - The HTML attribute key to validate
 * @returns True if property is valid, false otherwise
 *
 * @example
 * isAttributeKeyValid('className') → true
 * isAttributeKeyValid('invalidAttr') → false
 * isAttributeKeyValid('') → false
 */
export function isAttributeKeyValid(key: AttributeKeys): key is AttributeKeys {
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
 * normalizeAttributeKey('class') // → 'className'
 * normalizeAttributeKey('for') // → 'htmlFor'
 * normalizeAttributeKey('id') // → 'id'
 * normalizeAttributeKey('disabled') // → 'disabled'
 */
export function normalizeAttributeKey(attributeKey: AttributeKeys): string {
	if (!isAttributeKeyValid(attributeKey)) return attributeKey;

	switch (attributeKey) {
		case 'class':
			return 'className';
		default:
			// Return attribute names as-is for most cases
			return attributeKey;
	}
}

