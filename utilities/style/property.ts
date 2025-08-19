// Types
import type { CSSPropertyKey } from '@/types/block/style/property';
import type { Side, Corner } from '@/components/select/position/types';
// Constants
import { CSSPropertyDefinitions } from '@/constants/style/property';

/**
 * Checks if a given CSS property is valid according to the defined CSS properties.
 *
 * @param {CSSPropertyKey} property - The CSS property to validate.
 * @returns {boolean} True if the property is valid, false otherwise.
 *
 * @example
 * isPropertyValid('color'); → true
 * isPropertyValid('invalid-property'); → false
 */
function isPropertyValid(property: CSSPropertyKey): boolean {
	return property in CSSPropertyDefinitions;
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
 * @param {string} property - The base CSS property (e.g., 'border', 'padding', 'background').
 * @param {Side | Corner | undefined} position - The position/side for the property (e.g., 'top', 'left', 'top-left').
 * @param {string | undefined} suffix - The suffix to append (e.g., 'width', 'style', 'color').
 * @returns {CSSPropertyKey} The generated CSS property name.
 *
 * @example
 * generatePropertyName('padding', 'top'); → 'padding-top'
 * generatePropertyName('border', 'top', 'width'); → 'border-top-width'
 * generatePropertyName('background', undefined, 'color'); → 'background-color'
 * generatePropertyName('color'); → 'color'
 */
function generatePropertyName(property: string, position?: Side | Corner, suffix?: string): CSSPropertyKey {
    // Pattern 4: Just the base property (e.g., 'color', 'display')
    if (!position && !suffix) {
        return property as CSSPropertyKey;
    }
    
    // Pattern 3: property-suffix (e.g., 'background-color', 'font-size')
    if (!position && suffix) {
        return `${property}-${suffix}` as CSSPropertyKey;
    }
    
    // Pattern 1: property-position (e.g., 'padding-top', 'margin-left')
    if (position && !suffix) {
        return `${property}-${position}` as CSSPropertyKey;
    }
    
    // Pattern 2: property-position-suffix (e.g., 'border-top-width', 'border-left-style')
    if (position && suffix) {
        return `${property}-${position}-${suffix}` as CSSPropertyKey;
    }
    
    // Fallback (should never reach here)
    return property as CSSPropertyKey;
}

export { isPropertyValid, generatePropertyName };
