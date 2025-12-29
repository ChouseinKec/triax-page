// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { StyleValue } from '@/src/core/block/style/types';
import type { TokenOptionParams, TokenRaw, TokenCanonical } from '@/src/core/block/style/types';

/**
 * Checks if the input string is a valid CSS data keyword (e.g., 'auto', 'fit-content').
 * @param input - The string to check.
 */
export function getTokenType(tokenRaw: TokenRaw): 'keyword' | undefined {
	return /^[a-z-]+$/.test(tokenRaw) ? 'keyword' : undefined;
}

export function getTokenCanonical(tokenRaw: TokenRaw): TokenCanonical | undefined {
	if(tokenRaw.startsWith('<') || tokenRaw.endsWith('>')) return undefined;
	
	if (/^[a-z-]+$/.test(tokenRaw)) return tokenRaw;

	return undefined;
}

/**
 * Matches if the given value is a valid keyword.
 * @param value - The CSS value string to check.
 */
export function getValueType(styleValue: StyleValue): 'keyword' | undefined {
	return /^[a-z-]+$/.test(styleValue) ? 'keyword' : undefined;
}

/**
 * Converts a CSS value string to its keyword token representation.
 * @param input - The CSS value string to convert.
*/
export function getValueToken(styleValue: StyleValue): string | undefined {
	return getValueType(styleValue) === 'keyword' ? styleValue : undefined;
}

/**
 * Creates a keyword option for a given token.
 *
 * @param token - The keyword token string (e.g., 'auto')
 * @param key - The name of the CSS property being edited (for keyword options)
 */
export function createOption(params: TokenOptionParams): OptionDefinition | undefined {
	const tokenBase = params.tokenRaw;
	const styleDefinitions = params.styleDefinitions;
	const styleKey = params.styleKey;

	const styleIcons = styleDefinitions?.[styleKey]?.icons;
	const optionIcon = styleIcons?.[tokenBase];

	return {
		name: tokenBase,
		value: tokenBase,
		category: 'keyword',
		icon: optionIcon,
		type: 'keyword',
	};
}
