// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { StyleKey, StyleSyntaxRaw, StyleDefinition, TokenParam, StyleValue, TokenRaw, TokenOptionParams, TokenCanonical, RegisteredTokens, RegisteredTokenTypes } from '@/core/block/style/types';

// Utilities
import { extractBetween, splitAdvanced, joinAdvanced } from '@/shared/utilities/string';
import { parseSyntax } from '@/core/block/style/utilities';
import { getTokenValues } from '@/core/block/style/utilities/';
import { extractSeparator } from '@/core/block/style/utilities';
import { devLog } from '@/shared/utilities/dev';

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

export function getDefaultValue(tokenParam: TokenParam, tokenDefinitions: RegisteredTokens, tokenTypeDefinitions: RegisteredTokenTypes): string {
	const parsedSyntax = parseSyntax(tokenParam.syntax.toString());
	const firstVariation = parsedSyntax[0];
	const separators = extractSeparator(firstVariation);
	const splitTokens = splitAdvanced(firstVariation);
	const tokenValues = getTokenValues(splitTokens, tokenDefinitions, tokenTypeDefinitions);
	return joinAdvanced(tokenValues, separators);
}

// Helper function to create a styleDefinition for function arguments
export function createDefinition(name: StyleKey, styleSyntaxRaw: StyleSyntaxRaw): StyleDefinition {
	return {
		key: name,
		description: `Arguments for ${name} function`,
		syntax: styleSyntaxRaw,
	};
}
/**
 * Creates a OptionFunctionDefinition object for a given function token.
 *
 * @param token - The function token string (e.g., 'calc(<length>|<percentage>)')
 */
export function createOption(params: TokenOptionParams): OptionDefinition | undefined {
	const tokenCanonical = params.tokenCanonical;
	const tokenRaw = params.tokenRaw;
	const tokenBase = params.tokenBase;

	const tokenParam = getTokenParam(tokenRaw);
	if (!tokenParam) return devLog.warn(`Unable to extract parameters from token "${tokenRaw}"`), undefined;

	const defaultValue = getDefaultValue(tokenParam, params.tokenDefinitions, params.tokenTypeDefinitions);
	if (!defaultValue) return devLog.warn(`Unable to determine default value for token "${tokenRaw}"`), undefined;

	// Create and return the OptionFunctionDefinition object
	return {
		name: tokenCanonical,
		value: `${tokenBase}(${defaultValue})`,
		syntax: tokenParam.syntax,
		category: 'function',
		type: 'function',
	};
}
