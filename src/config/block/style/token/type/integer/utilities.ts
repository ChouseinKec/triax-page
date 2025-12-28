// Types
import type { TokenParam, TokenSyntax, StyleValue } from '@/src/core/block/style/types';
import type { OptionDefinition } from '@/src/shared/components/types/option';

// Utilities
import { extractBetween } from '@/src/shared/utilities/string';
import { isValueInteger } from '@/src/shared/utilities/value';

/**
 * Checks if the input string is a valid CSS data integer (e.g., '<integer>').
 * @param input - The string to check.
 */
export function getTokenType(token: string): 'integer' | undefined {
	if (token === '<integer>') return 'integer';

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
 * @param tokenSyntax - The CSS data type string (e.g., '<length [0,10]>').
 *
 */
export function getTokenParam(tokenSyntax: TokenSyntax): TokenParam | undefined {
	const range = extractBetween(tokenSyntax, '[]');
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
	const tokenSyntax = params.syntax.syntaxRaw;
	const param = getTokenParam(tokenSyntax);

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
