// Types
import type { BlockStyles, BlockAttributes, BlockID } from '@/src/page-builder/core/block/block/types';
import type { AttributeKey } from '@/src/page-builder/core/block/attribute/types';
import type { DeviceValue } from '@/src/page-builder/core/page/types/device';
import type { OrientationValue } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoValue } from '@/src/page-builder/core/page/types/pseudo';

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
export function renderBlockStyles(styles: BlockStyles, blockID: BlockID, device: DeviceValue, orientation: OrientationValue, pseudo: PseudoValue): string {
	const resolvedStyles = cascadeStyles(styles, device, orientation, pseudo);
	const selector = generateCSSSelector(blockID, pseudo);
	return generateCSSRule(selector, resolvedStyles);
}

/**
 * Renders block attributes into a normalized object.
 * @param attributes The block's attribute definition
 * @returns Normalized attributes object
 */
export function renderBlockAttributes(attributes: BlockAttributes): Record<string, string | boolean> {
	const normalizedAttributes: Record<string, string | boolean> = {};
	for (const [property, value] of Object.entries(attributes)) {
		if (!value) continue;
		const normalizedProperty = normalizeAttributeKey(property as AttributeKey);
		const normalizedValue = normalizeAttributeValue(value);
		normalizedAttributes[normalizedProperty] = normalizedValue;
	}
	return normalizedAttributes;
}
