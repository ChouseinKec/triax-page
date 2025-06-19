// Constants
import { CSSTokenDefs } from '@/constants/style/token';
import { DimensionGroups } from '@/constants/style/value';
import { CSSUnitOptions } from '@/constants/style/units';

// Utilities
import { getTokenType, getTokenParam, getTokenCanonical } from '@/utilities/style/token';
import { getTokenBase } from '@/utilities/style/token';
import { getValueTokens } from '@/utilities/style/value';

// Types
import type { InputOptionData, NumberOptionData, KeywordOptionData, FunctionOptionData, DimensionOptionData } from '@/types/option';
import type { CSSDimensionGroups } from '@/types/style/dimension';
import type { CSSTokens } from '@/types/style/token';

/**
 * Creates a FunctionOptionData object for a given function token.
 *
 * @param token - The function token string (e.g., 'calc(<length>|<percentage>)')
 * @returns FunctionOptionData | undefined - The created function option or undefined if invalid.
 * @example
 * createFunctionOption('calc(<length>|<percentage>)') → { name: 'calc()', value: 'calc(0px)', syntax: '<length>|<percentage>', category: 'function' }
 */
function createFunctionOption(token: string): FunctionOptionData | undefined {
	// Check if the token is empty or undefined
	if (!token) return undefined;

	// Extract the canonical name, base name, and syntax from the token
	const canonicalName = getTokenCanonical(token);
	const baseName = getTokenBase(token);
	const syntax = getTokenParam(token)?.syntax;

	// If any of these are undefined or empty, return undefined
	if (!canonicalName || !baseName || !syntax) return undefined;

	const initialValue = CSSTokenDefs?.[`<${canonicalName}>` as CSSTokens]?.initialValue || '0px';

	// Create and return the FunctionOptionData object
	return {
		name: canonicalName,
		value: `${baseName}(${initialValue})`,
		syntax,
		category: 'function',
	};
}

/**
 * Creates an array of DimensionOptionData objects for a given dimension token.
 *
 * @param token - The dimension token string (e.g., '<length [0,100]>')
 * @returns DimensionOptionData[] | undefined - An array of dimension options or undefined if invalid.
 * @example
 * createDimensionOptions('<length [0,100]>') → [{ name: 'px', value: '0px', type: 'length', min: 0, max: 100 }, ...]
 */
function createDimensionOptions(token: string): DimensionOptionData[] | undefined {
	// Check if the token is empty or undefined
	if (!token) return undefined;

	// Get the base name of the token and check if it's a valid dimension group
	const baseName = getTokenBase(token) as CSSDimensionGroups;

	// If the base name is not a valid dimension group, return undefined
	if (!DimensionGroups.includes(baseName)) return undefined;

	// Get the range parameters for the token, and retrieve the unit options for the base name
	const range = getTokenParam(token);
	const unitOptions = CSSUnitOptions[baseName] || [];

	// If no range is specified, return the unit options as is
	if (!range) return unitOptions as DimensionOptionData[];

	// Map the unit options to include the min and max range values, creating and returning DimensionOptionData objects
	return unitOptions.map((unit) => ({
		...unit,
		min: range.min,
		max: range.max,
	})) as DimensionOptionData[];
}

/**
 * Creates a keyword option for a given token.
 *
 * @param token - The keyword token string (e.g., 'auto')
 * @returns KeywordOptionData | undefined - The created keyword option or undefined if empty.
 * @example
 * createKeywordOption('auto') → { name: 'auto', value: 'auto', category: 'keyword' }
 */
function createKeywordOption(token: string): KeywordOptionData | undefined {
	// Check if the token is empty or undefined
	if (!token) return undefined;

	// Create and return the KeywordOptionData object for the keyword
	return {
		name: token,
		value: token,
		category: 'keyword',
	};
}

/**
 * Creates a NumberOptionData object for a given number token (e.g., '<number [0,25]>').
 * @param token - The number token string (e.g., '<number [0,25]>')
 * @returns NumberOptionData | undefined - The created number option or undefined if invalid.
 * @example
 * createNumberOption('<number [0,25]>') → { name: 'number', value: '0', min: 0, max: 25, category: 'number' }
 */
function createNumberOption(token: string): NumberOptionData | undefined {
	if (!token) return undefined;
	const range = getTokenParam(token);

	return {
		name: 'number',
		value: '0',
		category: 'number',
		min: range?.min,
		max: range?.max,
	};
}

/**
 * Creates an InputOptionData object (or array) for a given token, using the correct factory based on type.
 * @param token - The token string (e.g., 'auto', '<number>', '<length>', 'fit-content(...)')
 * @returns InputOptionData | InputOptionData[] | undefined
 */
function createOption(token: string): InputOptionData | InputOptionData[] | undefined {
	const type = getTokenType(token);
	switch (type) {
		case 'keyword': {
			return createKeywordOption(token);
		}
		case 'number':
		case 'integer': {
			return createNumberOption(token);
		}
		case 'dimension': {
			return createDimensionOptions(token);
		}
		case 'function': {
			return createFunctionOption(token);
		}
		default:
			return undefined;
	}
}

/**
 * Checks if a token is a valid option for a given slot, given the current values and all valid variations.
 *
 * @param token - The candidate token for the slot (e.g., 'auto', '<number>')
 * @param slotIndex - The index of the slot being checked
 * @param validValueSet - Set of all valid value strings (normalized)
 * @param currentTokens - The current value tokens for all slots (canonicalized)
 * @returns True if the token is valid for this slot in the current context
 * @example
 * isSlotOptionValid('auto', 0, validValueSet, ['auto', '10px']) → true
 */
function isSlotOptionValid(token: string, slotIndex: number, validValueSet: Set<string>, currentTokens: string[]): boolean {
	const tokenCanonical = getTokenCanonical(token);
	if (!tokenCanonical) return false;

	// Always allow if the current value for this slot matches the candidate token
	if (currentTokens[slotIndex] === tokenCanonical) return true;

	// Replace only the relevant slot and check validity
	const testTokens = currentTokens.slice();
	testTokens[slotIndex] = tokenCanonical;
	const testString = testTokens.join(' ').trim();

	return validValueSet.has(testString);
}

/**
 * Builds a 2D options table for slot-based value editors.
 * Each slot (column) contains only the valid options for the current context.
 * Optimized to use a Set for valid value strings.
 *
 * @param syntaxNormalized - All valid variations, normalized and joined as strings
 * @param slotTokenSets - Array of arrays, each containing all possible tokens for that slot
 * @param values - The current value tokens for all slots (user input, not yet canonicalized)
 * @returns 2D array of InputOptionData for each slot
 */
function createOptionsTable(syntaxNormalized: Set<string>, syntaxSet: Set<string>[], values: string[]): InputOptionData[][] {
	// Normalize the current values to canonical tokens
	const valueTokens = getValueTokens(values);

	// Build the options table for each slot
	return syntaxSet.map((tokenSet, setIndex) => {
		if (!tokenSet || tokenSet.size === 0) return [];

		// Use flatMap for concise option flattening
		return [...tokenSet].flatMap((token) => {
			const tokenCanonical = getTokenCanonical(token);
			if (!tokenCanonical) return [];

			// If the token matches the current value for this slot, or is a valid option
			// for this slot in the context of the current values, create the option
			if (isSlotOptionValid(token, setIndex, syntaxNormalized, valueTokens)) {
				const option = createOption(token);
				return Array.isArray(option) ? option : option ? [option] : [];
			}
			return [];
		});
	});
}

export { createOptionsTable };
