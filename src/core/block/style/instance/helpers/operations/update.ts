// Types
import type { NodeStyles } from '@/core/block/node/definition/types/definition';
import type { StyleDefinition, StyleKey, StyleRecord, StyleValue } from '@/core/block/style/definition/types';
import type { OperateResult } from '@/shared/types/result';
import type { DeviceKey, OrientationKey, PseudoKey } from '@/core/layout/page/types';

// Helpers
import { pickStyleLonghand } from '@/core/block/style/instance/helpers/pickers/';

/**
 * Update all longhand style properties for a shorthand style key.
 *
 * This expands the shorthand into its longhand properties and updates each with the given value.
 * Does not mutate the original styles object; returns a new NodeStyles object.
 * @see {@link updateNodeStyles}, {@link updateBlockStyle}
 *
 * @param styleLonghand - the list of longhand style keys for the shorthand
 * @param styleValue - the value to set for each longhand key
 * @param NodeStyles - the current NodeStyles map to update
 * @param selectedDeviceKey - the selected device key
 * @param selectedOrientationKey - the selected orientation key
 * @param selectedPseudoKey - the selected pseudo key
 */
export function updateBlockStyleValues(styleKeys: StyleKey[], styleValue: StyleValue, NodeStyles: NodeStyles, selectedDeviceKey: DeviceKey, selectedOrientationKey: OrientationKey, selectedPseudoKey: PseudoKey): OperateResult<NodeStyles> {
	// Build the property updates map
	const propertyUpdates: StyleRecord = Object.fromEntries(styleKeys.map((key) => [key, styleValue]));

	// Return the updated styles
	return updateNodeStyles(NodeStyles, propertyUpdates, selectedDeviceKey, selectedOrientationKey, selectedPseudoKey);
}

/**
 * Update a single longhand style property for a block instance.
 *
 * This only updates the specified longhand property in the correct context.
 * Does not mutate the original styles object; returns a new NodeStyles object.
 * @see {@link updateNodeStyles}, {@link updateBlockStyle}
 *
 * @param styleKey - the longhand style key to update
 * @param styleValue - the value to set for the style key
 * @param NodeStyles - the current NodeStyles map to update
 * @param selectedDeviceKey - the selected device key
 * @param selectedOrientationKey - the selected orientation key
 * @param selectedPseudoKey - the selected pseudo key
 */
export function updateBlockStyleValue(styleKey: StyleKey, styleValue: StyleValue, NodeStyles: NodeStyles, selectedDeviceKey: DeviceKey, selectedOrientationKey: OrientationKey, selectedPseudoKey: PseudoKey): OperateResult<NodeStyles> {
	// Build the property updates map
	const properties: StyleRecord = { [styleKey]: styleValue };

	// Return the updated styles
	return updateNodeStyles(NodeStyles, properties, selectedDeviceKey, selectedOrientationKey, selectedPseudoKey);
}

/**
 * Update the styles map for a block instance with new property values.
 *
 * This merges the provided property updates into the correct device/orientation/pseudo context.
 * Does not mutate the original styles object; returns a new NodeStyles object.
 * @see {@link updateBlockStyleValue}, {@link updateBlockStyleValues}, {@link updateBlockStyle}
 *
 * @param NodeStyles - the current NodeStyles map to update
 * @param newStyles - the style properties and values to update
 * @param selectedDeviceKey - the selected device key
 * @param selectedOrientationKey - the selected orientation key
 * @param selectedPseudoKey - the selected pseudo key
 */
export function updateNodeStyles(NodeStyles: NodeStyles, newStyles: StyleRecord, selectedDeviceKey: DeviceKey, selectedOrientationKey: OrientationKey, selectedPseudoKey: PseudoKey): OperateResult<NodeStyles> {

	return {
		success: true,
		data: {
			...NodeStyles,
			[selectedDeviceKey]: {
				...(NodeStyles?.[selectedDeviceKey] ?? {}),
				[selectedOrientationKey]: {
					...(NodeStyles?.[selectedDeviceKey]?.[selectedOrientationKey] ?? {}),
					[selectedPseudoKey]: {
						...(NodeStyles?.[selectedDeviceKey]?.[selectedOrientationKey]?.[selectedPseudoKey] ?? {}),
						...newStyles,
					},
				},
			},
		},
	};
}

/**
 * Update a style property for a block instance, supporting both shorthand and longhand keys.
 *
 * This checks if the style key is a longhand, expands it if needed, and updates the relevant properties.
 * @see {@link updateBlockStyleValue}, {@link updateBlockStyleValues}, {@link updateNodeStyles}
 *
 * @param styleKey - the style key to update (shorthand or longhand)
 * @param styleDefinition - the definition of the style property
 * @param styleValue - the value to set for the style key(s)
 * @param NodeStyles - the current NodeStyles map to update
 * @param selectedDeviceKey - the selected device key
 * @param selectedOrientationKey - the selected orientation key
 * @param selectedPseudoKey - the selected pseudo key
 */
export function updateBlockStyle(styleKey: StyleKey, styleValue: StyleValue, styleDefinition: StyleDefinition, NodeStyles: NodeStyles, selectedDeviceKey: DeviceKey, selectedOrientationKey: OrientationKey, selectedPseudoKey: PseudoKey): OperateResult<NodeStyles> {
	// Pick longhand keys from the style definition
	const longhandResult = pickStyleLonghand(styleDefinition);

	// Apply longhand if found
	if (longhandResult.success === true) return updateBlockStyleValues(longhandResult.data, styleValue, NodeStyles, selectedDeviceKey, selectedOrientationKey, selectedPseudoKey);

	// Otherwise, apply shorthand
	return updateBlockStyleValue(styleKey, styleValue, NodeStyles, selectedDeviceKey, selectedOrientationKey, selectedPseudoKey);
}
