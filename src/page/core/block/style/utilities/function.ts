import { getValueToken } from './value';
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { OptionFunctionDefinition } from '@/src/page/core/block/style/types/option';

/**
 * Extracts the function name from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 * @returns The function name (e.g., 'fit-content', 'repeat') or undefined if not a valid function call.
 * @example
 * extractFunctionName('fit-content(100px)') → 'fit-content'
 * extractFunctionName('repeat(1,100px)') → 'repeat'
 */
export function extractFunctionName(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\(/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the function value (the content inside parentheses) from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 * @returns The function value (e.g., '100px', '1,100px') or undefined if not a valid function call.
 * @example
 * extractFunctionArgs('fit-content(100px)') → '100px'
 * extractFunctionArgs('repeat(1,100px)') → '1,100px'
 */
export function extractFunctionArgs(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\((.*)\)$/);
	return match ? match[2] : undefined;
}

/**
 * Extracts the function name and value from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 * @returns An object containing the extracted name and value.
 * @example
 * extractFunctionValue('fit-content(100px)') → { name: 'fit-content', value: '100px' }
 * extractFunctionValue('repeat(1,100px)') → { name: 'repeat', value: '1,100px' }
 */
export function extractFunctionValue(input: string): { name: string | undefined; value: string | undefined } {
	const name = extractFunctionName(input);
	const value = extractFunctionArgs(input);
	return { name, value };
}

/**
 * Filters options to return only those with category "function".
 * @param options - Array of option objects, each with a category property.
 * @returns Array of options where category is "function".
 * @example
 * filterFunctionOptions([{category: "function", name: "repeat"}, {category: "other", name: "auto"}]) → [{category: "function", name: "repeat"}]
 */
export function filterFunctionOptions(options: OptionDefinition[]): OptionFunctionDefinition[] {
	return options.filter((opt): opt is OptionFunctionDefinition => opt.category === 'function');
}

/**
 * Finds the matching function option for the given value based on token matching.
 * Falls back to the first option if no match is found.
 * @param options - Array of function options to search in.
 * @param value - The value to match against.
 * @returns The matching option or the first option as fallback, or undefined if no options.
 * @example
 * matchFunctionOption([{name: "repeat", value: "repeat(2, 1fr)"}], "repeat(3, 2fr)") → {name: "repeat", value: "repeat(2, 1fr)"}
 */
export function matchFunctionOption(options: OptionFunctionDefinition[], value: string): OptionFunctionDefinition | undefined {
	if (options.length === 0) return undefined;

	const match = options.find((opt) => getValueToken(value) === getValueToken(opt.value));
	return match || options[0];
}
