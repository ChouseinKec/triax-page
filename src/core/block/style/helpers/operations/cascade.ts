// Types
import type { BlockStyles } from '@/core/block/instance/types';
import type { StyleKey, StyleRecord, StyleValue, StyleDefinition, StyleDefinitionRecord } from '@/core/block/style/types';
import type { DeviceKey, PseudoKey, OrientationKey } from '@/core/layout/page/types';
import type { OperateResult } from '@/shared/types/result';

// Helpers
import { resolveStyleLonghand } from '@/core/block/style/helpers/';
import { collectBlockStyleKeys, generateCascadePaths, pickStyleLonghand, pickStyleDefinition } from '@/core/block/style/helpers';
/**
 * Helper function to find a style value in a list of cascade paths.
 * Iterates through paths and returns the first non-empty value found.
 *
 * @param blockStyles - The block's style definitions
 * @param styleKey - The style property to look for
 * @param paths - Array of [device, orientation, pseudo] paths to check
 */
function findValueInPaths(blockStyles: BlockStyles, styleKey: StyleKey, paths: Array<[DeviceKey, OrientationKey, PseudoKey]>): string {
	for (const [device, orientation, pseudo] of paths) {
		const candidate = blockStyles[device]?.[orientation]?.[pseudo]?.[styleKey];
		if (candidate != null && candidate !== '') {
			return candidate;
		}
	}
	return '';
}

/**
 * Resolves a single style value using the custom cascade order.
 * Checks all combinations of device, orientation, and pseudo, falling back to defaults as needed.
 * For pseudo-classes, first checks pseudo-specific paths, then base paths.
 *
 * @param blockStyles - The block's complete style definition object
 * @param styleKey - The style property key to resolve
 * @param deviceKey - Current device context
 * @param orientationKey - Current orientation context
 * @param pseudoKey - Current pseudo context
 * @param defaultDeviceKey - Default device key
 * @param defaultOrientationKey - Default orientation key
 * @param defaultPseudoKey - Default pseudo key
 */
function cascadeStyleLonghandValue(
	styleKey: StyleKey,
	blockStyles: BlockStyles,

	deviceKey: DeviceKey,
	orientationKey: OrientationKey,
	pseudoKey: PseudoKey,

	defaultDeviceKey: DeviceKey,
	defaultOrientationKey: OrientationKey,
	defaultPseudoKey: PseudoKey,
): OperateResult<StyleValue> {
	let value: string = '';

	// For pseudo-classes, prioritize pseudo-specific cascading before base
	if (pseudoKey !== defaultPseudoKey) {
		const pseudoPaths = generateCascadePaths(deviceKey, orientationKey, pseudoKey, defaultDeviceKey, defaultOrientationKey, defaultPseudoKey);
		value = findValueInPaths(blockStyles, styleKey, pseudoPaths);
		if (value !== '') return { success: true, data: value };
	}

	// Check base cascading (or only base for base pseudo)
	const basePaths = generateCascadePaths(deviceKey, orientationKey, defaultPseudoKey, defaultDeviceKey, defaultOrientationKey, defaultPseudoKey);
	value = findValueInPaths(blockStyles, styleKey, basePaths);

	return { success: true, data: value };
}

/**
 * Resolves and merges longhand values for a shorthand style key using cascade logic.
 * Handles shorthand properties by resolving each constituent longhand property.
 *
 * @param styleKeys - Array of longhand style keys that make up the shorthand
 * @param blockStyles - The block's style definitions
 * @param deviceKey - Current device context
 * @param orientationKey - Current orientation context
 * @param pseudoKey - Current pseudo context
 * @param defaultDeviceKey - Default device key
 * @param defaultOrientationKey - Default orientation key
 * @param defaultPseudoKey - Default pseudo key
 */
function cascadeStyleShorthandValue(
	styleKeys: StyleKey[],
	blockStyles: BlockStyles,

	deviceKey: DeviceKey,
	orientationKey: OrientationKey,
	pseudoKey: PseudoKey,

	defaultDeviceKey: DeviceKey,
	defaultOrientationKey: OrientationKey,
	defaultPseudoKey: PseudoKey,
): OperateResult<StyleValue> {
	const values: string[] = [];

	// Resolve each longhand property in the shorthand
	for (const styleKey of styleKeys) {
		const longhandResult = cascadeStyleLonghandValue(styleKey, blockStyles, deviceKey, orientationKey, pseudoKey, defaultDeviceKey, defaultOrientationKey, defaultPseudoKey);
		if (!longhandResult.success) return { success: false, error: longhandResult.error };
		values.push(longhandResult.data);
	}

	// Merge the longhand values into a shorthand value
	return resolveStyleLonghand(values);
}

/**
 * Collects all style keys and produces a cascaded map for the provided styleContext.
 * Gathers all possible style keys from the block styles and resolves each one.
 *
 * @param blockStyles - The block's complete style definition object
 * @param styleDefinitions - Registry of style definitions
 * @param deviceKey - Current device context
 * @param orientationKey - Current orientation context
 * @param pseudoKey - Current pseudo context
 * @param defaultDeviceKey - Default device key
 * @param defaultOrientationKey - Default orientation key
 * @param defaultPseudoKey - Default pseudo key
 */
export function cascadeBlockStyles(
	blockStyles: BlockStyles,
	styleDefinitions: StyleDefinitionRecord,

	deviceKey: DeviceKey,
	orientationKey: OrientationKey,
	pseudoKey: PseudoKey,

	defaultDeviceKey: DeviceKey,
	defaultOrientationKey: OrientationKey,
	defaultPseudoKey: PseudoKey,
): OperateResult<StyleRecord> {
	// Collect all unique style keys present in the block styles
	const keyResult = collectBlockStyleKeys(blockStyles);
	if (!keyResult.success) return { success: false, error: keyResult.error };

	const resolved: StyleRecord = {};

	// Resolve each style key using cascading logic
	for (const styleKey of keyResult.data) {
		// Retrieve the style definition for validation
		const styleDefinition = pickStyleDefinition(styleKey, styleDefinitions);
		if (!styleDefinition.success) return { success: false, error: `No style definition found for key '${styleKey}'.` };

		// Cascade the style value
		const cascadeResult = cascadeBlockStyle(styleKey, blockStyles, styleDefinition.data, deviceKey, orientationKey, pseudoKey, defaultDeviceKey, defaultOrientationKey, defaultPseudoKey);
		if (!cascadeResult.success) return cascadeResult;
		resolved[styleKey] = cascadeResult.data;
	}

	return { success: true, data: resolved };
}

/**
 * Resolves a style value that may be shorthand, using cascade and shorthand merging logic.
 * Determines if the style is shorthand and handles accordingly.
 *
 * @param styleKey - The style key to resolve (shorthand or longhand)
 * @param blockStyles - The block's style definitions
 * @param styleDefinition - The definition of the style property
 * @param deviceKey - Current device context
 * @param orientationKey - Current orientation context
 * @param pseudoKey - Current pseudo context
 * @param defaultDeviceKey - Default device key
 * @param defaultOrientationKey - Default orientation key
 * @param defaultPseudoKey - Default pseudo key
 */
export function cascadeBlockStyle(
	styleKey: StyleKey,
	blockStyles: BlockStyles,
	styleDefinition: StyleDefinition,

	deviceKey: DeviceKey,
	orientationKey: OrientationKey,
	pseudoKey: PseudoKey,

	defaultDeviceKey: DeviceKey,
	defaultOrientationKey: OrientationKey,
	defaultPseudoKey: PseudoKey,
): OperateResult<StyleValue> {
	// Check if this is a shorthand property
	const longhandResult = pickStyleLonghand(styleDefinition);

	// If shorthand, resolve and merge the longhand properties
	if (longhandResult.success === true) return cascadeStyleShorthandValue(longhandResult.data, blockStyles, deviceKey, orientationKey, pseudoKey, defaultDeviceKey, defaultOrientationKey, defaultPseudoKey);

	// Otherwise, resolve as a single longhand property
	return cascadeStyleLonghandValue(styleKey, blockStyles, deviceKey, orientationKey, pseudoKey, defaultDeviceKey, defaultOrientationKey, defaultPseudoKey);
}
