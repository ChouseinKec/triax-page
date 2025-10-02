// Types
import type { AttributeKey } from '@/src/page-builder/core/block/attribute/types';

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
export function isAttributeKeyValid(attributeKey: unknown): attributeKey is AttributeKey {
	// Check if property is a non-empty string
	if (!attributeKey || typeof attributeKey !== 'string' || attributeKey.trim().length === 0) return false;

	// Check if property is a valid HTML attribute
	if (!(attributeKey in AttributeDefinitions)) return false;

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
export function normalizeAttributeKey(attributeKey: AttributeKey): string {
	if (!isAttributeKeyValid(attributeKey)) return attributeKey;

	switch (attributeKey) {
		case 'class':
			return 'className';
		default:
			// Return attribute names as-is for most cases
			return attributeKey;
	}
}
