// Utilities
import { getTokenCanonical } from '@/utilities/style/token';
import { isValueDimension, getDimensionType } from '@/utilities/style/dimension';
import { splitAdvanced } from '@/utilities/string/string';

// Types
import type { CSSTokenGroups } from '@/types/style/token';

// Constants
import { CSSPropertyDefs } from '@/constants/style/property';
import { ValueSeparators } from '@/constants/style/separator';

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
function isValueKeyword(input: string): boolean {
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
function isValueFunction(input: string): boolean {
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
function isValueNumber(input: string): boolean {
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
function isValueInteger(input: string): boolean {
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
function isValueColor(input: string): boolean {
	return /^#[0-9a-fA-F]{3,6}$|^rgba?\(\d{1,3},\s*\d{1,3},\s*\d{1,3}(,\s[\d.]+)?\)$|^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s[\d.]+)?\)$/.test(input);
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
function isValueLink(input: string): boolean {
	return /^"?https?:\/\/[^\s"]+"?$/.test(input) || /^"?\/[^\s"]+"?$/.test(input);
}

/**
 * Determines the type of a CSS value based on its format.
 * Uses specific checks for dimension, keyword, function, and number.
 * @param input - The CSS value string to classify.
 * @returns {CSSTokenGroups | undefined} The detected value type or undefined if not recognized.
 * @example
 * getValueType('10px') → 'dimension'
 * getValueType('auto') → 'keyword'
 * getValueType('fit-content(10px)') → 'function'
 * getValueType('10') → 'integer'
 * getValueType('10.5') → 'number'
 * getValueType('#fff') → 'color'
 * getValueType('"https://example.com"') → 'link'
 */
function getValueType(input: string): CSSTokenGroups | undefined {
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
function getValueToken(value: string): string | undefined {
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
function getValueTokens(values: string[]): string[] {
	return values.map(getValueToken).filter((token): token is string => token !== undefined);
}

/**
 * Validates if a given value is valid for a specific CSS property.
 * Uses the property's syntaxNormalized to check if the value matches any of the defined syntaxes.
 * @param property - The CSS property name (e.g., 'margin', 'padding').
 * @param value - The CSS value string to validate (e.g., '10px auto').
 * @returns {boolean} True if the value is valid for the property, false otherwise.
 * @example
 * isValueValid('margin', '10px auto') → true
 * isValueValid('padding', '10px') → true
 * isValueValid('color', '#fff') → true
 * isValueValid('display', 'flex') → true
 */
function isValueValid(property: string, value: string): boolean {
	// Fetch the property definition from the CSSPropertyDefs
	const propertyDef = CSSPropertyDefs[property];
	if (!propertyDef) return false;

	// Fetch the normalized syntax variations for the property
	const syntaxNormalized = propertyDef.syntaxNormalized;
	if (!syntaxNormalized) return false;

	// Split the value into its components
	const values = splitAdvanced(value, ValueSeparators);
	// Convert the values to their token representations
	const valueTokens = getValueTokens(values).join(' ');
	if (valueTokens.length === 0) return false;

	// Check if the value tokens match any of the normalized syntaxes
	return syntaxNormalized.some((syntax) => {
		return syntax === valueTokens;
	});
}

export { getValueType, getValueTokens, getValueToken, isValueValid };
