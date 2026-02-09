// Types
import type { StyleSyntaxRaw, StyleSyntaxParsed } from '@/core/block/style/types/';

// Utilities
import { hasBrackets, parseBrackets, hasDoubleBar, hasDoubleAmp, hasSingleBar, hasComma, hasSequence, parseDoubleBar, parseDoubleAmp, parseSingleBar, parseComma, parseSequence } from './combinator';
import { hasMultiplier, parseMultiplier } from './multiplier';

export const MAX_MULTIPLIER_DEPTH = 2; // Default max depth for multipliers

// Memoization cache for parseSyntax to avoid redundant recursive parsing
const parseSyntaxCache = new Map<string, StyleSyntaxParsed>();

// Pre-compiled regex patterns (compiled once, reused for performance)
const SINGLE_BAR_REGEX = /(?<!\|)\s*\|\s*(?!\|)/g;
const MULTIPLIER_SUFFIX_REGEX = /\s+([*+?])/g;
const MULTI_SPACE_REGEX = /\s{2,}/g;

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
	const trimmed = syntax.trim();
	if (!trimmed) return '';

	// Normalize '||' to have spaces before and after
	let normalized = trimmed.replace(/\s*\|\|\s*/g, ' || ');

	// Normalize '&&' to have no spaces before or after
	normalized = normalized.replace(/\s*&&\s*/g, '&&');

	// Normalize '|' to have no spaces before or after (but not '||')
	normalized = normalized.replace(SINGLE_BAR_REGEX, '|');

	// Remove spaces before *, +, ?
	normalized = normalized.replace(MULTIPLIER_SUFFIX_REGEX, '$1');

	// Remove multiple spaces
	normalized = normalized.replace(MULTI_SPACE_REGEX, ' ');

	return normalized.trim();
}

/**
 * Main parser for CSS Value Definition Syntax.
 * Recursively parses the syntax string, handling combinators in precedence order.
 *
 * Operator Precedence (lowest to highest):
 * 1. Comma (,)
 * 2. Single Bar (|) - alternation
 * 3. Double Bar (||) - independent components
 * 4. Double Ampersand (&&) - conjunctions
 * 5. Space - sequence (highest)
 *
 * @param syntax - The syntax string
 */
export function parseSyntax(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	// Check cache first
	if (parseSyntaxCache.has(syntax)) return parseSyntaxCache.get(syntax)!;

	const normalizedSyntax = normalizeSyntax(syntax);

	let results: StyleSyntaxParsed = [];

	// Handle comma-separated list (lowest precedence)
	if (hasComma(normalizedSyntax)) {
		results = parseComma(normalizedSyntax);
	}
	// Handle '|' (single bar) - before space to get correct precedence
	else if (hasSingleBar(normalizedSyntax)) {
		results = parseSingleBar(normalizedSyntax);
	}
	// Handle '||' (double bar) - independent components
	else if (hasDoubleBar(normalizedSyntax)) {
		results = parseDoubleBar(normalizedSyntax);
	}
	// Handle '&&' (double ampersand)
	else if (hasDoubleAmp(normalizedSyntax)) {
		results = parseDoubleAmp(normalizedSyntax);
	}
	// Handle space-separated sequence (highest precedence)
	else if (hasSequence(normalizedSyntax)) {
		results = parseSequence(normalizedSyntax);
	}
	// Handle multipliers (?, +, *, #, {m,n}) or bracketed groups with multipliers (highest binding)
	else if (hasMultiplier(normalizedSyntax)) {
		results = parseMultiplier(normalizedSyntax);
	}
	// Handle '[]' (optional group) - after multipliers to correctly handle [a b]+
	else if (hasBrackets(normalizedSyntax)) {
		results = parseBrackets(normalizedSyntax);
	}
	// Base case: atomic value (empty or non-empty)
	else {
		results = [normalizedSyntax];
	}

	// Remove duplicates and sort by length (efficient single pass with Map)
	const seen = new Map<string, true>();
	for (const result of results) seen.set(result, true);

	const finalResults = Array.from(seen.keys()).sort((a, b) => a.length - b.length);

	// Cache the result before returning
	parseSyntaxCache.set(syntax, finalResults);

	return finalResults;
}
