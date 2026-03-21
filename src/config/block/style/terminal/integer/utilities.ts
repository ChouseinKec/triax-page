// Types
import type { TerminalParam, TerminalToken, Value } from '@/core/block/style/types';
import type { OptionDefinition } from '@/shared/components/types/option';

// Utilities
import { isValueInteger } from '@/shared/utilities/value';

/**
 * Converts a CSS value string to its canonical integer token representation.
 *
 * Delegates to `isValueInteger` to validate the value. Returns the canonical
 * `'<integer>'` string when the value is a valid CSS integer, or `undefined`
 * when it belongs to a different value type.
 *
 * @param value - The CSS value string to convert.
 * @returns The canonical string `'<integer>'` if the value is an integer,
 *   otherwise `undefined`.
 * @see matchToken
 */
export function matchValue(value: Value): '<integer>' | undefined {
	return isValueInteger(value) ? '<integer>' : undefined;
}

/**
 * Determines whether a terminal token represents a CSS `<integer>` type.
 *
 * Checks that the token begins with `<integer` and ends with `>`, covering
 * both the bare `<integer>` keyword and parameterised variants such as
 * `<integer [0,25]>`. Returns `undefined` for tokens that belong to a
 * different terminal type.
 *
 * @param terminalToken - The terminal token to test (e.g. `'<integer>'`).
 * @returns The canonical string `'<integer>'` if the token is an integer
 *   terminal, otherwise `undefined`.
 * @see matchValue
 */
export function matchToken(terminalToken: TerminalToken): '<integer>' | undefined {
	if (terminalToken.startsWith('<integer') && terminalToken.endsWith('>')) return '<integer>';
	return undefined;
}

/**
 * Returns the default `Value` for an integer terminal token.
 *
 * Delegates to `matchToken` to verify the token is a recognised integer
 * terminal before supplying a fallback value of `'0'`. Returns `undefined`
 * for tokens that do not map to `<integer>`.
 *
 * @param terminalToken - The terminal token whose default value is requested.
 * @returns The default CSS integer value `'0'` when the token matches an
 *   integer terminal, otherwise `undefined`.
 * @see matchToken
 */
export function getDefault(terminalToken: TerminalToken): Value | undefined {
	// First check if the terminal matches a known integer type
	const matchedTerminal = matchToken(terminalToken);
	if (!matchedTerminal) return undefined;

	// Return a default value
	return '1';
}

/**
 * Builds an `OptionDefinition` for an integer terminal token.
 *
 * Resolves a default value via `getDefault`; if the token is not a recognised
 * integer terminal the function returns `undefined`. Otherwise it returns an
 * option descriptor of type `'number'` suitable for populating a numeric
 * slot editor, with optional `min`/`max` bounds sourced from `terminalParam`.
 *
 * @param terminalToken - The terminal token for which the option is created
 *   (e.g. `'<integer [0,25]>'`).
 * @param terminalParam - Optional parameter object carrying `min`/`max` range
 *   constraints extracted from the original token string.
 * @returns An `OptionDefinition` of type `'number'` when the token is a valid
 *   integer terminal, otherwise `undefined`.
 * @see getDefault
 */
export function createOption(terminalToken: TerminalToken, terminalParam: TerminalParam): OptionDefinition | undefined {
	const defaultValue = getDefault(terminalToken);
	if (!defaultValue) return undefined;

	return {
		name: 'integer',
		value: defaultValue,
		category: 'other',
		icon: undefined,
		min: terminalParam?.min,
		max: terminalParam?.max,
		type: 'number',
	};
}
