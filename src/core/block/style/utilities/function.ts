// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { OptionFunctionDefinition } from '@/src/core/block/style/types/option';

// Utilities
import { getValueToken } from './value';

/**
 * Extracts the function name from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 */
export function extractFunctionName(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\(/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the function value (the content inside parentheses) from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 */
export function extractFunctionArgs(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\((.*)\)$/);
	return match ? match[2] : undefined;
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
export function filterFunctionOptions(options: OptionDefinition[]): OptionFunctionDefinition[] {
	return options.filter((opt): opt is OptionFunctionDefinition => opt.category === 'function');
}

/**
 * Finds the matching function option for the given value based on token matching.
 * Falls back to the first option if no match is found.
 * @param options - Array of function options to search in.
 * @param value - The value to match against.
 */
export function matchFunctionOption(options: OptionFunctionDefinition[], value: string): OptionFunctionDefinition | undefined {
	if (options.length === 0) return undefined;

	const match = options.find((opt) => getValueToken(value) === getValueToken(opt.value));
	return match || options[0];
}
