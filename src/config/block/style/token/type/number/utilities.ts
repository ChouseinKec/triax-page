// Types
import type { TokenOptionParams, TokenParam, TokenRaw, StyleValue, TokenCanonical } from '@/src/core/block/style/types';
import type { OptionDefinition } from '@/src/shared/components/types/option';

// Utilities
import { extractBetween } from '@/src/shared/utilities/string';
import { isValueNumber } from '@/src/shared/utilities/value';

/**
 * Matches if the given value is a valid CSS number.
 * @param value - The CSS value string to check.
 */
export function getValueType(styleValue: StyleValue): 'number' | undefined {
	return isValueNumber(styleValue) ? 'number' : undefined;
}

export function getValueToken(styleValue: StyleValue): '<number>' | undefined {
	return getValueType(styleValue) ? '<number>' : undefined;
}

/**
 * Checks if the input string is a valid CSS data number (e.g., '<number>' or '<number [0,25]>').
 * @param input - The string to check.
 */
export function getTokenType(tokenRaw: TokenRaw): 'number' | undefined {
	if (tokenRaw.startsWith('<number') && tokenRaw.endsWith('>')) return 'number';
	return undefined;
}

export function getTokenCanonical(tokenRaw: TokenRaw): TokenCanonical | undefined {
	if (tokenRaw.startsWith('<number') && tokenRaw.endsWith('>')) return '<number>';
	return undefined;
}

/**
 * Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.
 * @param tokenRaw - The CSS data type string (e.g., '<length [0,10]>').
 *
 */
export function getTokenParam(tokenRaw: TokenRaw): TokenParam | undefined {
	const range = extractBetween(tokenRaw, '[]');
	if (!range) return undefined;

	const rangeValues = range.split(',');

	if (rangeValues.length !== 2) return undefined;

	return { type: 'range', min: parseFloat(rangeValues[0]), max: parseFloat(rangeValues[1]) };
}

/**
 * Creates a NumberOptionData object for a given number token (e.g., '<number [0,25]>').
 *
 * @param params - The parameters containing the token syntax and registry
 */
export function createOption(params: TokenOptionParams): OptionDefinition {
	const tokenRaw = params.tokenRaw;
	const param = getTokenParam(tokenRaw);

	return {
		name: 'number',
		value: '0.0',
		category: 'other',
		icon: undefined,
		min: param?.type === 'range' ? param.min : undefined,
		max: param?.type === 'range' ? param.max : undefined,
		type: 'number',
	};
}
