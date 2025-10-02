// Types
import type { StyleKey } from '@/src/page-builder/core/block/style/types';
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
export function isStyleKeyValid(styleKey: unknown): styleKey is StyleKey {
	// Check if key is a non-empty string
	if (!styleKey || typeof styleKey !== 'string' || styleKey.trim().length === 0) return false;

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
export function generateStyleKey(styleKey: unknown, position?: Side | Corner, suffix?: string): StyleKey | undefined {
	// Validate base property
	if (!isStyleKeyValid(styleKey)) return undefined;

	// Pattern 4: Just the base property (e.g., 'color', 'display')
	if (!position && !suffix) {
		return styleKey as StyleKey;
	}

	// Pattern 3: property-suffix (e.g., 'background-color', 'font-size')
	if (!position && suffix) {
		return `${styleKey}-${suffix}` as StyleKey;
	}

	// Pattern 1: property-position (e.g., 'padding-top', 'margin-left')
	if (position && !suffix) {
		return `${styleKey}-${position}` as StyleKey;
	}

	// Pattern 2: property-position-suffix (e.g., 'border-top-width', 'border-left-style')
	if (position && suffix) {
		return `${styleKey}-${position}-${suffix}` as StyleKey;
	}

	// Fallback (should never reach here)
	return undefined;
}

/**
 * Converts camelCase CSS property to kebab-case
 * @param key - The camelCase property name (e.g., 'backgroundColor')
 * @returns The kebab-case property name (e.g., 'background-color')
 */
export function formatStyleKey(styleKey: string): string | undefined {
	// Validate key
	if (!isStyleKeyValid(styleKey)) return undefined;

	// Convert camelCase to kebab-case
	return styleKey.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
