// Constants
import { DEFAULT_VALUE_FUNCTIONS, UNIT_OPTIONS, STYLE_ICON_DEFINITIONS, CSSIcons } from '@/src/page/core/block/style/constants';

// Utilities
import { getTokenType, getTokenParam, getTokenCanonical, getTokenBase, getValueTokens } from '@/src/page/core/block/style/utilities';

// Types
import type { StyleOptionDefinition, OptionGenericDefinition, OptionKeywordDefinition, OptionFunctionDefinition, OptionDimensionDefinition } from '@/src/page/core/block/style/types';
import type { UnitTypes } from '@/src/page/core/block/style/types';

/**
 * Creates a OptionFunctionDefinition object for a given function token.
 *
 * @param token - The function token string (e.g., 'calc(<length>|<percentage>)')
 * @returns OptionFunctionDefinition | undefined - The created function option or undefined if invalid.
 * @example
 * createFunctionOption('calc(<length>|<percentage>)') → { name: 'calc()', value: 'calc(0px)', syntax: '<length>|<percentage>', category: 'function', type: 'function' }
 */
export function createFunctionOption(token: string): OptionFunctionDefinition | undefined {
	// Check if the token is empty or undefined
	if (!token) return undefined;

	// Extract the canonical name, base name, and syntax from the token
	const canonicalName = getTokenCanonical(token);
	const baseName = getTokenBase(token);
	const param = getTokenParam(token);

	// If any of these are undefined or empty, return undefined
	if (!canonicalName || !baseName || !param || param.type !== 'function') return undefined;

	const { syntax } = param;

	// Get the default function value from the constants
	const defaultValue = DEFAULT_VALUE_FUNCTIONS[baseName];

	// If no default value is defined for this function, return undefined
	if (!defaultValue) return undefined;

	// Create and return the OptionFunctionDefinition object
	return {
		name: canonicalName,
		value: defaultValue, // Use the syntax as the initial value
		syntax,
		category: 'function',
		type: 'function',
	};
}

/**
 * Creates an array of OptionDimensionDefinition objects for a given dimension token.
 *
 * @param token - The dimension token string (e.g., '<length [0,100]>')
 * @returns OptionDimensionDefinition[] | undefined - An array of dimension options or undefined if invalid.
 * @example
 * createDimensionOptions('<length [0,100]>') → [{ name: 'px', value: '0px', type: 'length', min: 0, max: 100 }, ...]
 */
export function createDimensionOptions(token: string): OptionDimensionDefinition[] | undefined {
	// Check if the token is empty or undefined
	if (!token) return undefined;

	// Get the base name of the token and check if it's a valid dimension group
	const baseName = getTokenBase(token) as UnitTypes;

	// If the base name is not a valid dimension group, return undefined
	if (!UNIT_OPTIONS[baseName]) return undefined;

	// Get the range parameters for the token, and retrieve the unit options for the base name
	const param = getTokenParam(token);
	const unitOptions = UNIT_OPTIONS[baseName] || [];

	// If no range is specified, return the unit options as is
	if (!param || param.type !== 'range') return unitOptions as OptionDimensionDefinition[];

	// Map the unit options to include the min and max range values, creating and returning OptionDimensionDefinition objects
	return unitOptions.map((unit) => ({
		...unit,
		min: param.min,
		max: param.max,
	})) as OptionDimensionDefinition[];
}

/**
 * Creates a keyword option for a given token.
 *
 * @param token - The keyword token string (e.g., 'auto')
 * @param key - The name of the CSS property being edited (for keyword options)
 * @returns OptionKeywordDefinition | undefined - The created keyword option or undefined if empty.
 * @example
 * createKeywordOption('auto') → { name: 'auto', value: 'auto', category: 'keyword', icon: <Icon />, type: 'keyword' }
 */
export function createKeywordOption(token: string, styleKey: string): OptionKeywordDefinition | undefined {
	// Check if the token is empty or undefined
	if (!token) return undefined;

	const icon = STYLE_ICON_DEFINITIONS?.[`${styleKey}-${token}` as CSSIcons];

	// Create and return the OptionKeywordDefinition object for the keyword
	return {
		name: token,
		value: token,
		category: 'keyword',
		icon,
		type: 'keyword',
	};
}

/**
 * Creates a NumberOptionData object for a given number token (e.g., '<number [0,25]>').
 *
 * @param token - The number token string (e.g., '<number [0,25]>')
 * @returns NumberOptionData | undefined - The created number option or undefined if invalid.
 * @example
 * createNumberOption('<number [0,25]>') → { name: 'number', value: '0', min: 0, max: 25, category: 'other', type: 'number' }
 */
export function createNumberOption(token: string): OptionGenericDefinition | undefined {
	if (!token) return undefined;
	const param = getTokenParam(token);

	return {
		name: 'number',
		value: '0.0',
		category: 'other',
		min: param?.type === 'range' ? param.min : undefined,
		max: param?.type === 'range' ? param.max : undefined,
		icon: STYLE_ICON_DEFINITIONS?.number,
		type: 'number',
	};
}

/**
 * Creates an IntegerOptionData object for a given integer token (e.g., '<integer [0,100]>').
 *
 * @param token - The integer token string (e.g., '<integer [0,100]>')
 * @returns NumberOptionData | undefined - The created integer option or undefined if invalid.
 * @example
 * createIntegerOption('<integer [0,100]>') → { name: 'integer', value: '0', min: 0, max: 100, category: 'other', type: 'integer' }
 */
export function createIntegerOption(token: string): OptionGenericDefinition | undefined {
	if (!token) return undefined;
	const param = getTokenParam(token);
	return {
		name: 'integer',
		value: '0',
		category: 'other',
		min: param?.type === 'range' ? param.min : undefined,
		max: param?.type === 'range' ? param.max : undefined,
		icon: STYLE_ICON_DEFINITIONS?.number,
		type: 'integer',
	};
}

/**
 * Creates a color option for a given token (e.g., 'color').
 *
 * @param token - The color token string (e.g., 'color')
 * @returns OptionGenericDefinition | undefined - The created color option or undefined if empty.
 * @example
 * createColorOption('color') → { name: 'color', value: '#000000', category: 'other', type: 'color' }
 */
export function createColorOption(token: string): OptionGenericDefinition | undefined {
	if (!token) return undefined;
	return {
		name: 'color',
		value: '#000000',
		category: 'other',
		type: 'color',
	};
}

/**
 * Creates a link option for a given token (e.g., 'link').
 *
 * @param token - The link token string (e.g., 'link')
 * @returns OptionGenericDefinition | undefined - The created link option or undefined if empty.
 * @example
 * createLinkOption('link') → { name: 'link', value: 'https://example.com', category: 'other', type: 'link' }
 */
export function createLinkOption(token: string): OptionGenericDefinition | undefined {
	if (!token) return undefined;
	return {
		name: 'link',
		value: 'https://example.com',
		category: 'other',
		type: 'link',
	};
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
export function isSlotOptionValid(token: string, slotIndex: number, validValueSet: string[], currentTokens: string[]): boolean {
	const tokenCanonical = getTokenCanonical(token);
	if (!tokenCanonical) return false;

	// Always allow if the current value for this slot matches the candidate token
	if (currentTokens[slotIndex] === tokenCanonical) return true;

	// Replace only the relevant slot and check validity
	const testTokens = currentTokens.slice();
	testTokens[slotIndex] = tokenCanonical;
	const testString = testTokens.join(' ').trim();
	const matches = validValueSet.find((value) => value.startsWith(testString));

	if (!matches) return false;
	return true;
}

/**
 * Creates an StyleOptionDefinition object (or array) for a given token, using the correct factory based on type.
 *
 * @param token - The token string (e.g., 'auto', '<number>', '<length>', 'fit-content(...)')
 * @param styleKey - The name of the CSS property being edited (for keyword options)
 * @returns StyleOptionDefinition | StyleOptionDefinition[] | undefined
 */
export function createOption(token: string, styleKey: string): StyleOptionDefinition | StyleOptionDefinition[] | undefined {
	const type = getTokenType(token);
	switch (type) {
		case 'color':
			return createColorOption(token);
		case 'keyword':
			return createKeywordOption(token, styleKey);
		case 'number':
			return createNumberOption(token);
		case 'integer':
			return createIntegerOption(token);
		case 'dimension':
			return createDimensionOptions(token);
		case 'function':
			return createFunctionOption(token);
		case 'link':
			return createLinkOption(token);
		default:
			return undefined;
	}
}

/**
 * Builds a 2D options table for slot-based value editors.
 * Each slot (column) contains only the valid options for the current context.
 * Optimized to use a Set for valid value strings.
 *
 * @param syntaxNormalized - All valid variations, normalized and joined as strings
 * @param slotTokenSets - Array of arrays, each containing all possible tokens for that slot
 * @param values - The current value tokens for all slots (user input, not yet canonicalized)
 * @param styleKey - The name of the CSS property being edited (for keyword options)
 * @returns 2D array of StyleOptionDefinition for each slot
 */
export function createOptionTable(syntaxNormalized: string[], syntaxSet: Set<string>[], values: string[], styleKey: string): StyleOptionDefinition[][] {
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
				const option = createOption(token, styleKey);
				return Array.isArray(option) ? option : option ? [option] : [];
			}
			return [];
		});
	});
}
