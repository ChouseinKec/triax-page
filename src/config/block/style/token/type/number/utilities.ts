// Types
import type { TokenKey, TokenParam, TokenSyntax, StyleValue, TokenCanonical } from '@/src/core/block/style/types';
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
 * Checks if the input string is a valid CSS data number (e.g., '<number>').
 * @param input - The string to check.
 */
export function getTokenType(tokenCanonical: TokenCanonical): 'number' | undefined {
	return tokenCanonical === '<number>' ? 'number' : undefined;
}

/**
 * Extracts the range part from a CSS data type string, if present.
 * @param input - The CSS data type string (e.g., '<length [0,10]>').
 */
export function getTokenRange(tokenSyntax: TokenSyntax): string | undefined {
	const range = extractBetween(tokenSyntax, '[]');
	return range ? `[${range}]` : undefined;
}

/**
 * Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.
 * @param tokenSyntax - The CSS data type string (e.g., '<length [0,10]>').
 *
 */
export function getTokenParam(tokenSyntax: TokenSyntax): TokenParam | undefined {
	// Extract range/step from length or number tokens
	const range = getTokenRange(tokenSyntax);
	if (range) {
		const rangeValues = range.replace(/[\[\]]/g, '').split(',');
		if (rangeValues.length === 2) {
			return { type: 'range', min: parseFloat(rangeValues[0]), max: parseFloat(rangeValues[1]) };
		}
	}
	return undefined;
}

/**
 * Creates a NumberOptionData object for a given number token (e.g., '<number [0,25]>').
 *
 * @param params - The parameters containing the token syntax and registry
 */
export function createOption(params: TokenOptionParams): OptionDefinition {
	const tokenSyntax = params.syntax.syntaxRaw;
	const param = getTokenParam(tokenSyntax);

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
