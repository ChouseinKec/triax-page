// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { OperateResult } from '@/shared/types/result';
import type { StyleRecord, StyleCascadePath } from '@/core/block/style/types';
import type { DeviceKey, PseudoKey, OrientationKey, DeviceDefinition } from '@/core/layout/page/types';

// Utilities
import { toKebabCase } from '@/shared/utilities/string';

/**
 * Generate a CSS selector string for a block and pseudo-class.
 * Creates a scoped selector targeting a specific block within a device context,
 * optionally including a pseudo-class for states like :hover or :active.
 *
 * The selector follows the pattern: `#device-{deviceKey} .block-{NodeID}[:pseudoKey]`
 * This ensures styles are applied only to the specified block on the specified device.
 *
 * @param NodeID - The unique identifier of the block (e.g., 'hero', '123')
 * @param pseudoKey - The pseudo-class key (e.g., 'hover', 'active') or default for base styles
 * @param deviceKey - The device context key (e.g., 'default', 'tablet-sm')
 * @param defaultPseudoKey - The default pseudo key to determine if pseudo-selector should be omitted
 */
export function generateCSSSelector(nodeID: NodeID, pseudoKey: PseudoKey, deviceKey: DeviceKey, defaultPseudoKey: PseudoKey): OperateResult<string> {
	// Determine if we need to append a pseudo-selector (omit for base/default pseudo)
	const pseudoSelector = pseudoKey === defaultPseudoKey ? '' : `:${pseudoKey}`;

	// Construct the full selector with device specificity and block targeting
	return { success: true, data: `.device-${deviceKey} .block-${nodeID}${pseudoSelector}` };
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

function getDeviceCategoryDefault(deviceKey: DeviceKey, deviceDefinitions: DeviceDefinition[]): string | undefined {
	const deviceDefinition = deviceDefinitions.find((definition) => definition.key === deviceKey);
	const deviceCategory = deviceDefinition?.category;
	if (!deviceCategory) return undefined;

	const defaultCategoryDeviceDefinition = deviceDefinitions.find((definition) => definition.key === `${deviceCategory}-default`);
	return defaultCategoryDeviceDefinition ? defaultCategoryDeviceDefinition.key : undefined;
}

/**
 * Generates all cascade paths for style resolution, ordered by specificity and device category hierarchy.
 *
 * Returns an array of [device, orientation, pseudo] tuples representing the order in which style values
 * should be searched for cascading inheritance. The cascade respects device categories, falling back
 * through category defaults (e.g., 'mobile-default') before reaching the global default.
 *
 * For pseudo-classes, if the requested pseudo differs from the default, generates paths for both
 * the specific pseudo and the default pseudo, prioritizing the specific pseudo.
 *
 * The paths prioritize more specific contexts first:
 * 1. Current device + current orientation + [pseudo or base depending on context]
 * 2. Current device + default orientation + [pseudo or base depending on context]
 * 3-4. Current device's category default + orientations (if exists)
 * 5-6. Default device + orientations
 *
 * This ensures device-specific styles override category defaults, which override the global default,
 * and pseudo-specific styles are resolved before falling back to base styles.
 *
 * @param deviceKey - The currently selected device key (e.g., 'mobile-sm', 'tablet-md')
 * @param orientationKey - The currently selected orientation key
 * @param pseudoKey - The currently selected pseudo key (e.g., 'hover', 'active')
 * @param defaultDeviceKey - The global default device key (usually 'default')
 * @param defaultOrientationKey - The fallback orientation key (usually 'portrait')
 * @param defaultPseudoKey - The fallback pseudo key (usually 'base')
 * @param deviceDefinitions - Array of all registered device definitions for category extraction
 * @returns Operation result containing cascade paths array in priority order
 */
export function generateCascadePaths(
	deviceKey: DeviceKey,
	orientationKey: OrientationKey,
	pseudoKey: PseudoKey,

	defaultDeviceKey: DeviceKey,
	defaultOrientationKey: OrientationKey,
	defaultPseudoKey: PseudoKey,

	deviceDefinitions: DeviceDefinition[],
): OperateResult<StyleCascadePath[]> {
	const paths: StyleCascadePath[] = [];

	paths.push([deviceKey, orientationKey, pseudoKey]);
	paths.push([deviceKey, defaultOrientationKey, pseudoKey]);

	const currentCategoryDefault = getDeviceCategoryDefault(deviceKey, deviceDefinitions);
	if (currentCategoryDefault) {
		paths.push([currentCategoryDefault as DeviceKey, orientationKey, pseudoKey]);
		paths.push([currentCategoryDefault as DeviceKey, defaultOrientationKey, pseudoKey]);
	}

	paths.push([defaultDeviceKey, orientationKey, pseudoKey]);
	paths.push([defaultDeviceKey, defaultOrientationKey, pseudoKey]);

	return { success: true, data: paths };
}
