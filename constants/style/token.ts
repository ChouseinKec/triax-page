// Types
import { CSSToken, CSSTokens } from '@/types/style/token';

const createToken = (type: CSSTokens, syntax: string, initialValue?: string): CSSToken => {
	return {
		type,
		syntax,
		initialValue,
	};
};

export const CSSTokenDefs: Partial<Record<CSSTokens, CSSToken>> = {
	// === Numeric Types ===
	'<number>': createToken('<number>', '<number>'),
	'<integer>': createToken('<integer>', '<integer>'),
	'<percentage>': createToken('<percentage>', '<percentage>'),
	// '<dimension>': createToken('<dimension>', '<number><unit>'),
	// '<alpha-value>': createToken('<alpha-value>', '<number> | <percentage>'),

	// === Unit Types ===
	'<length>': createToken('<length>', '<length>'),
	'<angle>': createToken('<angle>', '<angle>'),
	// '<time>': createToken('<time>', '<number><time-unit>'),
	// '<frequency>': createToken('<frequency>', '<number><frequency-unit>'),
	// '<resolution>': createToken('<resolution>', '<number><resolution-unit>'),
	'<flex>': createToken('<flex>', '<flex>'),

	// === Composite Types ===
	'<length-percentage>': createToken('<length-percentage>', '<length> | <percentage>'),
	// '<position>': createToken('<position>', '[left | center | right] [top | center | bottom] | <length-percentage>{1,2}'),
	'<color>': createToken('<color>', '<named-color> | <hex> | rgb() | rgba() | hsl() | hsla() | lab() | lch() | oklab() | oklch()'),
	'<image>': createToken('<image>', '<url> | <gradient> | <image-function>'),
	'<url>': createToken('<url>', 'url(<string>)'),
	'<string>': createToken('<string>', '<string>'),

	'<track-list>': createToken('<track-list>', '[<track-size>|<track-repeat>]+'),
	'<track-size>': createToken('<track-size>', '<track-breadth>|minmax(<inflexible-breadth>,<track-breadth>)|fit-content(<length-percentage [0,∞]>)'),

	'<auto-track-list>': createToken('<auto-track-list>', '[<fixed-size>|<fixed-repeat>]* <auto-repeat> [<fixed-size>|<fixed-repeat>]*'),
	'<track-repeat>': createToken('<track-repeat>', 'repeat(<integer [1,∞]>,<track-size>+)'),
	'<fixed-size>': createToken('<fixed-size>', '<fixed-breadth>|minmax(<fixed-breadth>,<track-breadth>)|minmax(<inflexible-breadth>,<fixed-breadth>)'),
	'<fixed-repeat>': createToken('<fixed-repeat>', 'repeat([<integer [1,∞]>],<fixed-size>+)'),
	'<auto-repeat>': createToken('<auto-repeat>', 'repeat([auto-fill|auto-fit],<fixed-size>+)'),
	
	'<track-breadth>': createToken('<track-breadth>', '<length-percentage [0,∞]>|<flex [0,∞]>|min-content|max-content|auto'),
	'<inflexible-breadth>': createToken('<inflexible-breadth>', '<length-percentage [0,∞]>|min-content|max-content|auto'),
	
	
	
	
	
	// '<size-keyword>': createToken('<size-keyword>', 'auto | max-content | min-content | fit-content(<length-percentage>?) | stretch'),
	// '<display-keyword>': createToken('<display-keyword>', 'block | inline | flex | grid | contents | none'),
	'<line-style>': createToken('<line-style>', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset'),
	'<shadow>': createToken('<shadow>', '[inset? <length>{2,4} <color>?]'),
	'<transform-function>': createToken('<transform-function>', 'matrix() | translate() | scale() | rotate() | skew() | perspective()'),
	'<ratio>': createToken('<ratio>', '<number [0,∞]> [ / <number [0,∞]> ]'),

	// === Math Types ===
	// '<calc()>': createToken('<calc()>', 'calc(<calc-sum>)'),
	'<min()>': createToken('<min()>', 'min(<calc-sum>#{1,∞})'),
	'<max()>': createToken('<max()>', 'max(<calc-sum>#{1,∞})'),
	'<clamp()>': createToken('<clamp()>', 'clamp(<calc-sum>, <calc-sum>, <calc-sum>)'),
	// '<calc-size()>': createToken('<calc-size()>', 'calc-size(<size-keyword> | <calc-size()>, <calc-sum>)'),
	// '<anchor-size()>': createToken('<anchor-size()>', 'anchor-size([<anchor-name>,] <length-percentage>?)'),
	// '<sin()>': createToken('<sin()>', 'sin(<angle> | <number>)'),
	// '<cos()>': createToken('<cos()>', 'cos(<angle> | <number>)'),
	// '<tan()>': createToken('<tan()>', 'tan(<angle> | <number>)'),
	// '<asin()>': createToken('<asin()>', 'asin(<number>)'),
	// '<acos()>': createToken('<acos()>', 'acos(<number>)'),
	// '<atan()>': createToken('<atan()>', 'atan(<number>)'),
	// '<atan2()>': createToken('<atan2()>', 'atan2(<number>, <number>)'),
	// '<pow()>': createToken('<pow()>', 'pow(<number>, <number>)'),
	// '<sqrt()>': createToken('<sqrt()>', 'sqrt(<number>)'),
	// '<hypot()>': createToken('<hypot()>', 'hypot(<number>#{1,∞})'),
	// '<log()>': createToken('<log()>', 'log(<number>, <number>?)'),
	// '<exp()>': createToken('<exp()>', 'exp(<number>)'),
	// '<abs()>': createToken('<abs()>', 'abs(<number>)'),
	// '<sign()>': createToken('<sign()>', 'sign(<number>)'),
	// '<mod()>': createToken('<mod()>', 'mod(<number>, <number>)'),
	// '<rem()>': createToken('<rem()>', 'rem(<number>, <number>)'),
	// '<round()>': createToken('<round()>', 'round(<rounding-strategy>?, <number>, <number>)'),

	// === Function Types ===
	'<repeat()>': createToken('<repeat()>', 'repeat(<repeat-count>, <track-list>)', '1,0px'),
	'<minmax()>': createToken('<minmax()>', 'minmax(<track-breadth>, <track-breadth>)'),
	'<fit-content()>': createToken('<fit-content()>', 'fit-content(<length-percentage [0,∞]>)', '0px'),
	// '<var()>': createToken('<var()>', 'var(--<custom-ident>, <declaration-value>?)'),
	// '<linear-gradient()>': createToken('<linear-gradient()>', 'linear-gradient([<angle> | to <side-or-corner>]?, <color-stop-list>)'),
	// '<radial-gradient()>': createToken('<radial-gradient()>', 'radial-gradient([<ending-shape> || <size>]? [at <position>]?, <color-stop-list>)'),
	// '<conic-gradient()>': createToken('<conic-gradient()>', 'conic-gradient([from <angle>]? [at <position>]?, <angular-color-stop-list>)'),
	// '<repeating-linear-gradient()>': createToken('<repeating-linear-gradient()>', 'repeating-linear-gradient([<angle> | to <side-or-corner>]?, <color-stop-list>)'),
	// '<repeating-radial-gradient()>': createToken('<repeating-radial-gradient()>', 'repeating-radial-gradient([<ending-shape> || <size>]? [at <position>]?, <color-stop-list>)'),
	// '<repeating-conic-gradient()>': createToken('<repeating-conic-gradient()>', 'repeating-conic-gradient([from <angle>]? [at <position>]?, <angular-color-stop-list>)'),
	// '<matrix()>': createToken('<matrix()>', 'matrix(<number>#{6})'),
	// '<matrix3d()>': createToken('<matrix3d()>', 'matrix3d(<number>#{16})'),
	// '<perspective()>': createToken('<perspective()>', 'perspective(<length>)'),
	'<rotate()>': createToken('<rotate()>', 'rotate(<angle>)'),
	'<rotate3d()>': createToken('<rotate3d()>', 'rotate3d(<number>, <number>, <number>, <angle>)'),
	'<rotateX()>': createToken('<rotateX()>', 'rotateX(<angle>)'),
	'<rotateY()>': createToken('<rotateY()>', 'rotateY(<angle>)'),
	'<rotateZ()>': createToken('<rotateZ()>', 'rotateZ(<angle>)'),
	'<scale()>': createToken('<scale()>', 'scale(<number>[, <number>]?)'),
	'<scale3d()>': createToken('<scale3d()>', 'scale3d(<number>, <number>, <number>)'),
	'<scaleX()>': createToken('<scaleX()>', 'scaleX(<number>)'),
	'<scaleY()>': createToken('<scaleY()>', 'scaleY(<number>)'),
	'<scaleZ()>': createToken('<scaleZ()>', 'scaleZ(<number>)'),
	'<skew()>': createToken('<skew()>', 'skew(<angle>[, <angle>]?)'),
	'<skewX()>': createToken('<skewX()>', 'skewX(<angle>)'),
	'<skewY()>': createToken('<skewY()>', 'skewY(<angle>)'),
	'<translate()>': createToken('<translate()>', 'translate(<length-percentage>[, <length-percentage>]?)'),
	'<translate3d()>': createToken('<translate3d()>', 'translate3d(<length-percentage>, <length-percentage>, <length>)'),
	'<translateX()>': createToken('<translateX()>', 'translateX(<length-percentage>)'),
	'<translateY()>': createToken('<translateY()>', 'translateY(<length-percentage>)'),
	'<translateZ()>': createToken('<translateZ()>', 'translateZ(<length>)'),
	// '<steps()>': createToken('<steps()>', 'steps(<integer>[, <step-position>]?)'),
	'<cubic-bezier()>': createToken('<cubic-bezier()>', 'cubic-bezier(<number>, <number>, <number>, <number>)'),
	'<drop-shadow()>': createToken('<drop-shadow()>', 'drop-shadow(<shadow>)'),
	'<blur()>': createToken('<blur()>', 'blur(<length>)'),
	'<brightness()>': createToken('<brightness()>', 'brightness(<percentage>)'),
	'<contrast()>': createToken('<contrast()>', 'contrast(<percentage>)'),
	'<grayscale()>': createToken('<grayscale()>', 'grayscale(<percentage>)'),
	'<hue-rotate()>': createToken('<hue-rotate()>', 'hue-rotate(<angle>)'),
	'<invert()>': createToken('<invert()>', 'invert(<percentage>)'),
	'<opacity()>': createToken('<opacity()>', 'opacity(<percentage>)'),
	'<saturate()>': createToken('<saturate()>', 'saturate(<percentage>)'),
	'<sepia()>': createToken('<sepia()>', 'sepia(<percentage>)'),
	'<url()>': createToken('<url()>', 'url(<string>)'),

	// === Identifier Types ===
	// '<ident>': createToken('<ident>', '[a-zA-Z_][a-zA-Z0-9_-]*'),
	// '<custom-ident>': createToken('<custom-ident>', '<ident> excluding [initial, inherit, unset, revert]'),
	// '<dashed-ident>': createToken('<dashed-ident>', '--[a-zA-Z0-9-_]+'),
	// '<family-name>': createToken('<family-name>', '<string> | <custom-ident>+'),

	// === Special/Const Types ===
	'<calc-keyword>': createToken('<calc-keyword>', 'e | pi | infinity | -infinity | NaN'),
	'<global-keyword>': createToken('<global-keyword>', 'initial | inherit | unset | revert'),
};
