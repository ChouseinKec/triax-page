// Types
import type { NodeInstance } from '@/core/block/node/instance/types/instance';
import type { NodeStyles } from '@/core/block/node/definition/types/definition';
import type { StyleLonghand, StyleDefinition, RegisteredStyles, StyleKey } from '@/core/block/style/definition/types';

import type { PickResult } from '@/shared/types/result';
/**
 * Pick the `styles` object for a block instance by id.
 *
 * @param blockInstance - instance of the block whose styles should be picked
 * @param storedNodes - record containing all block instances keyed by id
 */
export function pickNodeStyles(blockInstance: NodeInstance): PickResult<NodeStyles> {
	const NodeStyles = blockInstance.styles;
	if (!NodeStyles) return { success: false, error: `Block styles not found for block: '${blockInstance.id}'` };

	return { success: true, data: NodeStyles };
}

/**
 *  Pick the longhand style keys for a given style definition.
 *
 * @param styleDefinition - the style definition containing longhand info
 */
export function pickStyleLonghand(styleDefinition: StyleDefinition): PickResult<StyleLonghand> {
	const longhands = styleDefinition.longhand;
	if (!longhands) return { success: false, error: `Style does not have longhand properties` };

	return { success: true, data: longhands };
}

/**
 * Pick the style definition for a given style key from the registry.
 *
 * @param styleKey - the style key to look up
 * @param styleDefinitions - the record of all style definitions
 */
export function pickStyleDefinition(styleKey: StyleKey, styleDefinitions: RegisteredStyles): PickResult<StyleDefinition> {
	const styleDefinition = styleDefinitions[styleKey];
	if (!styleDefinition) return { success: false, error: `Style definition not found for key: '${styleKey}'` };

	return { success: true, data: styleDefinition };
}
