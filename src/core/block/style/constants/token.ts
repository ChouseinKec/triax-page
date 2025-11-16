// Types
import { TokenDefinition, TokenKeys } from '@/src/core/block/style/types';

/**
 * A lookup table of all supported CSS data type tokens and their definitions.
 * Each entry is a TokenDefinition object describing the token's name and syntax.
 */
export const TOKEN_DEFINITIONS: Record<TokenKeys, TokenDefinition> = {
	'<number>': { type: '<number>', syntax: '<number>' },
	'<integer>': { type: '<integer>', syntax: '<integer>' },
	'<percentage>': { type: '<percentage>', syntax: '<percentage>' },
	'<length>': { type: '<length>', syntax: '<length>' },
	'<angle>': { type: '<angle>', syntax: '<angle>' },
	'<flex>': { type: '<flex>', syntax: '<flex>' },
	'<link>': { type: '<link>', syntax: '<link>' },
	'<length-percentage>': { type: '<length-percentage>', syntax: '<length>|<percentage>' },
	'<color>': { type: '<color>', syntax: '<color>' },
	'<track-list>': { type: '<track-list>', syntax: '[<track-size>|<track-repeat>]+' },
	'<track-size>': { type: '<track-size>', syntax: '[<track-breadth>|minmax(<inflexible-breadth>,<track-breadth>)|fit-content(<length-percentage [0,∞]>)]' },
	'<track-breadth>': { type: '<track-breadth>', syntax: '<length-percentage [0,∞]>|<flex [0,∞]>|min-content|max-content|auto' },
	'<inflexible-breadth>': { type: '<inflexible-breadth>', syntax: '<length-percentage [0,∞]>|min-content|max-content|auto' },
	'<track-repeat>': { type: '<track-repeat>', syntax: 'repeat(<integer [1,∞]>,<track-size>+)' },
	'<overflow-block>': { type: '<overflow-block>', syntax: 'visible | hidden | clip | scroll | auto' },
	'<ratio>': { type: '<ratio>', syntax: '<number [0,∞]> [ / <number [0,∞]> ]' },
	'<image>': { type: '<image>', syntax: 'url(<link>)' },
	'<transform-function>': { type: '<transform-function>', syntax: '<translate3d>|<rotate3d>|<scale3d>|<skew>|<perspective>' },
	'<translate3d>': { type: '<translate3d>', syntax: 'translate3d(<length-percentage>,<length-percentage>,<length>)' },
	'<rotate3d>': { type: '<rotate3d>', syntax: 'rotate3d(<number>,<number>,<number>,<angle>)' },
	'<scale3d>': { type: '<scale3d>', syntax: 'scale3d(<number>,<number>,<number>)' },
	'<skew>': { type: '<skew>', syntax: 'skew(<angle>,<angle>)' },
	'<perspective>': { type: '<perspective>', syntax: 'perspective(<length [0,∞]>)' },
	'<generic-family>': { type: '<generic-family>', syntax: '<generic-complete>|<generic-incomplete>' },
	'<generic-complete>': { type: '<generic-complete>', syntax: 'serif|sans-serif|system-ui|cursive|fantasy|math|monospace' },
	'<generic-incomplete>': { type: '<generic-incomplete>', syntax: 'ui-serif|ui-sans-serif|ui-monospace|ui-rounded' },
	'<text-decoration-line>': { type: '<text-decoration-line>', syntax: 'none|underline|overline|line-through' },
	'<text-decoration-style>': { type: '<text-decoration-style>', syntax: 'solid|double|dotted|dashed|wavy' },
	'<text-decoration-color>': { type: '<text-decoration-color>', syntax: '<color>' },
	'<text-decoration-thickness>': { type: '<text-decoration-thickness>', syntax: 'auto|from-font|<length-percentage>' },
	'<bg-size>': { type: '<bg-size>', syntax: '<length-percentage [0,∞]>|auto|cover|contain' },
	'<bg-position>': { type: '<bg-position>', syntax: '[left|center|right|top|bottom|<length-percentage>] | [[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]] | [center|left|right <length-percentage> && center|top|bottom <length-percentage>]' },
	'<bg-image>': { type: '<bg-image>', syntax: 'none|<image>' },
	'<mix-blend-mode>': { type: '<mix-blend-mode>', syntax: 'normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity' },
	'<position>': { type: '<position>', syntax: 'static|relative|absolute|fixed|sticky' },
	'<border-image-source>': { type: '<border-image-source>', syntax: 'none|<image>' },
	'<border-image-slice>': { type: '<border-image-slice>', syntax: '[<number [0,∞]>|<percentage [0,∞]>]{1,4}&&fill?' },
	'<border-image-width>': { type: '<border-image-width>', syntax: '[<length-percentage [0,∞]>|<number [0,∞]>|auto]{1,4}' },
	'<border-image-outset>': { type: '<border-image-outset>', syntax: '[<length [0,∞]>|<number [0,∞]>]{1,4}' },
	'<border-image-repeat>': { type: '<border-image-repeat>', syntax: '[stretch|repeat|round|space]{1,2}' },
	'<filter-function>': { type: '<filter-function>', syntax: 'blur(<length [0,∞]>)|brightness(<number [0,∞]>)|contrast(<number [0,∞]>)|drop-shadow(<length-percentage> <length-percentage> <length-percentage> <color>)|grayscale(<number [0,∞]>)|hue-rotate(<angle>)|invert(<number [0,∞]>)|opacity(<number [0,∞]>)|saturate(<number [0,∞]>)|sepia(<number [0,∞]>)' },
	'<spread-shadow>': { type: '<spread-shadow>', syntax: '<box-shadow-offset> <box-shadow-blur> <box-shadow-spread> <box-shadow-color> <box-shadow-position>?' },
	'<box-shadow-position>': { type: '<box-shadow-position>', syntax: 'inset' },
	'<box-shadow-color>': { type: '<box-shadow-color>', syntax: '<color>' },
	'<box-shadow-offset>': { type: '<box-shadow-offset>', syntax: '<length> <length>' },
	'<box-shadow-blur>': { type: '<box-shadow-blur>', syntax: '<length [0,∞]>' },
	'<box-shadow-spread>': { type: '<box-shadow-spread>', syntax: '<length>' },
} as Record<TokenKeys, TokenDefinition>;

/**
 * Default values for common CSS data types.
 * Used for initializing properties and ensuring valid defaults.
 */
export const TOKEN_DEFAULTS: Partial<Record<TokenKeys, string>> = {
	'<length>': '0px',
	'<angle>': '0deg',
	'<percentage>': '0%',
	'<color>': '#ffffff',
	'<number>': '0.0',
	'<integer>': '0',
	'<flex>': '1fr',
	'<ratio>': '1/1',
	'<link>': '"https://example.com/image.png"',
} as Partial<Record<TokenKeys, string>>;
