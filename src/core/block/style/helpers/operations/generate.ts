// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { OperateResult } from '@/src/shared/types/result';
import type { StyleRecord } from '@/src/core/block/style/types';
import type { DeviceID, PseudoID, OrientationID, PageContext } from '@/src/core/layout/page/types';

// Utilities
import { toKebabCase } from '@/src/shared/utilities/string';

/**
 * Generate a CSS property block from a styles object.
 *
 * This converts a JS style object into a formatted CSS string, using kebab-case for property names and proper indentation.
 * @see {@link generateCSSRule}
 *
 * @param styles - the style properties and values to convert
 * @param indentLevel - the indentation level for formatting
 */
export function generateCSSProperties(styles: StyleRecord, indentLevel = 1): OperateResult<string> {
	// Calculate indentation based on the given level
	const indent = '  '.repeat(indentLevel);
	let css = '';

	// Iterate over each style property
	for (const [key, value] of Object.entries(styles)) {
		// Skip empty values or keys
		if (!value) continue;
		if (!key) continue;

		// Convert property name to kebab-case
		const formattedKey = toKebabCase(key);
		if (!formattedKey) continue;

		// Append formatted property to CSS string
		css += `${indent}${formattedKey}: ${value};\n`;
	}

	// Return the final CSS string
	return { success: true, data: css };
}

/**
 * Generate a CSS selector string for a block and pseudo-class.
 *
 * This creates a selector in the form `#block-{id}:pseudo` or just `#block-{id}` if pseudo is 'all'.
 * @see {@link generateCSSRule}
 *
 * @param blockID - the block identifier
 * @param pseudoName - the pseudo-class name (e.g., 'hover', 'active', 'all')
 */
export function generateCSSSelector(blockID: BlockID, pseudoName: string, pageContext: PageContext): OperateResult<string> {
	const defaultPseudoID = pageContext.constant.defaultPseudoID;

	// If pseudo is 'all', omit the pseudo selector
	const pseudoSelector = pseudoName === defaultPseudoID ? '' : `:${pseudoName}`;

	// Build the selector string
	return { success: true, data: `#block-${blockID}${pseudoSelector}` };
}

/**
 * Generate a complete CSS rule string for a selector and styles.
 *
 * This creates a CSS rule block with the given selector and style properties, properly formatted and indented.
 * @see {@link generateCSSProperties}, {@link generateCSSSelector}
 *
 * @param selector - the CSS selector string
 * @param styles - the style properties and values to include in the rule
 * @param indentLevel - the indentation level for formatting
 */
export function generateCSSRule(selector: string, styles: StyleRecord, indentLevel = 0): OperateResult<string> {
	// Calculate indentation for the rule
	const indent = '  '.repeat(indentLevel);

	// Start the rule block
	let css = `${indent}${selector} {\n`;

	// Inline property formatting to avoid circular imports
	for (const [key, value] of Object.entries(styles)) {
		// Skip empty values or keys
		if (!value) continue;
		if (!key) continue;
		// Convert property name to kebab-case
		const formattedKey = toKebabCase(key);
		if (!formattedKey) continue;
		// Append formatted property to CSS string
		css += `${indent}  ${formattedKey}: ${value};\n`;
	}

	// Close the rule block
	css += `${indent}}\n`;

	// Return the final CSS rule string
	return { success: true, data: css };
}

/**
 * Generates all cascade paths for style resolution, ordered by specificity.
 * @param device - Selected device ID
 * @param orientation - Selected orientation ID
 * @param pseudo - Selected pseudo ID
 * @returns Array of [device, orientation, pseudo] tuples
 */
export function generateCascadePaths(deviceID: DeviceID, orientationID: OrientationID, pseudoID: PseudoID, pageContext: PageContext): Array<[DeviceID, OrientationID, PseudoID]> {
	const defaultDeviceID = pageContext.constant.defaultDeviceID;
	const defaultOrientationID = pageContext.constant.defaultOrientationID;
	const defaultPseudoID = pageContext.constant.defaultPseudoID;

	return [
		[deviceID, orientationID, pseudoID],
		[deviceID, orientationID, defaultPseudoID],
		[deviceID, defaultOrientationID, pseudoID],
		[deviceID, defaultOrientationID, defaultPseudoID],
		[defaultDeviceID, orientationID, pseudoID],
		[defaultDeviceID, orientationID, defaultPseudoID],
		[defaultDeviceID, defaultOrientationID, pseudoID],
		[defaultDeviceID, defaultOrientationID, defaultPseudoID],
	];
}
