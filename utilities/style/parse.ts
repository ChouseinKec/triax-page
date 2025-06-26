// Constants
import { CSSTokenDefs } from '@/constants/style/token';

// Types
import { CSSTokens } from '@/types/style/token';

// Utilities
import { getTokenBase, getTokenCanonical, getTokenRange } from '@/utilities/style/token';

import { hasDoubleBar, hasDoubleAmp, hasSingleBar, hasComma, hasSequence, parseDoubleBar, parseDoubleAmp, parseSingleBar, parseComma, parseSequence } from './parse-combinator';
import { hasMultiplier, parseMultiplier, parseMultiplierWithGroup } from './parse-multiplier';
import { hasBrackets, parseBrackets, hasBracketsGroup } from './parse-bracket';

export const MAX_MULTIPLIER_DEPTH = 2; // Default max depth for multipliers

/**
 * Recursively expands all <token> references in a CSS syntax string using CSSTokenDefs.
 * If a token is not found, it is left as-is.
 * @param syntax - The CSS property syntax string (e.g. 'auto || <ratio>')
 * @param seen - (internal) Set of already expanded tokens to prevent infinite recursion
 * @returns The syntax string with all known tokens recursively expanded
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
 */
function normalizeSyntax(input: string): string {
	// Normalize '||' to have spaces before and after
	input = input.replace(/\s*\|\|\s*/g, ' || ');

	// Normalize '&&' to have no spaces before or after
	input = input.replace(/\s*&&\s*/g, '&&');

	// Normalize '|' to have no spaces before or after (but not '||')
	// Use negative lookbehind and lookahead to avoid '||'
	input = input.replace(/(?<!\|)\s*\|\s*(?!\|)/g, '|');

	// Remove spaces before *, +, ?
	input = input.replace(/\s+([*+?])/g, '$1');

	// Remove multiple spaces
	input = input.replace(/\s{2,}/g, ' ');

	return input.trim();
}

function convertSyntax(syntax: string): string {
	// Normalize the syntax first
	syntax = normalizeSyntax(syntax);

	const valueMap: Record<string, string> = {
		'length': '0px',
		'percentage': '0%',
		'color': '#ffffff',
		'number': '0.0',
		'integer': '0',
		'flex': '1fr',
		'ratio': '1/1',
		'link': '"https://example.com/image.png"',
	};

	// Replace all <token ...> with their default values, ignoring ranges/constraints
	return syntax.replace(/<([a-zA-Z0-9_-]+)(?:\s*\[[^\]]*\])?>/g, (_, token) => {
		return valueMap[token] ?? `<${token}>`;
	});
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
	if (hasBracketsGroup(normalizedSyntax)) {
		return parseMultiplierWithGroup(normalizedSyntax);
	}

	// Handle multipliers (?, +, *, {m,n})
	if (hasMultiplier(normalizedSyntax)) {
		return parseMultiplier(normalizedSyntax).sort((a, b) => a.length - b.length);
	}

	// Base case: atomic value
	return [normalizedSyntax];
}

function test() {
	// const syntax = "100|200|300";
	// console.log(isValueColor(syntax));
	// const syntax = '<integer [1,∞]>,[<length [0,∞]>|<percentage [0,∞]>|<flex [0,∞]>|min-content|max-content|auto|minmax(<length [0,∞]>|<percentage [0,∞]>|min-content|max-content|auto,<length [0,∞]>|<percentage [0,∞]>|<flex [0,∞]>|min-content|max-content|auto)|fit-content(<length [0,∞]>|<percentage [0,∞]>)]+';
	// const parsed = parse(syntax);
	// console.log(parsed);
}

// Export all functions and types
export { convertSyntax, test, normalizeSyntax, expandTokens, parseDoubleBar, parseDoubleAmp, parseSingleBar, parseBrackets, parse, hasDoubleBar, hasDoubleAmp, hasSingleBar, hasSequence };
