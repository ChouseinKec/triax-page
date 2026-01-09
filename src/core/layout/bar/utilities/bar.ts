// Types
import {  BarDefinition, BarID, BarTitle, BarPosition, BarSize,} from '@/src/core/layout/bar/types';

/**
 * Validates if a value is a valid bar identifier.
 * Checks if the value is a non-empty string.
 * @param barID - The value to validate
 */
export function isBarIDValid(barID: unknown): barID is BarID {
    return typeof barID === 'string' && barID.trim().length > 0;
}

/**
 * Validates if a value is a valid bar title.
 * Checks if the value is a non-empty string.
 * @param barTitle - The value to validate
 */
export function isBarTitleValid(barTitle: unknown): barTitle is BarTitle {
    return typeof barTitle === 'string' && barTitle.trim().length > 0;
}

/**
 * Validates if a value is a valid bar position.
 * Checks if the value is an object with top and left string properties.
 * @param barPosition - The value to validate
 */
export function isBarPositionValid(barPosition: unknown): barPosition is BarPosition {
    return (
        typeof barPosition === 'object' && //
        barPosition !== null &&
        typeof (barPosition as { top?: unknown }).top === 'string' &&
        typeof (barPosition as { left?: unknown }).left === 'string'
    );
}

/**
 * Validates if a value is a valid bar size configuration.
 * Checks for either BarSizeFixed (width only) or BarSizeAuto (minWidth and maxWidth).
 * @param barSize - The value to validate
 */
export function isBarSizeValid(barSize: unknown): barSize is BarSize {
    if (typeof barSize !== 'object' || barSize === null) return false;

    const size = barSize as Record<string, unknown>;

    // Check for BarSizeFixed: must have width as string
    if (typeof size.width === 'string' &&  size.width.trim().length > 0) {
        // Ensure no other properties that would make it invalid
        const allowedKeys = new Set(['width']);
        const actualKeys = Object.keys(size);
        return actualKeys.every((key) => allowedKeys.has(key));
    }

    // Check for BarSizeAuto: must have both minWidth and maxWidth as strings
    const hasMinWidth = typeof size.minWidth === 'string' && size.minWidth.trim().length > 0;
    const hasMaxWidth = typeof size.maxWidth === 'string' && size.maxWidth.trim().length > 0;

    if (hasMinWidth && hasMaxWidth) {
        // Ensure no other properties that would make it invalid
        const allowedKeys = new Set(['minWidth', 'maxWidth']);
        const actualKeys = Object.keys(size);
        return actualKeys.every((key) => allowedKeys.has(key));
    }

    // If neither condition is met, it's invalid
    return false;
}

/**
 * Validates if a value is a valid bar definition.
 * Checks if the value is an object with required bar properties.
 * @param barDefinition - The value to validate
 */
export function isBarDefinitionValid(barDefinition: unknown): barDefinition is BarDefinition {
    return (
        typeof barDefinition === 'object' && //
        barDefinition !== null &&
        'id' in barDefinition &&
        'title' in barDefinition &&
        'position' in barDefinition &&
        'size' in barDefinition &&
        'workbenchKey' in barDefinition
    );
}
