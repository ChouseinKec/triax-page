import { ValueSeparators as ValueSeparatorConst } from '@/constants/style/value';

// Utilities
import { getTokenCanonical } from '@/utilities/style/token';
import { isValueDimension, getDimensionType } from '@/utilities/style/dimension';

// Types
import type { CSSTokenGroups } from '@/types/style/token';
import type { ValueSeparators } from '@/types/style/value';

/**
 * Checks if a value is a CSS keyword (e.g., 'auto', 'none', 'inherit').
 * @param input - The string to check.
 * @returns True if the input is a valid keyword format, false otherwise.
 * @example
 * isValueKeyword('auto') → true
 */
function isValueKeyword(input: string): boolean {
	return /^[a-zA-Z-]+$/.test(input);
}

/**
 * Checks if a value is a CSS function (e.g., functionName(args)).
 * @param input - The string to check.
 * @returns True if the input is a valid function format, false otherwise.
 * @example
 * isValueFunction('fit-content(10px)') → true
 */
function isValueFunction(input: string): boolean {
	return /^[a-zA-Z-]+\(.+\)$/.test(input);
}

/**
 * Checks if a value is a number (e.g., '10', '-5.5', '0.1').
 * @param input - The string to check.
 * @returns True if the input is a valid number format, false otherwise.
 * @example
 * isValueNumber('10') → true
 */
function isValueNumber(input: string): boolean {
	return /^-?\d*\.?\d+$/.test(input);
}

/**
 * Checks if a value is a CSS dimension (e.g., '10px', '5em', '100%').
 * @param input - The string to check.
 * @returns True if the input is a valid dimension format, false otherwise.
 * @example
 * isValueDimension('10px') → true
 * isValueDimension('5em') → true
 * isValueDimension('100%') → true
 */
function isValueInteger(input: string): boolean {
	return /^-?\d+$/.test(input);
}

/**
 * Checks if a value is a CSS color (e.g., '#fff', 'rgba(255, 0, 0)', 'hsl(120, 100%, 50%)').
 * @param input - The string to check.
 * @returns True if the input is a valid color format, false otherwise.
 * @example
 * isValueColor('#fff') → true
 * isValueColor('rgba(255, 0, 0)') → true
 */
function isValueColor(input: string): boolean {
	return /^#[0-9a-fA-F]{3,6}$|^rgba?\(\d{1,3},\s*\d{1,3},\s*\d{1,3}(,\s*[\d.]+)?\)$|^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*[\d.]+)?\)$/.test(input);
}

/**
 * Determines the type of a CSS value based on its format.
 * Uses specific checks for dimension, keyword, function, and number.
 * @param input - The CSS value string to classify.
 * @returns The detected value type as a CSSTokenGroups or undefined if not recognized.
 * @example
 * getValueType('10px') → 'dimension'
 * getValueType('auto') → 'keyword'
 * getValueType('fit-content(10px)') → 'function'
 * getValueType('10') → 'integer'
 * getValueType('10.5') → 'number'
 */
function getValueType(input: string): CSSTokenGroups | undefined {
	// IMPORTANT: The order of these checks matters!
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
 * Returns an array of value types for each value in the input array.
 * Uses getValueType to classify each value.
 * @param values - An array of CSS value strings to classify.
 * @returns An array of value types corresponding to the input values.
 * @example
 * getCSSTokenGroups(['10px', 'auto', 'fit-content(10px)', '10']) → ['dimension', 'keyword', 'function', 'number']
 */
function getCSSTokenGroups(values: string[]): string[] {
	return values.map((value) => getValueType(value) || 'unknown');
}

/**
 * Generates a token representation for a CSS value.
 * Converts keywords to their canonical form, numbers to '<number>', and dimensions to '<dimensionType>'.
 * If the value type is not recognized, returns undefined.
 * @param value - The CSS value string to convert.
 * @returns The token representation of the value or undefined if not recognized.
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
 * Generates an array of value tokens for each value in the input array.
 * Uses getValueToken to convert each value to its token representation.
 * @param values - An array of CSS value strings to convert.
 * @returns An array of value tokens corresponding to the input values.
 * @example
 * getValueTokens(['10px', 'auto', 'fit-content(10px)', '10']) → ['<length>', 'auto', 'fit-content()', '<number>']
 */
function getValueTokens(values: string[]): string[] {
	return values.map((value) => getValueToken(value) || 'unknown');
}

/**
 * Extracts separators from a single variation string.
 * @param variation - The variation string to extract separators from.
 * @returns An array of separators found in the string.
 */
function extractSeparator(variation: string): string[] {
	// Clean and normalize the variation string for consistent separator extraction
	const cleaned = variation
		.replace(/\s+/g, ' ') // Normalize whitespace
		.replace(/<[^>]*>/g, 'token') // Replace angle-bracketed tokens
		// Remove spaces around '/' and ','
		// Replace functions (including nested) and their arguments with 'token'
		.replace(/([a-zA-Z-]+\([^()]*\))/g, function replacer(match) {
			let depth = 0;
			for (let i = 0; i < match.length; i++) {
				if (match[i] === '(') depth++;
				else if (match[i] === ')') depth--;
				if (depth === 0 && match[i] === ')') {
					return `token${match.slice(i + 1)}`;
				}
			}
			return 'token';
		})
		.replace(/([a-zA-Z-]+\((?:[^()]|token)*\))/g, 'token')
		.trim();

	// Build a regex to match all possible separators
	const separatorPattern = ValueSeparatorConst.map((s) => (s === ' ' ? '\\s+' : s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).join('|');
	const separatorRegex = new RegExp(`(${separatorPattern})`, 'g');

	// Extract separators
	const separators: string[] = [];
	let match;
	while ((match = separatorRegex.exec(cleaned)) !== null) {
		separators.push(match[1] as ValueSeparators);
	}
	return separators;
}

/**
 * Extracts separators between tokens for each variation in syntaxParsed.
 * Returns an array of sets: one set of separators per variation.
 * @param variations - A set of CSS value variations (e.g., Set(['a b / c', 'd e / f'])).
 * @return An array of sets of separators for each variation.
 *
 * @example
 * extractSeparators(new Set(['a b / c', 'd / e f'])) → [Set([' ', '/']), Set(['/', ' '])]
 */
function extractSeparators(variations: string[]): string[][] {
	const arr = Array.isArray(variations) ? variations : [...variations];
	return arr.map(extractSeparator);
}

/**
 * Matches a value against the variations and returns the index of the first match.
 * If no match is found, returns -1.
 * @param variations - A set of CSS value variations to match against.
 * @param values - The CSS value string to match.
 * @return The index of the matching variation, or -1 if not found.
 * @example
 * getVariationIndex(['10px', 'auto'], '10px') → 0
 * getVariationIndex(['10px', 'auto'], '20px') → -1
 */
function getVariationIndex(variations: string[], values: string): number {
	return variations.findIndex((variation) => variation === values);
}

export { isValueColor, extractSeparator, isValueKeyword, isValueFunction, isValueNumber, getValueType, getCSSTokenGroups, getValueTokens, getValueToken, extractSeparators, getVariationIndex };
