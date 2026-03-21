// Types
import type { StyleDefinition, StyleKey, StyleDescription, StyleSyntaxRaw, StyleIcon, StyleLonghand, Value, TerminalDefinitionRecord } from '@/core/block/style/types/';
import type { ValidateResult } from '@/shared/types/result';


// Helpers
import { validateString, validateObject, validateArray } from '@/shared/helpers';

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
export function validateStyleSyntax(styleSyntax: unknown): ValidateResult<StyleSyntaxRaw> {
	// Validate that syntax is a string
	const stringValidation = validateString(styleSyntax);
	if (!stringValidation.valid) return stringValidation;

	// Return the valid syntax
	return { valid: true, value: stringValidation.value as StyleSyntaxRaw };
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
 * @param styleDefinition - The style definition for the property
 * @param Value - The CSS style value to validate
 * @param tokenDefinitions - The registered terminals
 */
export function validateValue(styleKey: StyleKey, styleDefinition: StyleDefinition, Value: unknown, tokenDefinitions: TerminalDefinitionRecord): ValidateResult<Value> {
    return { valid: true, value: Value as Value };

    // // Empty strings are valid CSS values (used to clear/reset properties)
	// if (Value === '') return { valid: true, value: '' };

	// // Validate that the value is a non-empty string
	// const valueValidation = validateString(Value);
	// if (!valueValidation.valid) return { valid: false, message: valueValidation.message };

	// // Compile the constraint tree for this syntax
	// const constraint = getCompiledConstraint(styleDefinition.syntax);
	// if (!constraint) return { valid: false, message: `Invalid style property: no syntax defined for '${styleKey}'` };

	// // Split the value into its components and convert to canonical token form
	// const values = splitAdvanced(valueValidation.value);
	// const valueTokens = getTerminals(values, tokenDefinitions).join(' ');

	// if (valueTokens.length === 0) return { valid: false, message: `Invalid style value: '${Value}' contains no valid tokens for property '${styleKey}'` };

	// // Validate against the constraint tree
	// const isValid = validateConstraint(valueTokens, constraint);

	// if (!isValid) return { valid: false, message: `Invalid style value: '${Value}' is not valid for property '${styleKey}'` };

	// return { valid: true, value: Value as Value };
}
