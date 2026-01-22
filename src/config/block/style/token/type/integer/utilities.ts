// Types
import type { TokenOptionParams, TokenParam, TokenRaw, TokenCanonical, StyleValue } from '@/core/block/style/definition/types';
import type { OptionDefinition } from '@/shared/components/types/option';

// Utilities
import { extractBetween } from '@/shared/utilities/string';
import { isValueInteger } from '@/shared/utilities/value';

/**
 * Checks if the input string is a valid CSS data integer (e.g., '<integer>' or '<integer [0,∞]>').
 * @param input - The string to check.
 */
export function getTokenType(tokenRaw: TokenRaw): 'integer' | undefined {
	if (tokenRaw.startsWith('<integer') && tokenRaw.endsWith('>')) return 'integer';
	return undefined;
}

export function getTokenCanonical(tokenRaw: TokenRaw): TokenCanonical | undefined {
	if (tokenRaw.startsWith('<integer') && tokenRaw.endsWith('>')) return '<integer>';
	return undefined;
}

/**
 * Matches if the given value is a valid CSS number.
 * @param value - The CSS value string to check.
 */
export function getValueType(styleValue: StyleValue): 'integer' | undefined {
	return isValueInteger(styleValue) ? 'integer' : undefined;
}

export function getValueToken(styleValue: StyleValue): '<integer>' | undefined {
	return getValueType(styleValue) === 'integer' ? '<integer>' : undefined;
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
export function createOption(params: TokenOptionParams): OptionDefinition | undefined {
	const tokenRaw = params.tokenRaw;
	const param = getTokenParam(tokenRaw);

	return {
		name: 'integer',
		value: '0',
		category: 'other',
		icon: undefined,
		min: param?.type === 'range' ? param.min : undefined,
		max: param?.type === 'range' ? param.max : undefined,
		type: 'number',
	};
}
