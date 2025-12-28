// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { StyleValue } from '@/src/core/block/style/types';

// Utilities
import { isValueColor } from '@/src/shared/utilities/value';

/**
 * Checks if the input string is a valid CSS data color (e.g., '<color>').
 * @param input - The string to check.
 */
export function getTokenType(input: StyleValue): 'color' | undefined {
	return input === '<color>' ? 'color' : undefined;
}

/**
 * Checks if a value is a CSS color (e.g., '#ff0000', 'rgb(255,0,0)', 'hsl(0,100%,50%)').
 * @param input - The string to check.
 */
export function getValueType(styleValue: StyleValue): 'color' | undefined {
	return isValueColor(styleValue) ? 'color' : undefined;
}

/**
 * Converts a CSS value string to its canonical color token representation.
 * Converts recognized color values to '<color>'.
 * If the value type is not recognized as a color, returns undefined.
 * @param input - The CSS value string to convert.
 */
export function getValueToken(styleValue: StyleValue): '<color>' | undefined {
	return getValueType(styleValue) === 'color' ? '<color>' : undefined;
}

/**
 * Creates a color option for a given token (e.g., 'color').
 *
 * @param token - The color token string (e.g., 'color')
 */
export function createOption(token: string): OptionDefinition {
	return {
		name: 'color',
		value: '#000000',
		category: 'other',
		type: 'color',
	};
}
