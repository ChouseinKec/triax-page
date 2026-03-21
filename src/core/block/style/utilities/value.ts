// Types
import type { TerminalToken, Value, ValueToken, ValueTokenSegments, ValueTokenGroup, ValueTokenCombinator, ValueTokenFunction, ValueTokenLiteral, ValueTokenTerminal, TerminalDefinition, TerminalKey, Variation, SimplifiedVariation } from '@/core/block/style/types';

// Utilities
import { splitAdvanced, insertBetween } from '@/shared/utilities/string';
import { sliceAdvanced, mergeAdvanced } from '@/shared/utilities/array';
import { matchVariations, matchSlot } from '@/core/block/style/utilities/match';
import { extractFunctionArgs, extractFunctionName } from '@/core/block/style/utilities/function';
import { getTerminalDefault } from '@/core/block/style/utilities/terminal';

/**
 * Determines if a given separator string acts as a combinator in a value sequence.
 *
 * @param value - The separator string to check
 * @param isValueFunction - Context flag. Used to differentiate between a combinator and a
 * literal. Specifically, the slash (`/`) is treated as a combinator in top-level
 * CSS values (like `font: 12px/1.5`) but may be treated as a literal or handled
 * differently within certain functional contexts.
 * @returns True if the value is a recognized combinator
 */
function isValueCombinator(value: Value, isValueFunction: boolean = false): boolean {
	// Inside functions, only the comma acts as a formal combinator for arguments
	if (isValueFunction) return [',', ' '].includes(value);

	// In general CSS values, both commas and slashes serve as combinators
	return [',', ' ', '/'].includes(value);
}

/**
 * Matches a raw CSS value string against all registered terminal definitions.
 *
 * Iterates over each `TerminalDefinition` in order and returns the first
 * `TerminalToken` produced by a successful `matchValue` call. Returns
 * `undefined` when no definition recognises the value.
 *
 * @param value - The raw CSS value string to match (e.g. `"16px"`, `"red"`).
 * @param terminalDefinitions - Ordered list of terminal definitions to query.
 * @returns The matched `TerminalToken`, or `undefined` if unrecognised.
 * @see TerminalDefinition.matchValue
 */
function matchValueTerminal(value: Value, terminalDefinitions: TerminalDefinition[]): TerminalToken | undefined {
	for (const terminal of terminalDefinitions) {
		const token = terminal.matchValue(value as Value);
		if (token) return token;
	}

	return undefined;
}

/**
 * Creates a ValueTokenCombinator object.
 *
 * @param combinator - The combinator string
 * @returns A combinator token object
 */
function createTokenCombinator(combinator: Value): ValueTokenCombinator {
	return {
		type: 'combinator',
		combinator,
	};
}

/**
 * Creates a ValueTokenLiteral object for operators or fixed symbols.
 *
 * @param literal - The literal string
 * @returns A literal token object
 */
function createTokenLiteral(literal: Value): ValueTokenLiteral {
	return {
		type: 'literal',
		literal,
	};
}

/**
 * Creates a ValueTokenTerminal object by matching against known definitions.
 *
 * @param value - The raw string value
 * @param terminalDefinitions - Definitions to match against
 * @returns A terminal token object with matched metadata or fallback
 */
function createTokenTerminal(value: Value, terminalDefinitions: TerminalDefinition[]): ValueTokenTerminal {
	// Attempt to find a matching terminal definition for keywords or types
	const terminal = matchValueTerminal(value, terminalDefinitions) || value;

	return {
		type: 'terminal',
		terminal,
		value,
	};
}

/**
 * Creates a ValueTokenFunction object by recursively parsing its arguments.
 *
 * @param value - The raw function string (e.g., "rgb(0,0,0)")
 * @param terminalDefinitions - Definitions for terminal resolution
 * @returns A function token object containing its name and parsed argument tokens
 */
export function createTokenFunction(value: Value, terminalDefinitions: TerminalDefinition[]): ValueTokenFunction {
	const name = extractFunctionName(value) || '<function()>';
	// Extract the raw inner content of the parentheses
	const args = extractFunctionArgs(value);
	// Recursively derive tokens for the function arguments if they exist
	const tokens = args ? deriveValueTokens(args, terminalDefinitions, true) : [];

	return {
		type: 'function',
		terminal: '<function>',
		function: `${name}()`,
		tokens,
		value,
	};
}

/**
 * Creates one or two tokens for a single iteration of the value loop:
 * the value token (terminal or function) and, if present, the following
 * separator token (combinator or literal).
 *
 * @param value - The raw value string for this slot
 * @param separator - The separator that follows this value, if any
 * @param terminalDefinitions - Definitions for terminal resolution
 * @param isFunction - Context flag forwarded to `isValueCombinator`
 * @returns An array containing the value token and optionally a separator token
 */
function createValueToken(value: Value, separator: Value | undefined, terminalDefinitions: TerminalDefinition[], isFunction: boolean = false): ValueToken[] {
	const tokens: ValueToken[] = [];

	// Let terminal priority ordering decide: terminals are sorted by priority, so
	// <color> (90) will claim color(), rgb() etc. before <function> (100) gets a chance.
	// Only when <function> is the match do we parse the arguments recursively.
	if (matchValueTerminal(value, terminalDefinitions) === '<function>') {
		tokens.push(createTokenFunction(value, terminalDefinitions));
	} else {
		tokens.push(createTokenTerminal(value, terminalDefinitions));
	}

	// Skip if there's no separator or if it's just a standard space (space-separated sequence)
	if (separator === undefined || separator === ' ') return tokens;

	// Check if the separator is a formal combinator or just a literal operator
	if (isValueCombinator(separator, isFunction)) {
		tokens.push(createTokenCombinator(separator));
	} else {
		tokens.push(createTokenLiteral(separator));
	}

	return tokens;
}

/**
 * Normalizes a CSS-like value string by collapsing whitespace and cleaning up operators.
 *
 * @param value - The raw value string to normalize
 * @returns A cleaned value string with consistent spacing
 */
function normalizeValue(value: Value): Value | null {
	// If the normalized value starts or ends with a combinator, it's malformed
	if (/^[,\/+\-*\s]|[,\/+\-*\s]$/.test(value)) return null;

	// Remove extra spaces around common CSS operators to ensure consistent tokenization
	value = value.replace(/\s*([,\/+\-*])\s*/g, '$1');

	// Remove extra spaces after '(' and before ')'
	value = value.replace(/\(\s+/g, '(');
	value = value.replace(/\s+\)/g, ')');

	// Replace all other whitespace sequences (tabs, newlines, etc.) with a single space
	value = value.replace(/[ \t\n\r\f\v]+/g, ' ');

	// Trim leading and trailing whitespace for a clean result
	return value.trim();
}

/**
 * Produces a default `ValueTokenTerminal` for a single `terminal` or `function` slot.
 *
 * Shared by `completePartialTokens` and `buildVariationTokens` so that default-value
 * resolution lives in exactly one place.
 *
 * @param slot - A variation slot of type `terminal` or `function`.
 * @param terminalDefinitions - Terminal registry used for default value lookup.
 * @returns A terminal token with the default value, or `null` if unresolvable.
 */
function getSlotDefaultToken(slot: Variation[number], terminalDefinitions: TerminalDefinition[]): ValueTokenTerminal | null {
	if (slot.type === 'terminal') {
		const def = getTerminalDefault(slot.terminal, terminalDefinitions);
		return def ? { type: 'terminal', terminal: slot.terminal, value: def } : null;
	}
	if (slot.type === 'function') {
		const key = insertBetween(slot.function, '()', slot.parameter);
		const def = getTerminalDefault(key, terminalDefinitions);
		return def ? { type: 'terminal', terminal: '<function>', value: def } : null;
	}
	return null;
}

/**
 * Completes a partially-matched simplified variation by appending default terminal tokens
 * for every slot that the given `flatTokens` did not yet satisfy.
 *
 * Walks the simplified variation slot-by-slot:
 * - While existing tokens remain, advances the cursor using `matchSlot`.
 * - Once all existing tokens are consumed, generates a default value via the
 *   matching `TerminalDefinition.getDefault` call and pushes a new terminal token.
 *
 * Only `terminal` slots can be auto-completed. If an unfulfilled `function` or
 * `group` slot is encountered the function returns `null` (cannot infer defaults).
 *
 * @param flatTokens           - The already-entered tokens (flat, no groups).
 * @param simplifiedVariation  - The variation (combinators/literals stripped) that
 *                               partially matched `flatTokens`.
 * @param terminalDefinitions  - Ordered terminal definitions used to look up defaults.
 * @returns The completed token array, or `null` if completion is impossible.
 */
function completePartialTokens(flatTokens: ValueToken[], simplifiedVariation: SimplifiedVariation, terminalDefinitions: TerminalDefinition[]): ValueToken[] | null {
	const completed: ValueToken[] = [...flatTokens];
	let cursor = 0;

	for (const slot of simplifiedVariation) {
		// Existing tokens exhausted — generate a default for this slot.
		if (cursor >= completed.length) {
			const token = getSlotDefaultToken(slot, terminalDefinitions);
			if (!token) return null;

			completed.push(token);
			cursor++;
		}
		// Consume existing tokens for this slot.
		else {
			const nextCursor = matchSlot(completed, cursor, slot);
			if (nextCursor === -1) return null;
			cursor = nextCursor;
		}
	}

	return completed;
}

/**
 * Resolves a single grammar variation into a flat `ValueToken[]` by substituting
 * each slot with its terminal default value.
 *
 * Serves as the canonical way to produce a "blank" token array for a variation,
 * used by `createGroupOption` to build the option list for group slots.
 *
 * Returns `null` if:
 * - Any terminal or function slot has no registered default.
 * - The variation contains an unsupported nested group slot.
 *
 * Literal and combinator tokens are passed through unchanged.
 *
 * @param variation - A single raw variation (from `deriveVariations`).
 * @param terminalDefinitions - Terminal registry used for default value lookup.
 * @returns A flat `ValueToken[]` with all slots filled, or `null` if any slot is unresolvable.
 */
export function buildVariationTokens(variation: Variation, terminalDefinitions: TerminalDefinition[]): ValueToken[] | null {
	const tokens: ValueToken[] = [];

	for (const item of variation) {
		switch (item.type) {
			case 'terminal':
			case 'function': {
				const token = getSlotDefaultToken(item, terminalDefinitions);
				if (!token) return null;
				tokens.push(token);
				break;
			}
			case 'literal':
				tokens.push({ type: 'literal', literal: item.literal });
				break;
			case 'combinator':
				tokens.push({ type: 'combinator', combinator: item.combinator });
				break;
			default:
				// Nested group or unknown type — bail out.
				return null;
		}
	}

	return tokens.length > 0 ? tokens : null;
}

/**
 * Re-structures a flat `ValueToken[]` to mirror the shape of a matched `Variation`.
 *
 * `deriveValueTokens` is variation-unaware and always returns a flat list. After a
 * successful `matchVariations` call you know exactly which structural `Variation` the
 * value satisfies. This function walks that variation slot-by-slot and groups the
 * flat valueTokens accordingly:
 *
 * - `terminal` / `combinator` / `literal` / `function` slots → pass the next
 *   token through unchanged (1 : 1).
 * - `group` slots → collect all valueTokens that the group consumes (everything not
 *   needed by the remaining slots) and wrap them in a `ValueTokenGroup`.
 *
 * The returned array has the same length as the variation and can be dispatched
 * directly in a slot renderer without needing separate schema look-ups.
 *
 * @param valueTokens   - Flat token array produced by `deriveValueTokens`.
 * @param variation - The matched variation (from `deriveVariations`) that the valueTokens satisfy.
 * @returns A structured token array that mirrors the variation's slot sequence.
 * @see deriveValueTokens
 * @see matchVariations
 */
export function groupValueTokens(valueTokens: ValueToken[], variation: Variation): ValueToken[] {
	const result: ValueToken[] = [];
	let tokenIndex = 0;

	for (const slot of variation) {
		// Group slot: use the matcher to find exactly how many tokens this group consumes.
		if (slot.type === 'group') {
			// Match the remaining tokens against the remaining slots to find the boundary of this group.
			const newIndex = matchSlot(valueTokens, tokenIndex, slot);
			// newIndex === -1 means hard failure (shouldn't happen on a confirmed match);
			// fall back to consuming nothing so the rest of the loop stays in sync.
			const groupEnd = newIndex >= tokenIndex ? newIndex : tokenIndex;
			const groupToken: ValueTokenGroup = {
				type: 'group',
				tokens: valueTokens.slice(tokenIndex, groupEnd),
			};
			result.push(groupToken);
			tokenIndex = groupEnd;
		}
		// Non-group slots consume exactly one token each.
		else if (tokenIndex < valueTokens.length) {
			result.push(valueTokens[tokenIndex++]);
		}
	}

	return result;
}

/**
 * Recursively flattens any `ValueTokenGroup` tokens back to their inner flat tokens.
 *
 * Reverses the grouping applied by `groupValueTokens`, producing the plain token
 * sequence that the matcher always expects. Call this before passing UI-layer tokens
 * (which may contain groups) back into `matchVariations`.
 *
 * @param valueTokens - The token array that may contain `ValueTokenGroup` entries.
 * @returns A flat token array with all groups expanded.
 */
export function flattenValueTokens(valueTokens: ValueToken[]): ValueToken[] {
	const result: ValueToken[] = [];
	for (const token of valueTokens) {
		if (token.type === 'group') result.push(...flattenValueTokens(token.tokens));
		else result.push(token);
	}
	return result;
}

/**
 * Splits a flat `ValueToken[]` into an array of per-repetition segment arrays,
 * using the group's `splitter` character to locate boundaries.
 *
 * This is the inverse of `mergeValueTokens` and mirrors the structure that
 * `SlotGroup` needs to render each repetition independently.
 *
 * - `undefined` — no multiplier or single-item group; the entire array is one segment.
 * - `','`        — comma-separated repetitions; slices on `ValueTokenCombinator` tokens
 *                  whose `combinator` equals `','`.
 * - `' '`        — space-separated repetitions; each individual non-combinator token
 *                  is treated as its own segment (spaces are never emitted as tokens).
 *
 * @param valueTokens - The flat token array to split.
 * @param splitter    - The combinator character that separates repetitions, or `undefined`.
 * @returns An array of token-array segments, one per repetition unit.
 */
export function splitValueTokens(valueTokens: ValueToken[], splitter: string | undefined): ValueTokenSegments {
	if (!splitter) return [valueTokens];
	if (splitter === ',') return sliceAdvanced(valueTokens, (t): boolean => t.type === 'combinator' && (t as ValueTokenCombinator).combinator === ',');
	return valueTokens.filter((t) => t.type !== 'combinator').map((t) => [t]);
}

/**
 * Reassembles a flat `ValueToken[]` from an array of per-repetition segment arrays.
 *
 * This is the inverse of `splitValueTokens`. After editing or deleting a segment
 * in the UI, call this to produce the updated flat token array to store.
 *
 * - `','` splitter — inserts a `ValueTokenCombinator` with `combinator: ','` between
 *                    every pair of adjacent segments.
 * - Any other splitter (including `' '` and `undefined`) — segments are simply
 *                    concatenated with no separator tokens injected.
 *
 * @param valueTokenSegments - Array of per-repetition token arrays (as produced by `splitValueTokens`).
 * @param splitter - The combinator character used between repetitions, or `undefined`.
 * @returns A single flat `ValueToken[]` with separators re-inserted where required.
 */
export function mergeValueTokens(valueTokenSegments: ValueTokenSegments, splitter: string | undefined): ValueToken[] {
	if (splitter === ',') {
		const separatorToken: ValueTokenCombinator = { type: 'combinator', combinator: ',' };
		return mergeAdvanced<ValueToken[]>(valueTokenSegments, Array(valueTokenSegments.length - 1).fill([separatorToken])).flat();
	}
	return valueTokenSegments.flat();
}

/**
 * Parses a CSS value string into a structured array of valueTokens.
 *
 * Sequences have components separated by spaces with no operators. They require all components
 * to appear in the specified order per CSS spec.
 *
 * @param value - The value string to parse
 * @param terminalDefinitions - Definitions used to identify terminal types
 * @param isFunction - Context flag. Used to differentiate between a combinator and
 * a literal separator. This ensures that top-level CSS combinators (like `/`) are
 * correctly identified versus when they appear in a functional context.
 * @returns An array of parsed ValueTokens
 */
export function deriveValueTokens(value: Value, terminalDefinitions: TerminalDefinition[], isFunction: boolean = false): ValueToken[] {
	// First, clean up the input string to ensure consistent splitting
	const normalizedValue = normalizeValue(value);
	if (!normalizedValue) return [];

	// Split the string into values and their separators (like spaces, commas, etc.)
	const { values, separators } = splitAdvanced(normalizedValue, [',', '/', ' ', '+', '-', '*']);

	// Iterate through the results of the split to build the token list
	const valueTokens: ValueToken[] = [];
	for (let i = 0; i < Math.max(values.length, separators.length); i++) {
		valueTokens.push(...createValueToken(values[i], separators[i], terminalDefinitions, isFunction));
	}
	return valueTokens;
}

/**
 * Matches `valueTokens` against `simplifiedVariations` (combinator/literal-free), then
 * re-inserts the structural tokens (combinators and literals) from the matched raw
 * variation so the token array is syntactically complete, and finally groups the
 * resolved tokens to mirror the variation's slot structure.
 *
 * **Resolution order**
 * 1. Full match — try every simplified variation for an exact fit.
 * 2. Partial match — if no full match, detect variations where the input satisfies
 *    a valid prefix.  The first such variation is completed by appending default
 *    terminal tokens for its unfulfilled slots (via `completePartialTokens`).
 * 3. Fail — neither a full nor a completable partial match exists → returns `null`.
 *
 * @param valueTokens          - Tokens entered by the user (output of `deriveValueTokens`)
 * @param variations           - Raw full variations that include combinator/literal slots
 * @param simplifiedVariations - The same variations with combinators/literals stripped
 * @param terminalDefinitions  - Terminal definitions used to look up default values when
 *                               completing a partial match
 * @returns The resolved (and possibly completed) token array, or `null` on failure.
 */
export function resolveValueTokens(valueTokens: ValueToken[], variations: Variation[], simplifiedVariations: SimplifiedVariation[], terminalDefinitions: TerminalDefinition[] = []): ValueToken[] | null {
	// Flatten any ValueTokenGroup entries (produced by the UI layer) back to a plain
	// token sequence before matching — the matcher always expects flat tokens.
	const flatTokens = flattenValueTokens(valueTokens);

	// Step 1: Try full match first.
	let match = matchVariations(flatTokens, simplifiedVariations, false);
	let workingTokens = flatTokens;

	if (match.full === -1) {
		// Step 2: Full match failed — check for a partial (prefix) match.
		const partialMatch = matchVariations(flatTokens, simplifiedVariations, true);

		if (partialMatch.partial.length === 0) return null;

		// Step 3: Complete the first partial match by filling remaining slots with defaults.
		const completed = completePartialTokens(flatTokens, simplifiedVariations[partialMatch.partial[0]], terminalDefinitions);
		if (!completed) return null;

		// Step 4: Re-verify that the completed token array now produces a full match.
		match = matchVariations(completed, simplifiedVariations, false);
		if (match.full === -1) return null;

		workingTokens = completed;
	}

	const fullVariation = variations[match.full];

	const resolved: ValueToken[] = [];
	let si = 0;
	for (let slotIndex = 0; slotIndex < fullVariation.length; slotIndex++) {
		const slot = fullVariation[slotIndex];
		if (slot.type === 'combinator') {
			resolved.push({ type: 'combinator', combinator: slot.combinator });
		} else if (slot.type === 'literal') {
			resolved.push({ type: 'literal', literal: slot.literal });
		} else if (slot.type === 'group') {
			// A group slot may consume multiple flat tokens. Compute how many flat tokens
			// the remaining non-structural, non-group slots still need, then consume everything
			// up to that boundary for this group.
			const tailCount = fullVariation.slice(slotIndex + 1).reduce((sum, s) => {
				if (['combinator', 'literal', 'group'].includes(s.type)) return sum;
				return sum + 1;
			}, 0);
			const groupEnd = workingTokens.length - tailCount;
			while (si < groupEnd) resolved.push(workingTokens[si++]);
		} else if (si < workingTokens.length) {
			resolved.push(workingTokens[si++]);
		}
	}

	return resolved;
}

export function serializeValueTokens(valueTokens: ValueToken[]): string {
	return valueTokens
		.map((token) => {
			switch (token.type) {
				case 'terminal':
					return token.value;
				case 'combinator':
					return token.combinator;
				case 'literal':
					return token.literal;
				case 'function':
					return token.value;
				case 'group':
					return serializeValueTokens(token.tokens);
				default:
					return '';
			}
		})
		.join(' ');
}

/**
 * Strips combinator and literal tokens from a value token array,
 * returning only semantic tokens (terminal, function, group).
 *
 * @param valueTokens - The full token array that may include structural tokens
 * @returns Only the semantic tokens
 */
export function simplifyValueTokens(valueTokens: ValueToken[]): ValueToken[] {
	return valueTokens.filter((t) => t.type !== 'combinator' && t.type !== 'literal');
}

/**
 * Returns a new token array with the token at `index` replaced by `token`.
 *
 * Designed as the single update primitive shared by StyleValue, StyleValueSlots,
 * StyleValueSlot and any nested group renderers, so every layer of the value
 * editor follows the same immutable-update pattern.
 *
 * @param valueTokens - The current token array to update.
 * @param index  - Zero-based position of the token to replace.
 * @param token  - The replacement token, or `null` to remove it.
 * @returns A new array with the token at `index` replaced or removed.
 */
export function setValueTokens(valueTokens: ValueToken[], index: number, token: ValueToken | null): ValueToken[] {
	if (token === null) {
		const prev = valueTokens[index - 1];
		const removePrev = prev?.type === 'combinator' || prev?.type === 'literal';
		return valueTokens.filter((_, i) => i !== index && !(removePrev && i === index - 1));
	}

	return valueTokens.map((t, i) => (i === index ? token : t));
}
