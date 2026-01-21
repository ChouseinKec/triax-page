// Types
import type { StyleSyntaxRaw, StyleSyntaxParsed } from '@/core/block/style/types/';

// Utilities
import { hasDoubleBar, hasDoubleAmp, hasSingleBar, hasComma, hasSequence, parseDoubleBar, parseDoubleAmp, parseSingleBar, parseComma, parseSequence } from './combinator';
import { hasMultiplier, parseMultiplier } from './multiplier';
import { hasBrackets, parseBrackets, hasBracketsMultiplier, parseBracketsMultiplier } from './bracket';

export const MAX_MULTIPLIER_DEPTH = 2; // Default max depth for multipliers

/**
 * Normalizes a CSS Value Definition Syntax string for internal parsing.
 *
 * - Ensures '||' has a space before and after.
 * - Ensures '&&' has no spaces before or after.
 * - Ensures '|' has no space before or after.
 * - Ensures '*', '+', '?' have no space before them.
 * @param syntax - The syntax string
 */
export function normalizeSyntax(syntax: string): string {
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
 */
export function parseSyntax(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	const normalizedSyntax = normalizeSyntax(syntax.trim());

	let results: StyleSyntaxParsed = [];

	// Handle comma-separated list (lowest precedence)
	if (hasComma(normalizedSyntax)) {
		results = parseComma(normalizedSyntax);
	}
	// Handle '||' (double bar) first (lowest precedence)
	else if (hasDoubleBar(normalizedSyntax)) {
		results = parseDoubleBar(normalizedSyntax);
	}
	// Handle '&&' (double ampersand)
	else if (hasDoubleAmp(normalizedSyntax)) {
		results = parseDoubleAmp(normalizedSyntax);
	}
	// Handle space-separated sequence
	else if (hasSequence(normalizedSyntax)) {
		results = parseSequence(normalizedSyntax);
	}
	// Handle '|' (single bar)
	else if (hasSingleBar(normalizedSyntax)) {
		results = parseSingleBar(normalizedSyntax);
	}
	// Handle '[]' (optional group)
	else if (hasBrackets(normalizedSyntax)) {
		results = parseBrackets(normalizedSyntax);
	}
	// Handle optional group in brackets or brackets with multipliers
	else if (hasBracketsMultiplier(normalizedSyntax)) {
		results = parseBracketsMultiplier(normalizedSyntax);
	}
	// Handle multipliers (?, +, *, {m,n})
	else if (hasMultiplier(normalizedSyntax)) {
		results = parseMultiplier(normalizedSyntax);
	}
	// Base case: atomic value
	else {
		results = [normalizedSyntax];
	}

	// Remove duplicates and sort by length
	return Array.from(new Set(results)).sort((a, b) => a.length - b.length);
}
