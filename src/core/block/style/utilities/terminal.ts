// Types
import type { TerminalParam, TerminalToken, TerminalKey, TerminalDefault, TerminalDefinition, StyleKey } from '@/core/block/style/types';
import type { OptionDefinition } from '@/shared/components/types/option';

/**
 * Resolves the canonical `TerminalKey` for a raw terminal token.
 *
 * Iterates over each `TerminalDefinition` in order and returns the first
 * `TerminalKey` produced by a definition's `matchToken` method. The order
 * of `terminalDefinitions` therefore acts as a priority list — more specific
 * definitions should be placed before general ones.
 * Returns `undefined` when no definition recognises the token.
 *
 * @param terminalToken - The raw terminal token to resolve (e.g. `'<length [0,10]>'`, `'auto'`).
 * @param terminalDefinitions - Ordered list of terminal definitions to query.
 * @returns The matched `TerminalKey` (e.g. `'<length>'`) when a definition claims the token, otherwise `undefined`.
 * @see TerminalDefinition.matchToken
 */
export function matchTerminalToken(terminalToken: TerminalToken, terminalDefinitions: TerminalDefinition[]): TerminalKey | undefined {
	for (const terminal of terminalDefinitions) {
		const match = terminal.matchToken(terminalToken);
		if (match) return match;
	}

	return undefined;
}

/**
 * Retrieves the default value for a terminal token.
 *
 * Iterates over each `TerminalDefinition` in order and returns the first
 * non-undefined value produced by a definition's `getDefault` method.
 * Returns `undefined` when no definition recognises the token.
 *
 * @param terminalToken - The raw terminal token whose default is requested (e.g. `'<length>'`, `'<color>'`).
 * @param terminalDefinitions - Ordered list of terminal definitions to query.
 * @returns The `TerminalDefault` value for the terminal, or `undefined` if no definition claims the token.
 * @see TerminalDefinition.getDefault
 */
export function getTerminalDefault(terminalToken: TerminalToken, terminalDefinitions: TerminalDefinition[]): TerminalDefault | undefined {
	for (const terminal of terminalDefinitions) {
		const defaultValue = terminal.getDefault(terminalToken);
		if (defaultValue) return defaultValue;
	}

	return undefined;
}

/**
 * Builds the option list for a terminal at a specific schema position.
 *
 * Resolves the owning `TerminalDefinition` by delegating to
 * `matchTerminalToken`, then calls its `createOption` factory with the raw
 * token, parameter constraints, and style key. The returned options are used
 * to populate the slot editor (e.g. unit picker for `<length>`, colour
 * swatches for `<color>`). Returns an empty array when no definition claims
 * the token or the factory yields no options.
 *
 * @param terminalToken - The raw terminal token to resolve (e.g. `'<length [0,10]>'`, `'auto'`).
 * @param terminalParam - Optional parameter object carrying `min`/`max` range constraints extracted from the original token string.
 * @param terminalDefinitions - Ordered list of terminal definitions to query.
 * @param styleKey - The CSS property key forwarded to the factory for icon/keyword lookups.
 * @returns A flat array of `OptionDefinition` items, or an empty array if no definition claims the token.
 * @see matchTerminalToken
 * @see TerminalDefinition.createOption
 */
export function createTerminalOption(terminalToken: TerminalToken, terminalParam: TerminalParam, terminalDefinitions: TerminalDefinition[], styleKey: StyleKey): OptionDefinition[] {
	const terminalKey = matchTerminalToken(terminalToken, terminalDefinitions);
	if (!terminalKey) return [];

	const terminalDefinition = terminalDefinitions.find((definition) => definition.key === terminalKey);
	if (!terminalDefinition) return [];

	const terminalOption = terminalDefinition.createOption(terminalToken, terminalParam, styleKey);
	if (!terminalOption) return [];

	const options = Array.isArray(terminalOption) ? terminalOption : [terminalOption];
	return options.map((option) => ({ ...option, terminal: terminalKey }));
}
