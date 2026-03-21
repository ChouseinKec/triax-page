// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { Value } from '@/core/block/style/types';
import type { TerminalToken } from '@/core/block/style/types';

// Utilities
import { isValueColor } from '@/shared/utilities/value';

/**
 * Converts a CSS value string to its canonical color token representation.
 * Converts recognized color values to '<color>'.
 * If the value type is not recognized as a color, returns undefined.
 * @param input - The CSS value string to convert.
 */
export function matchValue(value: Value): '<color>' | undefined {
	return isValueColor(value) ? '<color>' : undefined;
}

/**
 * Determines whether a terminal token represents a CSS `<color>` type.
 *
 * Checks that the token begins with `<color` and ends with `>`, covering
 * both the bare `<color>` keyword and parameterised variants.
 * Returns the canonical `'<color>'` string when matched, or `undefined`
 * when the token belongs to a different terminal type.
 *
 * @param terminalToken - The terminal token to test (e.g. `'<color>'`).
 * @returns The canonical string `'<color>'` if the token is a color terminal,
 *   otherwise `undefined`.
 * @see matchValue
 */
export function matchToken(terminalToken: TerminalToken): '<color>' | undefined {
	if (terminalToken.startsWith('<color') && terminalToken.endsWith('>')) return '<color>';

	return undefined;
}

/**
 * Returns the default `Value` for a color terminal token.
 *
 * Delegates to `matchToken` to verify the token is a recognized color
 * terminal before supplying a fallback value. Returns `undefined` for
 * tokens that do not map to `<color>`.
 *
 * @param terminalToken - The terminal token whose default value is requested.
 * @returns A default CSS color value (e.g. `'#ffffff'`) when the token
 *   matches a color terminal, otherwise `undefined`.
 * @see matchToken
 */
export function getDefault(terminalToken: TerminalToken): Value | undefined {
	// First check if the terminal matches a known color type
	const matchedTerminal = matchToken(terminalToken);
	if (!matchedTerminal) return undefined;

	// Return a default value
	return '#ffffff';
}

/**
 * Builds an `OptionDefinition` for a color terminal token.
 *
 * Resolves a default value via `getDefault`; if the token is not a
 * recognized color terminal the function returns `undefined`. Otherwise it
 * returns an option descriptor suitable for populating a colour-swatch slot
 * editor in the style inspector.
 *
 * @param terminalToken - The terminal token for which the option is created
 *   (e.g. `'<color>'`).
 * @returns An `OptionDefinition` of type `'color'` when the token is a valid
 *   color terminal, otherwise `undefined`.
 * @see getDefault
 */
export function createOption(terminalToken: TerminalToken): OptionDefinition | undefined {
	const defaultValue = getDefault(terminalToken);
	if (!defaultValue) return undefined;

	return {
		name: 'color',
		value: defaultValue,
		category: 'other',
		type: 'color',
	};
}
