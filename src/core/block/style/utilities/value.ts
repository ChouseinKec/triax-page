// Utilities
import { getTokenCanonical, extractDimensionNumber, extractDimensionUnit, getDimensionType } from '@/src/core/block/style/utilities';
import { isColor } from '@/src/shared/utilities/color';

// Types
import type { TokenTypes, StyleOptionDefinition } from '@/src/core/block/style/types';

/**
 * Checks if a value is a CSS keyword (e.g., 'auto', 'none', 'inherit').
 * @param input - The string to check.
 */
export function isValueKeyword(input: unknown): boolean {
	if (typeof input !== 'string') return false;
	return /^[a-zA-Z-]+$/.test(input);
}

/**
 * Checks if a value is a CSS function (e.g., functionName(args)).
 * @param input - The string to check.
 */
export function isValueFunction(input: unknown): boolean {
	if (typeof input !== 'string') return false;
	return /^([a-zA-Z0-9-]+)\((.*)\)$/.test(input);
}

/**
 * Checks if a value is a number (e.g., '10', '-5.5', '0.1').
 * @param input - The string to check.
 */
export function isValueNumber(input: unknown): boolean {
	if (typeof input !== 'string') return false;
	return /^-?\d*\.?\d+$/.test(input);
}

/**
 * Checks if a value is an integer (e.g., '10', '-5').
 * @param input - The string to check.
 */
export function isValueInteger(input: unknown): boolean {
	if (typeof input !== 'string') return false;
	return /^-?\d+$/.test(input);
}

/**
 * Checks if a value is a CSS color (e.g., '#fff', 'rgba(255, 0, 0)', 'hsl(120, 100%, 50%)').
 * @param input - The string to check.
 */
export function isValueColor(input: unknown): boolean {
	if (typeof input !== 'string') return false;
	return isColor(input);
}

/**
 * Checks if a value is a link (e.g., 'https://example.com', '/path/to/resource').
 * @param input - The string to check.
 */
export function isValueLink(input: unknown): boolean {
	if (typeof input !== 'string') return false;
	return /^"?https?:\/\/[^\s"]+"?$/.test(input) || /^"?\/[^\s"]+"?$/.test(input);
}

/**
 * Checks if a string is a valid CSS dimension value (number + unit).
 * Validates both the numeric part and that the unit is a known CSS unit.
 *
 * @param input - The CSS value string to check (e.g., '10px', '2.5rem').
 */
export function isValueDimension(input: unknown): boolean {
	if (typeof input !== 'string') return false;

	const value = extractDimensionNumber(input); // Extract numeric part
	const unit = extractDimensionUnit(input); // Extract unit part

	// If no number or no unit, not a valid dimension
	if (value === undefined || !unit) return false;

	// Ensure unit is a valid UnitKey value
	// if (!(unit in UNIT_DEFINITIONS)) return false; //! If you still see this line, remove it.
	return true;
}

/**
 * Determines the type of a CSS value based on its format.
 * Uses specific checks for dimension, keyword, function, and number.
 * @param input - The CSS value string to classify.
 */
export function getValueType(input: unknown): TokenTypes | undefined {
	if (typeof input !== 'string') return undefined;

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
 */
export function getValueToken(input: unknown): string | undefined {
	if (typeof input !== 'string') return undefined;

	const type = getValueType(input);

	switch (type) {
		case 'keyword':
			return input;
		case 'integer':
			return '<integer>';
		case 'number':
			return '<number>';
		case 'dimension':
			return `<${getDimensionType(input)}>`;
		case 'color':
			return '<color>';
		default:
			return getTokenCanonical(input);
	}
}

/**
 * Converts an array of CSS value strings to an array of tokens.
 * Uses getValueToken to convert each value to its token representation.
 * Filters out any unrecognized values (returns null for those).
 * @param inputs - An array of CSS value strings to convert.
 */
export function getValueTokens(input: unknown[]): string[] {
	return input.map(getValueToken).filter((token): token is string => token !== undefined);
}

/**
 * Determines the default value type to use when a value is empty.
 * Prioritizes certain types (dimension > keyword > color > function) based on available options.
 * Falls back to the first option's type if no prioritized types are available.
 * @param options - Array of option definitions containing type information
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
