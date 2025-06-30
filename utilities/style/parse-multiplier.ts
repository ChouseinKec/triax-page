import { MAX_MULTIPLIER_DEPTH } from './parse';

/**
 * Duplicates a token up to maxDepth times, joining with spaces (for + and * multipliers).
 * This is used to generate all possible combinations for multipliers that allow one or more occurrences.
 * @param input - The input string to duplicate.
 * @param maxDepth - The maximum depth to duplicate the token.
 * @return string[] - Returns an array of strings with the token duplicated up to maxDepth
 * @example
 * duplicateToken('a', 3) → ['a', 'a a', 'a a a']
 * duplicateToken('b', 2) → ['b', 'b b']
 */
function duplicateToken(input: string, maxDepth: number): string[] {
	const arr: string[] = [];
	for (let i = 1; i <= maxDepth; i++) {
		arr.push(Array(i).fill(input).join(' '));
	}
	return arr;
}

/**
 * Checks if the input ends with a multiplier (?, +, *, {m,n}).
 * This is used to determine if the input has a multiplier that affects how many times the preceding token can occur.
 * @param input - The input string to check for a multiplier.
 * @return boolean - Returns true if the input has a multiplier, false otherwise.
 * @example
 * hasMultiplier('a?') → true
 * hasMultiplier('a b') → false
 * hasMultiplier('c*') → true
 * hasMultiplier('d{2,4}') → true
 */
function hasMultiplier(input: string): boolean {
	return /[?+*]|\{\d+(,\d+)?\}$/.test(input);
}

/**
 * Returns ['', input] for the ? multiplier (zero or one occurrence).
 * This is used to handle cases where the preceding token can occur zero or one time.
 * @param input - The input string to parse.
 * @return string[] - Returns an array with an empty string and the input.
 * @example
 * parseMultiplierQuestion('a?') → ['', 'a']
 * parseMultiplierQuestion('b') → ['', 'b']
 */
function parseMultiplierQuestion(input: string): string[] {
	return ['', input];
}

/**
 * Handles the + multiplier (one or more occurrences).
 * This is used to generate all possible combinations for multipliers that require at least one occurrence.
 * @param input - The input string to parse.
 * @param maxDepth - The maximum depth to duplicate the token.
 * @return string[] - Returns an array of strings with the token duplicated up to maxDepth times.
 * @example
 * parseMultiplierPlus('a+', 3) → ['a', 'a a', 'a a a']
 * parseMultiplierPlus('b+', 2) → ['b', 'b b']
 */
function parseMultiplierPlus(input: string, maxDepth: number = MAX_MULTIPLIER_DEPTH): string[] {
	return duplicateToken(input, maxDepth);
}

/**
 * Handles the * multiplier (zero or more occurrences).
 * This is used to generate all possible combinations for multipliers that allow zero or more occurrences.
 * @param input - The input string to parse.
 * @param maxDepth - The maximum depth to duplicate the token.
 * @return string[] - Returns an array of strings with the token duplicated up to maxDepth times, including an empty string.
 * @example
 * parseMultiplierStar('a*', 3) → ['', 'a', 'a a', 'a a a']
 * parseMultiplierStar('b*', 2) → ['', 'b', 'b b']
 */
function parseMultiplierStar(input: string, maxDepth: number = MAX_MULTIPLIER_DEPTH): string[] {
	return ['', ...duplicateToken(input, maxDepth)];
}

/**
 * Parses a multiplier (?, +, *, {m,n}) and returns all possible combinations.
 * Handles different multiplier types and returns an array of strings.
 * @param input - The input string to parse.
 * @return string[] - Returns an array of strings with all possible combinations based on the multiplier.
 * @example
 * parseMultiplier('a?') → ['', 'a']
 * parseMultiplier('b+') → ['b', 'b b']
 * parseMultiplier('c*') → ['', 'c', 'c c', 'c c c']
 */
function parseMultiplier(input: string): string[] {
	if (input.endsWith('?')) {
		const base = input.slice(0, -1).trim();
		return parseMultiplierQuestion(base);
	}
	if (input.endsWith('+')) {
		const base = input.slice(0, -1).trim();
		return parseMultiplierPlus(base, MAX_MULTIPLIER_DEPTH);
	}
	if (input.endsWith('*')) {
		const base = input.slice(0, -1).trim();
		return parseMultiplierStar(base, MAX_MULTIPLIER_DEPTH);
	}
	// {m,n} multiplier
	const match = input.match(/^(.*)\{(\d+),(\d+)\}$/);
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
	return [input];
}

export { parseMultiplier, hasMultiplier };
