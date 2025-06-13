// Constants
import { CSSTokenDefs } from '@/constants/style/token';

// Types
import type { CSSCombinations } from '@/types/style/parse';
import { CSSTokens } from '@/types/style/token';

// Utilities
import { generateCrossProduct, generateAllSubsets, generatePermutations } from '@/utilities/array/array';
import { splitAdvanced } from '@/utilities/string/string';

/**
 * Filters out any parsed values that contain unexpanded data types (e.g., <calc()>),
 * where the data type is not present in CSSTokenDefs. This ensures that only
 * fully expanded, concrete values are included in the result.
 *
 * @param parsed - Array of parsed value strings (e.g., from syntax-parsed)
 * @returns Array with only fully expanded values (no unknown/unexpanded data types)
 */
function filterTokens(parsed: string[]): string[] {
	return parsed.filter((str) => {
		// Match all <...> in the string (potential data types)
		const matches = str.match(/<[^>]+>/g);
		// If no matches, it's already a concrete value
		if (!matches) return true;

		// Exclude if any data type is not in CSSTokenDefs
		return matches.every((dt) => {
			// List of primitive types that should always be allowed, even if not in CSSTokenDefs
			const excludes = ['length', 'angle', 'percentage', 'number', 'integer', 'flex'];
			// Extract the base type from the data type string (e.g., 'length' from '<length [1,5]>')
			const baseTypeMatch = dt.match(/^<([a-zA-Z0-9-]+)/);
			const baseType = baseTypeMatch ? baseTypeMatch[1] : '';
			// If the base type is in the excludes list, do not filter it out
			if (excludes.includes(baseType)) return true;

			// Otherwise, only allow if the data type is defined in CSSTokenDefs
			return dt in CSSTokenDefs;
		});
	});
}

/**
 * Recursively expands all <data-type> references in a CSS syntax string using CSSTokenDefs.
 * If a data-type is not found, it is left as-is.
 * @param syntax - The CSS property syntax string (e.g. 'auto || <ratio>')
 * @param seen - (internal) Set of already expanded datas to prevent infinite recursion
 * @returns The syntax string with all known datas recursively expanded
 */
function expandTokens(syntax: string, seen = new Set<string>()): string {
	// Regex to match <data-type [range]> or <data-type>
	return syntax.replace(/<([a-zA-Z0-9-]+)(\s*\[[^>]+\])?>/g, (match: string, baseType: string, range: string) => {
		const typeKey = `<${baseType}>` as CSSTokens;
		if (seen.has(typeKey)) return match; // Prevent infinite recursion

		const def = CSSTokenDefs[typeKey];
		if (def?.syntax) {
			seen.add(typeKey);

			// Recursively expand the definition
			const expanded = expandTokens(def.syntax, seen);
			seen.delete(typeKey);

			// If expanded contains combinators, wrap each expanded part with the range if present
			if (range) {
				// Split by '|' at top level to attach range to each option
				const parts = splitAdvanced(expanded, '|');
				return parts
					.map((part) => {
						const trimmed = part.trim();
						// Only attach range to <...> types, not keywords
						if (/^<[^>]+>$/.test(trimmed)) {
							// Insert the range before the closing '>' of the data type
							return trimmed.replace(/>$/, `${range}>`);
						}
						return trimmed;
					})
					.join('|');
			} else {
				return expanded;
			}
		}
		return match;
	});
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
function normalizeSyntax(s: string): string {
	// Normalize '||' to have spaces before and after
	s = s.replace(/\s*\|\|\s*/g, ' || ');

	// Normalize '&&' to have no spaces before or after
	s = s.replace(/\s*&&\s*/g, '&&');

	// Normalize '|' to have no spaces before or after (but not '||')
	// Use negative lookbehind and lookahead to avoid '||'
	s = s.replace(/(?<!\|)\s*\|\s*(?!\|)/g, '|');

	// Remove spaces before *, +, ?
	s = s.replace(/\s+([*+?])/g, '$1');

	// Remove multiple spaces
	s = s.replace(/\s{2,}/g, ' ');

	return s.trim();
}

/**
 * Parses a double bar `||` combinator.
 * Splits the input by '||' at the top level and returns all non-empty subsets and their permutations,
 * flattened as strings joined by spaces.
 * Does NOT recursively parse the parts—just returns the combinations as strings.
 * @param s - The syntax string
 * @returns Array of strings, each representing a combination of parts
 * @example parseDoubleBar('a || b && c') → ['a', 'b && c', 'a b && c', 'b && c a']
 */
function parseDoubleBar(s: string): string[] {
	const parts = splitAdvanced(s, '||');
	if (parts.length > 1) {
		const combos: string[] = [];
		const subsets = generateAllSubsets(parts).filter((subset) => subset.length > 0);
		for (const subset of subsets) {
			for (const perm of generatePermutations(subset)) {
				combos.push(perm.join(' '));
			}
		}
		return combos.sort((a, b) => a.length - b.length); // Sort for consistency
	}
	return [parts.join(' ')];
}

/**
 * Parses a double ampersand (&&) combinator.
 * Splits the input by '&&' at the top level and returns all permutations of the parts,
 * flattened as strings joined by spaces.
 * Does NOT recursively parse the parts—just returns the permutations as strings.
 * @param s - The syntax string
 * @returns Array of strings, each representing a permutation of parts
 * @example parseDoubleAmp('a && b && c') → ['a b c', 'a c b', ...]
 */
function parseDoubleAmp(s: string): string[] {
	const parts = splitAdvanced(s, '&&');
	if (parts.length > 1) {
		return generatePermutations(parts).map((perm) => perm.join(' '));
	}
	return [parts.join(' ')];
}

/**
 * Parses a single bar (|) combinator.
 * Splits the input by '|' at the top level and returns each part as a string.
 * Does NOT recursively parse the parts—just returns the options as strings.
 * @param s - The syntax string
 * @returns Array of strings, each representing a single option
 * @example parseSingleBar('a | b | c') → ['a', 'b', 'c']
 */
function parseSingleBar(s: string): string[] {
	const parts = splitAdvanced(s, '|');
	if (parts.length > 1) {
		return parts.map((part) => part.trim());
	}
	return [parts.join(' ')];
}

/**
 * Parses a space-separated sequence.
 * Splits the input by spaces at the top level and returns the sequence as a single string.
 * Does NOT recursively parse the parts—just returns the sequence as a string.
 * @param s - The syntax string
 * @returns Array with a single string representing the sequence
 * @example parseSequence('a b c') → ['a b c']
 */
function parseSequence(s: string): string[] {
	const seq = splitAdvanced(s, ' ');
	if (seq.length > 1) {
		return [seq.join(' ')];
	}
	return [seq.join(' ')];
}

/**
 * Parses an optional group in brackets.
 * @param s - The syntax string (e.g. '[a b]')
 * @returns All possible combinations (with and without the group)
 * @example parseBrackets('[a b]') → ['', 'a b']
 */
function parseBrackets(s: string): CSSCombinations {
	const inner = s.slice(1, -1);
	const parsed = parse(inner);

	// If the parsed result is only an empty string, return ['']
	if (parsed.length === 1 && parsed[0] === '') {
		return [];
	}

	// Otherwise, return ['', ...parsed] but filter out empty strings from parsed
	return ['', ...parsed.filter((v) => v.trim() !== '')];
}

/**
 * Parses multipliers (?, +, *, {m,n}).
 * @param s - The syntax string
 * @returns All possible combinations
 * @example parseMultiplier('a?') → ['', 'a']
 * @example parseMultiplier('a+') → ['a', 'a a']
 * @example parseMultiplier('a*') → ['', 'a', 'a a']
 * @example parseMultiplier('a{2,3}') → ['a a', 'a a a']
 */
function parseMultiplier(s: string): CSSCombinations {
	if (s.endsWith('?')) {
		const base = s.slice(0, -1).trim();
		return ['', base];
	}
	if (s.endsWith('+')) {
		const base = s.slice(0, -1).trim();
		return [base, `${base} ${base}`]; // up to 2 for brevity
	}
	if (s.endsWith('*')) {
		const base = s.slice(0, -1).trim();
		return ['', base, `${base} ${base}`]; // up to 2 for brevity
	}

	// {m,n}
	const match = s.match(/^(.*)\{(\d+),(\d+)\}$/);
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
	return [s];
}

/**
 * Main parser for CSS Value Definition Syntax.
 * Recursively parses the syntax string, handling combinators in precedence order.
 * @param syntax - The syntax string
 * @returns All possible combinations as strings
 * @example parse('a || b && c') → ['a', 'b c', 'c b', 'a b c', 'a c b', 'b c a', 'c b a']
 */
function parse(syntax: string): CSSCombinations {
	const s = normalizeSyntax(syntax.trim());

	// Handle '||' (double bar) first (lowest precedence)
	if (splitAdvanced(s, '||').length > 1) {
		const combos = parseDoubleBar(s);
		// For each combo (subset/permutation), split by spaces and recursively parse each part
		const results: string[] = [];

		for (const combo of combos) {
			// Split the combo by spaces at the top level (e.g., 'a b && c' -> ['a', 'b && c'])
			const parts = splitAdvanced(combo, ' ');

			// Recursively parse each part to get all possible combinations for that part
			const parsedParts = parts.map((part) => parse(part));

			// Generate the cross product of all parsed parts to get all possible combinations
			const crossProduct = generateCrossProduct(parsedParts);

			// Join each combination into a string and add to results
			for (const arr of crossProduct) {
				results.push(arr.join(' ').trim());
			}
		}

		// Remove duplicates and sort the results by string length for consistency
		return Array.from(new Set(results)).sort((a, b) => a.length - b.length);
	}

	// Handle '&&' (double ampersand)
	if (splitAdvanced(s, '&&').length > 1) {
		const combos = parseDoubleAmp(s);
		// For each permutation combo, split by spaces and recursively parse each part
		const results: string[] = [];
		for (const combo of combos) {
			// Split the combo by spaces at the top level
			const parts = splitAdvanced(combo, ' ');
			// Recursively parse each part to get all possible combinations for that part
			const parsedParts = parts.map((part) => parse(part));
			// Generate the cross product of all parsed parts to get all possible combinations
			const crossProduct = generateCrossProduct(parsedParts);
			// Join each combination into a string and add to results
			for (const arr of crossProduct) {
				results.push(arr.join(' ').trim());
			}
		}

		// Sort the results by string length for consistency
		// Remove duplicates before sorting
		return Array.from(new Set(results)).sort((a, b) => a.length - b.length);
	}

	// Handle '|' (single bar)
	if (splitAdvanced(s, '|').length > 1) {
		const combos = parseSingleBar(s);
		return combos.flatMap((combo) => parse(combo)).sort((a, b) => a.length - b.length);
	}

	// Handle space-separated sequence
	if (splitAdvanced(s, ' ').length > 1) {
		const combos = parseSequence(s);
		return combos
			.flatMap((combo) => {
				const parts = splitAdvanced(combo, ' ');
				return generateCrossProduct(parts.map((part) => parse(part))).map((arr) => arr.join(' '));
			})
			.sort((a, b) => a.length - b.length);
	}

	// Handle optional group in brackets
	if (s.startsWith('[') && s.endsWith(']')) {
		return parseBrackets(s).sort((a, b) => a.length - b.length);
	}

	// Handle multipliers (?, +, *, {m,n})
	if (/[?+*]|\{\d+,\d+\}$/.test(s)) {
		return parseMultiplier(s).sort((a, b) => a.length - b.length);
	}

	// Base case: atomic value
	return [s];
}

export { normalizeSyntax, expandTokens,  parseDoubleBar, parseDoubleAmp, parseSingleBar, parseSequence, parseBrackets, parseMultiplier, parse, filterTokens };
