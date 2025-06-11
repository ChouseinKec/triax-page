// Constants
import { CSSUnitOptions } from '@/constants/style/units';
import { ValueSeparators, DimensionGroups } from '@/constants/style/value';

// Utilities
import { splitTopLevel } from '@/utilities/string/string';
import { countSubArrayLength } from '@/utilities/array/array';
import { getTokenType, getTokenParam, getTokenCanonical } from '@/utilities/style/token';
import { getTokenBase } from '@/utilities/style/token';

// Types
import type { InputOptionData, NumberOptionData, KeywordOptionData, FunctionOptionData, DimensionOptionData } from '@/types/option';
import type { CSSDimensionGroups } from '@/types/style/dimension';

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

	// Create and return the FunctionOptionData object
	return {
		name: canonicalName,
		value: `${baseName}(0px)`,
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
 * Creates a table of slot options based on the provided variations.
 * Each column corresponds to a slot, and each row contains unique options for that slot.
 *
 * @param variations - Array of CSS property value variations (e.g., ['<length>', 'auto', 'fit-content(<length> <percentage>)'])
 * @returns InputOptionData[][] - A 2D array where each sub-array contains options for a specific slot.
 * @example
 * createOptionsTable(['<length>', 'auto', 'fit-content(<length>)'])
 * → [
 *   [{ name: 'px', value: '0px', type: 'length', min: 0, max: 100 }, ...],
 *   [{ name: 'auto', value: 'auto', category: 'keyword' }],
 *   [{ name: 'fit-content(<length>)', value: 'fit-content(0px)', syntax: '<length>', category: 'function' }]
 * ]
 */
function createOptionsTable(variations: string[]): InputOptionData[][] {
	// Determine the maximum number of slots (columns) across all variations
	const maxSlots = countSubArrayLength(variations, [...ValueSeparators]);
	// For each slot, track unique slot tokens to avoid duplicates
	const slotSets: Array<Set<string>> = Array.from({ length: maxSlots }, () => new Set<string>());
	// For each slot, collect OptionData objects
	const slotOptions: InputOptionData[][] = Array.from({ length: maxSlots }, () => []);

	// Iterate over each variation string
	for (const variation of variations) {
		// Split the variation into slot tokens (e.g., ['<length>', 'auto'])
		const slotTokens = splitTopLevel(variation, [...ValueSeparators]);

		// For each slot, determine its index and add to the corresponding slotSets and slotOptions
		for (let i = 0; i < slotTokens.length; i++) {
			const slotToken = slotTokens[i].trim();

			// Skip empty slots or duplicates for this column
			if (!slotToken || slotSets[i].has(slotToken)) continue;
			slotSets[i].add(slotToken);

			const tokenType = getTokenType(slotToken);

			switch (tokenType) {
				case 'function': {
					const functionOption = createFunctionOption(slotToken);
					if (functionOption) {
						slotOptions[i].push(functionOption);
					}
					break;
				}

				case 'dimension': {
					const dimensionOptions = createDimensionOptions(slotToken);
					if (dimensionOptions) {
						slotOptions[i].push(...dimensionOptions);
					}
					break;
				}

				case 'keyword': {
					const keywordOption = createKeywordOption(slotToken);
					if (keywordOption) {
						slotOptions[i].push(keywordOption);
					}
					break;
				}

				case 'number': {
					const numberOption = createNumberOption(slotToken);
					if (numberOption) {
						slotOptions[i].push(numberOption);
					}
					break;
				}
			}
		}
	}
	return slotOptions;
}

export { createOptionsTable };
