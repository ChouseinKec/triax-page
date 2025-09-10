// Utilities
import { getTokenCanonical } from '@/editors/block/utilities/style/token';
import { extractDimensionNumber, extractDimensionUnit, getDimensionType } from '@/editors/block/utilities/style/dimension';
import { splitAdvanced } from '@/utilities/string';
import { isColor } from '@/utilities/color';

// Types
import type { TokenTypes } from '@/editors/block/types/core/style/token';
import type { StyleOptionDefinition } from '@/editors/block/types/core/style/option';

// Constants
import { StyleDefinitions } from '@/constants/style/style';
import { StyleValueSeparatorDefaults } from '@/constants/style/value';
import { StyleKeys } from '@/editors/block/types/core/style/style';
import { UnitDefinitions } from '@/constants/style/unit';

/**
 * Checks if a value is a CSS keyword (e.g., 'auto', 'none', 'inherit').
 * @param input - The string to check.
 * @returns {boolean} True if the input is a valid keyword format, false otherwise.
 * @example
 * isValueKeyword('auto') → true
 * isValueKeyword('10px') → false
 * isValueKeyword('10') → false
 * isValueKeyword('function(args)') → false
 */
export function isValueKeyword(input: string): boolean {
	return /^[a-zA-Z-]+$/.test(input);
}

/**
 * Checks if a value is a CSS function (e.g., functionName(args)).
 * @param input - The string to check.
 * @returns {boolean} True if the input is a valid function format, false otherwise.
 * @example
 * isValueFunction('fit-content(10px)') → true
 * isValueFunction('10px') → false
 * isValueFunction('auto') → false
 */
export function isValueFunction(input: string): boolean {
	return /^([a-zA-Z0-9-]+)\((.*)\)$/.test(input);
}

/**
 * Checks if a value is a number (e.g., '10', '-5.5', '0.1').
 * @param input - The string to check.
 * @returns {boolean} True if the input is a valid number format, false otherwise.
 * @example
 * isValueNumber('10') → true
 * isValueNumber('abc') → false
 */
export function isValueNumber(input: string): boolean {
	return /^-?\d*\.?\d+$/.test(input);
}

/**
 * Checks if a value is an integer (e.g., '10', '-5').
 * @param input - The string to check.
 * @returns {boolean} True if the input is a valid integer format, false otherwise.
 * @example
 * isValueInteger('10') → true
 * isValueInteger('10.5') → false
 */
export function isValueInteger(input: string): boolean {
	return /^-?\d+$/.test(input);
}

/**
 * Checks if a value is a CSS color (e.g., '#fff', 'rgba(255, 0, 0)', 'hsl(120, 100%, 50%)').
 * @param input - The string to check.
 * @returns {boolean} True if the input is a valid color format, false otherwise.
 * @example
 * isValueColor('#fff') → true
 * isValueColor('rgba(255, 0, 0)') → true
 * isValueColor('10px') → false
 */
export function isValueColor(input: string): boolean {
	return isColor(input);
}

/**
 * Checks if a value is a link (e.g., 'https://example.com', '/path/to/resource').
 * @param input - The string to check.
 * @returns {boolean} True if the input is a valid link format, false otherwise.
 * @example
 * isValueLink('"https://example.com"') → true
 * isValueLink('"./path/to/resource"') → true
 * isValueLink('10px') → false
 */
export function isValueLink(input: string): boolean {
	return /^"?https?:\/\/[^\s"]+"?$/.test(input) || /^"?\/[^\s"]+"?$/.test(input);
}

/**
 * Checks if a string is a valid CSS dimension value (number + unit).
 * Validates both the numeric part and that the unit is a known CSS unit.
 *
 * @param input - The CSS value string to check (e.g., '10px', '2.5rem').
 * @returns True if the input is a valid dimension value, false otherwise.
 * @example
 * isValueDimension('10px') → true
 * isValueDimension('25%') → true
 * isValueDimension('180deg') → true
 * isValueDimension('1fr') → true
 * isValueDimension('auto') → false
 * isValueDimension('10') → false
 */
export function isValueDimension(input: string): boolean {
	const value = extractDimensionNumber(input); // Extract numeric part
	const unit = extractDimensionUnit(input); // Extract unit part

	// If no number or no unit, not a valid dimension
	if (value === undefined || !unit) return false;

	// Ensure unit is a valid UnitKeys value
	if (!(unit in UnitDefinitions)) return false;
	return true;
}

/**
 * Determines the type of a CSS value based on its format.
 * Uses specific checks for dimension, keyword, function, and number.
 * @param input - The CSS value string to classify.
 * @returns {TokenTypes | undefined} The detected value type or undefined if not recognized.
 * @example
 * getValueType('10px') → 'dimension'
 * getValueType('auto') → 'keyword'
 * getValueType('fit-content(10px)') → 'function'
 * getValueType('10') → 'integer'
 * getValueType('10.5') → 'number'
 * getValueType('#fff') → 'color'
 * getValueType('"https://example.com"') → 'link'
 */
export function getValueType(input: string): TokenTypes | undefined {
	// IMPORTANT: The order of these checks matters!
	if (isValueLink(input)) return 'link';
	if (isValueDimension(input)) return 'dimension';
	if (isValueKeyword(input)) return 'keyword';
	// - 'color' must come before 'function' because function matches any name(...),
	//   including color functions like rgba(...).
	if (isValueColor(input)) return 'color';
	if (isValueFunction(input)) return 'function';
	// - 'integer' must come before 'number' because all integers are numbers,
	//   but not all numbers are integers.
	if (isValueInteger(input)) return 'integer';
	if (isValueNumber(input)) return 'number';
	return undefined;
}

/**
 * Determines the default value type to use when a value is empty.
 * Prioritizes certain types (dimension > keyword > color > function) based on available options.
 * Falls back to the first option's type if no prioritized types are available.
 * @param options - Array of option definitions containing type information
 * @returns {TokenTypes | undefined} The default type to use or undefined if no options available
 * @example
 * getValueDefaultType([[{type: 'dimension'}, {type: 'keyword'}]]) → 'dimension'
 * getValueDefaultType([[{type: 'color'}, {type: 'function'}]]) → 'color'
 */
export function getValueDefaultType(options: StyleOptionDefinition[]): TokenTypes | undefined {
	if (!options || !Array.isArray(options) || options.length === 0) return undefined;

	// Get all unique value types available in options (flatten in case of nested arrays)
	const allTypes = new Set(options.flat().map((option) => option.type as TokenTypes));

	// Prioritize certain types for better UX
	if (allTypes.has('dimension')) return 'dimension';
	if (allTypes.has('keyword')) return 'keyword';
	if (allTypes.has('color')) return 'color';
	if (allTypes.has('function')) return 'function';

	// Fallback to first option's type
	return options[0]?.type as TokenTypes;
}

/**
 * Converts a CSS value string to its canonical token representation.
 * Converts keywords to their canonical form, numbers to '<number>', and dimensions to '<dimensionType>'.
 * If the value type is not recognized, returns undefined.
 * @param input - The CSS value string to convert.
 * @returns {string | undefined} The token representation of the value or undefined if not recognized.
 * @example
 * getValueToken('10px') → '<length>'
 * getValueToken('auto') → 'auto'
 * getValueToken('fit-content(10px)') → 'fit-content()'
 * getValueToken('10') → '<number>'
 */
export function getValueToken(value: string): string | undefined {
	const type = getValueType(value);

	switch (type) {
		case 'keyword':
			return value;
		case 'integer':
			return '<integer>';
		case 'number':
			return '<number>';
		case 'dimension':
			return `<${getDimensionType(value)}>`;
		case 'color':
			return '<color>';
		default:
			return getTokenCanonical(value);
	}
}

/**
 * Converts an array of CSS value strings to an array of tokens.
 * Uses getValueToken to convert each value to its token representation.
 * Filters out any unrecognized values (returns null for those).
 * @param inputs - An array of CSS value strings to convert.
 * @returns {string[]} An array of value tokens corresponding to the input values.
 * @example
 * getValueTokens(['10px', 'auto', 'fit-content(10px)', '10']) → ['<length>', 'auto', 'fit-content()', '<number>']
 */
export function getValueTokens(values: string[]): string[] {
	return values.map(getValueToken).filter((token): token is string => token !== undefined);
}

/**
 * Validates if a given value is valid for a specific CSS property.
 * Uses the property's syntaxNormalized to check if the value matches any of the defined syntaxes.
 * Performs comprehensive validation with error logging for debugging.
 *
 * @param styleKey - The CSS property name (e.g., 'margin', 'padding')
 * @param value - The CSS value string to validate (e.g., '10px auto')
 * @param context - The context/component name for error logging
 * @returns True if the value is valid for the property, false otherwise
 *
 * @example
 * isValueValid('margin', '10px auto', 'StyleManager') → true
 * isValueValid('padding', '10px', 'StyleManager') → true
 * isValueValid('color', '#fff', 'StyleManager') → true
 * isValueValid('display', 'invalid', 'StyleManager') → false (logs error)
 */
export function isValueValid(styleKey: StyleKeys, value: string): boolean {
	// Validate input parameters
	if (typeof value !== 'string') return false;

	// Empty strings are valid CSS values (used to clear/reset properties)
	if (value === '') return true;

	// Fetch the property definition from the StyleDefinitions
	const propertyDef = StyleDefinitions[styleKey];
	if (!propertyDef) return false;

	// Fetch the normalized syntax variations for the property
	const syntaxNormalized = propertyDef.syntaxNormalized;
	if (!syntaxNormalized) return false;

	// Split the value into its components
	const values = splitAdvanced(value, StyleValueSeparatorDefaults);

	// Convert the values to their token representations
	const valueTokens = getValueTokens(values).join(' ');
	if (valueTokens.length === 0) return false;

	return syntaxNormalized.some((syntax) => {
		return syntax === valueTokens;
	});
}

export default {
	is: {
		keyword: isValueKeyword,
		function: isValueFunction,
		number: isValueNumber,
		integer: isValueInteger,
		color: isValueColor,
		link: isValueLink,
		dimension: isValueDimension,
	},

	get: {
		type: getValueType,
		defaultType: getValueDefaultType,
		token: getValueToken,
		tokens: getValueTokens,
	},

	validate: {
		value: isValueValid,
	},
} as const;
