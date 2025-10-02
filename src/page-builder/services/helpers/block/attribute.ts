// Types
import type { AttributeKey } from '@/src/page-builder/core/block/attribute/types';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { isAttributeKeyValid, isAttributeValueValid } from '@/src/page-builder/core/block/attribute/utilities';

/**
 * Validates an HTML attribute key for block attribute operations.
 * Checks if the key is a valid HTML attribute key with context-aware error logging.
 *
 * @param attribute - The HTML attribute key to validate
 * @param context - The calling context for error logging (e.g., 'AttributeManager')
 * @returns True if the key is valid, false otherwise
 *
 * @example
 * validateAttributeKey('className', 'AttributeManager') → true
 */
export function validateAttributeKey(attributeKey: unknown): ValidationResult<AttributeKey> {
	if (!isAttributeKeyValid(attributeKey)) return { valid: false, message: `Invalid key (${attributeKey})` };

	return { valid: true, value: attributeKey as AttributeKey };
}

/**
 * Validates an attribute value for block attribute operations.
 * Checks if the value is a valid non-empty string with context-aware error logging.
 *
 * @param value - The attribute value to validate
 * @param context - The calling context for error logging (e.g., 'AttributeManager')
 * @returns True if the value is valid, false otherwise
 *
 * @example
 * validateAttributeValue('my-class', 'AttributeManager') → true
 */
export function validateAttributeValue(attributeValue: string): ValidationResult<string> {
	if (!isAttributeValueValid(attributeValue)) return { valid: false, message: `Invalid value (${attributeValue})` };

	return { valid: true, value: attributeValue };
}
