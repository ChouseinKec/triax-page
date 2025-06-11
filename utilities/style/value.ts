// Utilities
import { getTokenCanonical } from '@/utilities/style/token';
import { isValueDimension, getDimensionType } from '@/utilities/style/dimension';
import { splitTopLevel } from '@/utilities/string/string';

// Types
import { ValueTypes } from '@/types/style/value';

// Constants
import { ValueSeparators } from '@/constants/style/value';

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

function getSlotValueSets(variations: string[]): Array<Set<string>> {
	const slotValueSets: Array<Set<string>> = [];
	for (const variation of variations) {
		const slots = splitTopLevel(variation, [...ValueSeparators]);
		for (let i = 0; i < slots.length; i++) {
			const canonical = getTokenCanonical(slots[i]);
			if (!slotValueSets[i]) slotValueSets[i] = new Set();
			if (canonical) slotValueSets[i].add(canonical);
		}
	}
	return slotValueSets;
}

/**
 * Filters variations to those that match the prefix of the provided value tokens.
 * Each variation is split into slots, and each slot is canonicalized for comparison.
 * Only variations whose slots match the value tokens as a prefix are included.
 *
 * @param variations - Array of value definition strings (e.g., ['auto <number [0,∞]>'])
 * @param values - Array of current value strings (e.g., ['auto', '10'])
 * @returns Array of variations that match the current value tokens as a prefix.
 */
function filterVariations(variations: string[], values: string[]): string[] {
	// Canonicalize the current value tokens for comparison
	const valueTokens = getValueTokens(values);
	console.log(getSlotValueSets(variations));
	return variations.filter((variation) => {
		// Split the variation into slots (e.g., ['auto', '<number [0,∞]>'])
		const variationSlots = splitTopLevel(variation, [...ValueSeparators]);

		// If the variation has fewer slots than the number of value tokens, it can't match
		if (variationSlots.length < valueTokens.length) return false;

		// Compare each slot/token for prefix match
		for (let i = 0; i < valueTokens.length; i++) {
			// Canonicalize the slot for robust comparison
			if (getTokenCanonical(variationSlots[i]) !== valueTokens[i]) return false;
		}
		// All slots matched the value tokens as a prefix
		return true;
	});
}

export { filterVariations, isValueKeyword, isValueFunction, isValueNumber, getValueType, getValueTypes };
