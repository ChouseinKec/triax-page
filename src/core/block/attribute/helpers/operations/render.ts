// Types
import type { NodeAttributes } from '@/core/block/node/types/definition';
import type { AttributeKey } from '@/core/block/attribute/types';
import type { OperateResult } from '@/shared/types/result';

// Utilities
import { normalizeAttributeValue, normalizeAttributeKey } from '@/core/block/attribute/utilities';

/**
 * Renders block attributes into a normalized React-compatible object.
 * Converts HTML attribute names to React equivalents and normalizes boolean values.
 * @param attributes - The block's attribute definition object
 */
export function renderNodeAttributes(attributes: NodeAttributes): OperateResult<Record<string, string | boolean>> {
	const normalizedAttributes: Record<string, string | boolean> = {};
	for (const [property, value] of Object.entries(attributes)) {
		if (!value) continue;
		const normalizedProperty = normalizeAttributeKey(property as AttributeKey);
		const normalizedValue = normalizeAttributeValue(value);
		normalizedAttributes[normalizedProperty] = normalizedValue;
	}
	return { success: true, data: normalizedAttributes };
}
