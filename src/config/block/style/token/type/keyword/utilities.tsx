// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { StyleValue } from '@/src/core/block/style/types';


/**
 * Checks if the input string is a valid CSS data keyword (e.g., 'auto', 'fit-content').
 * @param input - The string to check.
 */
export function getTokenType(token: string): 'keyword' | undefined {
	return /^[a-z-]+$/.test(token) ? 'keyword' : undefined;
}

/**
 * Matches if the given value is a valid keyword.
 * @param value - The CSS value string to check.
 */
export function getValueType(styleValue: StyleValue): 'keyword' | undefined {
	return /^[a-z-]+$/.test(styleValue) ? 'keyword' : undefined;
}

/**
 * Converts a CSS value string to its keyword token representation.
 * @param input - The CSS value string to convert.
*/
export function getValueToken(styleValue: StyleValue): string | undefined {
	return getValueType(styleValue) === 'keyword' ? styleValue : undefined;
}

/**
 * Creates a keyword option for a given token.
 *
 * @param token - The keyword token string (e.g., 'auto')
 * @param key - The name of the CSS property being edited (for keyword options)
 */
export function createOption(token: string): OptionDefinition {
	return {
		name: token,
		value: token,
		category: 'keyword',
		icon: (
			<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
				<path d="M8.5 2.5a.5.5 0 0 0-1 0v3.586L4.5 4.793a.5.5 0 0 0-.707.707l2.5 2.5v.707l-2.5 2.5a.5.5 0 0 0 .707.707L7.5 9.914V13.5a.5.5 0 0 0 1 0V9.914l2.5 2.207a.5.5 0 0 0 .707-.707l-2.5-2.5v-.707l2.5-2.5a.5.5 0 0 0-.707-.707L8.5 6.086V2.5z" />
			</svg>
		),
		type: 'keyword',
	};
}
