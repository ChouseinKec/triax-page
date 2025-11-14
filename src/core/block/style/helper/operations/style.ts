// Types
import type { BlockStyles, BlockID } from '@/src/core/block/instance/types';
import type { DeviceValue, DeviceName } from '@/src/core/layout/page/types';
import type { OrientationValue, OrientationName } from '@/src/core/layout/page/types';
import type { PseudoValue, PseudoName } from '@/src/core/layout/page/types';
import type { StyleKey } from '@/src/core/block/style/core/types/';

// Registry
import { getRegisteredPseudos } from '@/src/core/layout/page/registry';

// Constants
import { DEFAULT_DEVICE_ID, DEFAULT_ORIENTATION_ID, DEFAULT_PSEUDO_ID } from '@/src/core/layout/page/constants';
import { STYLE_SHORTHAND_DEFINITIONS } from '@/src/core/block/style/core/constants';

// Utilities
import { toKebabCase } from '@/src/shared/utilities/string';


/**
 * Generates CSS properties block from an object of styles.
 * Converts camelCase property names to kebab-case and formats them with proper indentation.
 *
 * @param styles - Object containing CSS properties and values
 * @param indentLevel - Number of spaces for indentation (default: 1)
 * @returns Formatted CSS properties string with each property on a new line
 *
 * @example
 * generateCSSProperties({ backgroundColor: 'red', fontSize: '14px' }, 1) → "  background-color: red;\n  font-size: 14px;\n"
 */
export function generateCSSProperties(styles: Record<string, string>, indentLevel: number = 1): string {
	const indent = '  '.repeat(indentLevel);
	let css = '';

	for (const [key, value] of Object.entries(styles)) {
		// Skip empty values or keys
		if (!value) continue;
		if (!key) continue;

		// Convert camelCase to kebab-case (e.g., backgroundColor → background-color)
		const formattedKey = toKebabCase(key);
		if (!formattedKey) continue;

		css += `${indent}${formattedKey}: ${value};\n`;
	}

	return css;
}

/**
 * Generates CSS selector for a block ID with optional pseudo-state.
 * Creates a unique CSS selector targeting a specific block element.
 *
 * @param blockID - The block ID to target
 * @param pseudoName - The pseudo-state name ('all' means no pseudo-class)
 * @returns CSS selector string for the block
 *
 * @example
 * generateCSSSelector('block-123', 'hover') → "#block-block-123:hover"
 */
export function generateCSSSelector(blockID: BlockID, pseudoName: string): string {
	// Add pseudo-class if specified (skip 'all' which means no pseudo)
	const pseudoSelector = pseudoName === DEFAULT_PSEUDO_ID ? '' : `:${pseudoName}`;

	return `#block-${blockID}${pseudoSelector}`;
}

/**
 * Resolves all style properties for the current device, orientation, and pseudo context.
 * Returns a new object containing only the cascaded properties that apply to the current context,
 * filtering out irrelevant styles and resolving cascade priorities (pseudo > orientation > device).
 *
 * This is used to apply only the currently valid styles to a block element based on the
 * selected device, orientation, and pseudo-class state in the page builder.
 *
 * @param styles - The complete block styles object with all device/orientation/pseudo variations
 * @param device - Current device context (e.g., 'mobile', 'tablet', 'desktop')
 * @param orientation - Current orientation context (e.g., 'portrait', 'landscape')
 * @param pseudo - Current pseudo context (e.g., 'hover', 'active', 'all')
 * @returns New object with only the resolved properties applicable to the current context
 *
 * @example
 * cascadeCSSStyles(styles, 'mobile', 'portrait', 'hover') → { color: 'blue', fontSize: '16px' }
 */
export function cascadeCSSStyles(styles: BlockStyles, device: DeviceName, orientation: OrientationName, pseudo: PseudoName): Record<string, string> {
	// Collect all unique style keys from all device/orientation/pseudo contexts
	const allKeys = new Set<string>();

	// Iterate through all style contexts to collect keys
	Object.values(styles).forEach((deviceStyles) => {
		Object.values(deviceStyles).forEach((orientationStyles) => {
			Object.values(orientationStyles).forEach((pseudoStyles) => {
				Object.keys(pseudoStyles).forEach((key) => allKeys.add(key));
			});
		});
	});

	// Resolve each unique key using cascade logic
	const resolvedStyles: Record<string, string> = {};
	allKeys.forEach((key) => {
		resolvedStyles[key] = cascadeStyle(styles, key as StyleKey, device, orientation, pseudo);
	});

	return resolvedStyles;
}

/**
 * Generates a complete CSS rule block with selector and properties.
 * Creates a properly formatted CSS rule including opening/closing braces.
 *
 * @param selector - CSS selector (e.g., '#block-123', '.class-name')
 * @param styles - Object containing CSS properties and values
 * @param indentLevel - Number of spaces for base indentation (default: 0)
 * @returns Complete CSS rule block with proper formatting
 *
 * @example
 * generateCSSRule('#block-123', { color: 'red' }, 0) → "#block-123 {\n  color: red;\n}\n"
 */
export function generateCSSRule(selector: string, styles: Record<string, string>, indentLevel: number = 0): string {
	const indent = '  '.repeat(indentLevel);

	// Start the CSS rule with selector and opening brace
	let css = `${indent}${selector} {\n`;

	// Add the CSS properties with increased indentation
	css += generateCSSProperties(styles, indentLevel + 1);

	// Close the CSS rule
	css += `${indent}}\n`;

	return css;
}

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
