import { parse } from './parse';

/**
 * Checks if the input starts and ends with brackets ([a b]).
 * This is used to determine if the input is a bracketed group.
 * @param input - The input string to check for brackets.
 * @return boolean - Returns true if the input is a bracketed group, false otherwise.
 * @example
 * hasBrackets('[a b]') → true
 * hasBrackets('a b') → false
 */
function hasBrackets(input: string): boolean {
	return input.startsWith('[') && input.endsWith(']');
}

/**
 * Checks if the input is a bracketed group with a multiplier ([a b]+).
 * This is used to determine if the input is a bracketed group that can be repeated.
 * @param input - The input string to check for a bracketed group with a multiplier.
 * @return boolean - Returns true if the input is a bracketed group with a multiplier, false otherwise.
 * @example
 * hasBracketsGroup('[a b]+') → true
 * hasBracketsGroup('[a b]') → false
 */
function hasBracketsGroup(input: string): boolean {
	return /^\[.*\](\*|\+|\?|\{\d+(,\d+)?\}|#)$/.test(input);
}

/**
 * Parses an optional group in brackets.
 * @param s - The syntax string (e.g. '[a b]')
 * @returns All possible combinations (with and without the group)
 * @example parseBrackets('[a b]') → ['', 'a b']
 */
function parseBrackets(input: string): string[] {
	const inner = input.slice(1, -1);
	const parsed = parse(inner);

	// If the parsed result is only an empty string, return ['']
	if (parsed.length === 1 && parsed[0] === '') {
		return [];
	}

	// Otherwise, return ['', ...parsed] but filter out empty strings from parsed
	return ['', ...parsed.filter((v) => v.trim() !== '')];
}

export { hasBrackets, hasBracketsGroup, parseBrackets };
