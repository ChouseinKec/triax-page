// Types
import type { UnitType, UnitKey } from '@/core/block/style/types';
import type { OptionDefinition } from '@/shared/components/types/option';
import type { TokenRaw, StyleValue, TokenParam, TokenCanonical, TokenOptionParams } from '@/core/block/style/types';

// Utilities
import { extractBetween } from '@/shared/utilities/string';

// Registry
import { getRegisteredUnit } from '@/core/block/style/state/registry';

/**
 * Extracts the numeric value from a CSS length string (e.g., '10px', '25%', '0.1rem').
 * Returns the numeric value as a number, or undefined if not found.
 * @param input - The CSS value string.
 */
export function extractLengthNumber(input: string): string | undefined {
	const match = input.match(/^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the unit from a CSS length string (e.g., '10px', '25%', '0.1rem').
 * Returns the unit as a string, or undefined if not found.
 * @param input - The CSS value string.
 */
export function extractLengthUnit(input: string): string | undefined {
	const match = input.match(/^[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?([a-zA-Z%]*)$/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the valid numeric range from length options.
 * Computes the valid numeric range based on the first option's min/max values.
 * Defaults to -Infinity and Infinity if not specified.
 * @param options - Array of input option definitions that may contain min/max properties
 * @returns Object with min and max range values
 */
export function extractLengthRange(options: Array<{ min?: number; max?: number }>): { min: number; max: number } {
	// Find the first option that has min/max properties
	const option = options[0];

	// Ensure min and max are valid numbers if present
	const validMin = option && 'min' in option && typeof option.min === 'number' ? option.min : -Infinity;
	const validMax = option && 'max' in option && typeof option.max === 'number' ? option.max : Infinity;

	return {
		min: validMin,
		max: validMax,
	};
}

/**
 * Extracts numeric and unit components from a CSS length value.
 * Splits a length string (e.g., "10px", "2rem") into its numeric and unit parts.
 * @param input - The CSS length value string to extract from
 * @returns Object with number and unit properties
 */
export function extractTokenLengths(input: string): { number: string | undefined; unit: string | undefined } {
	const extractedNumber = extractLengthNumber(input);
	const extractedUnit = extractLengthUnit(input);

	return {
		number: extractedNumber,
		unit: extractedUnit,
	};
}

/**
 * Gets default values for length components.
 * Finds the first length category unit as default, fallback to "px".
 * @param options - Array of unit options with categories
 * @returns Object with default unit and number values
 */
export function extractLengthDefaults(options: Array<{ category?: string; name: string }>): { unit: string; number: string } {
	const unit = options.find((option) => option.category === 'length')?.name || 'px';
	const number = '0';

	return { unit, number };
}

/**
 * Determines the CSS length type based on the input string.
 * Uses isValueLength for validation.
 *
 * @param input - The CSS value string (e.g., '10px').
 */
export function getLengthType(input: string): UnitType | undefined {
	const unit = extractLengthUnit(input) as UnitKey;
	const unitDef = unit ? getRegisteredUnit(unit) : undefined;

	return unitDef?.type;
}

/**
 * Checks if a value is a CSS length (e.g., <length>, <percentage>).
 * @param input - The string to check.
 */
export function getTokenType(tokenRaw: TokenRaw): 'length' | undefined {
	if (['<length>', '<percentage>', '<angle>', '<flex>'].includes(tokenRaw)) return 'length';

	return undefined;
}

export function getTokenCanonical(tokenRaw: TokenRaw): TokenCanonical | undefined {
	if (!tokenRaw.startsWith('<') && !tokenRaw.endsWith('>')) return undefined;

	if(tokenRaw.startsWith('<length-percentage') && tokenRaw.endsWith('>')) return undefined;

	if (tokenRaw.startsWith('<length') && tokenRaw.endsWith('>')) return '<length>';
	if (tokenRaw.startsWith('<percentage') && tokenRaw.endsWith('>')) return '<percentage>';
	if (tokenRaw.startsWith('<angle') && tokenRaw.endsWith('>')) return '<angle>';
	if (tokenRaw.startsWith('<flex') && tokenRaw.endsWith('>')) return '<flex>';

	return undefined;
}

/**
 * Checks if a string is a valid CSS length value (number + unit).
 * Validates both the numeric part and that the unit is a known CSS unit.
 *
 * @param input - The CSS value string to check (e.g., '10px', '2.5rem').
 */
export function getValueType(styleValue: StyleValue): 'length' | undefined {
	// Extract number and unit parts
	const value = extractLengthNumber(styleValue);
	const unit = extractLengthUnit(styleValue);

	// If no number or no unit, not a valid length
	if (value === undefined || !unit) return undefined;

	// Ensure unit is a valid UnitKey value
	// if (!(unit in UNIT_DEFINITIONS)) return false; //! If you still see this line, remove it.
	return 'length';
}

export function getValueToken(styleValue: StyleValue): `<${UnitType}>` | undefined {
	const valueType = getValueType(styleValue);
	if (!valueType) return undefined;

	const lengthType = getLengthType(styleValue);
	if (!lengthType) return undefined;

	return `<${lengthType}>`;
}

/**
 * Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.
 * @param tokenRaw - The CSS data type string (e.g., '<length [0,10]>').
 *
 */
export function getTokenParam(tokenRaw: TokenRaw): TokenParam | undefined {
	const range = extractBetween(tokenRaw, '[]');
	if (!range) return undefined;

	const rangeValues = range.split(',');

	if (rangeValues.length !== 2) return undefined;

	return { type: 'range', min: parseFloat(rangeValues[0]), max: parseFloat(rangeValues[1]) };
}

/**
 * Creates an array of OptionlengthDefinition objects for a given length token.
 *
 * @param token - The length token string (e.g., '<length [0,100]>')
 */
export function createOption(params: TokenOptionParams): OptionDefinition[] | undefined {
	// Get the base name of the token and check if it's a valid length group
	const tokenBase = params.tokenBase;
	const tokenRaw = params.tokenRaw;
	const unitDefinitions = params.unitDefinitions;



	// Get registered units and filter by type
	const unitOptions = Object.values(unitDefinitions)
		.filter((unit) => unit.type === tokenBase)
		.map((unit) => ({
			name: unit.key,
			value: `0${unit.key}`,
			category: 'length',
			type: 'length',
		}));

	// If no units found for this type, return undefined
	if (unitOptions.length === 0) return undefined;

	// Get the range parameters for the token
	const param = getTokenParam(tokenRaw);

	// If no range is specified, return the unit options as is
	if (!param || param.type !== 'range') return unitOptions;

	// Map the unit options to include the min and max range values
	return unitOptions.map((unit) => ({
		...unit,
		min: param.min,
		max: param.max,
	}));
}
