// Types
import type { StyleSyntaxRaw, StyleSyntaxParsed } from '@/core/block/style/definition/types/';

// Utilities
import { parseSyntax, MAX_MULTIPLIER_DEPTH } from './parse';

/**
 * Checks if the syntax starts and ends with brackets ([a b]).
 * This is used to determine if the syntax is a bracketed group.
 * @param syntax - The syntax string to check for brackets.
 */
export function hasBrackets(syntax: StyleSyntaxRaw): boolean {
	return syntax.startsWith('[') && syntax.endsWith(']');
}

/**
 * Checks if the syntax is a bracketed group with a multiplier ([a b]+).
 * This is used to determine if the syntax is a bracketed group that can be repeated.
 * @param syntax - The syntax string to check for a bracketed group with a multiplier.
 */
export function hasBracketsMultiplier(syntax: StyleSyntaxRaw): boolean {
	return /^\[.*\](\*|\+|\?|\{\d+(,\d+)?\}|#)$/.test(syntax);
}

/**
 * Parses an optional group in brackets.
 * @param s - The syntax string (e.g. '[a b]')
 */
export function parseBrackets(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	const inner = syntax.slice(1, -1);
	const parsed = parseSyntax(inner);

	// If the parsed result is only an empty string, return ['']
	if (parsed.length === 1 && parsed[0] === '') {
		return [];
	}

	// Otherwise, return ['', ...parsed] but filter out empty strings from parsed
	const results = ['', ...parsed.filter((v) => v.trim() !== '')];

	// Remove duplicates
	return Array.from(new Set(results));
}

/**
 * Parses a bracketed group with a multiplier (e.g., [a b]+) and returns all possible combinations.
 * Handles group extraction, recursive parsing, and multiplier logic internally.
 * @param syntax - The syntax string to parse, expected to be in the format [group]multiplier (e.g., [a b]+).
 */
export function parseBracketsMultiplier(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	// syntax is expected to be something like: [group]multiplier
	const match = syntax.match(/^(\[.*\])(\*|\+|\?|#|\{\d+(,\d+)?\})$/);
	if (!match) return [syntax];
	const group = match[1].slice(1, -1); // remove [ and ]
	const multiplier = match[2];

	// Dynamic require to avoid circular import with parse
	const groupResults = parseSyntax(group);

	let min = 0;
	let max = MAX_MULTIPLIER_DEPTH;
	let joiner = ' ';
	if (multiplier === '*') {
		min = 0;
	} else if (multiplier === '+') {
		min = 1;
	} else if (multiplier === '?') {
		min = 0;
		max = 1;
	} else if (multiplier === '#') {
		min = 1;
		joiner = ',';
	} else {
		const m = multiplier.match(/\{(\d+)(,(\d+))?\}/);
		if (m) {
			min = parseInt(m[1], 10);
			max = m[3] ? parseInt(m[3], 10) : min;
		}
	}
	const results: string[] = [];
	for (let count = min; count <= max; count++) {
		if (count === 0) {
			results.push('');
		} else {
			let combos = groupResults;
			for (let i = 1; i < count; i++) {
				const newCombos: string[] = [];
				for (const left of combos) {
					for (const right of groupResults) {
						newCombos.push((left + joiner + right).trim());
					}
				}
				combos = newCombos;
			}
			results.push(...combos);
		}
	}
	return Array.from(new Set(results));
}
