// Types
import type { BlockID } from '@/core/block/instance/types';
import type { OperateResult } from '@/shared/types/result';
import type { StyleRecord } from '@/core/block/style/types';
import type { DeviceKey, PseudoKey, OrientationKey } from '@/core/layout/page/types';

// Utilities
import { toKebabCase } from '@/shared/utilities/string';

/**
 * Generate a CSS selector string for a block and pseudo-class.
 * Creates a scoped selector targeting a specific block within a device context,
 * optionally including a pseudo-class for states like :hover or :active.
 *
 * The selector follows the pattern: `#device-{deviceKey} .block-{blockID}[:pseudoKey]`
 * This ensures styles are applied only to the specified block on the specified device.
 *
 * @param blockID - The unique identifier of the block (e.g., 'hero', '123')
 * @param pseudoKey - The pseudo-class key (e.g., 'hover', 'active') or default for base styles
 * @param deviceKey - The device context key (e.g., 'default', 'tablet-sm')
 * @param defaultPseudoKey - The default pseudo key to determine if pseudo-selector should be omitted
 */
export function generateCSSSelector(
	blockID: BlockID,
	pseudoKey: PseudoKey,
	deviceKey: DeviceKey,
	defaultPseudoKey: PseudoKey,
): OperateResult<string> {
	// Determine if we need to append a pseudo-selector (omit for base/default pseudo)
	const pseudoSelector = pseudoKey === defaultPseudoKey ? '' : `:${pseudoKey}`;

	// Construct the full selector with device specificity and block targeting
	return { success: true, data: `.device-${deviceKey} .block-${blockID}${pseudoSelector}` };
}

/**
 * Generate a complete CSS rule string for a selector and styles.
 * Produces a properly formatted CSS rule block with indentation,
 * converting camelCase properties to kebab-case and handling empty values.
 *
 * @param selector - The CSS selector string (e.g., from generateCSSSelector)
 * @param styles - Object containing style properties and their values
 * @param indentLevel - Base indentation level for the rule (default 0)
 */
export function generateCSSRule(selector: string, styles: StyleRecord, indentLevel = 0): OperateResult<string> {
	// Create indentation string based on the specified level
	const indent = '  '.repeat(indentLevel);

	// Start building the CSS rule with the selector and opening brace
	let css = `${indent}${selector} {\n`;

	// Iterate through each style property to format and append
	for (const [key, value] of Object.entries(styles)) {
		// Skip properties with empty keys, null, or undefined values
		if (!value || !key) continue;

		// Convert camelCase property names to kebab-case (e.g., backgroundColor -> background-color)
		const formattedKey = toKebabCase(key);
		if (!formattedKey) continue;

		// Append the formatted property with proper indentation
		css += `${indent}  ${formattedKey}: ${value};\n`;
	}

	// Close the CSS rule block
	css += `${indent}}\n`;

	return { success: true, data: css };
}

/**
 * Generates all cascade paths for style resolution, ordered by specificity.
 * Returns an array of [device, orientation, pseudo] tuples representing the order
 * in which style values should be searched for cascading inheritance.
 *
 * The paths prioritize more specific contexts first:
 * 1. Current device + current orientation + pseudo
 * 2. Current device + default orientation + pseudo
 * 3. Default device + current orientation + pseudo
 * 4. Default device + default orientation + pseudo
 *
 * This ensures that device-specific styles override defaults, and pseudo-specific
 * styles are resolved before falling back to base styles.
 *
 * @param deviceKey - The currently selected device key
 * @param orientationKey - The currently selected orientation key
 * @param pseudoKey - The currently selected pseudo key
 * @param defaultDeviceKey - The fallback device key (usually 'default')
 * @param defaultOrientationKey - The fallback orientation key (usually 'portrait')
 * @param defaultPseudoKey - The fallback pseudo key (usually 'base')
 */
export function generateCascadePaths(
	deviceKey: DeviceKey,
	orientationKey: OrientationKey,
	pseudoKey: PseudoKey,

	defaultDeviceKey: DeviceKey,
	defaultOrientationKey: OrientationKey,
	defaultPseudoKey: PseudoKey,
): Array<[DeviceKey, OrientationKey, PseudoKey]> {
	return [
		[deviceKey, orientationKey, pseudoKey],
		[deviceKey, defaultOrientationKey, pseudoKey],
		[defaultDeviceKey, orientationKey, pseudoKey],
		[defaultDeviceKey, defaultOrientationKey, pseudoKey],
	];
}
