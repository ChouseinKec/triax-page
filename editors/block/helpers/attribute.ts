// Types
import type { AttributeKeys } from '@/editors/block/types';

// Utilities
import { isKeyValid } from '@/editors/block/utilities/attribute/key';
import { isValueValid } from '@/editors/block/utilities/attribute/value';
import { devLog } from '@/utilities/dev';

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
export function validateAttributeKey(attributeKey: AttributeKeys, context: string): boolean {
	if (!isKeyValid(attributeKey)) {
		devLog.error(`[${context} → validateAttributeKey] Invalid key (${attributeKey}): expected a non-empty string defined in AttributeDefinitions`);
		return false;
	}
	return true;
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
export function validateAttributeValue(value: string, context: string): boolean {
	if (!isValueValid(value)) {
		devLog.error(`[${context} → validateAttributeValue] Invalid value (${value}): expected a non-empty string`);
		return false;
	}
	return true;
}
