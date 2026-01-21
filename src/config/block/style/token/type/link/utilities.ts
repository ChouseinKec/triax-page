// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { TokenOptionParams, StyleValue, TokenCanonical, TokenRaw } from '@/core/block/style/types';

// Utilities
import { isValueLink } from '@/shared/utilities/value';

/**
 * Matches if the input string is a link.
 * @param input - The string to check.
 */
export function getValueType(styleValue: StyleValue): 'link' | undefined {
	return isValueLink(styleValue) ? 'link' : undefined;
}

export function getValueToken(styleValue: StyleValue): '<link>' | undefined {
	return getValueType(styleValue) ? '<link>' : undefined;
}

/**
 * Checks if the input string is a valid CSS data link (e.g., '<link>').
 * @param input - The string to check.
 */
export function getTokenType(tokenRaw: TokenRaw): 'link' | undefined {
	return tokenRaw === '<link>' ? 'link' : undefined;
}

export function getTokenCanonical(tokenRaw: TokenRaw): TokenCanonical | undefined {
	if (tokenRaw.startsWith('<link') && tokenRaw.endsWith('>')) return '<link>';
	
	return undefined;
}

/**
 * Creates a NumberOptionData object for a given number token (e.g., '<number [0,25]>').
 *
 * @param params - The parameters containing the token syntax and registry
 */
export function createOption(params: TokenOptionParams): OptionDefinition | undefined {
	const tokenDefinitions = params.tokenDefinitions;

	const tokenDefault = tokenDefinitions['<link>']?.default;
	if (!tokenDefault) return undefined;

	return {
		name: 'link',
		value: tokenDefault,
		category: 'other',
		icon: undefined,
		type: 'link',
	};
}
