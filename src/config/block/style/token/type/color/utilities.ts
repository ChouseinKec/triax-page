// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { StyleValue } from '@/core/block/style/types';
import type { TokenOptionParams, TokenRaw, TokenCanonical } from '@/core/block/style/types';

// Utilities
import { isValueColor } from '@/shared/utilities/value';

export function getTokenCanonical(tokenRaw: TokenRaw): TokenCanonical | undefined {
	if (tokenRaw.startsWith('<color') && tokenRaw.endsWith('>')) return '<color>';

	return undefined;
}

/**
 * Checks if the input string is a valid CSS data color (e.g., '<color>').
 * @param input - The string to check.
 */
export function getTokenType(tokenRaw: TokenRaw): 'color' | undefined {
	return tokenRaw === '<color>' ? 'color' : undefined;
}

/**
 * Checks if a value is a CSS color (e.g., '#ff0000', 'rgb(255,0,0)', 'hsl(0,100%,50%)').
 * @param input - The string to check.
 */
export function getValueType(styleValue: StyleValue): 'color' | undefined {
	return isValueColor(styleValue) ? 'color' : undefined;
}

/**
 * Converts a CSS value string to its canonical color token representation.
 * Converts recognized color values to '<color>'.
 * If the value type is not recognized as a color, returns undefined.
 * @param input - The CSS value string to convert.
 */
export function getValueToken(styleValue: StyleValue): '<color>' | undefined {
	return getValueType(styleValue) === 'color' ? '<color>' : undefined;
}

/**
 * Creates a color option for a given token (e.g., 'color').
 *
 * @param token - The color token string (e.g., 'color')
 */
export function createOption(params: TokenOptionParams): OptionDefinition | undefined {
	const tokenDefinitions = params.tokenDefinitions;

	const defaultValue = tokenDefinitions['<color>']?.default;
	if (!defaultValue) return undefined;

	return {
		name: 'color',
		value: defaultValue,
		category: 'other',
		type: 'color',
	};
}
