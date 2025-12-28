// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { TokenSyntax, StyleValue } from '@/src/core/block/style/types';

// Utilities
import { isValueLink } from '@/src/shared/utilities/value';

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
export function getTokenType(input: string): 'link' | undefined {
	return input === '<link>' ? 'link' : undefined;
}

/**
 * Creates a NumberOptionData object for a given number token (e.g., '<number [0,25]>').
 *
 * @param params - The parameters containing the token syntax and registry
 */
export function createOption(params: TokenOptionParams): OptionDefinition {
	return {
		name: 'link',
		value: 'https://example.com',
		category: 'other',
		icon: undefined,
		type: 'link',
	};
}
