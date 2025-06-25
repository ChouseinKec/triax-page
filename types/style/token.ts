type GenericTypes =
	| '<number>' // e.g. 1.5, -2.3, 0
	| '<integer>' // e.g. 1, -2, 0
	| '<percentage>' // e.g. 50%, -100%, 0%
	| '<length>' // e.g. 100px, 50em, 1rem
	| '<angle>' // e.g. 45deg, 1rad
	| '<flex>' // e.g. 1fr
	| '<link>'; // e.g. 'https://example.com', 'mailto:

type CompositeTypes =
	| '<length-percentage>' // e.g. 100px, 50%, 1.5em
	| '<color>' // e.g. rgb(255, 0, 0), #ff0000
	| '<track-breadth>' // e.g. 100px, 50%, 1fr, min-content, max-content, auto
	| '<track-list>' // e.g. 100px, 50% / 1fr, min-content, max-content, auto
	| '<track-size>' // e.g. 100px, 50% / minmax(100px, 1fr), fit-content(50%)
	| '<track-repeat>' // e.g. repeat(3, 1fr), repeat(auto-fill, minmax(100px, 1fr))
	| '<inflexible-breadth>' // e.g. 100px, 50% / minmax(100px, 1fr), fit-content(50%)
	| '<transform-function>' // e.g. rotate(45deg), scale(1.2)
	| '<ratio>' // e.g. 16/9, 1.5, 1/3
	| '<image>' // e.g. url('image.png'), gradient(to right, red, blue)
	| '<url>'; // e.g. url('image.png'), src('image.jpg')

type FunctionTypes =
	| '<var()>' // e.g. var(--my-var)
	| '<matrix>' // e.g. matrix(1, 0, 0, 1, 100, 100)
	| '<matrix3d>' // e.g. matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
	| '<perspective>' // e.g. perspective(500px)
	| '<rotate>' // e.g. rotate(45deg)
	| '<rotate3d>' // e.g. rotate3d(1, 1, 1, 45deg)
	| '<rotateX>' // e.g. rotateX(45deg)
	| '<rotateY>' // e.g. rotateY(45deg)
	| '<rotateZ>' // e.g. rotateZ(45deg)
	| '<scale>' // e.g. scale(1.2)
	| '<scale3d>' // e.g. scale3d(1, 1.2, 0.8)
	| '<scaleX>' // e.g. scaleX(1.5)
	| '<scaleY>' // e.g. scaleY(1.5)
	| '<scaleZ>' // e.g. scaleZ(1.5)
	| '<skew>' // e.g. skew(10deg, 20deg)
	| '<skewX>' // e.g. skewX(10deg)
	| '<skewY>' // e.g. skewY(10deg)
	| '<translate>' // e.g. translate(100px, 50px)
	| '<translate3d>' // e.g. translate3d(100px, 50px, 10px)
	| '<translateX>' // e.g. translateX(100px)
	| '<translateY>' // e.g. translateY(50px)
	| '<translateZ>' // e.g. translateZ(10px)
	| '<url()>'; // e.g. url('image.png')

type SpecialTypes = '<overflow-block>';

type FontTypes =
	| '<generic-family>'
	| '<generic-complete>' // e.g. serif, sans-serif, monospace
	| '<generic-incomplete>' // e.g. cursive, fantasy, system-ui, math
	| '<column-rule-width>' // e.g. 1px, 2em, 0.5rem
	| '<line-width-list>' // e.g. 1px, 2em, 0.5rem
	| '<auto-line-width-list>' // e.g. auto, 1px, 2em, 0.5rem
	| '<line-width-or-repeat>' // e.g. 1px, 2em, 0.5rem, repeat(3, 1fr)
	| '<auto-repeat-line-width>' // e.g. auto, 1px, 2em, 0.5rem, repeat(3, 1fr)
	| '<line-width>' // e.g. 1px, 2em, 0.5rem
	| '<repeat-line-width>' // e.g. repeat(3, 1fr)
	| '<line-style-list>'
	| '<auto-line-style-list>' // e.g. solid 1px, dashed 2em, dotted 0.5rem
	| '<line-style-or-repeat>'
	| '<auto-repeat-line-style>'
	| '<line-style>'
	| '<repeat-line-style>';

type TextTypes = '<outline-width>' | '<outline-style>' | '<outline-color>' | '<text-decoration-line>' | '<text-decoration-style>' | '<text-decoration-color>' | '<text-decoration-thickness>';
type BackgroundTypes = '<bg-size>' | '<bg-position>' | '<bg-image>';
/**
 * All valid CSS data type tokens used in value definition syntax (e.g. '<number>', '<length>', '<color>').
 * These correspond to the official CSS value definition data types from the CSS spec.
 * Used for type-safe parsing, expansion, and validation of CSS property values.
 */
export type CSSTokens = GenericTypes | CompositeTypes | FunctionTypes | SpecialTypes | FontTypes | TextTypes | BackgroundTypes;

export type CSSTokenGroups = 'keyword' | 'function' | 'dimension' | 'number' | 'integer' | 'color' | 'link';

/**
 * Represents a single CSS data type definition, including its name and syntax.
 * Used for data type lookup, expansion, and validation.
 */
export interface CSSToken {
	/**
	 * The canonical name of the CSS data type (e.g. '<number>', '<length>').
	 */
	type: CSSTokens;

	/**
	 * The value definition syntax for this data type (may reference other data types).
	 */
	syntax: string;
}
