// Constants
import { UNIT_DEFINITIONS } from '@/src/core/block/style/constants';

// Types
import type { UnitTypes } from '@/src/core/block/style/types';
import type { UnitKeys } from '@/src/core/block/style/types';

/**
 * Extracts the numeric value from a CSS dimension string (e.g., '10px', '25%', '0.1rem').
 * Returns the numeric value as a number, or undefined if not found.
 * @param input - The CSS value string.
 * @returns The numeric value (number) or undefined if not found.
 * @example
 * extractDimensionNumber('10px') → 10
 */
export function extractDimensionNumber(input: string): string | undefined {
	const match = input.match(/^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the unit from a CSS dimension string (e.g., '10px', '25%', '0.1rem').
 * Returns the unit as a string, or undefined if not found.
 * @param input - The CSS value string.
 * @returns The unit (string) or undefined if not found.
 * @example
 * extractDimensionUnit('10px') → 'px'
 */
export function extractDimensionUnit(input: string): string | undefined {
	const match = input.match(/^[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?([a-zA-Z%]*)$/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the valid numeric range from dimension options.
 * Computes the valid numeric range based on the first option's min/max values.
 * Defaults to -Infinity and Infinity if not specified.
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
 * Extracts numeric and unit components from a CSS dimension value.
 * Splits a dimension string (e.g., "10px", "2rem") into its numeric and unit parts.
 * @param input - The CSS dimension value string to extract from
 * @returns Object with number and unit properties
 */
export function extractDimensionValues(input: string): { number: string | undefined; unit: string | undefined } {
	const extractedNumber = extractDimensionNumber(input);
	const extractedUnit = extractDimensionUnit(input);

	return {
		number: extractedNumber,
		unit: extractedUnit,
	};
}

/**
 * Gets default values for dimension components.
 * Finds the first dimension category unit as default, fallback to "px".
 * @param options - Array of unit options with categories
 * @returns Object with default unit and number values
 */
export function extractDimensionDefaults(options: Array<{ category?: string; name?: string }>): { unit: string; number: string } {
	const unit = options.find((option) => option.category === 'dimension')?.name || 'px';
	const number = '0';

	return { unit, number };
}

/**
 * Determines the CSS dimension type based on the input string.
 * Uses isValueDimension for validation.
 *
 * @param input - The CSS value string (e.g., '10px').
 * @returns The CSS dimension group or undefined if not recognized.
 * @example
 * getDimensionType('10px') → 'length'
 * getDimensionType('25%') → 'percentage'
 * getDimensionType('180deg') → 'angle'
 * getDimensionType('1fr') → 'flex'
 */
export function getDimensionType(input: string): UnitTypes | undefined {
	const unit = extractDimensionUnit(input) as UnitKeys;
	const unitDef = unit ? UNIT_DEFINITIONS[unit] : undefined;
	return unitDef?.type;
}
