import { CSSUnitDefs } from '@/constants/style/units';
import { CSSDimensionGroups } from '@/types/style/dimension';
import { CSSUnits } from '@/types/style/units';

/**
 * Extracts the numeric value from a CSS dimension string (e.g., '10px', '25%', '0.1rem').
 * Returns the numeric value as a number, or undefined if not found.
 * @param input - The CSS value string.
 * @returns The numeric value (number) or undefined if not found.
 * @example
 * extractNumber('10px') → 10
 */
function extractNumber(input: string): string | undefined {
	const match = input.match(/^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the unit from a CSS dimension string (e.g., '10px', '25%', '0.1rem').
 * Returns the unit as a string, or undefined if not found.
 * @param input - The CSS value string.
 * @returns The unit (string) or undefined if not found.
 * @example
 * extractUnit('10px') → 'px'
 */
function extractUnit(input: string): string | undefined {
	const match = input.match(/^[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?([a-zA-Z%]*)$/);
	return match ? match[1] : undefined;
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
function isValueDimension(input: string): boolean {
	const value = extractNumber(input); // Extract numeric part
	const unit = extractUnit(input); // Extract unit part

	// If no number or no unit, not a valid dimension
	if (value === undefined || !unit) return false;

	// Ensure unit is a valid CSSUnits value
	if (!(unit in CSSUnitDefs)) return false;
	return true;
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
function getDimensionType(input: string): CSSDimensionGroups | undefined {
	if (!isValueDimension(input)) return undefined;
	const unit = extractUnit(input) as CSSUnits;
	const unitDef = unit ? CSSUnitDefs[unit] : undefined;
	return unitDef?.dimensionGroup;
}

export { getDimensionType, extractNumber, extractUnit, isValueDimension };
