// Type
import type { TokenRaw, TokenTypeKey, TokenParam, TokenBase, TokenCanonical, TokenTypeDefinitionRecord, TokenDefinitionRecord } from '@/src/core/block/style/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Extracts the canonical type string from a CSS data type string.
 * E.g., 'fit-content(10px)' -> 'fit-content()'
 * @param input - The CSS data type string (e.g., 'fit-content(10px)', '<length [0,10]>').
 */
export function getTokenCanonical(tokenRaw: TokenRaw, tokenTypeDefinitions: TokenTypeDefinitionRecord): TokenCanonical | undefined {
	// Check each registered token type to see if it matches
	for (const typeDef of Object.values(tokenTypeDefinitions)) {
		const canonical = typeDef.getTokenCanonical(tokenRaw);

		if (canonical) return canonical;
	}

	// Generic regex check for tokens with ranges, e.g., '<integer [100,50]>' -> '<integer>'
	const match = tokenRaw.match(/^<([^>\s]+)(?:\s+\[[^\]]+\])?>$/);
	if (match) return `<${match[1]}>`;

	return devLog.warn('Unrecognized token format for canonical extraction:', tokenRaw), undefined;
}

/**
 * Extracts the base token from a CSS data type string, removing any range or step part.
 * E.g., 'fit-content(10px)' -> 'fit-content'
 * @param input - The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
 *
 */
export function getTokenBase(tokenRaw: TokenRaw, tokenTypeDefinitions: TokenTypeDefinitionRecord): TokenBase | undefined {
	const canonical = getTokenCanonical(tokenRaw, tokenTypeDefinitions);
	// if (!canonical) return devLog.warn('Unrecognized token format for base extraction:', tokenRaw), undefined;
	if (!canonical) return undefined;

	return canonical
		.replace(/<|>/g, '') // Remove < and >
		.replace(/\(\)/g, ''); // Remove ()
}

/**
 * Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.
 * @param input - The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
 *
 */
export function getTokenParam(tokenRaw: TokenRaw, tokenTypeDefinitions: TokenTypeDefinitionRecord): TokenParam | undefined {
	const tokenType = getTokenType(tokenRaw, tokenTypeDefinitions);
	if (!tokenType) return undefined;

	const getParamFn = tokenTypeDefinitions[tokenType]?.getTokenParam;
	if (!getParamFn) return undefined;

	return getParamFn(tokenRaw);
}

/**
 * Determines the group of a CSS data token based on its format.
 * @param input - The CSS data token string (e.g., 'auto', '<length>', 'fit-content(10px)', '10').
 */
export function getTokenType(tokenRaw: TokenRaw, tokenTypeDefinitions: TokenTypeDefinitionRecord): TokenTypeKey | undefined {
	// Extract the canonical form of the token
	const canonical = getTokenCanonical(tokenRaw, tokenTypeDefinitions);
	if (!canonical) return devLog.warn('No canonical form found for token:', tokenRaw), undefined;

	// Check each registered token type to see if it matches
	for (const typeDef of Object.values(tokenTypeDefinitions)) {
		// Use the type definition's getTokenType function to check for a match
		if (typeDef.getTokenType(canonical)) return typeDef.key;
	}

	return tokenRaw;
}

/**
 * Converts a single token (e.g., <length>, <color>) to its default value.
 * @param token - The token string (without brackets or with brackets)
 */
export function getTokenValue(tokenRaw: TokenRaw, tokenDefinitions: TokenDefinitionRecord, tokenTypeDefinitions: TokenTypeDefinitionRecord): string | undefined {
	const tokenCanonical = getTokenCanonical(tokenRaw, tokenTypeDefinitions);
	if (!tokenCanonical) return devLog.warn('No canonical form found for token:', tokenRaw), undefined;

	const tokenDefinition = tokenDefinitions[tokenCanonical];
	return tokenDefinition ? tokenDefinition.default : tokenCanonical;
}

/**
 * Converts an array of tokens to their default values.
 * @param tokens - An array of token strings (e.g., ['<length>', '<color>', '<angle>'])
 */
export function getTokenValues(tokens: string[], tokenDefinitions: TokenDefinitionRecord, tokenTypeDefinitions: TokenTypeDefinitionRecord): string[] {
	return tokens.map((token) => getTokenValue(token, tokenDefinitions, tokenTypeDefinitions)).filter((token): token is string => token !== undefined);
}

/**
 * Recursively expands all <token> references in a CSS syntax string using TOKEN_DEFINITIONS.
 * If a token is not found, it is left as-is.
 * @param syntax - The CSS property syntax string (e.g. 'auto || <ratio>')
 * @param seen - (internal) Set of already expanded tokens to prevent infinite recursion
 */
export function expandTokens(syntax: string, tokenDefinitions: TokenDefinitionRecord, tokenTypeDefinitions: TokenTypeDefinitionRecord, seen = new Set<string>()): string {
	// Start with the input syntax string
	let result = syntax;
	// Find all <...> tokens in the string (e.g., <length>, <color>, etc.)
	const tokens = result.match(/<[^>]+>/g);

	// Iterate over each matched token
	for (const token of tokens || []) {
		// console.log(token);

		// Extract the base type from the token (e.g., 'length' from '<length>')
		const tokenBase = getTokenBase(token, tokenTypeDefinitions);
		if (!tokenBase) continue; // Skip if no base type

		// Get the canonical form of the token (e.g., '<length>')
		const tokenCanonical = getTokenCanonical(token, tokenTypeDefinitions);
		if (!tokenCanonical) continue; // Skip if no canonical form
		if (seen.has(tokenCanonical)) continue; // Prevent infinite recursion (circular references)

		// Extract any range parameter from the token (e.g., '[0,10]')
		const tokenParam = getTokenParam(token, tokenTypeDefinitions);
		const range = tokenParam?.range;

		// Look up the token definition in the registered tokens
		const def = tokenDefinitions[tokenCanonical];
		if (!def) continue;

		// Mark this token as seen to prevent recursion
		seen.add(tokenCanonical);
		
		// Recursively expand the definition's syntax
		let expanded = expandTokens(def.syntax, tokenDefinitions, tokenTypeDefinitions, seen);

		// If the original token had a range, propagate it to all <...> tokens in the expanded string
		if (range) expanded = expanded.replace(/<([^>]+)>/g, `<$1 ${range}>`);
		// Replace the token in the result string with its expanded form
		result = result.replace(token, expanded);

		// Remove from seen set after expansion
		seen.delete(tokenCanonical);
	}
	// Return the fully expanded syntax string
	return result;
}
