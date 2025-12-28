// Type
import type { TokenType, TokenParam, TokenBase, TokenCanonical, TokenTypeDefinitionRecord, TokenDefinitionRecord } from '@/src/core/block/style/types';

// Utilities
import { extractBetween } from '@/src/shared/utilities/string';

/**
 * Extracts the canonical type string from a CSS data type string.
 * E.g., 'fit-content(10px)' -> 'fit-content()'
 * @param input - The CSS data type string (e.g., 'fit-content(10px)', '<length [0,10]>').
 */
export function getTokenCanonical(input: string): TokenCanonical | undefined {
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
 * E.g., 'fit-content(10px)' -> 'fit-content'
 * @param input - The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
 *
 */
export function getTokenBase(input: string): TokenBase | undefined {
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
export function getTokenParam(input: string, registeredTokenTypes: TokenTypeDefinitionRecord): TokenParam | undefined {
	const tokenType = getTokenType(input, registeredTokenTypes);
	if (!tokenType) return undefined;

	const getParamFn = registeredTokenTypes[tokenType].getTokenParam;
	if (!getParamFn) return undefined;

	return getParamFn(input);
}

/**
 * Determines the group of a CSS data token based on its format.
 * @param input - The CSS data token string (e.g., 'auto', '<length>', 'fit-content(10px)', '10').
 */
export function getTokenType(input: string, registeredTokenTypes: TokenTypeDefinitionRecord): TokenType | undefined {
	// Extract the canonical form of the token
	const canonical = getTokenCanonical(input);
	if (!canonical) return undefined;

	// Check each registered token type to see if it matches
	for (const typeDef of Object.values(registeredTokenTypes)) {
		// Use the type definition's getTokenType function to check for a match
		if (typeDef.getTokenType(canonical)) return typeDef.key;
	}

	// No matching token type found
	return undefined;
}

/**
 * Converts a single token (e.g., <length>, <color>) to its default value.
 * @param token - The token string (without brackets or with brackets)
 */
export function getTokenValue(token: string, registeredTokens: TokenDefinitionRecord): string | undefined {
	const tokenCanonical = getTokenCanonical(token);
	if (!tokenCanonical) return undefined;

	const tokenDefinition = registeredTokens[tokenCanonical];
	return tokenDefinition ? tokenDefinition.default : tokenCanonical;
}

/**
 * Converts an array of tokens to their default values.
 * @param tokens - An array of token strings (e.g., ['<length>', '<color>', '<angle>'])
 */
export function getTokenValues(tokens: string[], registeredTokens: TokenDefinitionRecord): string[] {
	return tokens.map((token) => getTokenValue(token, registeredTokens)).filter((token): token is string => token !== undefined);
}

/**
 * Recursively expands all <token> references in a CSS syntax string using TOKEN_DEFINITIONS.
 * If a token is not found, it is left as-is.
 * @param syntax - The CSS property syntax string (e.g. 'auto || <ratio>')
 * @param seen - (internal) Set of already expanded tokens to prevent infinite recursion
 */
export function expandTokens(syntax: string, registeredTokens: TokenDefinitionRecord, seen = new Set<string>()): string {
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

		// Look up the token definition in the registered tokens
		const def = registeredTokens[tokenCanonical];

		if (def?.syntax) {
			// Mark this token as seen to prevent recursion
			seen.add(tokenCanonical);
			// Recursively expand the definition's syntax
			let expanded = expandTokens(def.syntax, registeredTokens, seen);

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
