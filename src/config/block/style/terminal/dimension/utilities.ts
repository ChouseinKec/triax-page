// Types
import type { UnitType, UnitKey } from '@/core/block/style/types';
import type { OptionDefinition } from '@/shared/components/types/option';
import type { TerminalToken, Value, TerminalParam } from '@/core/block/style/types';

// Managers
import { getUnitDefinitions } from '@/core/block/style/managers';

/**
 * Extracts the numeric value from a CSS length string (e.g., '10px', '25%', '0.1rem').
 * Returns the numeric value as a number, or undefined if not found.
 *
 * @param input - The CSS value string.
 */
export function extractDimensionNumber(input: string): string | undefined {
	const match = input.match(/^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the unit from a CSS length string (e.g., '10px', '25%', '0.1rem').
 * Returns the unit as a string, or undefined if not found.
 *
 * @param input - The CSS value string.
 */
export function extractDimensionUnit(input: string): string | undefined {
	const match = input.match(/^[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?([a-zA-Z%]*)$/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the valid numeric range from length options.
 * Computes the valid numeric range based on the first option's min/max values.
 * Defaults to -Infinity and Infinity if not specified.
 *
 * @param options - Array of input option definitions that may contain min/max properties
 * @returns Object with min and max range values
 */
export function extractDimensionRange(options: Array<{ min?: number; max?: number }>): { min: number; max: number } {
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
 *
 * @param input - The CSS length value string to extract from
 * @returns Object with number and unit properties
 */
export function extractTokenLengths(input: string): { number: string | undefined; unit: string | undefined } {
	const extractedNumber = extractDimensionNumber(input);
	const extractedUnit = extractDimensionUnit(input);

	return {
		number: extractedNumber,
		unit: extractedUnit,
	};
}

/**
 * Gets default values for length components.
 * Finds the first length category unit as default, fallback to "px".
 *
 * @param options - Array of unit options with categories
 * @returns Object with default unit and number values
 */
export function extractDimensionDefaults(options: Array<{ category?: string; name: string }>): { unit: string; number: string } {
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
export function getDimensionType(input: string): UnitType | undefined {
	const unit = extractDimensionUnit(input) as UnitKey;
	const unitDefinitions = getUnitDefinitions();
	const unitDef = unit ? unitDefinitions[unit] : undefined;

	return unitDef?.type;
}

/**
 * Checks if a string is a valid CSS length value (number + unit).
 * Validates both the numeric part and that the unit is a known CSS unit.
 *
 * @param input - The CSS value string to check (e.g., '10px', '2.5rem').
 */
export function matchValue(value: Value): UnitType | undefined {
	const numericValue = extractDimensionNumber(value);
	const unit = extractDimensionUnit(value);
	if (numericValue === undefined || !unit) return undefined;

	const lengthType = getDimensionType(value);
	if (!lengthType) return undefined;

	return lengthType;
}

/**
 * Determines whether a terminal token represents a CSS dimension type.
 *
 * Recognises the exact canonical tokens `'<length>'`, `'<percentage>'`,
 * `'<angle>'`, and `'<flex>'`. Parameterised variants (e.g. `'<length [0,10]>'`)
 * must be normalised to their bare form before calling this function.
 * Returns `undefined` for tokens that belong to a different terminal type.
 *
 * @param terminalToken - The terminal token to test (e.g. `'<length>'`).
 * @returns The matched `UnitType` string when the token is a known dimension
 *   terminal, otherwise `undefined`.
 * @see matchValue
 */
export function matchToken(terminalToken: TerminalToken): UnitType | undefined {
	if (['<length>', '<percentage>', '<angle>', '<flex>'].includes(terminalToken)) {
		return terminalToken as UnitType;
	}

	return undefined;
}

/**
 * Returns the default `Value` for a dimension terminal token.
 *
 * Delegates to `matchToken` to verify the token is a recognised dimension
 * terminal, then maps each type to a sensible zero-value default
 * (`'0px'`, `'0%'`, `'0deg'`, `'0fr'`). Returns `undefined` for tokens
 * that do not map to a known dimension type.
 *
 * @param terminalToken - The terminal token whose default value is requested.
 * @returns A default CSS dimension value when the token matches a dimension
 *   terminal, otherwise `undefined`.
 * @see matchToken
 */
export function getDefault(terminalToken: TerminalToken): Value | undefined {
	// First check if the terminal matches a known dimension type
	const matchedTerminal = matchToken(terminalToken);
	if (!matchedTerminal) return undefined;

	// Return a default value based on the matched terminal type
	switch (matchedTerminal) {
		case '<length>':
			return '0px';
		case '<percentage>':
			return '0%';
		case '<angle>':
			return '0deg';
		case '<flex>':
			return '0fr';
		default:
			return undefined;
	}
}

/**
 * Builds an array of `OptionDefinition` objects for a dimension terminal token.
 *
 * Looks up all registered unit definitions via `getUnitDefinitions`, filters
 * them by the terminal type, and maps each to a dimension option. When a
 * `terminalParam` with `min`/`max` bounds is supplied those values are merged
 * into every option so the slot editor can constrain numeric input.
 * Returns `undefined` when no units are registered for the given token.
 *
 * @param terminalToken - The canonical dimension token (e.g. `'<length>'`).
 * @param terminalParam - Optional parameter object carrying `min`/`max` range
 *   constraints extracted from the original token string.
 * @returns An array of `OptionDefinition` items for the unit picker when at
 *   least one matching unit exists, otherwise `undefined`.
 * @see getDefault
 * @see matchToken
 */
export function createOption(terminalToken: TerminalToken, terminalParam: TerminalParam): OptionDefinition[] | undefined {
	// Get the base name of the token and check if it's a valid length group
	const unitDefinitions = getUnitDefinitions();

	// Get registered units and filter by type
	const unitOptions = Object.values(unitDefinitions)
		.filter((unit) => unit.type === terminalToken)
		.map((unit) => ({
			name: unit.key,
			value: `0${unit.key}`,
			category: 'dimension',
			type: 'dimension',
		}));

	// If no units found for this type, return undefined
	if (unitOptions.length === 0) return undefined;

	// If no range is specified, return the unit options as is
	if (!terminalParam || !terminalParam.min || !terminalParam.max) return unitOptions;

	// Map the unit options to include the min and max range values
	return unitOptions.map((unit) => ({
		...unit,
		min: terminalParam.min,
		max: terminalParam.max,
	}));
}
