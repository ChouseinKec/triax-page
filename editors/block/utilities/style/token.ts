// Type
import type { TokenTypes, TokenKeys } from '@/editors/block/types/core/style/token';

// Constants
import { TokenDefaults, TokenDefinitions } from '@/constants/style/token';

// Utilities
import { extractBetween } from '@/utilities/string';

/**
 * Checks if the input string is a valid CSS data keyword (e.g., 'auto', 'fit-content').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data keyword, false otherwise.
 * @example
 * isTokenKeyword('auto') → true
 * isTokenKeyword('fit-content') → true
 * isTokenKeyword('10px') → false
 */
export function isTokenKeyword(input: string): boolean {
	const canonical = getTokenCanonical(input);
	if (!canonical) return false;
	return /^[a-zA-Z-]+$/.test(canonical);
}

/**
 * Checks if a value is a CSS dimension (e.g., <length>, <percentage>).
 * @param input - The string to check.
 * @returns True if the input is a valid dimension format, false otherwise.
 * @example
 * isTokenDimension('<length>') → true
 * isTokenDimension('<percentage>') → true
 * isTokenDimension('10px') → false
 * isTokenDimension('fit-content(10px)') → false
 */
export function isTokenDimension(input: string): boolean {
	const canonical = getTokenCanonical(input);
	if (!canonical) return false;

	if (['<length>', '<percentage>', '<angle>', '<flex>'].includes(canonical)) return true;

	return false;
}

/**
 * Checks if the input string is a valid CSS data integer (e.g., '<integer>').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data integer, false otherwise.
 * @example
 * isTokenInteger('<integer>') → true
 * isTokenInteger('<number>') → false
 */
export function isTokenInteger(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<integer>';
}

/**
 * Checks if the input string is a valid CSS data number (e.g., '<number>').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data number, false otherwise.
 * @example
 * isTokenNumber('<number>') → true
 * isTokenNumber('<integer>') → false
 */
export function isTokenNumber(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<number>';
}

/**
 * Checks if the input string is a valid CSS data function (e.g., 'fit-content(10px)', 'calc(100% - 20px)').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data function, false otherwise.
 * @example
 * isTokenFunction('fit-content(10px)') → true
 * isTokenFunction('calc(100% - 20px)') → true
 * isTokenFunction('10px') → false
 */
export function isTokenFunction(input: string): boolean {
	const canonical = getTokenCanonical(input);
	if (!canonical) return false;

	// Check if the input is a function format
	return /^([a-zA-Z0-9-]+)\((.*)\)$/.test(canonical);
}

/**
 * Checks if the input string is a valid CSS data color (e.g., '<color>').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data color, false otherwise.
 * @example
 * isTokenColor('<color>') → true
 * isTokenColor('rgb(255, 0, 0)') → false
 */
export function isTokenColor(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<color>';
}

/**
 * Checks if the input string is a valid CSS data link (e.g., '<link>').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data link, false otherwise.
 * @example
 * isTokenLink('<link>') → true
 * isTokenLink('https://example.com/image.png') → false
 */
export function isTokenLink(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<link>';
}

/**
 * Determines the group of a CSS data token based on its format.
 * @param input - The CSS data token string (e.g., 'auto', '<length>', 'fit-content(10px)', '10').
 * @returns The group of the token as a string ('keyword', 'dimension', 'function', 'integer', 'number') or undefined if not recognized.
 * @example
 * getTokenType('auto') → 'keyword'
 * getTokenType('<length>') → 'dimension'
 * getTokenType('fit-content(10px)') → 'function'
 * getTokenType('<integer>') → 'integer'
 * getTokenType('<number>') → 'number'
 * getTokenType('<link>') → 'link'
 */
export function getTokenType(input: string): TokenTypes | undefined {
	if (isTokenKeyword(input)) return 'keyword';
	if (isTokenDimension(input)) return 'dimension';
	if (isTokenColor(input)) return 'color';
	if (isTokenFunction(input)) return 'function';
	if (isTokenInteger(input)) return 'integer';
	if (isTokenNumber(input)) return 'number';
	if (isTokenLink(input)) return 'link';
	return undefined;
}

/**
 * Extracts the canonical type string from a CSS data type string.
 * @param input - The CSS data type string (e.g., 'fit-content(10px)', '<length [0,10]>').
 * @returns The canonical type string (e.g., 'fit-content()', '<length>') or undefined if not recognized.
 * @example
 * getTokenCanonical('fit-content(<length> <percentage>)') → 'fit-content()'
 * getTokenCanonical('<length [0,10]>') → '<length>'
 * getTokenCanonical('auto') → 'auto'
 * getTokenCanonical('10px') → undefined
 * getTokenCanonical('10') → undefined
 */
export function getTokenCanonical(input: string): string | undefined {
	if (!input) return undefined;

	// Function: e.g. fit-content(<length [10,20]>)
	const fnMatch = input.match(/^([a-zA-Z0-9-]+)\((.*)\)$/);
	if (fnMatch) return `${fnMatch[1]}()`;

	// Dimension: e.g. <length [0,10]>
	const dimMatch = input.match(/^<([a-zA-Z0-9-]+)(\s*\[[^\]]+\])?>$/);
	if (dimMatch) return `<${dimMatch[1]}>`;

	// Keyword: e.g. auto
	if (/^[a-zA-Z-]+$/.test(input)) return input;
	return undefined;
}

/**
 * Extracts the base token from a CSS data type string, removing any range or step part.
 * @param input - The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
 * @returns The base token string (e.g., 'length', 'fit-content') or undefined if not recognized.
 * @example
 * getTokenBase('<length [0,10]>') → 'length'
 * getTokenBase('fit-content(<length> <percentage>)') → 'fit-content'
 * getTokenBase('auto') → 'auto'
 *
 */
export function getTokenBase(input: string): string | undefined {
	const canonical = getTokenCanonical(input);
	if (!canonical) return undefined;

	return canonical
		.replace(/<|>/g, '') // Remove < and >
		.replace(/\(\)/g, ''); // Remove ()
}

/**
 * Extracts the range part from a CSS data type string, if present.
 * @param input - The CSS data type string (e.g., '<length [0,10]>').
 * @returns The range string (e.g., '[0,10]') or undefined if not present.
 * @example
 * getTokenRange('<length [0,10]>') → '[0,10]'
 * getTokenRange('fit-content(<length> <percentage>)') → undefined
 */
export function getTokenRange(input: string): string | undefined {
	const range = extractBetween(input, '[]');
	return range ? `[${range}]` : undefined;
}

/**
 * Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.
 * @param input - The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
 * @returns An object with the extracted arguments (e.g., { min: '0', max: '10', step: '1' } or { args: '<length> <percentage>' }) or undefined if not recognized.
 * @example
 * getTokenParam('<length [0,10]>') → { min: 0, max: 10 }
 * getTokenParam('fit-content(<length> <percentage>)') → { syntax: '<length> <percentage>' }
 * getTokenParam('<number [0,15]>') → { min: 0, max: 15 }
 *
 */
export function getTokenParam(input: string): Record<string, any> | undefined {
	const group = getTokenType(input);

	switch (group) {
		case 'function': {
			const param = extractBetween(input, '()');
			return param ? { syntax: param } : undefined;
		}
		case 'dimension':
		case 'number':
		case 'integer': {
			// Extract range/step from dimension or number tokens
			const range = getTokenRange(input);
			if (range) {
				const rangeValues = range.replace(/[\[\]]/g, '').split(',');
				if (rangeValues.length === 2) {
					return { min: parseFloat(rangeValues[0]), max: parseFloat(rangeValues[1]) };
				}
			}
			return undefined;
		}
		default:
			return undefined;
	}
}

/**
 * Converts a single token (e.g., <length>, <color>) to its default value.
 * @param token - The token string (without brackets or with brackets)
 * @returns The default value for the token, or the token itself if not found
 * @example
 * getTokenValue('<length>') → '0px'
 * getTokenValue('<color>') → '#ffffff'
 * getTokenValue('<angle>') → '0deg'
 * getTokenValue('<percentage>') → '0%'
 * getTokenValue('<number>') → '0.0'
 */
export function getTokenValue(token: string): string | undefined {
	if (isTokenKeyword(token)) return token;

	const tokenCanonical = getTokenCanonical(token) as TokenKeys | undefined;
	if (!tokenCanonical) return undefined;

	const tokenValue = TokenDefaults[tokenCanonical];
	return tokenValue ? tokenValue : undefined;
}

/**
 * Converts an array of tokens to their default values.
 * @param tokens - An array of token strings (e.g., ['<length>', '<color>', '<angle>'])
 * @returns An array of default values for the tokens, filtering out any undefined values
 * @example
 * getTokenValues(['<length>', '<color>', '<angle>']) → ['0px', '#ffffff', '0deg']
 */
export function getTokenValues(tokens: string[]): string[] {
	return tokens.map(getTokenValue).filter((token): token is string => token !== undefined);
}

/**
 * Recursively expands all <token> references in a CSS syntax string using TokenDefinitions.
 * If a token is not found, it is left as-is.
 * @param syntax - The CSS property syntax string (e.g. 'auto || <ratio>')
 * @param seen - (internal) Set of already expanded tokens to prevent infinite recursion
 * @returns The syntax string with all known tokens recursively expanded
 * @example
 * expandTokens('auto || <ratio>') → 'auto || <number> / <number>'
 */
export function expandTokens(syntax: string, seen = new Set<string>()): string {
	// Start with the input syntax string
	let result = syntax;
	// Find all <...> tokens in the string (e.g., <length>, <color>, etc.)
	const tokens = result.match(/<[^>]+>/g);

	// Iterate over each matched token
	for (const token of tokens || []) {
		// Extract the base type from the token (e.g., 'length' from '<length>')
		const tokenBase = getTokenBase(token);
		if (!tokenBase) continue; // Skip if no base type

		// Get the canonical form of the token (e.g., '<length>')
		const tokenCanonical = getTokenCanonical(token);
		if (!tokenCanonical) continue; // Skip if no canonical form
		if (seen.has(tokenCanonical)) continue; // Prevent infinite recursion (circular references)

		// Extract range/constraint (e.g., [0,100]) if present
		const range = getTokenRange(token);

		// Look up the token definition in TokenDefinitions
		const def = TokenDefinitions[tokenCanonical as TokenKeys];

		if (def?.syntax) {
			// Mark this token as seen to prevent recursion
			seen.add(tokenCanonical);
			// Recursively expand the definition's syntax
			let expanded = expandTokens(def.syntax, seen);

			// If the original token had a range, propagate it to all <...> tokens in the expanded string
			if (range) expanded = expanded.replace(/<([^>]+)>/g, `<$1 ${range}>`);
			// Replace the token in the result string with its expanded form
			result = result.replace(token, expanded);

			// Remove from seen set after expansion
			seen.delete(tokenCanonical);
		}
	}
	// Return the fully expanded syntax string
	return result;
}

export default {
	is: {
		keyword: isTokenKeyword,
		dimension: isTokenDimension,
		integer: isTokenInteger,
		number: isTokenNumber,
		function: isTokenFunction,
		color: isTokenColor,
		link: isTokenLink,
	},

	get: {
		type: getTokenType,
		canonical: getTokenCanonical,
		base: getTokenBase,
		range: getTokenRange,
		param: getTokenParam,
		value: getTokenValue,
		values: getTokenValues,
	},
	expand: {
		tokens: expandTokens,
	},
} as const;
