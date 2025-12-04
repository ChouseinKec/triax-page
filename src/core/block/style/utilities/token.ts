// Type
import type { TokenTypes, TokenKeys, TokenParam } from '@/src/core/block/style/types';

// Constants
import { TOKEN_DEFAULTS, TOKEN_DEFINITIONS } from '@/src/core/block/style/constants';

// Utilities
import { extractBetween } from '@/src/shared/utilities/string';

/**
 * Checks if the input string is a valid CSS data keyword (e.g., 'auto', 'fit-content').
 * @param input - The string to check.
 */
export function isTokenKeyword(input: string): boolean {
	const canonical = getTokenCanonical(input);
	if (!canonical) return false;
	return /^[a-zA-Z-]+$/.test(canonical);
}

/**
 * Checks if a value is a CSS dimension (e.g., <length>, <percentage>).
 * @param input - The string to check.
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
 */
export function isTokenInteger(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<integer>';
}

/**
 * Checks if the input string is a valid CSS data number (e.g., '<number>').
 * @param input - The string to check.
 */
export function isTokenNumber(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<number>';
}

/**
 * Checks if the input string is a valid CSS data function (e.g., 'fit-content(10px)', 'calc(100% - 20px)').
 * @param input - The string to check.
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
 */
export function isTokenColor(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<color>';
}

/**
 * Checks if the input string is a valid CSS data link (e.g., '<link>').
 * @param input - The string to check.
 */
export function isTokenLink(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<link>';
}

/**
 * Determines the group of a CSS data token based on its format.
 * @param input - The CSS data token string (e.g., 'auto', '<length>', 'fit-content(10px)', '10').
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
 */
export function getTokenRange(input: string): string | undefined {
	const range = extractBetween(input, '[]');
	return range ? `[${range}]` : undefined;
}

/**
 * Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.
 * @param input - The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
 *
 */
export function getTokenParam(input: string): TokenParam | undefined {
	const group = getTokenType(input);

	switch (group) {
		case 'function': {
			const param = extractBetween(input, '()');
			return param ? { type: 'function', syntax: param } : undefined;
		}
		case 'dimension':
		case 'number':
		case 'integer': {
			// Extract range/step from dimension or number tokens
			const range = getTokenRange(input);
			if (range) {
				const rangeValues = range.replace(/[\[\]]/g, '').split(',');
				if (rangeValues.length === 2) {
					return { type: 'range', min: parseFloat(rangeValues[0]), max: parseFloat(rangeValues[1]) };
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
 */
export function getTokenValue(token: string): string | undefined {
	if (isTokenKeyword(token)) return token;

	const tokenCanonical = getTokenCanonical(token) as TokenKeys | undefined;
	if (!tokenCanonical) return undefined;

	const tokenValue = TOKEN_DEFAULTS[tokenCanonical];
	return tokenValue ? tokenValue : undefined;
}

/**
 * Converts an array of tokens to their default values.
 * @param tokens - An array of token strings (e.g., ['<length>', '<color>', '<angle>'])
 */
export function getTokenValues(tokens: string[]): string[] {
	return tokens.map(getTokenValue).filter((token): token is string => token !== undefined);
}

/**
 * Recursively expands all <token> references in a CSS syntax string using TOKEN_DEFINITIONS.
 * If a token is not found, it is left as-is.
 * @param syntax - The CSS property syntax string (e.g. 'auto || <ratio>')
 * @param seen - (internal) Set of already expanded tokens to prevent infinite recursion
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

		// Look up the token definition in TOKEN_DEFINITIONS
		const def = TOKEN_DEFINITIONS[tokenCanonical as TokenKeys];

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
