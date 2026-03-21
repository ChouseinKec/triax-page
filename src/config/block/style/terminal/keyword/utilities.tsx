// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { TerminalToken, StyleKey, TerminalParam, Value } from '@/core/block/style/types';

// Managers
import { getStyleDefinitions } from '@/core/block/style/managers';


/**
 * Converts a CSS value string to its canonical keyword token representation.
 *
 * Accepts any string composed entirely of lowercase letters and hyphens as a
 * valid CSS keyword. Returns the value itself as its own token (e.g. `'auto'`
 * → `'auto'`), or `undefined` when the value contains characters that
 * indicate a non-keyword type.
 *
 * @param value - The CSS value string to convert.
 * @returns The original value string when it is a valid CSS keyword,
 *   otherwise `undefined`.
 * @see matchToken
 */
export function matchValue(value: Value): '<keyword>' | undefined {
	return /^[a-z-]+$/.test(value) ? '<keyword>' : undefined;
}

/**
 * Determines whether a terminal token represents a CSS `<keyword>` type.
 *
 * Rejects any token that is wrapped in angle brackets (i.e. belongs to
 * another terminal category such as `<length>` or `<color>`), then accepts
 * tokens whose characters are exclusively lowercase letters and hyphens
 * (e.g. `'auto'`, `'none'`, `'flex-start'`). Returns `undefined` for
 * tokens that do not match the keyword pattern.
 *
 * @param terminalToken - The terminal token to test (e.g. `'auto'`).
 * @returns The canonical string `'<keyword>'` if the token is a valid CSS
 *   keyword terminal, otherwise `undefined`.
 * @see matchValue
 */
export function matchToken(terminalToken: TerminalToken): '<keyword>' | undefined {
	// Reject tokens that look like other terminal types (e.g. '<length>', 'fit-content(10px)')
	if (terminalToken.startsWith('<') || terminalToken.endsWith('>')) return undefined;

	// Recognise any token that consists solely of lowercase letters and hyphens as a keyword
	if (/^[a-z-]+$/.test(terminalToken)) return '<keyword>';

	return undefined;
}


/**
 * Returns the default `Value` for a keyword terminal token.
 *
 * Delegates to `matchToken` to verify the token is a recognised keyword
 * terminal, then returns the token itself as its own default value — for
 * keywords the token string and the CSS value are identical (e.g. `'auto'`).
 * Returns `undefined` for tokens that do not map to `<keyword>`.
 *
 * @param terminalToken - The terminal token whose default value is requested.
 * @returns The token string as a CSS value when the token is a valid keyword
 *   terminal, otherwise `undefined`.
 * @see matchToken
 */
export function getDefault(terminalToken: TerminalToken): Value | undefined {
	// First check if the terminal matches a known keyword type
	const matchedTerminal = matchToken(terminalToken);
	if (!matchedTerminal) return undefined;

	// Return the terminalToken itself as the default value
	return terminalToken;
}

/**
 * Builds an `OptionDefinition` for a keyword terminal token.
 *
 * Resolves a default value via `getDefault`; if the token is not a recognised
 * keyword terminal the function returns `undefined`. Looks up any icon
 * registered for the keyword under the owning style definition's `icons` map
 * and merges it into the descriptor when present. The returned option is
 * suitable for populating a keyword-selector slot editor.
 *
 * @param terminalToken - The keyword token for which the option is created
 *   (e.g. `'auto'`, `'none'`).
 * @param terminalParam - Parameter object for the terminal slot (unused for
 *   keywords but kept for interface consistency).
 * @param styleKey - The CSS property key used to look up registered icons.
 * @returns An `OptionDefinition` of type `'keyword'` when the token is a
 *   valid keyword terminal, otherwise `undefined`.
 * @see getDefault
 */
export function createOption(terminalToken: TerminalToken, terminalParam: TerminalParam, styleKey: StyleKey): OptionDefinition | undefined {
	const defaultValue = getDefault(terminalToken);
	if (!defaultValue) return undefined;

	const styleDefinitions = getStyleDefinitions();
	if (!styleDefinitions) return undefined;

	const styleIcons = styleDefinitions?.[styleKey]?.icons;
	const optionIcon = styleIcons?.[terminalToken];

	return {
		name: terminalToken,
		value: defaultValue,
		category: 'keyword',
		...optionIcon && { icon: optionIcon },
		type: 'keyword',
	};
}
