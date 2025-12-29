// Types
import type { BlockInstance, BlockStyles } from '@/src/core/block/instance/types';
import type { StyleLonghand, StyleDefinition, StyleDefinitionRecord, StyleKey } from '@/src/core/block/style/types';

import type { PickResult } from '@/src/shared/types/result';
/**
 * Pick the `styles` object for a block instance by id.
 *
 * @param blockInstance - instance of the block whose styles should be picked
 * @param storedBlocks - record containing all block instances keyed by id
 */
export function pickBlockStyles(blockInstance: BlockInstance): PickResult<BlockStyles> {
	const blockStyles = blockInstance.styles;
	if (!blockStyles) return { success: false, error: `Block styles not found for block: '${blockInstance.id}'` };

	return { success: true, data: blockStyles };
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
export function pickStyleDefinition(styleKey: StyleKey, styleDefinitions: StyleDefinitionRecord): PickResult<StyleDefinition> {
	const styleDefinition = styleDefinitions[styleKey];
	if (!styleDefinition) return { success: false, error: `Style definition not found for key: '${styleKey}'` };

	return { success: true, data: styleDefinition };
}
