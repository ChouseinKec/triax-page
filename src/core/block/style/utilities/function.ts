// Types
import type { OptionDefinition } from '@/shared/components/types/option';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Extracts the function name from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 */
export function extractFunctionName(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\(/);
	if (match) return match[1];
	return (devLog.warn('No function name found in input:', input), undefined);
}

/**
 * Extracts the function value (the content inside parentheses) from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 */
export function extractFunctionArgs(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\((.*)\)$/);
	if (match) return match[2];
	return (devLog.warn('No function arguments found in input:', input), undefined);
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
 * Finds the matching function option for the given value based on token matching.
 * Falls back to the first option if no match is found.
 * @param options - Array of function options to search in.
 * @param value - The value to match against.
 * @param terminals - The registered terminals.
 */
export function matchFunctionOption(options: OptionDefinition[], value: string): OptionDefinition | undefined {
	options.filter((opt): opt is OptionDefinition => opt.category === 'function');
    
	if (options.length === 0) return (devLog.warn('No function options provided to match against.'), undefined);
	const name = extractFunctionName(value);
	if (name) {
		const match = options.find((opt) => opt.function === `${name}()`);
		if (match) return match;
	}
	return options[0];
}
