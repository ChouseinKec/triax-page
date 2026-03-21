// Types
import type { Slot, SlotTerminal, SlotFunction, SlotGroup, SlotOptionDefinition, StyleKey, TerminalDefinition, TerminalParam, Constraint } from '@/core/block/style/types';

// Utilities
import { createTerminalOption as resolveTerminalOption, createTokenFunction, deriveValueTokens, serializeValueTokens, buildVariationTokens } from '@/core/block/style/utilities';
import { deriveVariations } from '@/core/block/style/utilities/variation';
import { insertBetween } from '@/shared/utilities/string';

const terminalOptionCache = new Map<string, SlotOptionDefinition[]>();
const functionOptionCache = new Map<string, SlotOptionDefinition[]>();
const groupOptionsCache = new WeakMap<Constraint, SlotOptionDefinition[]>();

/**
 * Produces `SlotOptionDefinition[]` for a single terminal slot.
 *
 * Parses the optional `parameter` string (format: `"min,max"`) into numeric
 * bounds and delegates to `resolveTerminalOption` to build the actual option
 * list. Results are cached by `(terminal|parameter|styleKey)`.
 */
function createTerminalOption(slot: SlotTerminal, terminalDefinitions: TerminalDefinition[], styleKey: StyleKey): SlotOptionDefinition[] {
	const cacheKey = `${slot.terminal}|${slot.parameter ?? ''}|${styleKey}`;
	const cached = terminalOptionCache.get(cacheKey);
	if (cached !== undefined) return cached;

	// Parse optional "min,max" parameter into numeric bounds.
	const param: TerminalParam = {};
	const parts = slot.parameter?.split(',');
	if (parts?.length === 2) {
		param.min = parseFloat(parts[0]);
		param.max = parseFloat(parts[1]);
	}

	const result = resolveTerminalOption(slot.terminal, param, terminalDefinitions, styleKey).map((o) => ({ ...o, terminal: o.terminal as string, type: 'terminal' as const, token: { type: 'terminal' as const, terminal: o.terminal as string, value: o.value } }));

	terminalOptionCache.set(cacheKey, result);
	return result;
}

/**
 * Produces `SlotOptionDefinition[]` for a single function slot (e.g. `blur()`).
 *
 * The slot's parameter syntax is forwarded to `resolveTerminalOption` so it
 * can derive the default argument value. Results are cached by
 * `(function|parameter|styleKey)`.
 */
function createFunctionOption(slot: SlotFunction, terminalDefinitions: TerminalDefinition[], styleKey: StyleKey): SlotOptionDefinition[] {
	const cacheKey = `${slot.function}|${slot.parameter ?? ''}|${styleKey}`;
	const cached = functionOptionCache.get(cacheKey);
	if (cached !== undefined) return cached;

	// Build the full token string e.g. "blur(<length>)" for default resolution.
	const tokenString = insertBetween(slot.function, '()', slot.parameter);
	const result = resolveTerminalOption(tokenString, { syntax: slot.parameter }, terminalDefinitions, styleKey).map((o) => ({ ...o, terminal: o.terminal as string, type: 'function' as const, token: createTokenFunction(o.value, terminalDefinitions) }));

	functionOptionCache.set(cacheKey, result);
	return result;
}

/**
 * Produces `SlotOptionDefinition[]` for a repeating group slot.
 *
 * Iterates all variations of the group's inner constraint and emits:
 * - One **individual option** per single-token variation (terminal or function).
 * - One **aggregate `group` option** whose value is the longest multi-token
 *   variation, giving the user a way to enter the full compound value.
 *
 * Results are cached on the `constraint` object reference via a `WeakMap`, so
 * the cost is paid at most once per unique constraint.
 */
function createGroupOption(slot: SlotGroup, terminalDefinitions: TerminalDefinition[]): SlotOptionDefinition[] {
	const cached = groupOptionsCache.get(slot.constraint);
	if (cached !== undefined) return cached;

	const variations = deriveVariations(slot.constraint);
	const options: SlotOptionDefinition[] = [];
	const seen = new Set<string>(); // Deduplicate variations that serialise identically.

	// Track the longest multi-token variation to emit as the single group option.
	let longestMultiValue: string | null = null;
	let longestMultiLength = 0;

	for (const variation of variations) {
		const tokens = buildVariationTokens(variation, terminalDefinitions);
		if (!tokens) continue;

		const value = serializeValueTokens(tokens);
		if (!value || seen.has(value)) continue;
		seen.add(value);

		// Count only meaningful tokens — combinators are structural, not content.
		const content = variation.filter((s) => s.type !== 'combinator');

		if (content.length === 1) {
			// Single-token variation → emit as its own selectable option.
			const item = content[0];
			const isFunction = item.type === 'function';
			options.push({
				category: 'group',
				// Strip trailing digits from names like "color1" → "color".
				name: (isFunction ? item.function : value).replace(/[0-9]/g, ''),
				value,
				terminal: item.type === 'terminal' ? item.terminal : '<function>',
				type: isFunction ? 'function' : 'terminal',
				token: isFunction ? createTokenFunction(value, terminalDefinitions) : { type: 'terminal' as const, terminal: item.type === 'terminal' ? item.terminal : value, value },
			});
		} else if (content.length > longestMultiLength) {
			// Multi-token variation — keep track of the longest one.
			longestMultiLength = content.length;
			longestMultiValue = value;
		}
	}

	// Emit a single aggregate option for the longest multi-token variation.
	if (longestMultiValue !== null) {
		options.push({ category: 'group', name: 'group', value: longestMultiValue, terminal: '<group>', type: 'group', token: { type: 'group', tokens: deriveValueTokens(longestMultiValue, terminalDefinitions) } });
	}

	groupOptionsCache.set(slot.constraint, options);
	return options;
}

/**
 * Builds the complete `SlotOptionDefinition[]` for a positional slot array.
 *
 * Dispatches each slot to the appropriate creator based on its type and
 * concatenates their results into a single flat list for the slot's dropdown.
 *
 * @param slots - The `Slot[]` for the current value position (from `deriveSchema`).
 * @param terminalDefinitions - Terminal type registry used for default resolution.
 * @param styleKey - The CSS property key, forwarded to terminal option creators.
 */
export function createSlotOptions(slots: Slot[], terminalDefinitions: TerminalDefinition[], styleKey: StyleKey): SlotOptionDefinition[] {
	if (!slots?.length) return [];

	const options: SlotOptionDefinition[] = [];
	for (const slot of slots) {
		if (slot.type === 'terminal') options.push(...createTerminalOption(slot, terminalDefinitions, styleKey));
		else if (slot.type === 'function') options.push(...createFunctionOption(slot, terminalDefinitions, styleKey));
		else if (slot.type === 'group') options.push(...createGroupOption(slot, terminalDefinitions));
	}
	return options;
}
