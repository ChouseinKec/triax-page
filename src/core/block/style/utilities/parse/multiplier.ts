// Types
import type { StyleSyntaxRaw, StyleSyntaxParsed } from '@/core/block/style/types/';

// Utilities
import { MAX_MULTIPLIER_DEPTH } from './parse';

/**
 * Duplicates a token up to maxDepth times, joining with spaces (for + and * multipliers).
 * This is used to generate all possible combinations for multipliers that allow one or more occurrences.
 * @param syntax - The syntax string to duplicate.
 * @param maxDepth - The maximum depth to duplicate the token.
 */
export function duplicateToken(syntax: StyleSyntaxRaw, maxDepth: number): StyleSyntaxParsed {
	const arr: string[] = [];
	for (let i = 1; i <= maxDepth; i++) {
		arr.push(Array(i).fill(syntax).join(' '));
	}
	return arr;
}

/**
 * Checks if the syntax ends with a multiplier (?, +, *, {m,n}).
 * This is used to determine if the syntax has a multiplier that affects how many times the preceding token can occur.
 * @param syntax - The syntax string to check for a multiplier.
 */
export function hasMultiplier(syntax: StyleSyntaxRaw): boolean {
	return /[?+*]|\{\d+(,\d+)?\}$/.test(syntax);
}

/**
 * Returns ['', syntax] for the ? multiplier (zero or one occurrence).
 * This is used to handle cases where the preceding token can occur zero or one time.
 * @param syntax - The syntax string to parse.
 */
export function parseMultiplierQuestion(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	return ['', syntax];
}

/**
 * Handles the + multiplier (one or more occurrences).
 * This is used to generate all possible combinations for multipliers that require at least one occurrence.
 * @param syntax - The syntax string to parse.
 * @param maxDepth - The maximum depth to duplicate the token.
 */
export function parseMultiplierPlus(syntax: StyleSyntaxRaw, maxDepth: number = MAX_MULTIPLIER_DEPTH): StyleSyntaxParsed {
	return duplicateToken(syntax, maxDepth);
}

/**
 * Handles the * multiplier (zero or more occurrences).
 * This is used to generate all possible combinations for multipliers that allow zero or more occurrences.
 * @param syntax - The syntax string to parse.
 * @param maxDepth - The maximum depth to duplicate the token.
 */
export function parseMultiplierStar(syntax: StyleSyntaxRaw, maxDepth: number = MAX_MULTIPLIER_DEPTH): StyleSyntaxParsed {
	return ['', ...duplicateToken(syntax, maxDepth)];
}

/**
 * Parses a multiplier (?, +, *, {m,n}) and returns all possible combinations.
 * Handles different multiplier types and returns an array of strings.
 * @param syntax - The syntax string to parse.
 */
export function parseMultiplier(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	if (syntax.endsWith('?')) {
		const base = syntax.slice(0, -1).trim();
		return parseMultiplierQuestion(base);
	}
	if (syntax.endsWith('+')) {
		const base = syntax.slice(0, -1).trim();
		return parseMultiplierPlus(base, MAX_MULTIPLIER_DEPTH);
	}
	if (syntax.endsWith('*')) {
		const base = syntax.slice(0, -1).trim();
		return parseMultiplierStar(base, MAX_MULTIPLIER_DEPTH);
	}

	// {m,n} multiplier
	const match = syntax.match(/^(.*)\{(\d+),(\d+)\}$/);
	
	if (match) {
		const base = match[1].trim();
		const n = parseInt(match[2], 10);
		const m = parseInt(match[3], 10);
		const arr: string[] = [];
		for (let i = n; i <= m; i++) {
			arr.push(Array(i).fill(base).join(' '));
		}
		return arr;
	}
	return [syntax];
}
