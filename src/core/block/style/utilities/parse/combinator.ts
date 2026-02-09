// Types
import type { StyleSyntaxRaw, StyleSyntaxParsed } from '@/core/block/style/types/';

// Utilities
import { splitAdvanced } from '@/shared/utilities/string';
import { generateCrossProduct, generateAllSubsets, generatePermutations } from '@/shared/utilities/array';
import { parseSyntax } from './parse';

// Pre-compiled regexes for parseSequence separator cleanup (avoids creating regex in loop)
const SPACE_CLEANUP_REGEX = /\s+/g;
const SLASH_CLEANUP_REGEX = /\s*\/\s*/g;

// String literals for CSS Value Definition Syntax combinators
const SEP_DOUBLE_BAR = '||';
const SEP_DOUBLE_AMP = '&&';
const SEP_SINGLE_BAR = '|';
const SEP_COMMA = ',';
const SEP_SPACE = ' ';
const SEP_SLASH = '/';

// Bracket character constants
const BRACKET_OPEN = '[';
const BRACKET_CLOSE = ']';


/**
 * Checks if a separator exists at the top level of the syntax.
 * Uses early-exit optimization: stops after finding first separator
 * (returns array with length > 1, no need to process entire string).
 *
 * This is more efficient than splitAdvanced() when only checking existence,
 * avoiding unnecessary array allocations.
 *
 * @param syntax - The syntax string to check
 * @param separator - The separator to look for (e.g., '||', '&&', '|', ',', ' ')
 * @returns true if separator exists at top level, false otherwise
 */
function hasTopLevelSeparator(syntax: StyleSyntaxRaw, separator: string): boolean {
	return splitAdvanced(syntax, separator, undefined, true).length > 1;
}

/**
 * Helper function to parse syntax with combination generation.
 *
 * Extracts common logic used by parseDoubleBar and parseDoubleAmp:
 * 1. Generate combinations (subsets or permutations) from parts
 * 2. Parse each part of each combination
 * 3. Cross product for all variations
 * 4. Join results with space separator
 * 5. Deduplicate and sort by length
 *
 * @param parts - Pre-split syntax parts (already validated to have length > 1)
 * @param combinationGenerator - Function to generate combinations from parts
 *                               (e.g., generateAllSubsets, generatePermutations)
 * @returns Parsed and expanded syntax variations
 */
function parseWithCombinations(parts: string[], combinationGenerator: (parts: string[]) => string[][]): StyleSyntaxParsed {
	// Generate combinations based on the provided generator
	// (e.g., all non-empty subsets for ||, all permutations for &&)
	const combos = combinationGenerator(parts);

	// For each combination, parse parts and generate variations
	const results = combos.flatMap((combo) => {
		const parsedParts = combo.map((part) => parseSyntax(part.trim()));
		return generateCrossProduct(parsedParts).map((arr) => arr.join(SEP_SPACE).trim());
	});

	// Remove duplicates and sort by length (short to long)
	return Array.from(new Set(results)).sort((a, b) => a.length - b.length);
}

/**
 * Checks if the syntax contains a double bar (||) combinator at the top level.
 *
 * **Purpose:** Determines if syntax can be parsed as OR combinations where
 * multiple components can be used together (least strict).
 *
 * **Example:**
 * - `'<length> || <color>'` → true (can use either or both)
 * - `'<length> | <color>'` → false (must use exactly one)
 * - `'[<length> || <color>]'` → false (bracket is not top-level)
 *
 * @param syntax - The syntax string to check for double bar combinators
 * @returns true if || exists at top level, false otherwise
 */
export function hasDoubleBar(syntax: StyleSyntaxRaw): boolean {
	return hasTopLevelSeparator(syntax, SEP_DOUBLE_BAR);
}

/**
 * Checks if the syntax contains a double ampersand (&&) combinator at the top level.
 *
 * **Purpose:** Determines if syntax can be parsed as AND combinations where
 * all components must be present but order is flexible.
 *
 * **Example:**
 * - `'<length> && <color>'` → true (must use both, any order)
 * - `'<length> || <color>'` → false (uses OR, not AND)
 * - `'[<length> && <color>]'` → false (bracket is not top-level)
 *
 * @param syntax - The syntax string to check for double ampersand combinators
 * @returns true if && exists at top level, false otherwise
 */
export function hasDoubleAmp(syntax: StyleSyntaxRaw): boolean {
	return hasTopLevelSeparator(syntax, SEP_DOUBLE_AMP);
}

/**
 * Checks if the syntax contains a single bar (|) combinator at the top level.
 *
 * **Purpose:** Determines if syntax can be parsed as XOR combinations where
 * exactly one component must be selected (mutually exclusive).
 *
 * **Note:** This check must come AFTER || check because `||` contains `|`.
 * If || exists, we return early (false) to avoid false positive.
 *
 * **Example:**
 * - `'<length> | <percentage>'` → true (must choose one)
 * - `'<length> || <color>'` → false (uses ||, not plain |)
 * - `'[<length> | <color>]'` → false (bracket is not top-level)
 *
 * @param syntax - The syntax string to check for single bar combinators
 * @returns true if | exists at top level (and || does not), false otherwise
 */
export function hasSingleBar(syntax: StyleSyntaxRaw): boolean {
	// Check for single | that is NOT part of ||
	// Must check double bar first to avoid false positive on || containing |
	if (hasDoubleBar(syntax)) return false;
	return hasTopLevelSeparator(syntax, SEP_SINGLE_BAR);
}

/**
 * Checks if the syntax contains a top-level comma (,) separator.
 *
 * **Purpose:** Determines if syntax contains comma-separated groups.
 * Commas in CSS syntax represent sequential values that must all be present.
 *
 * **Example:**
 * - `'<length>, <length>, <length>'` → true (three values separated by commas)
 * - `'<length> <color>'` → false (space-separated, not comma-separated)
 *
 * @param syntax - The syntax string to check for comma separators
 * @returns true if comma exists at top level, false otherwise
 */
export function hasComma(syntax: StyleSyntaxRaw): boolean {
	return hasTopLevelSeparator(syntax, SEP_COMMA);
}

/**
 * Checks if the syntax contains a sequence combinator (space) at the top level.
 *
 * **Purpose:** Determines if syntax contains space-separated components.
 * Spaces represent sequential values that must appear in order (or with multipliers).
 *
 * **Example:**
 * - `'<length> <color> <string>'` → true (three space-separated values)
 * - `'<length>/<percentage>'` → false (slash-separated, not space-separated)
 *
 * @param syntax - The syntax string to check for sequence combinators
 * @returns true if space separator exists at top level, false otherwise
 */
export function hasSequence(syntax: StyleSyntaxRaw): boolean {
	return hasTopLevelSeparator(syntax, SEP_SPACE);
}

/**
 * Checks if the syntax starts and ends with brackets ([a b]).
 *
 * **Purpose:** Determines if a syntax is a grouped/optional section.
 * Brackets indicate the content is optional (zero or one occurrence by default).
 *
 * **Example:**
 * - `'[<length> <color>]'` → true (grouped optional)
 * - `'<length> [<color>]'` → false (starts with <, not [)
 * - `'[<length> <color>]+'` → true (has multiplier, but that's handled separately)
 *
 * @param syntax - The syntax string to check
 * @returns true if syntax is wrapped in brackets, false otherwise
 */
export function hasBrackets(syntax: StyleSyntaxRaw): boolean {
	return syntax.startsWith(BRACKET_OPEN) && syntax.endsWith(BRACKET_CLOSE);
}

/**
 * Parses a comma-separated list at the top level.
 *
 * **Algorithm:**
 * 1. Split by comma to get individual parts
 * 2. Recursively parse each part
 * 3. Generate cross product of all variations
 * 4. Join each combination with comma
 * 5. Deduplicate using Set
 *
 * **Example:**
 * - Input: `'<length>, <color>'` → Parts: `['<length>', '<color>']`
 * - Parsed: `[['<length>'], ['<color>']]`
 * - Cross product: `[['<length>', '<color>']]`
 * - Result: `['<length>,<color>']`
 *
 * @param syntax - The syntax string to parse
 * @returns Array of all possible value combinations (comma-separated)
 */
export function parseComma(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	const parts = splitAdvanced(syntax, SEP_COMMA);
	if (parts.length > 1) {
		const parsedParts = parts.map((part) => parseSyntax(part.trim()));
		const results = generateCrossProduct(parsedParts).map((arr) => arr.join(SEP_COMMA));
		// Remove duplicates efficiently
		return Array.from(new Set(results));
	}
	return [syntax];
}

/**
 * Parses a double bar (||) combinator.
 *
 * **Purpose:** Handles OR combinations where any subset of components can be used together.
 * Most permissive: allows single item, pairs, all three, etc.
 *
 * **Algorithm:**
 * 1. Split by || to get components
 * 2. Generate all non-empty subsets of components
 * 3. Generate all permutations of each subset
 * 4. For each combination, parse parts and cross product
 * 5. Join results with spaces, deduplicate, sort by length
 *
 * **Example:**
 * - Input: `'a || b || c'`
 * - Subsets: `[a], [b], [c], [a,b], [a,c], [b,c], [a,b,c]`
 * - Permutations: Each subset generates all orderings
 * - Result: All possible combinations like `'a'`, `'b a'`, `'a b c'`, etc.
 *
 * **Special Case:** `'a || b c'` where `'b c'` is kept as unit:
 * - Subsets: `[a], [b c], [a, b c]`
 * - Result: `'a'`, `'b c'`, `'a b c'`, `'b c a'`, etc.
 *
 * @param syntax - The syntax string to parse
 * @returns Array of all possible OR combinations
 */
export function parseDoubleBar(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	const parts = splitAdvanced(syntax, SEP_DOUBLE_BAR);
	if (parts.length <= 1) return [syntax];

	// Generate all non-empty subsets, then their permutations
	const combinationGenerator = (parts: string[]) =>
		generateAllSubsets(parts)
			.filter((subset) => subset.length > 0)
			.flatMap((subset) => generatePermutations(subset));

	return parseWithCombinations(parts, combinationGenerator);
}

/**
 * Parses a double ampersand (&&) combinator.
 *
 * **Purpose:** Handles AND combinations where all components must be present
 * but order is flexible. Less permissive than ||: all parts must be included.
 *
 * **Algorithm:**
 * 1. Split by && to get components (all required)
 * 2. Generate all permutations of components
 * 3. For each permutation, parse parts and cross product
 * 4. Join results with spaces, deduplicate, sort by length
 *
 * **Example:**
 * - Input: `'a && b'`
 * - Permutations: `[a, b]`, `[b, a]`
 * - Result: `'a b'`, `'b a'` (all combinations with both parts)
 *
 * **Special Case:** `'a && b c'` where `'b c'` is kept as unit:
 * - Permutations: `[a, b c]`, `[b c, a]`
 * - Result: `'a b c'`, `'b c a'`, etc.
 *
 * @param syntax - The syntax string to parse
 * @returns Array of all possible AND combinations with required parts in different orders
 */
export function parseDoubleAmp(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	const parts = splitAdvanced(syntax, SEP_DOUBLE_AMP);
	if (parts.length <= 1) return [syntax];

	// Generate all permutations of parts (all must be included, order varies)
	const combinationGenerator = (parts: string[]) => generatePermutations(parts);

	return parseWithCombinations(parts, combinationGenerator);
}

/**
 * Parses a single bar (|) combinator.
 *
 * **Purpose:** Handles XOR combinations where exactly one component must be selected.
 * Most restrictive: mutually exclusive choices.
 *
 * **Algorithm:**
 * 1. Split by | to get options
 * 2. Recursively parse each option
 * 3. Flatten all parsed variations into a single array
 * 4. Deduplicate using Set
 * 5. Sort by length
 *
 * **Example:**
 * - Input: `'<length> | <percentage>'`
 * - Parts: `['<length>', '<percentage>']`
 * - Parsed: `[['<length>'], ['<percentage>']]`
 * - Flattened: `['<length>', '<percentage>']`
 * - Result: `['<length>', '<percentage>']` (choose one)
 *
 * **Special Case:** `'a | b c'` where `'b c'` might expand:
 * - Parts: `['a', 'b c']`
 * - If `'b c'` expands to `['b c', 'b c d']`, result: `['a', 'b c', 'b c d']`
 *
 * @param syntax - The syntax string to parse
 * @returns Array of all possible options (mutually exclusive)
 */
export function parseSingleBar(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	const parts = splitAdvanced(syntax, SEP_SINGLE_BAR);
	if (parts.length > 1) {
		// Parse each option and flatten all variations
		const results = parts.flatMap((part) => parseSyntax(part.trim()));
		// Remove duplicates and sort by length
		return Array.from(new Set(results)).sort((a, b) => a.length - b.length);
	}
	return [parts.join(SEP_SPACE)];
}

/**
 * Parses a sequence separated by space or slash.
 *
 * **Purpose:** Handles sequential values that must appear in order.
 * Space: normal sequential syntax
 * Slash: ratio-like syntax (e.g., `aspect-ratio: <number> / <number>`)
 *
 * **Algorithm:**
 * 1. Check for space separator (early exit optimization)
 * 2. Check for slash separator if no space
 * 3. If found, split by the separator
 * 4. Recursively parse each part
 * 5. Cross product for all variations
 * 6. Clean up spacing around separator
 * 7. Deduplicate using Set
 *
 * **Example (space):**
 * - Input: `'<length> <color>'`
 * - Parts: `['<length>', '<color>']`
 * - Cross product: All combinations maintaining order
 * - Result: `['<length> <color>']`
 *
 * **Example (slash):**
 * - Input: `'<number> / <number>'`
 * - Parts: `['<number>', '<number>']`
 * - Result: `['<number> / <number>']` (maintains slash with proper spacing)
 *
 * @param syntax - The syntax string to parse
 * @returns Array of all possible sequential combinations
 */
export function parseSequence(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	// Check for space or slash separator with early exit optimization
	let sep = null;
	if (hasTopLevelSeparator(syntax, SEP_SPACE)) sep = SEP_SPACE;
	else if (hasTopLevelSeparator(syntax, SEP_SLASH)) sep = SEP_SLASH;

	if (sep) {
		const parts = splitAdvanced(syntax, sep);
		const parsedParts = parts.map((part) => parseSyntax(part.trim()));
		// Use pre-compiled regex for separator cleanup based on separator type
		const cleanupRegex = sep === SEP_SPACE ? SPACE_CLEANUP_REGEX : SLASH_CLEANUP_REGEX;
		const results = generateCrossProduct(parsedParts).map((arr) => arr.join(sep).replace(cleanupRegex, sep).trim());
		// Remove duplicates efficiently
		return Array.from(new Set(results));
	}
	return [syntax];
}

/**
 * Parses a bracketed group as optional (zero or one occurrence).
 *
 * **Purpose:** Handles bracketed syntax like `[a b]` which means optional group.
 * Returns both zero occurrence (empty) and the parsed variations.
 *
 * **Algorithm:**
 * 1. Extract content between brackets
 * 2. Recursively parse the inner content
 * 3. Prepend empty string (zero occurrence option)
 * 4. Deduplicate using Set
 *
 * **Example:**
 * - Input: `'[<length> <color>]'`
 * - Inner: `'<length> <color>'`
 * - Parsed inner: `['<length> <color>']`
 * - Result: `['', '<length> <color>']` (omit or include once)
 *
 * @param syntax - The syntax string (e.g., '[a b]', '[<length> <color>]')
 * @returns Array with empty string (zero) and parsed variations (one)
 */
export function parseBrackets(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	// Remove [ and ] from both ends
	const inner = syntax.slice(1, -1);

	// Recursively parse the inner content to get all variations
	const parsed = parseSyntax(inner);

	// Prepend empty string for zero occurrence, keep parsed variations for one occurrence
	const results = ['', ...parsed];

	// Remove duplicates and return
	return Array.from(new Set(results));
}
