
/**
 * Converts camelCase CSS property to kebab-case
 * @param property - The camelCase property name (e.g., 'backgroundColor')
 * @returns The kebab-case property name (e.g., 'background-color')
 */
export const formatCSSProperty = (property: string): string => {
	return property.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
};

/**
 * Generates CSS properties block from an object of styles
 * @param styles - Object containing CSS properties and values
 * @param indentLevel - Number of spaces for indentation (default: 1)
 * @returns Formatted CSS properties string
 */
export const generateCSSProperties = (styles: Record<string, string>, indentLevel: number = 1): string => {
	const indent = '  '.repeat(indentLevel);
	let css = '';

	for (const [property, value] of Object.entries(styles)) {
		if (!value) continue;
		const cssProperty = formatCSSProperty(property);
		css += `${indent}${cssProperty}: ${value};\n`;
	}

	return css;
};

/**
 * Generates a complete CSS rule block
 * @param selector - CSS selector (e.g., '#block-123', '.class-name')
 * @param styles - Object containing CSS properties and values
 * @param indentLevel - Number of spaces for indentation (default: 0)
 * @returns Complete CSS rule block
 */
export const generateCSSRule = (selector: string, styles: Record<string, string>, indentLevel: number = 0): string => {
	if (!styles || Object.keys(styles).length === 0) return '';

	const indent = '  '.repeat(indentLevel);
	let css = `${indent}${selector} {\n`;
	css += generateCSSProperties(styles, indentLevel + 1);
	css += `${indent}}\n`;

	return css;
};

/**
 * Generates CSS selector for a block with optional pseudo-state
 * @param blockID - The block ID
 * @param pseudoName - The pseudo-state name ('all' means no pseudo)
 * @returns CSS selector string
 */
export const getBlockSelector = (blockID: string, pseudoName: string = 'all'): string => {
	const pseudoSelector = pseudoName === 'all' ? '' : `:${pseudoName}`;
	return `#block-${blockID}${pseudoSelector}`;
};
