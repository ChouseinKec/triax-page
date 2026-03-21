// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { TerminalToken, StyleKey, TerminalParam, Value } from '@/core/block/style/types';

/**
 * CSS identifier pattern: optionally prefixed with a hyphen, then a letter or
 * underscore, followed by any mix of letters, digits, hyphens, or underscores.
 * This intentionally matches identifiers with uppercase letters (e.g. font
 * family names like "Geist" or "TimesNewRoman") that the <keyword> terminal
 * rejects.
 */
const CUSTOM_IDENT_RE = /^-?[a-zA-Z_][a-zA-Z0-9_-]*$/;

/**
 * Converts a CSS value string to its canonical `<custom-ident>` token.
 *
 * Accepts any CSS identifier that is not a pure lowercase-hyphen keyword
 * (those are handled by `<keyword>`). Returns `undefined` for values that do
 * not look like identifiers (numbers, dimensions, quoted strings, etc.).
 */
export function matchValue(value: Value): '<custom-ident>' | undefined {
	if (!CUSTOM_IDENT_RE.test(value)) return undefined;
	// Pure lowercase-hyphen identifiers belong to <keyword>; skip them here.
	if (/^[a-z-]+$/.test(value)) return undefined;
	return '<custom-ident>';
}

/**
 * Determines whether a terminal token represents a `<custom-ident>` type.
 */
export function matchToken(terminalToken: TerminalToken): '<custom-ident>' | undefined {
	if (terminalToken.startsWith('<') || terminalToken.endsWith('>')) return undefined;
	if (!CUSTOM_IDENT_RE.test(terminalToken)) return undefined;
	if (/^[a-z-]+$/.test(terminalToken)) return undefined;
	return '<custom-ident>';
}

/**
 * Returns the default `Value` for a `<custom-ident>` terminal token.
 */
export function getDefault(terminalToken: TerminalToken): Value | undefined {
	const matched = matchToken(terminalToken);
	if (!matched) return undefined;
	return terminalToken;
}

/**
 * `<custom-ident>` has no predefined option set — it is always a free-text
 * identifier, so no `OptionDefinition` can be produced.
 */
export function createOption(_terminalToken: TerminalToken, _terminalParam: TerminalParam, _styleKey: StyleKey): OptionDefinition | undefined {
	return undefined;
}
