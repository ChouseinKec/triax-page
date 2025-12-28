// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { TokenParam, StyleValue, TokenSyntax } from '@/src/core/block/style/types';

// Utilities
import { getTokenCanonical, getTokenBase } from '@/src/core/block/style/utilities/token';
import { extractBetween } from '@/src/shared/utilities/string';

// Registry
import { getRegisteredTokens } from '@/src/core/block/style/registries';

/**
 * Checks if the input string is a valid CSS data function (e.g., 'fit-content(10px)', 'calc(100% - 20px)').
 * @param input - The string to check.
 */
export function getTokenType(input: string): 'function' | undefined {
	// Check if the input is a function format
	return /^([a-zA-Z0-9-]+)\((.*)\)$/.test(input) ? 'function' : undefined;
}

/**
 * Checks if a value is a CSS function (e.g., 'fit-content(10px)', 'calc(100% - 20px)').
 * @param input - The string to check.
 */
export function getValueType(styleValue: StyleValue): 'function' | undefined {
	return /^([a-zA-Z0-9-]+)\((.*)\)$/.test(styleValue) ? 'function' : undefined;
}

export function getValueToken(styleValue: StyleValue): '<function>' | undefined {
	return getValueType(styleValue) === 'function' ? '<function>' : undefined;
}

/**
 * Extracts the parameter syntax from a function token string.
 *
 * @param tokenSyntax - The function token string (e.g., 'fit-content(<length>)')
 */
export function getTokenParam(tokenSyntax: TokenSyntax): TokenParam | undefined {
	return extractBetween(tokenSyntax, '()') ? { type: 'function', syntax: extractBetween(tokenSyntax, '()')! } : undefined;
}

/**
 * Creates a OptionFunctionDefinition object for a given function token.
 *
 * @param token - The function token string (e.g., 'calc(<length>|<percentage>)')
 */
export function createOption(token: string): OptionDefinition | undefined {
	// Extract the canonical name, base name, and syntax from the token
	const canonicalName = getTokenCanonical(token);
	const baseName = getTokenBase(token);
	const param = getTokenParam(token);

	// If any of these are undefined or empty, return undefined
	if (!canonicalName || !baseName || !param || param.type !== 'function') return undefined;

	// Get the registered tokens to find the default value
	const tokens = getRegisteredTokens();
	const defaultValue = tokens[baseName]?.default;

	// If no default value is defined for this function, return undefined
	if (!defaultValue) return undefined;

	// Create and return the OptionFunctionDefinition object
	return {
		name: canonicalName,
		value: defaultValue, // Use the syntax as the initial value
		syntax: param.syntax,
		category: 'function',
		type: 'function',
	};
}
