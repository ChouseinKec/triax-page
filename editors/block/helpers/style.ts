import type { StyleKeys } from '@/editors/block/types/core/style/style';

// Utilities
import { isKeyValid } from '@/editors/block/utilities/style/key';
import { isValueValid } from '@/editors/block/utilities/style/value';
import { devLog } from '@/utilities/dev';

/**
 * Validates an CSS style key for block style operations.
 * Checks if the key is a valid CSS style key with context-aware error logging.
 *
 * @param attribute - The CSS style key to validate
 * @param context - The calling context for error logging (e.g., 'AttributeManager')
 * @returns True if the key is valid, false otherwise
 *
 * @example
 * validateStyleKey('display', 'StyleManager') → true
 * validateStyleKey('', 'StyleManager') → false (logs error)
 */
export function validateStyleKey(styleKey: StyleKeys, context: string): boolean {
	if (!isKeyValid(styleKey)) {
		devLog.error(`[${context} → validateStyleKey] Invalid key (${styleKey}): expected a non-empty string defined in StyleDefinitions`);
		return false;
	}
	return true;
}

/**
 * Validates a CSS style value for block style operations.
 * Checks if the value is a valid non-empty string with context-aware error logging.
 *
 * @param value - The CSS style value to validate
 * @param context - The calling context for error logging (e.g., 'StyleManager')
 * @returns True if the value is valid, false otherwise
 *
 * @example
 * validateStyleValue('display', 'block', 'StyleManager') → true
 * validateStyleValue('display', '10px', 'StyleManager') → false (logs error)
 */
export function validateStyleValue(styleKey: StyleKeys, value: string, context: string): boolean {
	if (!validateStyleKey(styleKey, context)) return false;

	if (!isValueValid(styleKey, value)) {
		devLog.error(`[${context} → validateStyleValue] Invalid value (${value}) for key (${styleKey})`);
		return false;
	}
    
	return true;
}
