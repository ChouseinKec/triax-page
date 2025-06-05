type NumericTypes =
	| '<number>' // e.g. 1.5, -2.3, 0
	| '<integer>' // e.g. 1, -2, 0
	| '<percentage>' // e.g. 50%, -100%, 0%
	| '<dimension>' // e.g. 100px, 50em, 1.5rem
	| '<alpha-value>'; // e.g. 0.5, 50% (for opacity, etc.)

type UnitTypes =
	| '<length>' // e.g. 100px, 50em, 1rem
	| '<angle>' // e.g. 45deg, 1rad
	| '<time>' // e.g. 1s, 500ms
	| '<frequency>' // e.g. 60Hz
	| '<resolution>' // e.g. 192dpi, 2x
	| '<flex>' // e.g. 1fr
	| '<viewport-length>'; // e.g. 100vh, 50vw

type CompositeTypes =
	| '<length-percentage>' // e.g. 100px, 50%, 1.5em
	| '<length-percentage-number>' // e.g. 100px, 50%, 1.5
	| '<position>' // e.g. left top, center center, 50% 50%, 10px 20px
	| '<image>' // e.g. linear-gradient(red, blue), url('image.png')
	| '<color>' // e.g. rgb(255, 0, 0), #ff0000
	| '<url>' // e.g. url('image.png')
	| '<string>' // e.g. 'hello', "world"
	| '<track-breadth>' // e.g. 100px, 50%, 1fr, min-content, max-content, auto
	| '<size-keyword>' // e.g. auto, max-content, min-content, fit-content(), stretch
	| '<display-keyword>' // e.g. block, inline, flex, grid, contents, none
	| '<line-style>' // e.g. solid, dotted, dashed
	| '<shadow>' // e.g. 2px 2px 5px black
	| '<transform-function>' // e.g. rotate(45deg), scale(1.2)
	| '<ratio>' // e.g. 16/9, 1.5, 1/3

type MathTypes =
	| '<calc()>' // e.g. calc(100% - 20px)
	| '<min()>' // e.g. min(100px, 50%)
	| '<max()>' // e.g. max(100px, 50%)
	| '<clamp()>' // e.g. clamp(100px, 50%, 200px)
	| '<calc-size()>' // e.g. calc-size(100%)
	| '<anchor-size()>' // e.g. anchor-size(100%)
	| '<sin()>' // e.g. sin(45deg)
	| '<cos()>' // e.g. cos(0.5rad)
	| '<tan()>' // e.g. tan(1turn)
	| '<asin()>' // e.g. asin(0.5)
	| '<acos()>' // e.g. acos(1)
	| '<atan()>' // e.g. atan(infinity)
	| '<atan2()>' // e.g. atan2(1, 2)
	| '<pow()>' // e.g. pow(2, 3)
	| '<sqrt()>' // e.g. sqrt(4)
	| '<hypot()>' // e.g. hypot(3, 4)
	| '<log()>' // e.g. log(10, 100)
	| '<exp()>' // e.g. exp(1)
	| '<abs()>' // e.g. abs(-5)
	| '<sign()>' // e.g. sign(-10)
	| '<mod()>' // e.g. mod(10, 3)
	| '<rem()>' // e.g. rem(10, 3)
	| '<round()>' // e.g. round(nearest, 5, 3)
	| '<rem()>'; // e.g. rem(10, 3)

type FunctionTypes =
	| '<repeat()>' // e.g. repeat(3, 1fr)
	| '<minmax()>' // e.g. minmax(100px, 1fr)
	| '<fit-content()>' // e.g. fit-content(50%)
	| '<var()>' // e.g. var(--my-var)
	| '<attr()>' // e.g. attr(data-count)
	| '<counter()>' // e.g. counter(my-counter)
	| '<counters()>' // e.g. counters(my-counter, '.')
	| '<symbols()>' // e.g. symbols(cyclic 'A' 'B' 'C')
	| '<linear-gradient()>' // e.g. linear-gradient(45deg, red, blue)
	| '<radial-gradient()>' // e.g. radial-gradient(circle, red, yellow, green)
	| '<conic-gradient()>' // e.g. conic-gradient(red, yellow, lime, aqua, blue, magenta, red)
	| '<repeating-linear-gradient()>' // e.g. repeating-linear-gradient(45deg, blue, blue 10px, white 10px, white 20px)
	| '<repeating-radial-gradient()>' // e.g. repeating-radial-gradient(circle, blue, blue 10px, white 10px, white 20px)
	| '<repeating-conic-gradient()>' // e.g. repeating-conic-gradient(red 0%, yellow 15%, red 33%)
	| '<matrix()>' // e.g. matrix(1, 0, 0, 1, 100, 100)
	| '<matrix3d()>' // e.g. matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
	| '<perspective()>' // e.g. perspective(500px)
	| '<rotate()>' // e.g. rotate(45deg)
	| '<rotate3d()>' // e.g. rotate3d(1, 1, 1, 45deg)
	| '<rotateX()>' // e.g. rotateX(45deg)
	| '<rotateY()>' // e.g. rotateY(45deg)
	| '<rotateZ()>' // e.g. rotateZ(45deg)
	| '<scale()>' // e.g. scale(1.2)
	| '<scale3d()>' // e.g. scale3d(1, 1.2, 0.8)
	| '<scaleX()>' // e.g. scaleX(1.5)
	| '<scaleY()>' // e.g. scaleY(1.5)
	| '<scaleZ()>' // e.g. scaleZ(1.5)
	| '<skew()>' // e.g. skew(10deg, 20deg)
	| '<skewX()>' // e.g. skewX(10deg)
	| '<skewY()>' // e.g. skewY(10deg)
	| '<translate()>' // e.g. translate(100px, 50px)
	| '<translate3d()>' // e.g. translate3d(100px, 50px, 10px)
	| '<translateX()>' // e.g. translateX(100px)
	| '<translateY()>' // e.g. translateY(50px)
	| '<translateZ()>' // e.g. translateZ(10px)
	| '<steps()>' // e.g. steps(4, jump-start)
	| '<cubic-bezier()>' // e.g. cubic-bezier(0.1, 0.7, 1.0, 0.1)
	| '<drop-shadow()>' // e.g. drop-shadow(2px 2px 5px black)
	| '<blur()>' // e.g. blur(5px)
	| '<brightness()>' // e.g. brightness(0.8)
	| '<contrast()>' // e.g. contrast(150%)
	| '<grayscale()>' // e.g. grayscale(50%)
	| '<hue-rotate()>' // e.g. hue-rotate(90deg)
	| '<invert()>' // e.g. invert(100%)
	| '<opacity()>' // e.g. opacity(50%)
	| '<saturate()>' // e.g. saturate(200%)
	| '<sepia()>' // e.g. sepia(80%)
	| '<url()>'; // e.g. url('image.png')

type IdentTypes =
	| '<ident>' // e.g. my-property
	| '<custom-ident>' // e.g. my-custom-property
	| '<dashed-ident>' // e.g. --my-custom-property
	| '<family-name>'; // e.g. 'Arial', 'Times New Roman'

type SpecialTypes =
	| '<calc-keyword>' // e.g. e, pi, infinity, -infinity, NaN
	| '<global-keyword>' // e.g. initial, inherit, unset, revert
	| '<supports-condition>' // e.g. (display: flex)
	| '<media-query>' // e.g. (min-width: 600px)
	| '<selector>' // e.g. div > p, .class, #id
	| '<feature-query>'; // e.g. @supports (display: grid)

/**
 * All valid CSS data type tokens used in value definition syntax (e.g. '<number>', '<length>', '<color>').
 * These correspond to the official CSS value definition data types from the CSS spec.
 * Used for type-safe parsing, expansion, and validation of CSS property values.
 */
export type CSSDataTypes = NumericTypes | UnitTypes | CompositeTypes | MathTypes | FunctionTypes | IdentTypes | SpecialTypes;

/**
 * Represents a single CSS data type definition, including its name and syntax.
 * Used for data type lookup, expansion, and validation.
 */
export interface CSSDataType {
	/**
	 * The canonical name of the CSS data type (e.g. '<number>', '<length>').
	 */
	type: CSSDataTypes;

	/**
	 * The value definition syntax for this data type (may reference other data types).
	 */
	syntax: string;
}
