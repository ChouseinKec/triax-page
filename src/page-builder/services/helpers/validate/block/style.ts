// Types
import type { StyleKey, StyleValue } from '@/src/page-builder/core/block/style/types/';
import type { ValidateResult } from '@/src/shared/types/result';

// Constants
import { STYLE_DEFINITIONS, VALUE_SEPARATOR_DEFAULTS } from '@/src/page-builder/core/block/style/constants';

// Utilities
import { splitAdvanced } from '@/src/shared/utilities/string';
import { getValueTokens } from '@/src/page-builder/core/block/style/utilities';

// Helpers
import { validateString } from '@/src/page-builder/services/helpers/validate/common';

/**
 * Validates a CSS style key for block style operations.
 * Checks if the key is a valid CSS property key from the predefined style definitions.
 *
 * @param styleKey - The CSS style key to validate
 * @returns ValidateResult containing validity and the validated StyleKey if valid
 *
 * @example
 * validateStyleKey('display') → { valid: true, value: 'display' }
 */
export function validateStyleKey(styleKey: unknown): ValidateResult<StyleKey> {
	const validation = validateString(styleKey);
	if (!validation.valid) return validation;

	// Check if the key is a recognized CSS property
	if (!(validation.value in STYLE_DEFINITIONS)) return { valid: false, message: `Invalid style key: '${validation.value}' is not a recognized CSS property` };

	return { valid: true, value: validation.value as StyleKey };
}

/**
 * Validates a CSS style value for block style operations.
 * Checks if the value is valid for the given CSS property according to the style definitions and syntax rules.
 *
 * @param styleKey - The CSS property key this value is for
 * @param styleValue - The CSS style value to validate
 * @returns ValidateResult containing validity and the validated StyleValue if valid
 *
 * @example
 * validateStyleValue('display', 'block') → { valid: true, value: 'block' }
 */
export function validateStyleValue(styleKey: unknown, styleValue: unknown): ValidateResult<StyleValue> {
	// Validate the style key first
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.valid) return { valid: false, message: keyValidation.message };

	// Empty strings are valid CSS values (used to clear/reset properties)
	if (styleValue === '') return { valid: true, value: '' };

	// Validate that the value is a non-empty string
	const valueValidation = validateString(styleValue);
	if (!valueValidation.valid) return { valid: false, message: valueValidation.message };

	// Fetch the property definition from the STYLE_DEFINITIONS
	const propertyDef = STYLE_DEFINITIONS[keyValidation.value];

	// Fetch the normalized syntax variations for the property
	const {syntaxNormalized} = propertyDef;
	if (!syntaxNormalized) return { valid: false, message: `Invalid style property: no syntax defined for '${styleKey}'` };

	// Split the value into its components
	const values = splitAdvanced(valueValidation.value, VALUE_SEPARATOR_DEFAULTS);

	// Convert the values to their token representations
	const valueTokens = getValueTokens(values).join(' ');
	if (valueTokens.length === 0) return { valid: false, message: `Invalid style value: '${styleValue}' contains no valid tokens for property '${styleKey}'` };

	// Check if the tokenized value matches any of the valid syntax patterns
	const isValid = syntaxNormalized.some((syntax) => syntax === valueTokens);

	if (!isValid) return { valid: false, message: `Invalid style value: '${styleValue}' is not valid for property '${styleKey}'` };

	return { valid: true, value: styleValue as StyleValue };
}
