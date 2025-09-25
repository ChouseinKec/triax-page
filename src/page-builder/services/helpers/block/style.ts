// Types
import type { StyleKeys } from '@/src/page-builder/core/block/style/types/';
import type { ValidationResult } from '@/src/shared/types/result';

// Constants
import { StyleShorthandDefinitions } from '@/src/page-builder/core/block/style/constants';
import { StyleDefinitions } from '@/src/page-builder/core/block/style/constants';

// Utilities
import { isStyleKeyValid, isStyleValueValid } from '@/src/page-builder/core/block/style/utilities';

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
export function validateStyleKey(styleKey: StyleKeys): ValidationResult {
	if (!isStyleKeyValid(styleKey)) return { success: false, error: `Invalid key (${styleKey})` };
	if (!(styleKey in StyleDefinitions)) return { success: false, error: `Unknown key (${styleKey})` };

	return { success: true };
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
export function validateStyleValue(styleKey: StyleKeys, value: string): ValidationResult {
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.success) return { success: false, error: keyValidation.error };
	if (!isStyleValueValid(styleKey, value)) return { success: false, error: `Invalid value (${value}) for key (${styleKey})` };

	return { success: true };
}

/**
 * Checks if a style key has shorthand definitions.
 * @param styleKey - The style key to check
 * @returns True if the style key has shorthand definitions
 */
export function hasShorthand(styleKey: StyleKeys): boolean {
	return Boolean(StyleShorthandDefinitions[styleKey]);
}

/**
 * Gets the longhand properties for a shorthand style key.
 * @param styleKey - The shorthand style key
 * @returns Array of longhand property names, or empty array if not a shorthand
 */
export function getShorthand(styleKey: StyleKeys): StyleKeys[] {
	return StyleShorthandDefinitions[styleKey] || [];
}
