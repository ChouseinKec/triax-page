/**
 * All valid CSS data type tokens used in value definition syntax (e.g. '<number>', '<length>', '<color>').
 * These correspond to the official CSS value definition data types from the CSS spec.
 */
export type CSSTokenKeys = '<number>' | '<integer>' | '<percentage>' | '<length>' | '<angle>' | '<flex>' | '<link>' | '<length-percentage>' | '<color>' | '<track-list>' | '<track-size>' | '<track-breadth>' | '<inflexible-breadth>' | '<track-repeat>' | '<overflow-block>' | '<ratio>' | '<image>' | '<transform-function>' | '<translate3d>' | '<rotate3d>' | '<scale3d>' | '<skew>' | '<perspective>' | '<generic-family>' | '<generic-complete>' | '<generic-incomplete>' | '<text-decoration-line>' | '<text-decoration-style>' | '<text-decoration-color>' | '<text-decoration-thickness>' | '<bg-size>' | '<bg-position>' | '<bg-image>' | '<mix-blend-mode>' | '<position>' | '<border-image-source>' | '<border-image-slice>' | '<border-image-width>' | '<border-image-outset>' | '<border-image-repeat>' | '<filter-function>' | '<spread-shadow>' | '<box-shadow-position>' | '<box-shadow-color>' | '<box-shadow-offset>' | '<box-shadow-blur>' | '<box-shadow-spread>';
export type CSSTokenType = 'keyword' | 'function' | 'dimension' | 'number' | 'integer' | 'color' | 'link';

/**
 * Represents a single CSS data type definition, including its name and syntax.
 */
export interface CSSTokenDefinition {
	/**
	 * The canonical name of the CSS data type (e.g. '<number>', '<length>').
	 */
	type: CSSTokenKeys;

	/**
	 * The value definition syntax for this data type (may reference other data types).
	 */
	syntax: string;
}
