/**
 * Represents the accepted syntax formats for style values.
 * These syntaxes define how a CSS-like value should be parsed or rendered.
 *
 * @value 'keyword' - A single predefined keyword (e.g., `auto`, `inherit`).
 * @value 'variable' - A CSS variable (e.g., `var(--color)`).
 * @value 'expression' - A custom or dynamic expression.
 * @value 'function(length)' - A function with a single length parameter (e.g., `min(10px)`).
 * @value 'function(number)' - A function with a single number parameter (e.g., `rotate(45)`).
 * @value 'function(length,length)' - A function with two length parameters (e.g., `clamp(10px, 5vw)`).
 * @value 'function(number,length)' - A function with a number and length (e.g., `scale(1.5, 50%)`).
 * @value 'function(length,length,length)' - A function with three length parameters (e.g., `inset(1px 2px 3px)`).
 * @value 'length length length color' - A composite value with multiple lengths and a color (e.g., `1px 2px 3px red`).
 * @value 'length' - A single CSS length (e.g., `10px`).
 * @value 'color' - A color value (e.g., `#fff`, `rgba(0,0,0,0.5)`).
 * @value 'number' - A standalone numeric value.
 * @value 'number || number/number' - A format for fractions or aspect ratios (e.g., `16/9`).
 * @value '' - An empty value, used for fallback or reset.
 */
export type STYLE_VALUE_SYNTAX =
	| 'keyword' //
	| 'keyword keyword'
	| 'variant'
	| 'variable'
	| 'expression'
	| 'function(url)'
	| 'function(length)'
	| 'function(number)'
	| 'function(length,length)'
	| 'function(number,length)'
	| 'function(length,length,length)'
	| 'length length length color'
	| 'length'
	| 'color'
	| 'number'
	| 'number || number/number'
	| 'length length'
	| '';

/**
 * Represents a single style value configuration.
 * Used for constructing complex and typed inputs in the style editor.
 *
 * @param {string} name - The display name or label of the style value.
 * @param {string} value - The actual value to be applied (e.g., `10px`, `#fff`).
 * @param {STYLE_VALUE_SYNTAX} syntax - The syntax type for validation and UI rendering.
 * @param {string} [category] - Optional category for grouping related values.
 * @param {STYLE_VALUE[]} [lengths] - Optional list of allowed or recommended lengths.
 * @param {string} [icon] - Optional icon reference for UI display.
 */
export type STYLE_VALUE = {
	name: string;
	value: string;
	syntax: STYLE_VALUE_SYNTAX;
	category?: string;
	lengths?: STYLE_VALUE[];
	icon?: string;
};
