// Types
import type { BlockStyles } from '@/src/core/block/instance/types';
import type { StyleDefinition, StyleKey, StyleRecord, StyleValue, StyleContext } from '@/src/core/block/style/types';
import type { OperateResult } from '@/src/shared/types/result';
import type { PageContext } from '@/src/core/layout/page/types';

// Helpers
import { pickStyleLonghand } from '@/src/core/block/style/helpers/pickers/';

/**
 * Update all longhand style properties for a shorthand style key.
 *
 * This expands the shorthand into its longhand properties and updates each with the given value.
 * Does not mutate the original styles object; returns a new BlockStyles object.
 * @see {@link updateBlockStyles}, {@link updateBlockStyle}
 *
 * @param styleLonghand - the list of longhand style keys for the shorthand
 * @param styleValue - the value to set for each longhand key
 * @param blockStyles - the current BlockStyles map to update
 * @param pageContext - the current page state including selected device, orientation, and pseudo info
 */
export function updateBlockStyleValues(styleKeys: StyleKey[], styleValue: StyleValue, blockStyles: BlockStyles, pageContext: PageContext): OperateResult<BlockStyles> {
	// Build the property updates map
	const propertyUpdates: StyleRecord = Object.fromEntries(styleKeys.map((key) => [key, styleValue]));

	// Return the updated styles
	return updateBlockStyles(blockStyles, propertyUpdates, pageContext);
}

/**
 * Update a single longhand style property for a block instance.
 *
 * This only updates the specified longhand property in the correct context.
 * Does not mutate the original styles object; returns a new BlockStyles object.
 * @see {@link updateBlockStyles}, {@link updateBlockStyle}
 *
 * @param styleKey - the longhand style key to update
 * @param styleValue - the value to set for the style key
 * @param blockStyles - the current BlockStyles map to update
 * @param pageContext - the current page state including selected device, orientation, and pseudo info
 */
export function updateBlockStyleValue(styleKey: StyleKey, styleValue: StyleValue, blockStyles: BlockStyles, pageContext: PageContext): OperateResult<BlockStyles> {
	// Build the property updates map
	const properties: StyleRecord = { [styleKey]: styleValue };

	// Return the updated styles
	return updateBlockStyles(blockStyles, properties, pageContext);
}

/**
 * Update the styles map for a block instance with new property values.
 *
 * This merges the provided property updates into the correct device/orientation/pseudo context.
 * Does not mutate the original styles object; returns a new BlockStyles object.
 * @see {@link updateBlockStyleValue}, {@link updateBlockStyleValues}, {@link updateBlockStyle}
 *
 * @param blockStyles - the current BlockStyles map to update
 * @param newStyles - the style properties and values to update
 * @param pageContext - the current page state including selected device, orientation, and pseudo info
 */
export function updateBlockStyles(blockStyles: BlockStyles, newStyles: StyleRecord, pageContext: PageContext): OperateResult<BlockStyles> {
	const selectedDeviceID = pageContext.store.selectedDeviceID;
	const selectedOrientationID = pageContext.store.selectedOrientationID;
	const selectedPseudoID = pageContext.store.selectedPseudoID;

	return {
		success: true,
		data: {
			...blockStyles,
			[selectedDeviceID]: {
				...(blockStyles?.[selectedDeviceID] ?? {}),
				[selectedOrientationID]: {
					...(blockStyles?.[selectedDeviceID]?.[selectedOrientationID] ?? {}),
					[selectedPseudoID]: {
						...(blockStyles?.[selectedDeviceID]?.[selectedOrientationID]?.[selectedPseudoID] ?? {}),
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
 * @see {@link updateBlockStyleValue}, {@link updateBlockStyleValues}, {@link updateBlockStyles}
 *
 * @param styleKey - the style key to update (shorthand or longhand)
 * @param styleDefinition - the definition of the style property
 * @param styleValue - the value to set for the style key(s)
 * @param blockStyles - the current BlockStyles map to update
 * @param pageContext - the current page state including selected device, orientation, and pseudo info
 */
export function updateBlockStyle(styleKey: StyleKey, styleValue: StyleValue, styleDefinition: StyleDefinition, blockStyles: BlockStyles, pageContext: PageContext): OperateResult<BlockStyles> {
	// Pick longhand keys from the style definition
	const longhandResult = pickStyleLonghand(styleDefinition);

	// Apply longhand if found
	if (longhandResult.success === true) return updateBlockStyleValues(longhandResult.data, styleValue, blockStyles, pageContext);

	// Otherwise, apply shorthand
	return updateBlockStyleValue(styleKey, styleValue, blockStyles, pageContext);
}
