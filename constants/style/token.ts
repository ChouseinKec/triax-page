// Types
import { StyleTokenData, StyleTokenKeys } from '@/types/style/token';

const createToken = (type: StyleTokenKeys, syntax: string): StyleTokenData => {
	return {
		type,
		syntax,
	};
};

export const StyleTokenDefinitions: Partial<Record<string, StyleTokenData>> = {
	// === Generic Types ===
	'<number>': createToken('<number>', '<number>'),
	'<integer>': createToken('<integer>', '<integer>'),
	'<percentage>': createToken('<percentage>', '<percentage>'),

	'<length>': createToken('<length>', '<length>'),
	'<angle>': createToken('<angle>', '<angle>'),
	'<flex>': createToken('<flex>', '<flex>'),

	'<link>': createToken('<link>', '<link>'),

	// === Composite Types ===
	'<length-percentage>': createToken('<length-percentage>', '<length>|<percentage>'),
	'<color>': createToken('<color>', '<color>'),

	'<track-list>': createToken('<track-list>', '[<track-size>|<track-repeat>]+'),
	'<track-size>': createToken('<track-size>', '[<track-breadth>|minmax(<inflexible-breadth>,<track-breadth>)|fit-content(<length-percentage [0,∞]>)]'),
	'<track-breadth>': createToken('<track-breadth>', '<length-percentage [0,∞]>|<flex [0,∞]>|min-content|max-content|auto'),
	'<inflexible-breadth>': createToken('<inflexible-breadth>', '<length-percentage [0,∞]>|min-content|max-content|auto'),
	'<track-repeat>': createToken('<track-repeat>', 'repeat(<integer [1,∞]>,<track-size>+)'),

	'<overflow-block>': createToken('<overflow-block>', 'visible | hidden | clip | scroll | auto'),

	'<ratio>': createToken('<ratio>', '<number [0,∞]> [ / <number [0,∞]> ]'),
	'<image>': createToken('<image>', 'url(<link>)'),

	// === Effect Types ===
	'<transform-function>': createToken('<transform-function>', '<translate3d>|<rotate3d>|<scale3d>|<skew>|<perspective>'),

	'<translate3d>': createToken('<translate3d>', 'translate3d(<length-percentage>,<length-percentage>,<length>)'),
	'<rotate3d>': createToken('<rotate3d>', 'rotate3d(<number>,<number>,<number>,<angle>)'),
	'<scale3d>': createToken('<scale3d>', 'scale3d(<number>,<number>,<number>)'),
	'<skew>': createToken('<skew>', 'skew(<angle>,<angle>)'),
	'<perspective>': createToken('<perspective>', 'perspective(<length [0,∞]>)'),

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
	'<bg-position>': createToken('<bg-position>', '[left|center|right|top|bottom|<length-percentage>] | [[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]] | [center|left|right <length-percentage> && center|top|bottom <length-percentage>]'),
	'<bg-image>': createToken('<bg-image>', 'none|<image>'),
	'<mix-blend-mode>': createToken('<mix-blend-mode>', 'normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity'),

	'<position>': createToken('<position>', 'static|relative|absolute|fixed|sticky'),

	// === Border Types ===
	'<border-image-source>': createToken('<border-image-source>', 'none|<image>'),
	'<border-image-slice>': createToken('<border-image-slice>', '[<number [0,∞]>|<percentage [0,∞]>]{1,4}&&fill?'),
	'<border-image-width>': createToken('<border-image-width>', '[<length-percentage [0,∞]>|<number [0,∞]>|auto]{1,4}'),
	'<border-image-outset>': createToken('<border-image-outset>', '[<length [0,∞]>|<number [0,∞]>]{1,4}'),
	'<border-image-repeat>': createToken('<border-image-repeat>', '[stretch|repeat|round|space]{1,2}'),

	// === Effect Types ===
	'<filter-function>': createToken('<filter-function>', 'blur(<length [0,∞]>)|brightness(<number [0,∞]>)|contrast(<number [0,∞]>)|drop-shadow(<length-percentage> <length-percentage> <length-percentage> <color>)|grayscale(<number [0,∞]>)|hue-rotate(<angle>)|invert(<number [0,∞]>)|opacity(<number [0,∞]>)|saturate(<number [0,∞]>)|sepia(<number [0,∞]>)'),

	'<spread-shadow>': createToken('<spread-shadow>', '<box-shadow-offset> <box-shadow-blur> <box-shadow-spread> <box-shadow-color> <box-shadow-position>?'),
	'<box-shadow-position>': createToken('<box-shadow-position>', 'inset'),
	'<box-shadow-color>': createToken('<box-shadow-color>', '<color>'),
	'<box-shadow-offset>': createToken('<box-shadow-offset>', '<length> <length>'),
	'<box-shadow-blur>': createToken('<box-shadow-blur>', '<length [0,∞]>'),
	'<box-shadow-spread>': createToken('<box-shadow-spread>', '<length>'),
};

export const StyleTokenDefaults: Record<string, string> = {
	'<length>': '0px',
	'<angle>': '0deg',
	'<percentage>': '0%',
	'<color>': '#ffffff',
	'<number>': '0.0',
	'<integer>': '0',
	'<flex>': '1fr',
	'<ratio>': '1/1',
	'<link>': '"https://example.com/image.png"',
};
