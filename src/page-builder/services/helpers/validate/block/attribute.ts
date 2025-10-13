// Types
import type { AttributeKey, AttributeValue } from '@/src/page-builder/core/block/attribute/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Constants
import { ATTRIBUTE_DEFINITIONS } from '@/src/page-builder/core/block/attribute/constants';

// Helpers
import { validateString } from '@/src/page-builder/services/helpers/validate/common';

/**
 * Checks if the key is a valid HTML attribute key from the predefined attribute definitions.
 *
 * @param attributeKey - The HTML attribute key to validate
 * @returns ValidateResult containing validity and the validated AttributeKey if valid
 *
 * @example
 * validateAttributeKey('className') → { valid: true, value: 'className' }
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
 * @returns ValidateResult containing validity and the validated AttributeValue if valid
 *
 * @example
 * validateAttributeValue('my-class') → { valid: true, value: 'my-class' }
 */
export function validateAttributeValue(attributeValue: unknown): ValidateResult<AttributeValue> {
	const validation = validateString(attributeValue);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as AttributeValue };
}
