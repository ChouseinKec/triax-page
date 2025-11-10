// Types
import type { BlockStyles, BlockAttributes, BlockID } from '@/src/page-builder/core/block/block/types';
import type { AttributeKey } from '@/src/page-builder/core/block/attribute/types';
import type { DeviceValue } from '@/src/page-builder/core/page/types/device';
import type { OrientationValue } from '@/src/page-builder/core/page/types/orientation';
import type { PseudoValue } from '@/src/page-builder/core/page/types/pseudo';

// Helpers
import { generateCSSSelector, generateCSSRule, cascadeCSSStyles, normalizeAttributeValue, normalizeAttributeKey } from '@/src/page-builder/service/helpers/block';

// Registry
import { getRegisteredPseudos } from '@/src/page-builder/state/registries/page';

// Constants
import { DEFAULT_PSEUDO_ID } from '@/src/page-builder/core/page/constants';

/**
 * Renders block styles into a CSS string with proper cascading and selectors.
 * When pseudo is 'all', generates CSS rules for all pseudo-classes.
 * When pseudo is specific, generates preview styles applied to base selector.
 * @param styles - The block's complete style definition
 * @param blockID - The block's unique identifier for selector generation
 * @param device - Current device context for cascade resolution
 * @param orientation - Current orientation context for cascade resolution
 * @param pseudo - Current pseudo-class context for cascade resolution
 * @returns Formatted CSS string with selector and properties
 * @example
 * renderBlockStyles(styles, 'block-123', 'mobile', 'portrait', 'all') → "#block-block-123 {\n  color: red;\n}\n#block-block-123:hover {\n  color: blue;\n}\n"
 * renderBlockStyles(styles, 'block-123', 'mobile', 'portrait', 'hover') → "#block-block-123 {\n  color: blue;\n}\n"
 */
export function renderBlockStyles(styles: BlockStyles, blockID: BlockID, device: DeviceValue, orientation: OrientationValue, pseudo: PseudoValue): string {
	if (pseudo === DEFAULT_PSEUDO_ID) {
		// When pseudo is 'all', generate CSS rules for all pseudo-classes
		let css = '';

		// Get all registered pseudos to generate rules for each
		const allPseudos = getRegisteredPseudos();

		for (const [pseudoId] of Object.entries(allPseudos)) {
			const cssStyles = cascadeCSSStyles(styles, device, orientation, pseudoId);
			
			// Skip empty style objects
			if (Object.keys(cssStyles).length === 0) continue;

			const cssSelector = generateCSSSelector(blockID, pseudoId);
			css += generateCSSRule(cssSelector, cssStyles);
		}

		return css;
	}

	// When pseudo is specific, generate preview styles applied to base selector
	const cssStyles = cascadeCSSStyles(styles, device, orientation, pseudo);
	const cssSelector = generateCSSSelector(blockID, DEFAULT_PSEUDO_ID);
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
