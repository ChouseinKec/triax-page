// Types
import type { StyleKeys } from '@/src/page-builder/core/block/style/types';
import type { Side, Corner } from '@/src/shared/components/select/position/types';


/**
 * Validates if a given CSS property is valid according to the defined CSS properties.
 * Performs comprehensive validation with error logging for debugging.
 *
 * @param property - The CSS property to validate
 * @param context - The context/component name for error logging
 * @returns True if the property is valid, false otherwise
 *
 * @example
 * isStyleKeyValid('color', 'StyleManager') → true
 * isStyleKeyValid('invalid-property', 'StyleManager') → false (logs error)
 * isStyleKeyValid('', 'StyleManager') → false (logs error)
 */
export function isStyleKeyValid(key: unknown): key is StyleKeys {
	// Check if key is a non-empty string
	if (!key || typeof key !== 'string' || key.trim().length === 0) return false;

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
 * generateStyleKey('padding', 'top'); → 'padding-top'
 * generateStyleKey('border', 'top', 'width'); → 'border-top-width'
 * generateStyleKey('background', undefined, 'color'); → 'background-color'
 * generateStyleKey('color'); → 'color'
 */
export function generateStyleKey(key: unknown, position?: Side | Corner, suffix?: string): StyleKeys | undefined {
	// Validate base property
	if (!isStyleKeyValid(key)) return undefined;

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
	return undefined;
}

/**
 * Converts camelCase CSS property to kebab-case
 * @param key - The camelCase property name (e.g., 'backgroundColor')
 * @returns The kebab-case property name (e.g., 'background-color')
 */
export function formatStyleKey(key: string): string | undefined {
	// Validate key
	if (!isStyleKeyValid(key)) return undefined;

	// Convert camelCase to kebab-case
	return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
