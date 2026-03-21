// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { TerminalToken, TerminalParam, StyleKey, Value } from '@/core/block/style/types';

// Utilities
import { isValueGradient } from '@/shared/utilities/value';

/**
 * Converts a CSS value string to its canonical `<gradient>` token.
 *
 * Matches any standard CSS gradient function including their repeating variants:
 * `linear-gradient()`, `radial-gradient()`, `conic-gradient()` and their
 * `repeating-*` counterparts.
 *
 * @param value - The CSS value string to test.
 * @returns `'<gradient>'` if the value is a gradient function, otherwise `undefined`.
 * @see matchToken
 */
export function matchValue(value: Value): '<gradient>' | undefined {
	return isValueGradient(value) ? '<gradient>' : undefined;
}

/**
 * Determines whether a terminal token represents a CSS `<gradient>` type.
 *
 * @param terminalToken - The terminal token to test.
 * @returns `'<gradient>'` if the token is `'<gradient>'`, otherwise `undefined`.
 */
export function matchToken(terminalToken: TerminalToken): '<gradient>' | undefined {
	if (terminalToken.startsWith('<gradient') && terminalToken.endsWith('>')) return '<gradient>';
	return undefined;
}

/**
 * Returns the default `Value` for a `<gradient>` terminal token.
 *
 * @param terminalToken - The terminal token whose default is requested.
 * @returns A minimal linear gradient value, or `undefined` for non-gradient tokens.
 */
export function getDefault(terminalToken: TerminalToken): Value | undefined {
	if (!matchToken(terminalToken)) return undefined;
	return 'linear-gradient(to right, rgba(0,0,0,1), rgba(255,255,255,1))';
}

/**
 * Builds an `OptionDefinition` for a `<gradient>` terminal token.
 *
 * @param terminalToken - The terminal token (must be `'<gradient>'`).
 * @returns An `OptionDefinition` of type `'gradient'`, or `undefined` for non-gradient tokens.
 */
export function createOption(terminalToken: TerminalToken, _terminalParam: TerminalParam, _styleKey: StyleKey): OptionDefinition | undefined {
	const defaultValue = getDefault(terminalToken);
	if (!defaultValue) return undefined;

	return {
		name: 'gradient',
		value: defaultValue,
		category: 'other',
		type: 'gradient',
	};
}
