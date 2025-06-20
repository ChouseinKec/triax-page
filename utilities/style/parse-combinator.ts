import { splitAdvanced } from '@/utilities/string/string';
import { generateCrossProduct, generateAllSubsets, generatePermutations } from '@/utilities/array/array';
import { parse } from './parse';

/**
 * Checks if the input contains a double bar (||) combinator at the top level.
 * This is used to determine if the input has multiple options that can be combined.
 * @param input - The input string to check for double bar combinators.
 * @return boolean - Returns true if the input contains a double bar combinator, false otherwise.
 * @example
 * hasDoubleBar('a || b') → true
 * hasDoubleBar('a && b') → false
 */
export function hasDoubleBar(input: string): boolean {
	return splitAdvanced(input, '||').length > 1;
}

/**
 * Checks if the input contains a double ampersand (&&) combinator at the top level.
 * This is used to determine if the input has multiple conditions that must all be satisfied.
 * @param input - The input string to check for double ampersand combinators.
 * @return boolean - Returns true if the input contains a double ampersand combinator, false otherwise.
 * @example
 * hasDoubleAmp('a && b') → true
 * hasDoubleAmp('a || b') → false
 */
export function hasDoubleAmp(input: string): boolean {
	return splitAdvanced(input, '&&').length > 1;
}

/**
 * Checks if the input contains a single bar (|) combinator at the top level.
 * This is used to determine if the input has multiple options that can be selected independently.
 * @param input - The input string to check for single bar combinators.
 * @return boolean - Returns true if the input contains a single bar combinator, false otherwise.
 * @example
 * hasSingleBar('a | b') → true
 * hasSingleBar('a && b') → false
 */
export function hasSingleBar(input: string): boolean {
	return splitAdvanced(input, '|').length > 1;
}

/**
 * Checks if the input contains a top-level comma (,) separator.
 * @param input - The input string to check for comma separators.
 * @return boolean - Returns true if the input contains a comma separator, false otherwise.
 */
export function hasComma(input: string): boolean {
	return splitAdvanced(input, ',').length > 1;
}

/**
 * Parses a comma-separated list at the top level.
 * Recursively parses each part and generates the cross product of all possible combinations,
 * then joins each combination with a comma.
 * @param input - The input string to parse.
 * @return string[] - Returns all possible combinations as strings.
 * @example
 * parseComma('a,b+') → ['a,b', 'a,b b', 'a,b b b']
 */
export function parseComma(input: string): string[] {
	const parts = splitAdvanced(input, ',');
	if (parts.length > 1) {
		const parsedParts = parts.map((part) => parse(part.trim()));
		return generateCrossProduct(parsedParts).map((arr) => arr.join(','));
	}
	return [input];
}

/**
 * Checks if the input contains a sequence combinator (space, comma, or slash) at the top level.
 * @param input - The input string to check for sequence combinators.
 * @return boolean - Returns true if the input contains a sequence combinator, false otherwise.
 */
export function hasSequence(input: string): boolean {
	return (
		splitAdvanced(input, ' ').length > 1 
	);
}

/**
 * Parses a double bar (||) combinator.
 * Generates all non-empty subsets and their permutations, then recursively parses each part and returns all possible combinations.
 * This handles cases like 'a || b c' where 'b c' can be permuted and combined with 'a'.
 * @param input - The input string to parse.
 * @return string[] - Returns an array of all possible combinations as strings.
 * @example
 * parseDoubleBar('a || b c') → ['a b c', 'a c b', 'b c a', 'c b a']
 */
export function parseDoubleBar(input: string): string[] {
	const parts = splitAdvanced(input, '||');
	if (parts.length > 1) {
		// Generate all non-empty subsets and their permutations
		const combos = generateAllSubsets(parts)
			.filter((subset) => subset.length > 0)
			.flatMap((subset) => generatePermutations(subset).map((perm) => perm.join(' ')));
		// For each combo, split by spaces, recursively parse, and cross product
		const results = combos.flatMap((combo) => {
			const parsedParts = splitAdvanced(combo, ' ').map((part) => parse(part));
			return generateCrossProduct(parsedParts).map((arr) => arr.join(' ').trim());
		});
		// Remove duplicates and sort by string length
		return Array.from(new Set(results)).sort((a, b) => a.length - b.length);
	}
	return [parts.join(' ')];
}

/**
 * Parses a double ampersand (&&) combinator.
 * Generates all permutations, then recursively parses each part and returns all possible combinations.
 * This handles cases like 'a && b c' where 'b c' can be permuted and combined with 'a'.
 * @param input - The input string to parse.
 * @return string[] - Returns an array of all possible combinations as strings.
 * @example
 * parseDoubleAmp('a && b c') → ['a b c', 'a c b', 'b c a', 'c b a']
 * parseDoubleAmp('a && b && c') → ['a b c', 'a c b', 'b c a', 'c b a']
 */
export function parseDoubleAmp(input: string): string[] {
	const parts = splitAdvanced(input, '&&');
	if (parts.length > 1) {
		const combos = generatePermutations(parts).map((perm) => perm.join(' '));
		const results = combos.flatMap((combo) => {
			const parsedParts = splitAdvanced(combo, ' ').map((part) => parse(part));
			return generateCrossProduct(parsedParts).map((arr) => arr.join(' ').trim());
		});
		return Array.from(new Set(results)).sort((a, b) => a.length - b.length);
	}
	return [parts.join(' ')];
}

/**
 * Parses a single bar (|) combinator.
 * Recursively parses each part and returns all possible combinations.
 * This handles cases like 'a | b c' where 'b c' can be combined with 'a'.
 * @param input - The input string to parse.
 * @return string[] - Returns an array of all possible combinations as strings.
 * @example
 * parseSingleBar('a | b c') → ['a b c', 'a c b', 'b c a', 'c b a']
 * parseSingleBar('a | b | c') → ['a b c', 'a c b', 'b c a', 'c b a']
 */
export function parseSingleBar(input: string): string[] {
	const parts = splitAdvanced(input, '|');
	if (parts.length > 1) {
		const results = parts.flatMap((part) => parse(part.trim()));
		return results.sort((a, b) => a.length - b.length);
	}
	return [parts.join(' ')];
}

/**
 * Parses a sequence separated by space, comma, or slash.
 * Recursively parses each part and generates the cross product of all possible combinations,
 * then joins each combination with the original separator.
 * This ensures that multipliers and nested syntax are expanded for each part.
 * @param input - The input string to parse.
 * @return string[] - Returns all possible combinations as strings.
 * @example
 * parseSequence('a b+') → ['a', 'a b', 'a b b']
 * parseSequence('a/b+') → ['a/b', 'a/b b', 'a/b b b']
 */
export function parseSequence(input: string): string[] {
	let sep = null;
	if (splitAdvanced(input, ' ').length > 1) sep = ' ';
	else if (splitAdvanced(input, '/').length > 1) sep = '/';
	if (sep) {
		const parts = splitAdvanced(input, sep);
		const parsedParts = parts.map((part) => parse(part.trim()));
		return generateCrossProduct(parsedParts).map((arr) => arr.join(sep).replace(new RegExp(`\\s*${sep}\\s*`, 'g'), sep).trim());
	}
	return [input];
}
