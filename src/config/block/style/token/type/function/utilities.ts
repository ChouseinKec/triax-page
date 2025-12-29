// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { TokenParam, StyleValue, TokenRaw, TokenOptionParams, TokenCanonical } from '@/src/core/block/style/types';

// Utilities
import { extractBetween } from '@/src/shared/utilities/string';

/**
 * Checks if the input string is a valid CSS data function (e.g., 'fit-content(10px)', 'calc(100% - 20px)').
 * @param input - The string to check.
 */
export function getTokenType(tokenRaw: TokenRaw): 'function' | undefined {
	// Check if the input is a function format
	return /^([a-zA-Z0-9-]+)\((.*)\)$/.test(tokenRaw) ? 'function' : undefined;
}

export function getTokenCanonical(tokenRaw: TokenRaw): TokenCanonical | undefined {
	// Function: e.g. fit-content(<length [10,20]>)
	const match = tokenRaw.match(/^([a-zA-Z0-9-]+)\((.*)\)$/);
	if (match) return `${match[1]}()`;
}

/**
 * Checks if a value is a CSS function (e.g., 'fit-content(10px)', 'calc(100% - 20px)').
 * @param input - The string to check.
 */
export function getValueType(styleValue: StyleValue): 'function' | undefined {
	return /^([a-zA-Z0-9-]+)\((.*)\)$/.test(styleValue) ? 'function' : undefined;
}

export function getValueToken(styleValue: StyleValue): string | undefined {
	return getValueType(styleValue) === 'function' ? getTokenCanonical(styleValue) : undefined;
}

/**
 * Extracts the parameter syntax from a function token string.
 *
 * @param tokenRaw - The function token string (e.g., 'fit-content(<length>)')
 */
export function getTokenParam(tokenRaw: TokenRaw): TokenParam | undefined {
	return extractBetween(tokenRaw, '()') ? { syntax: extractBetween(tokenRaw, '()')! } : undefined;
}

/**
 * Creates a OptionFunctionDefinition object for a given function token.
 *
 * @param token - The function token string (e.g., 'calc(<length>|<percentage>)')
 */
export function createOption(params: TokenOptionParams): OptionDefinition | undefined {
	const tokenCanonical = params.tokenCanonical;
	const tokenBase = params.tokenBase;
	const tokenRaw = params.tokenRaw;
	const tokenParam = getTokenParam(tokenRaw);

	// If any of these are undefined or empty, return undefined
	if (!tokenCanonical || !tokenBase || !tokenParam) return undefined;

	// Get default value from registered tokens
	const tokenDefinitions = params.tokenDefinitions;
	const defaultValue = tokenDefinitions[`<${tokenBase}>`]?.default;
	if (!defaultValue) return undefined;

	// Create and return the OptionFunctionDefinition object
	return {
		name: tokenCanonical,
		value: defaultValue,
		syntax: tokenParam.syntax,
		category: 'function',
		type: 'function',
	};
}
