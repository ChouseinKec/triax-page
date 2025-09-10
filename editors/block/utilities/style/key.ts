// Types
import type { StyleKeys } from '@/editors/block/types/core/style/style';
import type { Side, Corner } from '@/components/select/position/types';

// Constants
import { StyleDefinitions } from '@/constants/style/style';

/**
 * Validates if a given CSS property is valid according to the defined CSS properties.
 * Performs comprehensive validation with error logging for debugging.
 *
 * @param property - The CSS property to validate
 * @param context - The context/component name for error logging
 * @returns True if the property is valid, false otherwise
 *
 * @example
 * isKeyValid('color', 'StyleManager') → true
 * isKeyValid('invalid-property', 'StyleManager') → false (logs error)
 * isKeyValid('', 'StyleManager') → false (logs error)
 */
export function isKeyValid(key: StyleKeys): key is StyleKeys {
	// Check if key is a non-empty string
	if (!key || typeof key !== 'string' || key.trim().length === 0) return false;

	// Check if key is a valid Style key
	if (!(key in StyleDefinitions)) return false;

	return true;
}

/**
 * Generates a CSS property name based on the provided property, position, and optional suffix.
 * Handles multiple CSS property naming patterns:
 *
 * - property-position (e.g., padding-top, margin-left)
 * - property-position-suffix (e.g., border-top-width, border-left-style)
 * - property-suffix (e.g., background-color, font-size)
 * - property (e.g., color, display)
 *
 * @param key - The base CSS property (e.g., 'border', 'padding', 'background').
 * @param position - The position/side for the property (e.g., 'top', 'left', 'top-left').
 * @param suffix - The suffix to append (e.g., 'width', 'style', 'color').
 * @returns The generated CSS property name.
 *
 * @example
 * generateKey('padding', 'top'); → 'padding-top'
 * generateKey('border', 'top', 'width'); → 'border-top-width'
 * generateKey('background', undefined, 'color'); → 'background-color'
 * generateKey('color'); → 'color'
 */
export function generateKey(key: string, position?: Side | Corner, suffix?: string): StyleKeys {
	// Pattern 4: Just the base property (e.g., 'color', 'display')
	if (!position && !suffix) {
		return key as StyleKeys;
	}

	// Pattern 3: property-suffix (e.g., 'background-color', 'font-size')
	if (!position && suffix) {
		return `${key}-${suffix}` as StyleKeys;
	}

	// Pattern 1: property-position (e.g., 'padding-top', 'margin-left')
	if (position && !suffix) {
		return `${key}-${position}` as StyleKeys;
	}

	// Pattern 2: property-position-suffix (e.g., 'border-top-width', 'border-left-style')
	if (position && suffix) {
		return `${key}-${position}-${suffix}` as StyleKeys;
	}

	// Fallback (should never reach here)
	return key as StyleKeys;
}

/**
 * Converts camelCase CSS property to kebab-case
 * @param key - The camelCase property name (e.g., 'backgroundColor')
 * @returns The kebab-case property name (e.g., 'background-color')
 */
export function formatKey(key: string): string {
	return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

export default {
	validate: isKeyValid,
	generate: generateKey,
	format: formatKey,
} as const;
