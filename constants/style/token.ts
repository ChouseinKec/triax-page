// Types
import { CSSToken, CSSTokens } from '@/types/style/token';

const createToken = (type: CSSTokens, syntax: string): CSSToken => {
	return {
		type,
		syntax,
	};
};

export const CSSTokenDefs: Partial<Record<CSSTokens, CSSToken>> = {
	// === Generic Types ===
	'<number>': createToken('<number>', '<number>'),
	'<integer>': createToken('<integer>', '<integer>'),
	'<percentage>': createToken('<percentage>', '<percentage>'),

	'<length>': createToken('<length>', '<length>'),
	'<angle>': createToken('<angle>', '<angle>'),
	'<flex>': createToken('<flex>', '<flex>'),

	'<link>': createToken('<link>', '<link>'),

	// === Composite Types ===
	'<length-percentage>': createToken('<length-percentage>', '<length> | <percentage>'),
	'<color>': createToken('<color>', '<color>'),

	'<track-list>': createToken('<track-list>', '[<track-size>|<track-repeat>]+'),
	'<track-size>': createToken('<track-size>', '[<track-breadth>|minmax(<inflexible-breadth>,<track-breadth>)|fit-content(<length-percentage [0,∞]>)]'),
	'<track-breadth>': createToken('<track-breadth>', '<length-percentage [0,∞]>|<flex [0,∞]>|min-content|max-content|auto'),
	'<inflexible-breadth>': createToken('<inflexible-breadth>', '<length-percentage [0,∞]>|min-content|max-content|auto'),
	'<track-repeat>': createToken('<track-repeat>', 'repeat(<integer [1,∞]>,<track-size>+)'),

	'<overflow-block>': createToken('<overflow-block>', 'visible | hidden | clip | scroll | auto'),

	'<transform-function>': createToken('<transform-function>', '<translate>|<translate3d>|<translateX>|<translateY>|<translateZ>|<scale3d>|<rotate3d>|<rotateX>|<rotateY>|<rotateZ>|<skew>|<perspective>'),
	'<ratio>': createToken('<ratio>', '<number [0,∞]> [ / <number [0,∞]> ]'),
	'<image>': createToken('<image>', 'url(<link>)'),

	// === Math Types ===
	'<rotate3d>': createToken('<rotate3d>', 'rotate3d(<number>, <number>, <number>, <angle>)'),
	'<rotateX>': createToken('<rotateX>', 'rotateX(<angle>)'),
	'<rotateY>': createToken('<rotateY>', 'rotateY(<angle>)'),
	'<rotateZ>': createToken('<rotateZ>', 'rotateZ(<angle>)'),

	'<scale3d>': createToken('<scale3d>', 'scale3d(<number>, <number>, <number>)'),
	'<skew>': createToken('<skew>', 'skew(<angle>[, <angle>]?)'),

	'<translate>': createToken('<translate>', 'translate(<length-percentage>[, <length-percentage>]?)'),
	'<translate3d>': createToken('<translate3d>', 'translate3d(<length-percentage>, <length-percentage>, <length>)'),
	'<translateX>': createToken('<translateX>', 'translateX(<length-percentage>)'),
	'<translateY>': createToken('<translateY>', 'translateY(<length-percentage>)'),
	'<translateZ>': createToken('<translateZ>', 'translateZ(<length>)'),

	'<perspective>': createToken('<perspective>', 'perspective(<length>)'),

	//  === Font Types ===
	'<generic-family>': createToken('<generic-family>', '<generic-complete>|<generic-incomplete>'),
	'<generic-complete>': createToken('<generic-complete>', 'serif|sans-serif|system-ui|cursive|fantasy|math|monospace'),
	'<generic-incomplete>': createToken('<generic-incomplete>', 'ui-serif|ui-sans-serif|ui-monospace|ui-rounded'),

	// === Text Types ===
	'<text-decoration-line>': createToken('<text-decoration-line>', 'none|underline|overline|line-through|blink'),
	'<text-decoration-style>': createToken('<text-decoration-style>', 'solid|double|dotted|dashed|wavy'),
	'<text-decoration-color>': createToken('<text-decoration-color>', '<color>'),
	'<text-decoration-thickness>': createToken('<text-decoration-thickness>', 'auto|from-font|<length-percentage>'),



	// === Background Types ===
	'<bg-size>': createToken('<bg-size>', '<length-percentage [0,∞]>|auto|cover|contain'),
	'<bg-position>': createToken('<bg-position>', '[[left|center|right|<length-percentage>]&&[top|center|bottom|<length-percentage>]]'),
	'<bg-image>': createToken('<bg-image>', 'none|<image>'),
};
