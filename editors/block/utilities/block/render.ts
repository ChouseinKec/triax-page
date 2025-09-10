// Types
import type { StylesEditor, AttributeEditor, AttributeKeys, BlockID } from '@/editors/block/types';
import type { Device } from '@/types/page/device';
import type { Orientation } from '@/types/page/orientation';
import type { Pseudo } from '@/types/page/pseudo';

// Utilities
import { cascadeStyles } from '@/editors/block/utilities/style/cascade';
import { generateCSSSelector, generateCSSRule } from '@/editors/block/utilities/style/css';
import { normalizeValue } from '@/editors/block/utilities/attribute/value';
import { normalizeKey } from '@/editors/block/utilities/attribute/key';

/**
 * Renders block styles into a CSS string.
 * @param styles The block's style definition
 * @param blockID The block's ID for selector generation
 * @param device Current device
 * @param orientation Current orientation
 * @param pseudo Current pseudo-class
 * @returns CSS string or undefined if no styles
 */
export function renderStylesEditor(styles: StylesEditor | null, blockID: BlockID, device: Device, orientation: Orientation, pseudo: Pseudo): string | undefined {
	if (!styles) return undefined;
	const resolvedStyles = cascadeStyles(styles, device.value, orientation.value, pseudo.value);
	if (Object.keys(resolvedStyles).length === 0) return undefined;
	const selector = generateCSSSelector(blockID, pseudo.value);
	return generateCSSRule(selector, resolvedStyles);
}

/**
 * Renders block attributes into a normalized object.
 * @param attributes The block's attribute definition
 * @returns Normalized attributes object or null if empty
 */
export function renderAttributeEditor(attributes: AttributeEditor): Record<string, string | boolean> | null {
	if (Object.keys(attributes).length === 0) return null;
	const normalizedAttributes: Record<string, string | boolean> = {};
	for (const [property, value] of Object.entries(attributes)) {
		if (!value) continue;
		const normalizedProperty = normalizeKey(property as AttributeKeys);
		const normalizedValue = normalizeValue(value);
		normalizedAttributes[normalizedProperty] = normalizedValue;
	}
	return normalizedAttributes;
}

export default {
	styles: renderStylesEditor,
	attributes: renderAttributeEditor,
} as const;
