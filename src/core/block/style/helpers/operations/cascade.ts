// Types
import type { NodeStyles } from '@/core/block/node/types/definition';
import type { StyleCascadePath, StyleKey, StyleRecord, StyleValue, StyleDefinition, RegisteredStyles } from '@/core/block/style/types';
import type { OperateResult } from '@/shared/types/result';

// Helpers
import { resolveStyleLonghand } from '@/core/block/style/helpers/';
import { collectBlockStyleKeys, pickStyleLonghand, pickStyleDefinition } from '@/core/block/style/helpers';

/**
 * Resolves a single style value using the pre-computed cascade order.
 *
 * This function iterates through an ordered list of cascade paths (device/orientation/pseudo combinations)
 * and returns the first non-empty style value found. The cascade order represents CSS specificity,
 * prioritizing device-specific and pseudo-class-specific styles before falling back to defaults.
 *
 * The function enables efficient style resolution by accepting pre-computed paths in priority order,
 * eliminating the need to recalculate cascade order for each property lookup.
 *
 * @param styleKey - The CSS style property key to resolve (e.g., 'backgroundColor', 'width')
 * @param nodeStyles - The block's complete style definition object containing all style values
 * @param styleCascadePaths - Pre-computed cascade paths in priority order, each path is a [device, orientation, pseudo] tuple
 * @returns Operation result containing the resolved style value, or empty string if not found
 */
function cascadeStyleLonghandValue(styleKey: StyleKey, nodeStyles: NodeStyles, styleCascadePaths: StyleCascadePath[]): OperateResult<StyleValue> {
	// Find style value in cascade paths - returns first non-empty match
	for (const [device, orientation, pseudo] of styleCascadePaths) {
		const candidate = nodeStyles[device]?.[orientation]?.[pseudo]?.[styleKey];
		if (candidate != null && candidate !== '') {
			return { success: true, data: candidate };
		}
	}
	return { success: true, data: '' };
}

/**
 * Resolves and merges longhand values for a shorthand CSS property using cascade logic.
 *
 * This function handles CSS shorthand properties (e.g., 'padding', 'border') by resolving each
 * constituent longhand property (e.g., 'paddingTop', 'paddingRight') using the same cascade paths,
 * then merging them back into a shorthand value. This enables consistent cascade behavior for both
 * simple properties and complex shorthand combinations.
 *
 * @param styleKeys - Array of longhand style keys that compose the shorthand property
 * @param nodeStyles - The block's style definitions
 * @param styleCascadePaths - Pre-computed cascade paths in priority order
 * @returns Operation result containing the merged shorthand value, or error if resolution fails
 * @see {@link cascadeStyleLonghandValue} - The function that resolves individual longhand values
 * @see {@link resolveStyleLonghand} - The function that merges longhand values into shorthand
 */
function cascadeStyleShorthandValue(styleKeys: StyleKey[], nodeStyles: NodeStyles, styleCascadePaths: StyleCascadePath[]): OperateResult<StyleValue> {
	const values: string[] = [];

	// Resolve each longhand property in the shorthand
	for (const styleKey of styleKeys) {
		const longhandResult = cascadeStyleLonghandValue(styleKey, nodeStyles, styleCascadePaths);
		if (!longhandResult.success) return { success: false, error: longhandResult.error };
		values.push(longhandResult.data);
	}

	// Merge the longhand values into a shorthand value
	return resolveStyleLonghand(values);
}

/**
 * Collects all style keys from a block and produces a completely cascaded style map.
 *
 * This function is the main orchestrator for style cascading. It gathers all unique style keys
 * present in the block's styles, then resolves each one using the pre-computed cascade paths.
 * For each style key, it determines whether it's a shorthand or longhand property and resolves
 * accordingly, building a complete resolved style record that represents the final computed styles
 * for the block in the current device/orientation/pseudo context.
 *
 * @param nodeStyles - The block's complete style definition object containing all unresolved styles
 * @param styleDefinitions - Registry of all available style definitions and their properties
 * @param styleCascadePaths - Pre-computed cascade paths in priority order
 * @returns Operation result containing the fully cascaded style record, or error if resolution fails
 * @see {@link cascadeNodeStyle} - The function that resolves individual style keys
 * @see {@link collectBlockStyleKeys} - The function that gathers unique style keys from block styles
 */
export function cascadeNodeStyles(nodeStyles: NodeStyles, styleDefinitions: RegisteredStyles, styleCascadePaths: StyleCascadePath[]): OperateResult<StyleRecord> {
	// Collect all unique style keys present in the block styles
	const keyResult = collectBlockStyleKeys(nodeStyles);
	if (!keyResult.success) return { success: false, error: keyResult.error };

	const resolved: StyleRecord = {};

	// Resolve each style key using cascading logic
	for (const styleKey of keyResult.data) {
		// Retrieve the style definition for validation
		const styleDefinition = pickStyleDefinition(styleKey, styleDefinitions);
		if (!styleDefinition.success) return { success: false, error: `No style definition found for key '${styleKey}'.` };

		// Cascade the style value with pre-computed styleCascadePaths
		const cascadeResult = cascadeNodeStyle(styleKey, nodeStyles, styleDefinition.data, styleCascadePaths);
		if (!cascadeResult.success) return cascadeResult;
		resolved[styleKey] = cascadeResult.data;
	}

	return { success: true, data: resolved };
}

/**
 * Resolves a style value that may be shorthand, using cascade and shorthand merging logic.
 *
 * This function acts as a dispatcher for style resolution. It first determines whether the requested
 * style key represents a shorthand property (like 'padding') or a longhand property (like 'paddingTop').
 * If shorthand, it delegates to shorthand resolution which resolves all constituent longhand properties
 * and merges them. If longhand, it delegates directly to longhand resolution. This unified approach
 * ensures consistent cascade behavior regardless of whether the property is shorthand or longhand.
 *
 * @param styleKey - The CSS style key to resolve (shorthand or longhand, e.g., 'padding' or 'paddingTop')
 * @param nodeStyles - The block's style definitions containing all style values
 * @param styleDefinition - The definition of the style property including metadata and constraints
 * @param styleCascadePaths - Pre-computed cascade paths in priority order for style resolution
 * @returns Operation result containing the resolved style value, or error if resolution fails
 * @see {@link cascadeStyleShorthandValue} - Called when style is a shorthand property
 * @see {@link cascadeStyleLonghandValue} - Called when style is a longhand property
 * @see {@link pickStyleLonghand} - The function that determines if a style is shorthand
 */
export function cascadeNodeStyle(styleKey: StyleKey, nodeStyles: NodeStyles, styleDefinition: StyleDefinition, styleCascadePaths: StyleCascadePath[]): OperateResult<StyleValue> {
	// Check if this is a shorthand property
	const longhandResult = pickStyleLonghand(styleDefinition);

	// If shorthand, resolve and merge the longhand properties
	if (longhandResult.success === true) return cascadeStyleShorthandValue(longhandResult.data, nodeStyles, styleCascadePaths);

	// Otherwise, resolve as a single longhand property
	return cascadeStyleLonghandValue(styleKey, nodeStyles, styleCascadePaths);
}
