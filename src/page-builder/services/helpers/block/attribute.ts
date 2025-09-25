// Types
import type { AttributeKeys } from '@/src/page-builder/core/block/attribute/types';
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
 * validateAttributeKey('', 'AttributeManager') → false (logs error)
 */
export function validateAttributeKey(attributeKey: AttributeKeys): ValidationResult {
	if (!isAttributeKeyValid(attributeKey)) return { success: false, error: `Invalid key (${attributeKey})` };

	return { success: true };
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
 * validateAttributeValue('', 'AttributeManager') → false (logs error)
 */
export function validateAttributeValue(value: string): ValidationResult {
	if (!isAttributeValueValid(value)) return { success: false, error: `Invalid value (${value})` };

	return { success: true };
}
