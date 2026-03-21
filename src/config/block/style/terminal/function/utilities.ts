// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { StyleKey, StyleDefinition, TerminalParam, Value, TerminalToken, TerminalDefinition } from '@/core/block/style/types';

// Utilities
import { extractBefore, extractBetween, insertBetween } from '@/shared/utilities/string';
import { deriveConstraint, deriveVariations, getTerminalDefault } from '@/core/block/style/utilities';

// Managers
import { getNonTerminalDefinitions, getTerminalDefinitions } from '@/core/block/style/managers';

/**
 * Converts a CSS value string to its canonical function token representation.
 *
 * Accepts any string matching the pattern `name(...)` as a valid CSS function
 * value. Returns the canonical `'<function>'` key, or `undefined` when the
 * string does not match the function pattern.
 *
 * @param value - The CSS value string to convert.
 * @returns The canonical string `'<function>'` when the value is a valid CSS
 *   function call, otherwise `undefined`.
 * @see matchToken
 */
export function matchValue(value: Value): '<function>' | undefined {
	return /^([a-zA-Z0-9-]+)\((.*)\)$/.test(value) ? '<function>' : undefined;
}

/**
 * Determines whether a terminal token represents a CSS function type.
 *
 * Accepts tokens whose form is `name(...)` — an identifier followed by
 * parentheses that may contain any content (e.g. `'repeat(<integer>, <length>)'`,
 * `'fit-content(<length>)'`). Returns `undefined` for tokens that do not match
 * the function pattern.
 *
 * @param terminalToken - The terminal token to test.
 * @returns The canonical string `'<function>'` if the token is a function
 *   terminal, otherwise `undefined`.
 * @see matchValue
 */
export function matchToken(terminalToken: TerminalToken): '<function>' | undefined {
	const match = terminalToken.match(/^([a-zA-Z0-9-]+)\((.*)\)$/);
	if (match) return '<function>';

	return undefined;
}

/**
 * Returns the default `Value` for a function terminal token.
 *
 * Extracts the inner syntax from the token itself using `extractBetween`
 * (e.g. `'<length>,[start | end | near]?'` from
 * `'snap-block(<length>,[start | end | near]?)'`), then derives all structural
 * variations via `deriveConstraint` + `deriveVariations` and resolves the first
 * (simplest) variation into a real CSS value by substituting each terminal slot
 * with its registered default via `getTerminalDefault`.
 *
 * Falls back to `name()` when the token carries no inner syntax or when no
 * variation can be derived.
 *
 * @param terminalToken - The raw function token to resolve
 *   (e.g. `'repeat(<integer>, <length-percentage>)'`).
 * @returns A syntactically valid CSS function value such as `'repeat(1, 0px)'`,
 *   or `undefined` if the token is not a recognised function terminal.
 * @see matchToken
 * @see deriveConstraint
 * @see deriveVariations
 * @see getTerminalDefault
 */
/**
 * Recursively resolves the default argument string from a variation's slots.
 * Handles terminal, combinator, literal, group, and function slot types.
 */
function resolveVariationDefault(variation: ReturnType<typeof deriveVariations>[number], terminalDefinitions: ReturnType<typeof getTerminalDefinitions>, nonTerminalDefinitions: ReturnType<typeof getNonTerminalDefinitions>): string {
	let result = '';
	for (const slot of variation) {
		if (slot.type === 'terminal') {
			const val = getTerminalDefault(slot.terminal, terminalDefinitions) ?? slot.terminal;
			result += (result && !result.endsWith(',') ? ' ' : '') + val;
		} else if (slot.type === 'combinator') {
			result += slot.combinator;
		} else if (slot.type === 'literal') {
			result += (result ? ' ' : '') + slot.literal;
		} else if (slot.type === 'group') {
			// Resolve one repetition of the group's inner constraint
			const groupVariations = deriveVariations(slot.constraint);
			const groupFirst = groupVariations[0];
			if (groupFirst) {
				const groupVal = resolveVariationDefault(groupFirst, terminalDefinitions, nonTerminalDefinitions);
				if (groupVal) result += (result && !result.endsWith(',') ? ' ' : '') + groupVal;
			}
		} else if (slot.type === 'function') {
			// Resolve the function's default value by delegating to getDefault
			const key = insertBetween(slot.function, '()', slot.parameter);
			const val = getDefault(key);
			if (val) result += (result && !result.endsWith(',') ? ' ' : '') + val;
		}
	}
	return result;
}

export function getDefault(terminalToken: TerminalToken): Value | undefined {
	const matchedTerminal = matchToken(terminalToken);
	if (!matchedTerminal) return undefined;

	const terminalBase = extractBefore(terminalToken, '(');
	if (!terminalBase) return undefined;

	// Extract the inner syntax directly from the token
	const innerSyntax = extractBetween(terminalToken, '()');
	if (!innerSyntax) return `${terminalBase}()`;

	const nonTerminalDefinitions = getNonTerminalDefinitions();
	const terminalDefinitions = getTerminalDefinitions();

	// Derive the first (simplest) variation from the inner syntax
	const constraint = deriveConstraint(innerSyntax, nonTerminalDefinitions);
	const variations = deriveVariations(constraint);
	const firstVariation = variations[0];
	if (!firstVariation) return `${terminalBase}()`;

	// Build the default argument string from the variation's slots
	const defaultArgs = resolveVariationDefault(firstVariation, terminalDefinitions, nonTerminalDefinitions);

	return `${terminalBase}(${defaultArgs})`;
}

/**
 * Creates a `StyleDefinition` stub for editing a CSS function's arguments.
 *
 * Used to register the inner argument syntax of a function (e.g. the
 * `<integer>, <length-percentage>` part of `repeat()`) as a named style
 * definition so the slot editor can treat function arguments as a nested
 * property value.
 *
 * @param name - The CSS property key to use as the definition's identifier.
 * @param styleSyntaxRaw - The raw inner syntax string for the function arguments.
 * @returns A minimal `StyleDefinition` with the given key and syntax.
 */
export function createDefinition(name: StyleKey, styleSyntaxRaw: string): StyleDefinition {
	return {
		key: name,
		description: `Arguments for ${name} function`,
		syntax: styleSyntaxRaw,
	};
}

/**
 * Builds an `OptionDefinition` for a CSS function terminal.
 *
 * Delegates to `getDefault` to obtain a syntactically valid default value
 * (e.g. `'repeat(1, 0px)'`). The `terminalParam.syntax` is carried through
 * so the slot editor can open the function's inner argument editor.
 * Returns `undefined` when the token is not a recognised function terminal
 * or when the parameter object carries no inner syntax.
 *
 * @param terminalToken - The raw function token
 *   (e.g. `'repeat(<integer>, <length-percentage>)'`).
 * @param terminalParam - Parameter object that must carry the inner `syntax`
 *   string extracted from the original token.
 * @returns An `OptionDefinition` of type `'function'` when the token is valid,
 *   otherwise `undefined`.
 * @see getDefault
 */
export function createOption(terminalToken: TerminalToken, terminalParam: TerminalParam): OptionDefinition | undefined {
	const terminalBase = extractBefore(terminalToken, '(');
	if (!terminalBase) return undefined;

	const innerSyntax = terminalParam?.syntax;
	if (!innerSyntax) return undefined;

	const defaultValue = getDefault(terminalToken);
	if (!defaultValue) return undefined;

	return {
		name: `${terminalBase}()`,
		function: `${terminalBase}()`,
		value: defaultValue,
		syntax: innerSyntax,
		category: 'function',
		type: 'function',
	};
}
