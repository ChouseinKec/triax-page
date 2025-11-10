// Types
import type { StyleKey } from '@/src/page-builder/core/block/style/types/';
import type { BlockStyles } from '@/src/page-builder/core/block/block/types';
import type { DeviceName } from '@/src/page-builder/core/page/types/device';
import type { OrientationName } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoName } from '@/src/page-builder/core/page/types/pseudo';

// Constants
import { STYLE_SHORTHAND_DEFINITIONS } from '@/src/page-builder/core/block/style/constants';
import { DEFAULT_DEVICE_ID, DEFAULT_ORIENTATION_ID, DEFAULT_PSEUDO_ID } from '@/src/page-builder/core/page/constants';

/**
 * Checks if a style key has shorthand definitions for block style operations.
 * Determines whether the given style key supports shorthand notation.
 *
 * @param styleKey - The style key to check
 * @returns True if the style key has shorthand definitions, false otherwise
 *
 * @example
 * isStyleLonghand('margin') → true
 */
export function isStyleLonghand(styleKey: StyleKey): boolean {
	return Boolean(STYLE_SHORTHAND_DEFINITIONS[styleKey]);
}

/**
 * Gets the longhand properties for a shorthand style key for block style operations.
 * Returns the expanded property names for a given shorthand key.
 *
 * @param styleKey - The shorthand style key
 * @returns Array of longhand property names, or empty array if not a shorthand
 *
 * @example
 * getStyleShorthand('margin') → ['margin-top', 'margin-right', 'margin-bottom', 'margin-left']
 */
export function getStyleShorthand(styleKey: StyleKey): StyleKey[] {
	return STYLE_SHORTHAND_DEFINITIONS[styleKey] || [];
}

/**
 * Resolves shorthand values by determining the appropriate return value.
 * Handles cases where all sides are the same, all are empty, or sides have different values.
 *
 * @param values - Array of CSS values from shorthand longhand properties
 * @returns The resolved CSS value, or empty string if values are mixed
 * 
 * @example
 * resolveStyleShorthand(['10px', '10px', '10px', '10px']) → '10px'
 * resolveStyleShorthand(['10px', '15px', '10px', '20px']) → 'mixed'
 */
export function resolveStyleShorthand(styleShorthands: string[]): string {
	const filteredValues = styleShorthands.filter(Boolean);
	const uniqueValues = Array.from(new Set(filteredValues));

	return uniqueValues.length === 1 ? uniqueValues[0] : 'mixed';
}

/**
 * Cascades style values through device/orientation/pseudo contexts with fallback logic.
 * Pure function that resolves style values based on specificity hierarchy.
 *
 * @param styles - The block styles object
 * @param styleKey - The style property to resolve
 * @param device - Current device context
 * @param orientation - Current orientation context
 * @param pseudo - Current pseudo context
 * @param defaultDevice - Default device fallback (usually 'all')
 * @param defaultOrientation - Default orientation fallback (usually 'all')
 * @param defaultPseudo - Default pseudo fallback (usually 'all')
 * @returns The resolved style value or empty string if not found
 *
 * @example
 * cascadeStyle(styles, 'color', 'mobile', 'portrait', 'hover', 'all', 'all', 'all')
 */
export function cascadeStyle(styles: BlockStyles, styleKey: StyleKey, device: DeviceName, orientation: OrientationName, pseudo: PseudoName): string {
	// Cascade order follows CSS specificity rules:
	// 1. Exact match (device + orientation + pseudo)
	// 2. Device + orientation + default pseudo
	// 3. Device + default orientation + pseudo
	// 4. Device + default orientation + default pseudo
	// 5. Default device + orientation + pseudo
	// 6. Default device + orientation + default pseudo
	// 7. Default device + default orientation + pseudo
	// 8. Global default (default device + default orientation + default pseudo)
	return (
		styles[device]?.[orientation]?.[pseudo]?.[styleKey] ?? //
		styles[device]?.[orientation]?.[DEFAULT_PSEUDO_ID]?.[styleKey] ??
		styles[device]?.[DEFAULT_ORIENTATION_ID]?.[pseudo]?.[styleKey] ??
		styles[device]?.[DEFAULT_ORIENTATION_ID]?.[DEFAULT_PSEUDO_ID]?.[styleKey] ??
		styles[DEFAULT_DEVICE_ID]?.[orientation]?.[pseudo]?.[styleKey] ??
		styles[DEFAULT_DEVICE_ID]?.[orientation]?.[DEFAULT_PSEUDO_ID]?.[styleKey] ??
		styles[DEFAULT_DEVICE_ID]?.[DEFAULT_ORIENTATION_ID]?.[pseudo]?.[styleKey] ??
		styles[DEFAULT_DEVICE_ID]?.[DEFAULT_ORIENTATION_ID]?.[DEFAULT_PSEUDO_ID]?.[styleKey] ??
		''
	);
}

/**
 * Gets a style value with cascade resolution and shorthand logic for block style operations.
 * Handles both regular properties and CSS shorthands, returning the appropriate resolved value.
 *
 * @param styles - The block styles object
 * @param styleKey - The style property to resolve
 * @param device - Current device context
 * @param orientation - Current orientation context
 * @param pseudo - Current pseudo context
 * @returns The resolved style value or empty string if not found
 *
 * @example
 * resolveStyle(styles, 'margin', 'mobile', 'portrait', 'hover') // Returns '10px' if all sides are 10px
 * resolveStyle(styles, 'color', 'mobile', 'portrait', 'hover') // Returns the cascaded color value
 */
export function resolveStyle(styles: BlockStyles, styleKey: StyleKey, device: DeviceName, orientation: OrientationName, pseudo: PseudoName): string {
	// Check if this is a CSS shorthand property
	if (isStyleLonghand(styleKey)) {
		// Get all the longhand properties for this shorthand
		const shorthands = getStyleShorthand(styleKey);

		// Get cascaded values for all shorthand properties
		const values = shorthands.map((shorthand) => cascadeStyle(styles, shorthand, device, orientation, pseudo));

		// Resolve to a single shorthand value if all sides are the same
		return resolveStyleShorthand(values);
	}

	// Regular property - use cascade logic directly
	return cascadeStyle(styles, styleKey, device, orientation, pseudo);
}

/**
 * Updates block styles with a new property value for a specific device/orientation/pseudo context.
 * Handles both regular properties and CSS shorthands automatically.
 * Pure function that creates a new styles object with the update applied.
 *
 * @param currentStyles - The current block styles object
 * @param deviceID - The device context for the update
 * @param orientationID - The orientation context for the update
 * @param pseudoID - The pseudo context for the update
 * @param styleKey - The style property key to update
 * @param value - The new value for the property
 * @returns New styles object with update applied
 *
 * @example
 * applyStyle(styles, 'mobile', 'portrait', 'hover', 'margin', '10px') // Sets margin-top, margin-right, etc.
 * applyStyle(styles, 'mobile', 'portrait', 'hover', 'color', 'red') // Sets color directly
 */
export function applyStyle(styleKey: StyleKey, value: string, currentStyles: BlockStyles, deviceID: DeviceName, orientationID: OrientationName, pseudoID: PseudoName): BlockStyles {
	// Check if this is a CSS longhand property
	if (isStyleLonghand(styleKey)) {
		// Get all the longhand properties for this shorthand
		const shorthands = getStyleShorthand(styleKey);

		// Create updates for all shorthand properties
		const propertyUpdates: Partial<Record<StyleKey, string>> = {};
		shorthands.forEach((shorthand) => {
			propertyUpdates[shorthand] = value;
		});

		return {
			...currentStyles,
			[deviceID]: {
				...currentStyles?.[deviceID],
				[orientationID]: {
					...currentStyles?.[deviceID]?.[orientationID],
					[pseudoID]: {
						...currentStyles?.[deviceID]?.[orientationID]?.[pseudoID],
						...propertyUpdates,
					},
				},
			},
		};
	}

	// Regular property - update directly
	return {
		...currentStyles,
		[deviceID]: {
			...currentStyles?.[deviceID],
			[orientationID]: {
				...currentStyles?.[deviceID]?.[orientationID],
				[pseudoID]: {
					...currentStyles?.[deviceID]?.[orientationID]?.[pseudoID],
					[styleKey]: value,
				},
			},
		},
	};
}
