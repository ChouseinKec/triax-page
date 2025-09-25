// Types
import type { BlockStyles, BlockAttributes, BlockID } from '@/src/page-builder/core/block/block/types';
import type { AttributeKeys } from '@/src/page-builder/core/block/attribute/types';
import type { DeviceValue } from '@/src/page-builder/core/page/types/device';
import type { OrientationDefinition } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoDefinition } from '@/src/page-builder/core/page/types/pseudo';

// Utilities
import { cascadeStyles, generateCSSSelector, generateCSSRule } from '@/src/page-builder/core/block/style/utilities';
import { normalizeAttributeValue, normalizeAttributeKey } from '@/src/page-builder/core/block/attribute/utilities';

/**
 * Renders block styles into a CSS string.
 * @param styles The block's style definition
 * @param blockID The block's ID for selector generation
 * @param device Current device
 * @param orientation Current orientation
 * @param pseudo Current pseudo-class
 * @returns CSS string or undefined if no styles
 */
export function renderBlockStyles(styles: BlockStyles | null, blockID: BlockID, device: DeviceValue, orientation: OrientationDefinition, pseudo: PseudoDefinition): string | undefined {
	if (!styles) return undefined;
	const resolvedStyles = cascadeStyles(styles, device, orientation.value, pseudo.value);
	if (Object.keys(resolvedStyles).length === 0) return undefined;
	const selector = generateCSSSelector(blockID, pseudo.value);
	return generateCSSRule(selector, resolvedStyles);
}

/**
 * Renders block attributes into a normalized object.
 * @param attributes The block's attribute definition
 * @returns Normalized attributes object or null if empty
 */
export function renderBlockAttributes(attributes: BlockAttributes): Record<string, string | boolean> | null {
	if (Object.keys(attributes).length === 0) return null;
	const normalizedAttributes: Record<string, string | boolean> = {};
	for (const [property, value] of Object.entries(attributes)) {
		if (!value) continue;
		const normalizedProperty = normalizeAttributeKey(property as AttributeKeys);
		const normalizedValue = normalizeAttributeValue(value);
		normalizedAttributes[normalizedProperty] = normalizedValue;
	}
	return normalizedAttributes;
}
