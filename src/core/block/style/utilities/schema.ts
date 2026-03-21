// Types
import type { Schema, Slot, SimplifiedVariation, ValueToken } from '@/core/block/style/types/';

/**
 * Produces a stable, unique string key for a variation slot.
 *
 * Used to deduplicate identical slots that appear at the same column across
 * multiple variations so each option is only listed once in the schema.
 *
 * @param slot - The variation slot to key
 * @returns A string that uniquely identifies the slot's type and value
 */
function getTokenKey(slot: SimplifiedVariation[number]): string {
	switch (slot.type) {
		case 'terminal':
			return `terminal:${slot.terminal}`;
		case 'function':
			return `function:${slot.function}`;
		case 'group':
			return `group:${JSON.stringify(slot.constraint)}`;
	}
}

/**
 * Returns whether a variation slot is satisfied by the given value token.
 *
 * Only terminal↔terminal and function↔function pairs are considered a match,
 * comparing by their canonical name/identifier.
 *
 * @param slot  - The schema slot to test
 * @param token - The user-provided value token to match against
 * @returns `true` when the slot accepts the token
 */
function slotMatchesToken(slot: Slot, token: ValueToken): boolean {
	if (slot.type === 'terminal' && token.type === 'terminal') return slot.terminal === token.terminal || slot.terminal === token.value;

	if (slot.type === 'function' && token.type === 'function') return slot.function === token.function;

	if (slot.type === 'group' && token.type === 'group') return true;

	return false;
}

/**
 * Returns whether a variation is compatible with all entered tokens except
 * the one at `exceptIndex`.
 *
 * Used for filled columns so that every OTHER already-entered token constrains
 * the available alternatives at the current column — picking a different option
 * at column `i` must still be reachable given what has been typed at all other
 * filled positions.
 *
 * Returns false if the variation is too short to cover any required position.
 */
function isVariationCompatibleExcept(slots: Slot[], tokens: ValueToken[], prefixLen: number, exceptIndex: number): boolean {
	for (let i = 0; i < prefixLen; i++) {
		if (i === exceptIndex) continue;
		if (i >= slots.length) return false;
		if (!slotMatchesToken(slots[i], tokens[i])) return false;
	}
	return true;
}

/**
 * Determines whether a variation is compatible with the portion of `semanticTokens`
 * spanning indices `[0, checkUpTo)`.
 *
 * A variation is compatible when every semantic slot at positions `0..checkUpTo-1`
 * matches the corresponding entered token. If `checkUpTo` is 0, all variations
 * are trivially compatible (no prefix to validate).
 *
 * @param semanticSlots  - Pre-computed semantic slots for the variation under test
 * @param semanticTokens - The entered tokens stripped of combinators and literals
 * @param checkUpTo      - How many leading slots to validate (exclusive upper bound)
 * @returns `true` when the variation's prefix is consistent with the entered tokens
 */
function isVariationCompatible(slots: Slot[], tokens: ValueToken[], checkUpTo: number): boolean {
	for (let index = 0; index < checkUpTo; index++) {
		if (!slotMatchesToken(slots[index], tokens[index])) return false;
	}
	return true;
}

/**
 * Collects the unique, valid slot options for a single schema column `i`.
 *
 * Two different compatibility strategies are applied depending on whether the
 * column is already filled:
 *
 * - **Filled column** (`index < prefixLen`): validate all other filled positions
 *   except the current column itself (`isVariationCompatibleExcept`). This means
 *   the shown alternatives are only those reachable when every OTHER already-entered
 *   token stays in place — ruling out options that would invalidate the rest of the
 *   entered sequence.
 * - **Unfilled column** (`index >= prefixLen`): validate the entire entered prefix
 *   (`isVariationCompatible`). Shows only continuations reachable from what has
 *   already been typed.
 *
 * Variations that are too short to reach column `index` are skipped. Duplicate
 * slots (same key) are deduplicated. Group slots recurse with a clean context
 * because their inner tokens are managed independently.
 *
 * @param index          - The zero-based schema column index being built
 * @param tokens         - Entered value tokens stripped of noise
 * @param prefixLen      - Number of tokens the user has entered so far
 * @param variations     - All structural variations to search
 * @returns The unique, valid `Slot` options for column `index`
 */
function collectColumnOptions(index: number, tokens: ValueToken[], prefixLen: number, variations: SimplifiedVariation[]): Slot[] {
	const isFilled = index < prefixLen;

	const seen = new Set<string>();
	const options: Slot[] = [];

	for (const variation of variations) {
		// Skip variations that don't have a slot at this column.
		if (variation.length <= index) continue;

		// For filled columns: validate all other entered positions (not this one), so
		// that the alternatives shown are only those reachable given the full context.
		// For unfilled columns: validate only the entered prefix (existing look-ahead rule).
		const compatible = isFilled ? isVariationCompatibleExcept(variation, tokens, prefixLen, index) : isVariationCompatible(variation, tokens, prefixLen);

		if (!compatible) continue;

		const slot = variation[index];
		const key = getTokenKey(slot);

		// Only add each unique slot once per column.
		if (seen.has(key)) continue;
		seen.add(key);

		// Group and non-group slots are pushed as-is; the constraint on SlotGroup is
		// resolved lazily by match and UI utilities (no need to pre-expand here).
		options.push(slot);
	}

	return options;
}

/**
 * Derives a context-aware positional schema from a set of structural variations,
 * filtered by the value tokens the user has already entered.
 *
 * The schema is a 2-D array where `schema[i]` lists every unique slot option
 * that is valid at column `i` given the current input. Each column is built by
 * `collectColumnOptions`, which applies the look-ahead rule:
 *
 * - **Filled columns** show all alternatives (not just the typed one), letting
 *   the user switch to a different valid option at that position.
 * - **Unfilled columns** show only continuations reachable from the current prefix.
 *
 * When `valueTokens` is empty or `null` the schema reflects the full variation
 * space with no filtering applied.
 *
 * @param valueTokens - Parsed tokens from the current CSS value, or `null`/`undefined` if empty
 * @param variations  - The full set of structural variations to analyse
 * @returns `schema[slotIndex]` — unique valid options for each schema column
 */
export function deriveSchema(valueTokens: ValueToken[] | null | undefined, variations: SimplifiedVariation[]): Schema {
	const tokens = valueTokens ?? [];

	// Determine the schema width from the longest variation.
	const columnCount = variations.reduce((max, variation) => Math.max(max, variation.length), 0);

	// Build each column by filtering variations according to the look-ahead rule and deduplicating slots.
	return Array.from({ length: columnCount }, (_, index) => collectColumnOptions(index, tokens, tokens.length, variations));
}
