// Types
import type { StyleKey, StyleValue } from '@/src/page-builder/core/block/style/types/';
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
 */
export function validateStyleKey(styleKey: unknown): ValidationResult<StyleKey> {
	if (!isStyleKeyValid(styleKey)) return { valid: false, message: `Invalid key (${styleKey})` };
	if (!(styleKey in StyleDefinitions)) return { valid: false, message: `Unknown key (${styleKey})` };

	return { valid: true, value: styleKey as StyleKey };
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
 */
export function validateStyleValue(styleKey: unknown, styleValue: unknown): ValidationResult<StyleValue> {
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.valid) return { valid: false, message: keyValidation.message };
	if (!isStyleValueValid(styleKey as StyleKey, styleValue)) return { valid: false, message: `Invalid value (${styleValue}) for key (${styleKey})` };

	return { valid: true, value: styleValue as StyleValue };
}

/**
 * Checks if a style key has shorthand definitions for block style operations.
 * Determines whether the given style key supports shorthand notation.
 *
 * @param styleKey - The style key to check
 * @returns True if the style key has shorthand definitions, false otherwise
 *
 * @example
 * hasShorthand('margin') → true
 */
export function hasShorthand(styleKey: StyleKey): boolean {
	return Boolean(StyleShorthandDefinitions[styleKey]);
}

/**
 * Gets the longhand properties for a shorthand style key for block style operations.
 * Returns the expanded property names for a given shorthand key.
 *
 * @param styleKey - The shorthand style key
 * @returns Array of longhand property names, or empty array if not a shorthand
 *
 * @example
 * getShorthand('margin') → ['margin-top', 'margin-right', 'margin-bottom', 'margin-left']
 */
export function getShorthand(styleKey: StyleKey): StyleKey[] {
	return StyleShorthandDefinitions[styleKey] || [];
}
