// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';
import type { StyleKey } from '@/src/page-builder/core/block/style/types/';
import type { BlockStyles } from '@/src/page-builder/core/block/block/types';
import type { DeviceName } from '@/src/page-builder/core/page/types/device';
import type { OrientationName } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoName } from '@/src/page-builder/core/page/types/pseudo';

// Utilities
import { toKebabCase } from '@/src/shared/utilities/string';

// Helpers
import { cascadeStyle } from '@/src/page-builder/services/helpers/block/style';

// Constants
import { DEFAULT_PSEUDO_ID } from '@/src/page-builder/core/page/constants';

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
