// Constants
import { CSSTokenDefs } from '@/constants/style/token';

// Types
import type { CSSTokens } from '@/types/style/token';

// Utilities
import { getTokenBase, getTokenCanonical, getTokenRange } from '@/utilities/style/token';

import { hasDoubleBar, hasDoubleAmp, hasSingleBar, hasComma, hasSequence, parseDoubleBar, parseDoubleAmp, parseSingleBar, parseComma, parseSequence } from './parse-combinator';
import { hasMultiplier, parseMultiplier } from './parse-multiplier';
import { hasBrackets, parseBrackets, hasBracketsMultiplier, parseBracketsMultiplier } from './parse-bracket';

export const MAX_MULTIPLIER_DEPTH = 2; // Default max depth for multipliers

/**
 * Recursively expands all <token> references in a CSS syntax string using CSSTokenDefs.
 * If a token is not found, it is left as-is.
 * @param syntax - The CSS property syntax string (e.g. 'auto || <ratio>')
 * @param seen - (internal) Set of already expanded tokens to prevent infinite recursion
 * @returns The syntax string with all known tokens recursively expanded
 * @example
 * expandTokens('auto || <ratio>') → 'auto || <number> / <number>'
 */
function expandTokens(syntax: string, seen = new Set<string>()): string {
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

		// Look up the token definition in CSSTokenDefs
		const def = CSSTokenDefs[tokenCanonical as CSSTokens];
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

/**
 * Normalizes a CSS Value Definition Syntax string:
 * - Ensures '||' has a space before and after.
 * - Ensures '&&' has no spaces before or after.
 * - Ensures '|' has no space before or after.
 * - Ensures '*', '+', '?' have no space before them.
 * @param s - The syntax string
 * @returns The normalized syntax string
 * @example
 * normalizeSyntax('a || b && c') → 'a || b&&c'
 */
function normalizeSyntax(syntax: string): string {
	// Normalize '||' to have spaces before and after
	syntax = syntax.replace(/\s*\|\|\s*/g, ' || ');

	// Normalize '&&' to have no spaces before or after
	syntax = syntax.replace(/\s*&&\s*/g, '&&');

	// Normalize '|' to have no spaces before or after (but not '||')
	// Use negative lookbehind and lookahead to avoid '||'
	syntax = syntax.replace(/(?<!\|)\s*\|\s*(?!\|)/g, '|');

	// Remove spaces before *, +, ?
	syntax = syntax.replace(/\s+([*+?])/g, '$1');

	// Remove multiple spaces
	syntax = syntax.replace(/\s{2,}/g, ' ');

	return syntax.trim();
}

/**
 * Main parser for CSS Value Definition Syntax.
 * Recursively parses the syntax string, handling combinators in precedence order.
 * @param syntax - The syntax string
 * @returns All possible combinations as strings
 * @example parse('a || b && c') → ['a', 'b c', 'c b', 'a b c', 'a c b', 'b c a', 'c b a']
 */
function parse(syntax: string): string[] {
	const normalizedSyntax = normalizeSyntax(syntax.trim());
	// Handle comma-separated list (lowest precedence)
	if (hasComma(normalizedSyntax)) {
		return parseComma(normalizedSyntax);
	}

	// Handle '||' (double bar) first (lowest precedence)
	if (hasDoubleBar(normalizedSyntax)) {
		return parseDoubleBar(normalizedSyntax);
	}

	// Handle '&&' (double ampersand)
	if (hasDoubleAmp(normalizedSyntax)) {
		return parseDoubleAmp(normalizedSyntax);
	}

	// Handle '|' (single bar)
	if (hasSingleBar(normalizedSyntax)) {
		return parseSingleBar(normalizedSyntax);
	}

	// Handle space-separated sequence
	if (hasSequence(normalizedSyntax)) {
		return parseSequence(normalizedSyntax);
	}

	// Handle '[]' (optional group)
	if (hasBrackets(normalizedSyntax)) {
		return parseBrackets(normalizedSyntax);
	}

	// Handle optional group in brackets or brackets with multipliers
	if (hasBracketsMultiplier(normalizedSyntax)) {
		return parseBracketsMultiplier(normalizedSyntax);
	}

	// Handle multipliers (?, +, *, {m,n})
	if (hasMultiplier(normalizedSyntax)) {
		return parseMultiplier(normalizedSyntax).sort((a, b) => a.length - b.length);
	}

	// Base case: atomic value
	return [normalizedSyntax];
}

function test() {
	// const syntax = '[<color>? && (<length> <length>)]#';
	// console.log(parse(syntax));
	// const syntax = '<integer [1,∞]>,[<length [0,∞]>|<percentage [0,∞]>|<flex [0,∞]>|min-content|max-content|auto|minmax(<length [0,∞]>|<percentage [0,∞]>|min-content|max-content|auto,<length [0,∞]>|<percentage [0,∞]>|<flex [0,∞]>|min-content|max-content|auto)|fit-content(<length [0,∞]>|<percentage [0,∞]>)]+';
	// const parsed = parse(syntax);
	// console.log(parsed);
}

// Export all functions and types
export { test, normalizeSyntax, expandTokens, parse };
