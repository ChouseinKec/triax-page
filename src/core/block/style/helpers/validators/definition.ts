// Types
import type { TokenDefinitionRecord, TokenTypeDefinitionRecord, StyleDefinition, StyleKey, StyleDescription, StyleSyntax, StyleIcon, StyleLonghand, StyleValue } from '@/src/core/block/style/types/';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { splitAdvanced } from '@/src/shared/utilities/string';
import { getValueTokens } from '@/src/core/block/style/utilities';
import { getSyntaxNormalized } from '@/src/core/block/style/utilities';

// Helpers
import { validateString, validateObject, validateArray } from '@/src/shared/helpers';

/**
 * Validates a CSS style key for block style operations.
 * Checks if the key is a valid CSS property key from the predefined style definitions.
 *
 * @param styleKey - The CSS style key to validate
 */
export function validateStyleKey(styleKey: unknown): ValidateResult<StyleKey> {
	// Validate that styleKey is a string
	const stringValidation = validateString(styleKey);
	if (!stringValidation.valid) return stringValidation;

	// Return the valid styleKey
	return { valid: true, value: stringValidation.value as StyleKey };
}

/**
 * Validates a CSS style description for block style operations.
 * Checks if the description is a valid string.
 *
 * @param description - The CSS style description to validate
 */
export function validateStyleDescription(styleDescription: unknown): ValidateResult<StyleDescription> {
	// Validate that description is a string
	const stringValidation = validateString(styleDescription);
	if (!stringValidation.valid) return stringValidation;

	// Return the valid description
	return { valid: true, value: stringValidation.value as StyleDescription };
}

/**
 * Validates a CSS style syntax for block style operations.
 * Checks if the syntax is a valid string.
 *
 * @param syntax - The CSS style syntax to validate
 */
export function validateStyleSyntax(styleSyntax: unknown): ValidateResult<StyleSyntax> {
	// Validate that syntax is a string
	const stringValidation = validateString(styleSyntax);
	if (!stringValidation.valid) return stringValidation;

	// Return the valid syntax
	return { valid: true, value: stringValidation.value as StyleSyntax };
}

/**
 * Validates a CSS style icon for block style operations.
 * Checks if the icon is a valid React element.
 *
 * @param icon - The CSS style icon to validate
 */
export function validateStyleIcons(styleIcon: unknown): ValidateResult<StyleIcon> {
	return { valid: true, value: styleIcon as StyleIcon };
}

export function validateStyleLonghand(styleLonghand: unknown): ValidateResult<StyleLonghand> {
	// Validate that longhand is an array
	const arrayValidation = validateArray(styleLonghand);
	if (!arrayValidation.valid) return arrayValidation;

	// Validate each key in the longhand array
	for (const item of arrayValidation.value) {
		const keyValidation = validateStyleKey(item);
		if (!keyValidation.valid) return { valid: false, message: `Invalid style longhand key: ${keyValidation.message}` };
	}

	// Return the valid longhand array
	return { valid: true, value: arrayValidation.value as StyleLonghand };
}

export function validateStyleDefinition(styleDefinition: unknown): ValidateResult<StyleDefinition> {
	// Validate that styleDefinition is an object
	const objectValidation = validateObject(styleDefinition);
	if (!objectValidation.valid) return objectValidation;

	// Validate key
	const keyValidation = validateStyleKey(objectValidation.value.key);
	if (!keyValidation.valid) return { valid: false, message: `Invalid style definition key: ${keyValidation.message}` };

	// Validate description
	const descriptionValidation = validateStyleDescription(objectValidation.value.description);
	if (!descriptionValidation.valid) return { valid: false, message: `Invalid style definition description: ${descriptionValidation.message}` };

	// Validate syntax
	const syntaxValidation = validateStyleSyntax(objectValidation.value.syntax);
	if (!syntaxValidation.valid) return { valid: false, message: `Invalid style definition syntax: ${syntaxValidation.message}` };

	// Validate optional fields
	let longhandValidation: ValidateResult<StyleLonghand> | undefined;
	if (objectValidation.value.longhand !== undefined) {
		longhandValidation = validateStyleLonghand(objectValidation.value.longhand);
		if (!longhandValidation.valid) return { valid: false, message: `Invalid style definition longhand: ${longhandValidation.message}` };
	}

	return { valid: true, value: objectValidation.value as unknown as StyleDefinition };
}

/**
 * Validates a CSS style value for block style operations.
 * Checks if the value is valid for the given CSS property according to the style definitions and syntax rules.
 *
 * @param styleKey - The CSS property key this value is for
 * @param styleValue - The CSS style value to validate
 */
export function validateStyleValue(styleKey: StyleKey, styleDefinition: StyleDefinition, styleValue: unknown, registeredTokens: TokenDefinitionRecord, registeredTokenTypes: TokenTypeDefinitionRecord): ValidateResult<StyleValue> {
	// Empty strings are valid CSS values (used to clear/reset properties)
	if (styleValue === '') return { valid: true, value: '' };

	// Validate that the value is a non-empty string
	const valueValidation = validateString(styleValue);
	if (!valueValidation.valid) return { valid: false, message: valueValidation.message };

	// Fetch the normalized syntax variations for the property
	const syntaxNormalized = getSyntaxNormalized(styleDefinition.syntax, registeredTokens);
	if (!syntaxNormalized) return { valid: false, message: `Invalid style property: no syntax defined for '${styleKey}'` };

	// Split the value into its components
	const values = splitAdvanced(valueValidation.value);

	// Convert the values to their token representations
	const valueTokens = getValueTokens(values, registeredTokenTypes).join(' ');
	if (valueTokens.length === 0) return { valid: false, message: `Invalid style value: '${styleValue}' contains no valid tokens for property '${styleKey}'` };

	// Check if the tokenized value matches any of the valid syntax patterns
	const isValid = syntaxNormalized.some((syntax) => syntax === valueTokens);

	if (!isValid) return { valid: false, message: `Invalid style value: '${styleValue}' is not valid for property '${styleKey}'` };

	return { valid: true, value: styleValue as StyleValue };
}
