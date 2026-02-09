// Types
import type { StyleSyntaxRaw, StyleSyntaxParsed } from '@/core/block/style/types/';

// Utilities
import { generateCrossProduct } from '@/shared/utilities/array';
import { MAX_MULTIPLIER_DEPTH, parseSyntax } from './parse';

// Pre-compiled regex patterns (compiled once, reused for performance)
const MULTIPLIER_REGEX = /[?+*#]|\{\d+(,\d+)?\}$/;
const MULTIPLIER_RANGE_REGEX = /^(.*)\{(\d+)(?:,(\d+))?\}$/;
const BRACKETS_MULTIPLIER_REGEX = /^\[.*?\]([*+?#]|\{\d+(,\d+)?\})$/;
const BRACKET_MULTIPLIER_MATCH_REGEX = /^(\[.*?\])([*+?#]|\{\d+(,\d+)?\})$/;
const BRACKET_RANGE_REGEX = /\{(\d+)(,(\d+))?\}/;
// Multiplier character constants
const MULT_QUESTION = '?';
const MULT_PLUS = '+';
const MULT_STAR = '*';
const MULT_HASH = '#';

// Memoization cache for getMultiplierParameters
const multiplierParametersCache = new Map<string, { min: number; max: number; joiner: string }>();

/**
 * Extracts the base token from syntax by removing a single trailing character.
 *
 * **Purpose:** Clean utility for extracting the token before a multiplier.
 * Handles the common pattern of trailing multiplier characters.
 *
 * @param syntax - Syntax string with trailing multiplier (e.g., '<length>?')
 * @returns The syntax without the last character, trimmed
 */
function removeTrailingChar(syntax: StyleSyntaxRaw): string {
	return syntax.slice(0, -1).trim();
}

/**
 * Determines min/max occurrence and separator based on multiplier type.
 *
 * **Purpose:** Extracts multiplier semantics used by both regular and bracketed multipliers.
 * Single source of truth for multiplier parameter logic.
 *
 * **Algorithm:**
 * 1. Check multiplier character
 * 2. Set min/max/joiner based on multiplier type
 * 3. For range multipliers {m,n}, extract min/max from regex
 *
 * **Multiplier Parameters:**
 * | Type | Min | Max | Joiner |
 * |------|-----|-----|--------|
 * | ?    | 0   | 1   | space  |
 * | +    | 1   | ∞   | space  |
 * | *    | 0   | ∞   | space  |
 * | #    | 1   | ∞   | comma  |
 * | {m}  | m   | m   | space  |
 * | {m,n}| m   | n   | space  |
 *
 * @param multiplier - The multiplier string (e.g., '?', '+', '{2,4}')
 * @returns Object with min, max, and joiner properties
 */
function getMultiplierParameters(multiplier: string): { min: number; max: number; joiner: string } {
	// Check cache first
	if (multiplierParametersCache.has(multiplier)) return multiplierParametersCache.get(multiplier)!;

	let min = 0;
	let max = MAX_MULTIPLIER_DEPTH;
	let joiner = ' ';

	if (multiplier === MULT_STAR) {
		// * → 0 or more
		min = 0;
	} else if (multiplier === MULT_PLUS) {
		// + → 1 or more
		min = 1;
	} else if (multiplier === MULT_QUESTION) {
		// ? → 0 or 1
		min = 0;
		max = 1;
	} else if (multiplier === MULT_HASH) {
		// # → 1 or more (comma-separated)
		min = 1;
		joiner = ',';
	} else {
		// {m,n} or {m} → m to n (or exactly m if no n)
		const m = multiplier.match(BRACKET_RANGE_REGEX);
		if (m) {
			min = parseInt(m[1], 10);
			max = m[3] ? parseInt(m[3], 10) : min;
		}
	}

	const result = { min, max, joiner };

	// Cache the result before returning
	multiplierParametersCache.set(multiplier, result);

	return result;
}

/**
 * Generates combinations for a range multiplier {m,n}.
 *
 * **Purpose:** Handles range multiplier logic that works with any items array.
 * For multiple items, performs cross-joining to generate all possible combinations.
 *
 * **Algorithm:**
 * - Count = 0: add empty string (for optional multipliers)
 * - Count = 1: add each item as-is
 * - Count > 1: cross-join items (all combinations of items repeated count times)
 *
 * @param items - The base items (array of variations)
 * @param min - Minimum occurrences (inclusive)
 * @param max - Maximum occurrences (inclusive)
 * @param separator - Separator between items (default: space)
 * @returns All item combinations from min to max occurrences
 */
function parseMultiplierRange(items: StyleSyntaxParsed, min: number, max: number, separator: string = ' '): StyleSyntaxParsed {
	const result: StyleSyntaxParsed = [];

	for (let count = min; count <= max; count++) {
		if (count === 0) {
			// Zero occurrences: add empty string
			result.push('');
		} else if (count === 1) {
			// Single occurrence: add each item as-is
			result.push(...items);
		} else {
			// Multiple occurrences: generate cross product of count copies of items
			const itemsArrays = Array(count).fill(items);
			const combinations = generateCrossProduct(itemsArrays);
			result.push(...combinations.map((combo) => combo.join(separator).trim()));
		}
	}

	return result;
}

/**
 * Checks if the syntax ends with a multiplier (?, +, *, #, {m,n}) or is a bracketed group with a multiplier.
 *
 * **Purpose:** Determines if a syntax token has a multiplier that affects occurrence rules.
 * Multipliers control: zero vs one, optional vs required, count ranges, separators.
 * Handles both regular multipliers and bracketed groups with multipliers.
 *
 * **Multiplier types:**
 * - `?` → 0 or 1
 * - `+` → 1 or more
 * - `*` → 0 or more
 * - `#` → 1 or more (comma-separated)
 * - `{m}` → exactly m
 * - `{m,n}` → m to n
 * - `[group]+`, `[group]{m,n}`, etc. → bracketed multiplier
 *
 * **Example:**
 * - `'<length>?'` → true (has ?)
 * - `'<length>{2,4}'` → true (has {2,4})
 * - `'[a b]+'` → true (bracketed with multiplier)
 * - `'<length>'` → false (no multiplier)
 *
 * @param syntax - The syntax string to check
 * @returns true if syntax ends with a multiplier or is bracketed group with multiplier, false otherwise
 */
export function hasMultiplier(syntax: StyleSyntaxRaw): boolean {
	return MULTIPLIER_REGEX.test(syntax) || BRACKETS_MULTIPLIER_REGEX.test(syntax);
}

/**
 * Parses a multiplier (?, +, *, #, {m,n}) or bracketed group with multiplier and returns all possible combinations.
 *
 * **Purpose:** Main entry point for multiplier parsing. Handles all multiplier types,
 * bracketed groups with multipliers, and generates arrays of tokens representing different occurrence counts.
 *
 * **Algorithm:**
 * 1. Check if syntax is a bracketed group with multiplier ([group]+)
 * 2. If yes, extract group and use unified handlers
 * 3. If no, check for single-char multipliers (?, +, *, #)
 * 4. If not found, check for range multiplier ({m,n})
 * 5. Wrap base token in array and delegate to unified handlers
 * 6. Return generated combinations, or original syntax if no multiplier
 *
 * **Important:** Constraints are preserved during expansion.
 * When a token with constraints (e.g., `<length [0,100]>`) is duplicated,
 * the constraints remain with each duplicate.
 *
 * **Multiplier Behavior:**
 * | Type | Min | Max | Separator | Example |
 * |------|-----|-----|-----------|---------|
 * | ?    | 0   | 1   | n/a       | `x?` → '', x |
 * | +    | 1   | ∞   | space     | `x+` → x, x x, x x x, ... |
 * | *    | 0   | ∞   | space     | `x*` → '', x, x x, ... |
 * | #    | 1   | ∞   | comma     | `x#` → x, x,x, x,x,x, ... |
 * | {m}  | m   | m   | space     | `x{2}` → x x |
 * | {m,n}| m   | n   | space     | `x{2,4}` → x x, x x x, x x x x |
 * | [g]? | 0   | 1   | space     | `[a b]?` → '', a b |
 * | [g]+ | 1   | ∞   | space     | `[a b]+` → a b, a b a b, ... |
 *
 * **Examples:**
 * - `parseMultiplier('<length>?')` → `['', '<length>']`
 * - `parseMultiplier('<length>+')` → `['<length>', '<length> <length>', ...]`
 * - `parseMultiplier('<color>{2,3}')` → `['<color> <color>', '<color> <color> <color>']`
 * - `parseMultiplier('[<length>|<percentage>]{2}')` → `['<length> <length>', '<length> <percentage>', '<percentage> <length>', '<percentage> <percentage>']`
 * - `parseMultiplier('<length [0,100]>{1,4}')` →
 *   `['<length [0,100]>', '<length [0,100]> <length [0,100]>', ...]`
 *   (Constraints preserved in each duplicate)
 *
 * @param syntax - The syntax string with multiplier (e.g., '<length>+', '<color>{2,4}', '[a b]+', '<length [0,100]>{1,4}')
 * @returns Array of all possible token combinations for the given multiplier (with constraints preserved)
 */
export function parseMultiplier(syntax: StyleSyntaxRaw): StyleSyntaxParsed {
	// Check for bracket multiplier first
	const bracketMatch = syntax.match(BRACKET_MULTIPLIER_MATCH_REGEX);
	if (bracketMatch) {
		const group = bracketMatch[1].slice(1, -1); // Remove [ and ]
		const baseItems = parseSyntax(group);
		const multiplier = bracketMatch[2];
		const { min, max, joiner } = getMultiplierParameters(multiplier);
		return parseMultiplierRange(baseItems, min, max, joiner);
	}

	// Check for single-character multipliers
	if (syntax.endsWith(MULT_QUESTION)) {
		const baseItems = [removeTrailingChar(syntax)];
		const { min, max, joiner } = getMultiplierParameters(MULT_QUESTION);
		return parseMultiplierRange(baseItems, min, max, joiner);
	}

	if (syntax.endsWith(MULT_PLUS)) {
		const baseItems = [removeTrailingChar(syntax)];
		const { min, max, joiner } = getMultiplierParameters(MULT_PLUS);
		return parseMultiplierRange(baseItems, min, max, joiner);
	}

	if (syntax.endsWith(MULT_STAR)) {
		const baseItems = [removeTrailingChar(syntax)];
		const { min, max, joiner } = getMultiplierParameters(MULT_STAR);
		return parseMultiplierRange(baseItems, min, max, joiner);
	}

	if (syntax.endsWith(MULT_HASH)) {
		const baseItems = [removeTrailingChar(syntax)];
		const { min, max, joiner } = getMultiplierParameters(MULT_HASH);
		return parseMultiplierRange(baseItems, min, max, joiner);
	}

	// Check for range multiplier {m,n}
	const match = syntax.match(MULTIPLIER_RANGE_REGEX);
	if (match) {
		const baseItems = [match[1].trim()];
		const multiplier = match[3] ? `{${match[2]},${match[3]}}` : `{${match[2]}}`;
		const { min, max, joiner } = getMultiplierParameters(multiplier);
		return parseMultiplierRange(baseItems, min, max, joiner);
	}

	// No multiplier found
	return [syntax];
}
