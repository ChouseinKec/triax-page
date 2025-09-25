// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';

// Utilities
import { formatStyleKey } from '@/src/page-builder/core/block/style/utilities/';

/**
 * Generates CSS properties block from an object of styles
 * @param styles - Object containing CSS properties and values
 * @param indentLevel - Number of spaces for indentation (default: 1)
 * @returns Formatted CSS properties string
 */
export function generateCSSStyles(styles: Record<string, string>, indentLevel: number = 1): string {
	const indent = '  '.repeat(indentLevel);
	let css = '';

	for (const [key, value] of Object.entries(styles)) {
		if (!value) continue;
		if (!key) continue;

		const formattedKey = formatStyleKey(key);
		if (!formattedKey) continue;

		css += `${indent}${formattedKey}: ${value};\n`;
	}

	return css;
}

/**
 * Generates a complete CSS rule block
 * @param selector - CSS selector (e.g., '#block-123', '.class-name')
 * @param styles - Object containing CSS properties and values
 * @param indentLevel - Number of spaces for indentation (default: 0)
 * @returns Complete CSS rule block
 */
export function generateCSSRule(selector: string, styles: Record<string, string>, indentLevel: number = 0): string {
	if (!styles || Object.keys(styles).length === 0) return '';

	const indent = '  '.repeat(indentLevel);
	let css = `${indent}${selector} {\n`;
	css += generateCSSStyles(styles, indentLevel + 1);
	css += `${indent}}\n`;

	return css;
}

/**
 * Generates CSS selector for a blockID with optional pseudo-state
 * @param blockID - The block ID
 * @param pseudoName - The pseudo-state name ('all' means no pseudo)
 * @returns CSS selector string
 */
export function generateCSSSelector(blockID: BlockID, pseudoName: string = 'all'): string {
	const pseudoSelector = pseudoName === 'all' ? '' : `:${pseudoName}`;
	return `#block-${blockID}${pseudoSelector}`;
}

export default {
	generate: {
		styles: generateCSSStyles,
		rules: generateCSSRule,
		selectors: generateCSSSelector,
	},
} as const;
