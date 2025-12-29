// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { TokenTypeDefinitionRecord } from '@/src/core/block/style/types/';

// Utilities
import { getValueToken } from './value';
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Extracts the function name from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 */
export function extractFunctionName(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\(/);
	return match ? match[1] : devLog.warn('No function name found in input:', input), undefined;
}

/**
 * Extracts the function value (the content inside parentheses) from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 */
export function extractFunctionArgs(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\((.*)\)$/);
	return match ? match[2] : devLog.warn('No function arguments found in input:', input), undefined;
}

/**
 * Extracts the function name and value from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 */
export function extractFunctionValue(input: string): { name: string | undefined; value: string | undefined } {
	const name = extractFunctionName(input);
	const value = extractFunctionArgs(input);
	return { name, value };
}

/**
 * Filters options to return only those with category "function".
 * @param options - Array of option objects, each with a category property.
 */
export function filterFunctionOptions(options: OptionDefinition[]): OptionDefinition[] {
	return options.filter((opt): opt is OptionDefinition => opt.category === 'function');
}

/**
 * Finds the matching function option for the given value based on token matching.
 * Falls back to the first option if no match is found.
 * @param options - Array of function options to search in.
 * @param value - The value to match against.
 */
export function matchFunctionOption(options: OptionDefinition[], value: string, tokenTypeDefinitions: TokenTypeDefinitionRecord): OptionDefinition | undefined {
	if (options.length === 0) return devLog.warn('No function options provided to match against.'), undefined;

	const match = options.find((opt) => getValueToken(value, tokenTypeDefinitions) === getValueToken(opt.value, tokenTypeDefinitions));
	return match || options[0];
}
