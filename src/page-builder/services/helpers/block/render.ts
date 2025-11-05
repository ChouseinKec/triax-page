// Types
import type { BlockStyles, BlockAttributes, BlockID } from '@/src/page-builder/core/block/block/types';
import type { AttributeKey } from '@/src/page-builder/core/block/attribute/types';
import type { DeviceValue } from '@/src/page-builder/core/page/types/device';
import type { OrientationValue } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoValue } from '@/src/page-builder/core/page/types/pseudo';

// Helpers
import { generateCSSSelector, generateCSSRule, cascadeCSSStyles, normalizeAttributeValue, normalizeAttributeKey } from '@/src/page-builder/services/helpers/block';

/**
 * Renders block styles into a CSS string with proper cascading and selectors.
 * Resolves styles based on device/orientation/pseudo context and generates a complete CSS rule.
 * @param styles - The block's complete style definition
 * @param blockID - The block's unique identifier for selector generation
 * @param device - Current device context for cascade resolution
 * @param orientation - Current orientation context for cascade resolution
 * @param pseudo - Current pseudo-class context for cascade resolution
 * @returns Formatted CSS string with selector and properties
 * @example
 * renderBlockStyles(styles, 'block-123', 'mobile', 'portrait', 'hover') → "#block-block-123:hover {\n  color: red;\n}\n"
 */
export function renderBlockStyles(styles: BlockStyles, blockID: BlockID, device: DeviceValue, orientation: OrientationValue, pseudo: PseudoValue): string {
	const cssStyles = cascadeCSSStyles(styles, device, orientation, pseudo);
	const cssSelector = generateCSSSelector(blockID, pseudo);

	return generateCSSRule(cssSelector, cssStyles);
}

/**
 * Renders block attributes into a normalized React-compatible object.
 * Converts HTML attribute names to React equivalents and normalizes boolean values.
 * @param attributes - The block's attribute definition object
 * @returns Normalized attributes object ready for React component props
 * @example
 * renderBlockAttributes({ class: 'btn', disabled: 'true' }) → { className: 'btn', disabled: true }
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
