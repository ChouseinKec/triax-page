// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { TerminalToken, TerminalParam, StyleKey, Value } from '@/core/block/style/types';

/** Matches any value enclosed in matching double or single quotes. */
const STRING_RE = /^("([^"]*)")|('([^']*)')$/;

/**
 * Converts a CSS value string to its canonical `<string>` token.
 *
 * Returns `'<string>'` when the value is wrapped in matching double or single
 * quotes, `undefined` otherwise.
 *
 * @param value - The CSS value string to test.
 * @returns `'<string>'` if the value is a quoted string, otherwise `undefined`.
 */
export function matchValue(value: Value): '<string>' | undefined {
	return STRING_RE.test(value) ? '<string>' : undefined;
}

/**
 * Determines whether a terminal token represents a CSS `<string>` type.
 *
 * @param terminalToken - The terminal token to test.
 * @returns `'<string>'` if the token is `'<string>'`, otherwise `undefined`.
 */
export function matchToken(terminalToken: TerminalToken): '<string>' | undefined {
	return terminalToken === '<string>' ? '<string>' : undefined;
}

/**
 * Returns the default `Value` for a `<string>` terminal token.
 *
 * @param terminalToken - The terminal token whose default is requested.
 * @returns An empty double-quoted string `'""'`, or `undefined` for non-string tokens.
 */
export function getDefault(terminalToken: TerminalToken): Value | undefined {
	if (!matchToken(terminalToken)) return undefined;
	return '""';
}

/**
 * Builds an `OptionDefinition` for a `<string>` terminal token.
 *
 * @param terminalToken - The terminal token (must be `'<string>'`).
 * @returns An `OptionDefinition` of type `'string'`, or `undefined` for non-string tokens.
 */
export function createOption(terminalToken: TerminalToken, _terminalParam: TerminalParam, _styleKey: StyleKey): OptionDefinition | undefined {
	const defaultValue = getDefault(terminalToken);
	if (!defaultValue) return undefined;

	return {
		name: 'string',
		value: defaultValue,
		category: 'other',
		type: 'string',
	};
}
