// Types
import type { BlockAttributes } from '@/src/core/block/instance/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import type { BlockStyles, BlockID } from '@/src/core/block/instance/types';
import type { DeviceValue } from '@/src/core/layout/page/types';
import type { OrientationValue } from '@/src/core/layout/page/types';
import type { PseudoValue } from '@/src/core/layout/page/types';

// Utilities
import { normalizeAttributeValue, normalizeAttributeKey } from '@/src/core/block/attribute/utilities';

// Registry
import { getRegisteredPseudos } from '@/src/core/layout/page/registry';

// Constants
import { DEFAULT_PSEUDO_ID } from '@/src/core/layout/page/constants';

// Helpers
import { cascadeCSSStyles, generateCSSSelector, generateCSSRule } from '@/src/core/block/style/helper/';

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
			const cssStylesRes = cascadeCSSStyles(styles, device, orientation, pseudoId);
			if (!cssStylesRes.success) continue;
			const cssStyles = cssStylesRes.data;

			// Skip empty style objects
			if (Object.keys(cssStyles).length === 0) continue;

			const cssSelectorRes = generateCSSSelector(blockID, pseudoId);
			if (!cssSelectorRes.success) continue;

			const cssRuleRes = generateCSSRule(cssSelectorRes.data, cssStyles);
			if (!cssRuleRes.success) continue;

			css += cssRuleRes.data;
		}

		return css;
	}

	// When pseudo is specific, generate preview styles applied to base selector
	const cssStylesRes = cascadeCSSStyles(styles, device, orientation, pseudo);
	if (!cssStylesRes.success) return '';
	const cssStyles = cssStylesRes.data;

	const cssSelectorRes = generateCSSSelector(blockID, DEFAULT_PSEUDO_ID);
	if (!cssSelectorRes.success) return '';

	const cssRuleRes = generateCSSRule(cssSelectorRes.data, cssStyles);
	if (!cssRuleRes.success) return '';
	return cssRuleRes.data;
}
