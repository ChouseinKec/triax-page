// Types
import type { BlockStyles } from '@/src/core/block/instance/types';
import type { StyleKey, StyleRecord, StyleValue, StyleDefinition, StyleDefinitionRecord } from '@/src/core/block/style/types';
import type { OperateResult } from '@/src/shared/types/result';
import type { PageContext } from '@/src/core/layout/page/types/context';

// Helpers
import { resolveStyleLonghand } from '@/src/core/block/style/helpers/';
import { collectBlockStyleKeys, generateCascadePaths, pickStyleLonghand, pickStyleDefinition } from '@/src/core/block/style/helpers';

/**
 * Resolves a single style value using the custom cascade order.
 * Checks all combinations of device, orientation, and pseudo, falling back to defaults as needed.
 * @see {@link cascadeBlockStyles}, {@link cascadeBlockStyle}
 *
 * @param blockStyles - The block's complete style definition
 * @param styleKey - The style key to resolve
 * @param pageContext - The current page state including selected device, orientation, and pseudo
 */
export function cascadeStyleLonghandValue(styleKey: StyleKey, blockStyles: BlockStyles, pageContext: PageContext): OperateResult<StyleValue> {
	const device = pageContext.store.selectedDeviceID;
	const orientation = pageContext.store.selectedOrientationID;
	const pseudo = pageContext.store.selectedPseudoID;
	const paths = generateCascadePaths(device, orientation, pseudo, pageContext);

	let value: string = '';
	for (const [device, orientation, pseudo] of paths) {
		// Check the style value at the current cascade path
		const candidate = blockStyles[device]?.[orientation]?.[pseudo]?.[styleKey];

		// If a valid value is found, use it and stop searching
		if (candidate != null && candidate !== '') {
			value = candidate;
			break;
		}
	}

	// Return the resolved value
	return { success: true, data: value };
}

/**
 * Resolves and merges longhand values for a shorthand style key using cascade logic.
 * Uses resolveStyleLonghand from shorthands.ts.
 * @param blockStyles - The block's complete style definition
 * @param longhands - Array of longhand keys (StyleKey[])
 * @param styleContext - The current page state
 */
export function cascadeStyleShorthandValue(styleKeys: StyleKey[], blockStyles: BlockStyles, pageContext: PageContext): OperateResult<StyleValue> {
	const values: string[] = [];

	for (const styleKey of styleKeys) {
		const longhandResult = cascadeStyleLonghandValue(styleKey, blockStyles, pageContext);
		if (!longhandResult.success) return { success: false, error: longhandResult.error };

		values.push(longhandResult.data);
	}
	return resolveStyleLonghand(values);
}

/**
 * Collects all style keys and produces a cascaded map for the provided styleContext.
 * Iterates through all device/orientation/pseudo combinations to gather all possible style keys.
 *
 * @param blockStyles - The block's complete style definition
 * @param styleContext - The current page state including selected device, orientation, and pseudo
 */
export function cascadeBlockStyles(blockStyles: BlockStyles, styleDefinitions: StyleDefinitionRecord, pageContext: PageContext): OperateResult<StyleRecord> {
	// Collect all unique style keys using the collector helper
	const keyResult = collectBlockStyleKeys(blockStyles);
	if (!keyResult.success) return { success: false, error: keyResult.error };

	// Resolve each key using the cascade logic (handles both longhand and shorthand)
	const resolved: StyleRecord = {};

	// Iterate through each collected style key
	for (const styleKey of keyResult.data) {
		// Get the style definition for the key
		const styleDefinition = pickStyleDefinition(styleKey, styleDefinitions);
		if (!styleDefinition.success) return { success: false, error: `No style definition found for key '${styleKey}'.` };

		// Resolve the style using cascade logic
		const cascadeResult = cascadeBlockStyle(styleKey, blockStyles, styleDefinition.data, pageContext);
		if (!cascadeResult.success) return cascadeResult;
		resolved[styleKey] = cascadeResult.data;
	}

	// Return the cascaded style map
	return { success: true, data: resolved };
}

/**
 * Resolves a style value that may be shorthand, using cascade and shorthand merging logic.
 * If the style key is a shorthand, resolves each longhand and merges the results.
 * Otherwise, resolves the single style value using cascade.
 * @see {@link cascadeStyle}, {@link resolveStyleLonghand}
 *
 * @param styleKey - The style key to resolve (shorthand or longhand)
 * @param blockStyles - The block's complete style definition
 * @param styleContext - The current page state including selected device, orientation, and pseudo
 */
export function cascadeBlockStyle(styleKey: StyleKey, blockStyles: BlockStyles, styleDefinition: StyleDefinition, pageContext: PageContext): OperateResult<StyleValue> {
	// Check if the styleKey is a shorthand
	const longhandResult = pickStyleLonghand(styleDefinition);

	// If it's a shorthand, cascade each longhand and merge
	if (longhandResult.success === true) return cascadeStyleShorthandValue(longhandResult.data, blockStyles, pageContext);

	// Otherwise, cascade as a single longhand style
	return cascadeStyleLonghandValue(styleKey, blockStyles, pageContext);
}
