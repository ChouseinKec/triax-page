// Types
import type { BlockAttributes } from '@/core/block/instance/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Utilities
import { normalizeAttributeValue, normalizeAttributeKey } from '@/core/block/attribute/utilities';

/**
 * Renders block attributes into a normalized React-compatible object.
 * Converts HTML attribute names to React equivalents and normalizes boolean values.
 * @param attributes - The block's attribute definition object
 */
export function renderBlockAttributes(attributes: BlockAttributes): Record<string, string | boolean> {
	const normalizedAttributes: Record<string, string | boolean> = {};
	for (const [property, value] of Object.entries(attributes)) {
		if (!value) continue;
		const normalizedProperty = normalizeAttributeKey(property as AttributeKey);
		const normalizedValue = normalizeAttributeValue(value);
		normalizedAttributes[normalizedProperty] = normalizedValue;
	}
	return normalizedAttributes;
}
