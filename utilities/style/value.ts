// Utilities
import { isTokenDimension } from '@/utilities/style/token';
import { getDimensionType, isValueDimension } from '@/utilities/style/dimension';

// Types
import { ValueTypes } from '@/types/style/value';

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
 * @param input - The CSS value string to check.
 * @returns The type of the value as a string, or undefined if not recognized.
 * @example
 * getValueType('<length>') → 'dimension'
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
 * Maps an array of value strings to their detected value type (kind).
 * @param values - The array of value strings to classify.
 * @returns An array of ValueTypes or 'unknown' for each value.
 * @example
 * getValueTypes(['<length>', 'auto', 'fit-content(10px)', '10']) → ['length', 'keyword', 'function', 'number']
 */
function getValueTypes(values: string[]): Array<string> {
	return values.map((value) => {
		if (isTokenDimension(value)) {
			const dimensionType = getDimensionType(value);
			if (dimensionType) return dimensionType;
		}
		if (isValueKeyword(value)) return 'keyword';
		if (isValueFunction(value)) return 'function';
		if (isValueNumber(value)) return 'number';
		return 'unknown';
	});
}

export { isValueKeyword, isTokenDimension, isValueFunction, isValueNumber, getValueType, getValueTypes };
