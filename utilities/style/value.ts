// Utilities
import { getTokenCanonical } from '@/utilities/style/token';
import { isValueDimension, getDimensionType } from '@/utilities/style/dimension';

// Types
import type { ValueTypes } from '@/types/style/value';
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
	return /^[a-zA-Z-]+\([^)]+\)$/.test(input);
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
 * Determines the type of a CSS value based on its format.
 * Uses specific checks for dimension, keyword, function, and number.
 * @param input - The CSS value string to classify.
 * @returns The detected value type as a ValueTypes or undefined if not recognized.
 * @example
 * getValueType('10px') → 'dimension'
 * getValueType('auto') → 'keyword'
 * getValueType('fit-content(10px)') → 'function'
 * getValueType('10') → 'number'
 */
function getValueType(input: string): ValueTypes | undefined {
	if (isValueDimension(input)) return 'dimension';
	if (isValueKeyword(input)) return 'keyword';
	if (isValueFunction(input)) return 'function';
	if (isValueNumber(input)) return 'number';

	return undefined;
}

/**
 * Returns an array of value types for each value in the input array.
 * Uses getValueType to classify each value.
 * @param values - An array of CSS value strings to classify.
 * @returns An array of value types corresponding to the input values.
 * @example
 * getValueTypes(['10px', 'auto', 'fit-content(10px)', '10']) → ['dimension', 'keyword', 'function', 'number']
 */
function getValueTypes(values: string[]): string[] {
	return values.map((value) => {
		return getValueType(value) || 'unknown';
	});
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
	if (!type) return undefined;

	if (type === 'keyword') return value;
	if (type === 'number') return '<number>';
	if (type === 'dimension') return `<${getDimensionType(value)}>`;

	return getTokenCanonical(value);
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
	return values.map((value) => {
		return getValueToken(value) || 'unknown';
	});
}

/**
 * Extracts separators between tokens for each variation in syntaxParsed.
 * Returns a 2D array: one array of separators per variation.
 * @param variations - An array of CSS value variations (e.g., ['a b / c', 'd e / f']).
 * @return A 2D array of separators for each variation.
 *
 * @example
 * extractSeparators(['a b / c', 'd / e f']) → [[' ', '/'], ['/', ' ']]
 */
function extractSeparators(variations: string[]): ValueSeparators[][] {
	/**
	 * Preprocesses variations by:
	 * 1. Removing anything between < and > (including the brackets themselves), e.g. '<number [10,100]>' → ''
	 * 2. Removing spaces before and after '/' or ',',
	 * 3. Trimming the result and filtering out empty strings
	 *
	 * @param variations - Array of CSS value variations
	 * @returns Array of cleaned variations
	 */
	const safeVariations = variations
		.map((v) =>
			v
				.replace(/\s+/g, ' ')
				// Remove anything between < and > (including brackets)
				.replace(/<[^>]*>/g, 'token')
				// Remove spaces before and after '/' or ',',
				.replace(/\s*([/,])\s*/g, '$1')
				// Remove functions and their arguments, e.g., 'fit-content(10px)' → ''
				.replace(/\b\S*\([^)]*\)/g, 'token')
				.trim()
		)
		.filter((v) => v.length > 0);

	return safeVariations.map((variation) => {
		// Match separators: either '/' or one or more spaces
		const regex = /([\/]|\s+)/g;
		const separators: ValueSeparators[] = [];
		let match;
		while ((match = regex.exec(variation)) !== null) {
			separators.push(match[0] as ValueSeparators);
		}
		return separators;
	});
}

/**
 * Matches a value against the variations and returns the index of the first match.
 * If no match is found, returns -1.
 * @param variations - An array of CSS value variations to match against.
 * @param values - The CSS value string to match.
 * @return The index of the matching variation, or -1 if not found.
 * @example
 * getVariationIndex(['10px', 'auto'], '10px') → 0
 * getVariationIndex(['10px', 'auto'], '20px') → -1
 */
function getVariationIndex(variations: string[], values: string): number {
	return variations.findIndex((variation) => variation === values);
}

/**
 * Joins slot values into a single CSS value string using the correct separators.
 *
 * This function is used in the Value component to join slot values after editing, ensuring the result matches the CSS syntax for the matched variation.
 *
 * - The correct separator array is determined by matching the current slot tokens to the allowed variations.
 * - The slot values are joined using the separators (space, slash, comma, etc.) in the correct order.
 * - This guarantees that values like `10px / 2` or `auto 1 / 2` are always joined with the right syntax, matching the CSS property definition.
 *
 * Example usage:
 *   const valueTokens = getValueTokens(updatedValues).join(' ');
 *   const found = getVariationIndex(syntaxNormalized, valueTokens);
 *   const separators = found === -1 ? [] : allSeparators[found];
 *   const joinedValue = joinAdvanced(updatedValues, separators);
 *
 * See also: extractSeparators, joinAdvanced, createOptionsTable
 */

/**
 * Note: The old strict variationFilter logic has been removed. All filtering and matching is now handled inside createOptionsTable, which is more flexible and context-aware, supporting partial and incremental editing.
 */

export { isValueKeyword, isValueFunction, isValueNumber, getValueType, getValueTypes, getValueTokens, getValueToken, extractSeparators, getVariationIndex };
