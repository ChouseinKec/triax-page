// Types
import type { MatchMode, MatchResult, ValueToken, SlotTerminal, SlotFunction, SlotCombinator, SlotLiteral, SlotGroup, Variation, Slot } from '@/core/block/style/types';

// Utilities
import { deriveVariations } from '@/core/block/style/utilities/variation';

/**
 * Internal helper to handle repetitions and sequences with multipliers.
 *
 * It manages the grouping logic for valueTokens that appear multiple times,
 * optionally separated by a specific combinator (like a comma).
 *
 * @param valueTokens - The full array of value valueTokens
 * @param startIndex - The position to start matching from
 * @param multiplier - The multiplier rules (min, max, combinator)
 * @param predicate - Function that attempts to match a single instance and returns its length
 * @returns The new index after consuming valueTokens, or -1 if the multiplier requirements aren't met
 */
function consumeRepeatedly(valueTokens: ValueToken[], startIndex: number, multiplier: any, predicate: (valueTokens: ValueToken[]) => number): number {
	const { min = 1, max = Infinity, combinator } = multiplier;
	let index = startIndex;
	let count = 0;

	// Loop as long as we have valueTokens and haven't hit the maximum allowed repetitions
	while (index < valueTokens.length && count < max) {
		// If a combinator is required between items (count > 0)
		if (count > 0 && combinator) {
			const currentToken = valueTokens[index];
			// Check if the current token is the expected combinator
			if (currentToken.type === 'combinator' && currentToken.combinator === combinator) {
				index++;
				// If we found a combinator, there MUST be another item following it
				if (index >= valueTokens.length) return -1;
			} else {
				// No combinator found where one was expected; stop repeating
				break;
			}
		}

		// Attempt to match one instance of the item using the predicate
		const consumed = predicate(valueTokens.slice(index));
		if (consumed === -1) {
			// Item didn't match; stop repeating
			break;
		} else {
			// Item matched; advance the index and increment the match count
			index += consumed;
			count++;
		}
	}

	// Verify if we met the minimum required number of matches
	return count >= min ? index : -1;
}

/**
 * Consumes valueTokens for a terminal slot.
 *
 * Handles both single terminal matches and repeated terminals based on the multiplier.
 *
 * @param valueTokens - The full array of value valueTokens
 * @param index - The current cursor position in valueTokens
 * @param slot - The terminal definition to match against
 * @param multiplier - Optional repetition rules
 * @returns The new index after consumption, or -1 if no match
 */
function matchToken(valueTokens: ValueToken[], index: number, slot: SlotTerminal, multiplier: any): number {
	const terminalMatches = (token: ValueToken | undefined): boolean => {
		if (token?.type !== 'terminal') return false;
		if (token.terminal === slot.terminal || token.value === slot.terminal) return true;
		return false;
	};

	// Case 1: Simple match (no multiplier)
	if (!multiplier) {
		const token = valueTokens[index];
		// Directly check if the token at the current index matches the terminal type and value
		if (terminalMatches(token)) return index + 1;

		return -1;
	}

	// Case 2: Repeated match (with multiplier)
	return consumeRepeatedly(valueTokens, index, multiplier, (valueTokens) => {
		// Check the first token of the slice for a match
		if (terminalMatches(valueTokens[0])) return 1;
		return -1;
	});
}

/**
 * Consumes valueTokens for a repeated group slot.
 *
 * Always uses consumeRepeatedly to handle the group's internal variations,
 * allowing for nested complexity and repetitions.
 *
 * @param valueTokens - The full array of value valueTokens
 * @param index - The current cursor position in valueTokens
 * @param slot - The group definition containing variations
 * @param multiplier - Repetition rules for the group
 * @returns The new index after consumption, or -1 if no match
 */
function matchGroup(valueTokens: ValueToken[], index: number, slot: SlotGroup, multiplier: any): number {
	const variations = deriveVariations(slot.constraint);

	return consumeRepeatedly(valueTokens, index, multiplier, (tokensSlice) => {
		let longestMatch = 0;

		// Use 'inner' mode: each repetition must fully satisfy one variation's required slots,
		// but leftover valueTokens (belonging to future repetitions) are permitted in the slice.
		for (const variation of variations) {
			const consumed = checkMatch(tokensSlice, variation, 'inner');
			if (consumed > longestMatch) {
				longestMatch = consumed;
			}
		}

		return longestMatch > 0 ? longestMatch : -1;
	});
}

/**
 * Consumes exactly one literal token.
 *
 * @param valueTokens - The full array of value valueTokens
 * @param index - The current cursor position
 * @param slot - The literal definition
 * @returns The new index or -1
 */
function matchLiteral(valueTokens: ValueToken[], index: number, slot: SlotLiteral): number {
	const valueToken = valueTokens[index];
	// Literals (like specific keywords) must match exactly
	if (valueToken?.type === 'literal' && valueToken.literal === slot.literal) return index + 1;

	return -1;
}

/**
 * Consumes exactly one combinator token.
 *
 * @param valueTokens - The full array of value valueTokens
 * @param index - The current cursor position
 * @param slot - The combinator definition (e.g., '/', ',')
 * @returns The new index or -1
 */
function matchCombinator(valueTokens: ValueToken[], index: number, slot: SlotCombinator): number {
	const valueToken = valueTokens[index];
	// Combinators are structural valueTokens used as separators
	if (valueToken?.type === 'combinator' && valueToken.combinator === slot.combinator) return index + 1;

	return -1;
}

/**
 * Consumes valueTokens for a CSS function slot (e.g., calc(), rgb()).
 *
 * Validates the function name and matches the valueTokens inside the function parentheses
 * against the provided internal variations.
 *
 * @param valueTokens - The full array of value valueTokens
 * @param index - The current cursor position
 * @param slot - The function definition with its internal variations
 * @returns The new index or -1
 */
function matchFunction(valueTokens: ValueToken[], index: number, slot: SlotFunction): number {
	const valueToken = valueTokens[index];

	// Check function name; if name doesn't match or it's not a function, fail
	if (valueToken?.type !== 'function' || valueToken.function !== slot.function) return -1;

	// Recursively match the inner valueTokens found within the function's parentheses
	const variations = deriveVariations(slot.constraint);

	const contentMatch = matchVariations(valueToken.tokens, variations, false);
	return contentMatch.full === -1 ? -1 : index + 1;
}

/**
 * Helper to dispatch matching logic to specialized functions based on slot type.
 *
 * @param valueTokens - The full array of value valueTokens
 * @param index - The current cursor position
 * @param slot - The generic token slot from a variation
 * @returns The new index after consumption or -1
 */
export function matchSlot(valueTokens: ValueToken[], index: number, slot: Slot): number {
	switch (slot.type) {
		case 'terminal':
			return matchToken(valueTokens, index, slot, slot.multiplier);
		case 'group':
			return matchGroup(valueTokens, index, slot, slot.multiplier);
		case 'function':
			return matchFunction(valueTokens, index, slot);
		case 'combinator':
			return matchCombinator(valueTokens, index, slot);
		case 'literal':
			return matchLiteral(valueTokens, index, slot);
		default:
			return -1;
	}
}

/**
 * Checks if a specific sequence of value valueTokens matches a single structural variation.
 *
 * This is the core logic that iterates through all slots in a variation and
 * determines if the input valueTokens satisfy the structure.
 *
 * @param valueTokens - Input value valueTokens to validate
 * @param variation - The sequence of slots to match against
 * @param mode - Match mode: 'full' (default), 'partial' (autocomplete), or 'inner' (group predicate)
 * @returns number of valueTokens consumed, or -1 if no match
 */
function checkMatch(valueTokens: ValueToken[], variation: Variation, mode: MatchMode = 'full'): number {
	let cursorIndex = 0;

	// Iterate through every slot defined in the variation
	for (let slotIndex = 0; slotIndex < variation.length; slotIndex++) {
		// Partial mode only: valueTokens exhausted before this slot — valid prefix match for autocomplete
		if (mode === 'partial' && cursorIndex === valueTokens.length) return cursorIndex;

		// Try to match the current slot starting at the current token index
		const nextIndex = matchSlot(valueTokens, cursorIndex, variation[slotIndex]);

		// If the slot fails to match, the entire variation is invalid
		if (nextIndex === -1) return -1;

		// Update cursor to the next position after the matched slot
		cursorIndex = nextIndex;

		// Tokens exhausted mid-variation with required slots remaining
		if (cursorIndex === valueTokens.length && slotIndex < variation.length - 1) {
			const remainingOptional = variation.slice(slotIndex + 1).every((s: any) => s.multiplier?.min === 0);
			if (remainingOptional) return cursorIndex;
			// partial: allow (prefix for autocomplete); full/inner: reject (required slots unmet)
			return mode === 'partial' ? cursorIndex : -1;
		}
	}

	// 'inner': allow leftover valueTokens (the slice may contain valueTokens for the next repetition)
	// 'partial': same
	// 'full': must have consumed exactly all valueTokens
	return mode !== 'full' || cursorIndex === valueTokens.length ? cursorIndex : -1;
}

/**
 * Matches a list of value valueTokens against a set of structural variations.
 *
 * It iterates through each possibility (variation) and finds the first one that fits.
 * Useful for validating CSS property values against their syntax definitions.
 *
 * @param valueTokens - The array of parsed value valueTokens to match
 * @param variations - The possible structural variations (paths) the syntax can take
 * @param partial - If true, allows the valueTokens to match just the beginning of a variation
 * @returns An object containing the index of the first matched variation and indices of potential partial matches
 */
export function matchVariations(valueTokens: ValueToken[], variations: Variation[], collectPartials: boolean = true): MatchResult {
	const result: MatchResult = {
		full: -1,
		partial: [],
	};

	// Try each variation one by one
	for (let i = 0; i < variations.length; i++) {
		const consumed = checkMatch(valueTokens, variations[i]);

		if (consumed === valueTokens.length) {
			result.full = i;
			// If not collecting partials, stop at the first full match
			if (!collectPartials) break;
		} else if (collectPartials) {
			// Re-check in partial mode to detect valid prefix matches for autocomplete.
			// Only accept when all input valueTokens were consumed — leftover unconsumed valueTokens
			// mean the variation is too short, not that the input is a valid prefix.
			const partialConsumed = checkMatch(valueTokens, variations[i], 'partial');
			if (partialConsumed !== -1 && partialConsumed === valueTokens.length) result.partial.push(i);
		}
	}

	return result;
}
