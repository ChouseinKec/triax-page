// Types
import type { TerminalParam, TerminalToken, Value } from '@/core/block/style/types';
import type { OptionDefinition } from '@/shared/components/types/option';

// Utilities
import { isValueNumber, isValueInteger } from '@/shared/utilities/value';

/**
 * Converts a CSS value string to its canonical number token representation.
 *
 * Delegates to `isValueNumber` to validate the value. Returns the canonical
 * `'<number>'` string when the value is a valid CSS number, or `undefined`
 * when it belongs to a different value type.
 *
 * @param Value - The CSS value string to convert.
 * @returns The canonical string `'<number>'` if the value is a number,
 *   otherwise `undefined`.
 * @see matchToken
 */
export function matchValue(Value: Value): '<number>' | undefined {
	// Integers are a subset of numbers but should be classified as <integer> first.
	// Only match as <number> when the value is not a whole integer.
	return isValueNumber(Value) && !isValueInteger(Value) ? '<number>' : undefined;
}

/**
 * Determines whether a terminal token represents a CSS `<number>` type.
 *
 * Checks that the token begins with `<number` and ends with `>`, covering
 * both the bare `<number>` keyword and parameterised variants such as
 * `<number [0,25]>`. Returns `undefined` for tokens that belong to a
 * different terminal type.
 *
 * @param terminalToken - The terminal token to test (e.g. `'<number>'`).
 * @returns The canonical string `'<number>'` if the token is a number
 *   terminal, otherwise `undefined`.
 * @see matchValue
 */
export function matchToken(terminalToken: TerminalToken): '<number>' | undefined {
	if (terminalToken.startsWith('<number') && terminalToken.endsWith('>')) return '<number>';
	return undefined;
}


/**
 * Returns the default `Value` for a number terminal token.
 *
 * Delegates to `matchToken` to verify the token is a recognised number
 * terminal before supplying a fallback value of `'0.0'`. Returns `undefined`
 * for tokens that do not map to `<number>`.
 *
 * @param terminalToken - The terminal token whose default value is requested.
 * @returns The default CSS number value `'0.0'` when the token matches a
 *   number terminal, otherwise `undefined`.
 * @see matchToken
 */
export function getDefault(terminalToken: TerminalToken): Value | undefined {
	// First check if the terminal matches a known number type
	const matchedTerminal = matchToken(terminalToken);
	if (!matchedTerminal) return undefined;

	return '1.0';
}

/**
 * Builds an `OptionDefinition` for a number terminal token.
 *
 * Resolves a default value via `getDefault`; if the token is not a recognised
 * number terminal the function returns `undefined`. Otherwise it returns an
 * option descriptor of type `'number'` suitable for populating a numeric
 * slot editor, with optional `min`/`max` bounds sourced from `terminalParam`.
 *
 * @param terminalToken - The terminal token for which the option is created
 *   (e.g. `'<number [0,25]>'`).
 * @param terminalParam - Optional parameter object carrying `min`/`max` range
 *   constraints extracted from the original token string.
 * @returns An `OptionDefinition` of type `'number'` when the token is a valid
 *   number terminal, otherwise `undefined`.
 * @see getDefault
 * @see extractParam
 */
export function createOption(terminalToken: TerminalToken, terminalParam: TerminalParam): OptionDefinition | undefined {
	const defaultValue = getDefault(terminalToken);
	if (!defaultValue) return undefined;

	return {
		name: 'number',
		value: defaultValue,
		category: 'other',
		icon: undefined,
		min: terminalParam?.min,
		max: terminalParam?.max,
		type: 'number',
	};
}
