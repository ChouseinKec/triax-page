// Types
import type { StyleKey, StyleValue } from '@/src/core/block/style/types/';
import type { ValidateResult } from '@/src/shared/types/result';
import type { BlockStyles } from '@/src/core/block/instance/types';

// Constants
import { STYLE_DEFINITIONS, DEFAULT_VALUE_SEPARATORS } from '@/src/core/block/style/constants';

// Utilities
import { splitAdvanced } from '@/src/shared/utilities/string';
import { getValueTokens } from '@/src/core/block/style/utilities';

// Helpers
import { validateString ,validateObject} from '@/src/shared/helpers';


/**
 * Validates a CSS style key for block style operations.
 * Checks if the key is a valid CSS property key from the predefined style definitions.
 *
 * @param styleKey - The CSS style key to validate
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
	const { syntaxNormalized } = propertyDef;
	if (!syntaxNormalized) return { valid: false, message: `Invalid style property: no syntax defined for '${styleKey}'` };

	// Split the value into its components
	const values = splitAdvanced(valueValidation.value, DEFAULT_VALUE_SEPARATORS);

	// Convert the values to their token representations
	const valueTokens = getValueTokens(values).join(' ');
	if (valueTokens.length === 0) return { valid: false, message: `Invalid style value: '${styleValue}' contains no valid tokens for property '${styleKey}'` };

	// Check if the tokenized value matches any of the valid syntax patterns
	const isValid = syntaxNormalized.some((syntax) => syntax === valueTokens);

	if (!isValid) return { valid: false, message: `Invalid style value: '${styleValue}' is not valid for property '${styleKey}'` };

	return { valid: true, value: styleValue as StyleValue };
}

/**
 * Checks if the styles is a valid object containing CSS styles for the block.
 *
 * @param blockStyles - The block styles object to validate
 */
export function validateBlockStyles(blockStyles: unknown): ValidateResult<BlockStyles> {
	const validation = validateObject(blockStyles);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as BlockStyles };
}
