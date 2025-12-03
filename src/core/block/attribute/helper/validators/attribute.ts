// Types
import type { AttributeKey, AttributeValue } from '@/src/core/block/attribute/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Constants
import { ATTRIBUTE_DEFINITIONS } from '@/src/core/block/attribute/constants';

// Helpers
import { validateString, validateObject } from '@/src/shared/helpers';
// Types
import type { BlockAttributes } from '@/src/core/block/instance/types';

/**
 * Checks if the key is a valid HTML attribute key from the predefined attribute definitions.
 *
 * @param attributeKey - The HTML attribute key to validate
 */
export function validateAttributeKey(attributeKey: unknown): ValidateResult<AttributeKey> {
	const validation = validateString(attributeKey);
	if (!validation.valid) return validation;

	// Check if the key is a recognized HTML attribute
	if (!(validation.value in ATTRIBUTE_DEFINITIONS)) {
		return { valid: false, message: `Invalid attribute key: '${validation.value}' is not a recognized HTML attribute` };
	}

	return { valid: true, value: validation.value as AttributeKey };
}

/**
 * Checks if the value is a valid non-empty string that can be used as an HTML attribute value.
 *
 * @param attributeValue - The attribute value to validate
 */
export function validateAttributeValue(attributeValue: unknown): ValidateResult<AttributeValue> {
	if (attributeValue === '') return { valid: true, value: '' };

	const validation = validateString(attributeValue);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as AttributeValue };
}

/**
 * Checks if the attributes is a valid object containing HTML attributes for the block.
 *
 * @param blockAttributes - The block attributes object to validate
 */
export function validateBlockAttributes(blockAttributes: unknown): ValidateResult<BlockAttributes> {
	const validation = validateObject(blockAttributes);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as BlockAttributes };
}
