// Constants
import { CSSUnitDefs } from '@/constants/style/units';

// Type
import { ExplodedDataType, CSSDimensions } from '@/types/style/data';
import { CSSUnits } from '@/types/style/units';

function getDimensionType(input: string): CSSDimensions | undefined {
	const value = extractValue(input);
	const unit = extractUnit(input);

	if (value === undefined || !unit) return undefined;

	// Ensure unit is a valid CSSUnits value
	if (!(unit in CSSUnitDefs)) return undefined;

	const unitDef = CSSUnitDefs[unit as CSSUnits];

	if (!unitDef) return undefined;

	return unitDef?.group;
}

/**
 * Splits a value string into its data type structure (keyword, dimension, function).
 * Returns an object describing the type and its details.
 */
function explodeDataType(input: string): ExplodedDataType | undefined {
	// Function: e.g. fit-content(<length [10,20]>)
	const fnMatch = input.match(/^([a-zA-Z-]+)\((.*)\)$/);
	if (fnMatch) {
		const base = fnMatch[1];
		const args = fnMatch[2].trim();
		return {
			base,
			canonical: `${base}()`,
			args,
			type: 'function',
		};
	}

	// Dimension: e.g. <length [0,10]>
	const dimMatch = input.match(/^<([a-zA-Z0-9-]+)(\s*\[([^\]]+)\])?>$/);
	if (dimMatch) {
		const base = dimMatch[1];
		const canonical = `<${base}>`;
		let args: Record<string, any> | undefined = undefined;
		if (dimMatch[3]) {
			// Try to parse min/max from [min,max] or [min,max,step]
			const range = dimMatch[3].split(',').map((s: string) => s.trim());
			if (range.length >= 2) {
				args = { min: range[0], max: range[1] };
				if (range[2]) args.step = range[2];
			} else {
				args = { range: dimMatch[3] };
			}
		}
		return {
			base,
			canonical,
			...(args ? { args } : {}),
			type: 'dimension',
		};
	}

	// Keyword: e.g. auto
	if (/^[a-zA-Z-]+$/.test(input)) {
		return {
			base: input,
			canonical: input,
			type: 'keyword',
		};
	}

	return undefined; // Not a recognized type
}

/**
 * Extracts the numeric value from a CSS dimension string (e.g., '10px', '25%', '0.1rem').
 * Returns the numeric value as a number, or undefined if not found.
 * @param input - The CSS value string.
 * @returns The numeric value (number) or undefined if not found.
 */
function extractValue(input: string): number | undefined {
	const match = input.match(/^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)/);
	return match ? parseFloat(match[1]) : undefined;
}

/**
 * Extracts the unit from a CSS dimension string (e.g., '10px', '25%', '0.1rem').
 * Returns the unit as a string, or undefined if not found.
 * @param input - The CSS value string.
 * @returns The unit (string) or undefined if not found.
 */
function extractUnit(input: string): string | undefined {
	const match = input.match(/^[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?([a-zA-Z%]*)$/);
	return match ? match[1] : undefined;
}

export { explodeDataType, extractValue, extractUnit };
