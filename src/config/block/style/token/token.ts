// keys
import { TokenDefinition } from '@/src/core/block/style/types/token';

/**
 * A lookup table of all supported CSS data key tokens and their definitions.
 * Each entry is a TokenDefinition object describing the token's name and syntax.
 */
export const TOKEN_DEFINITIONS: TokenDefinition[] = [
	// Basic tokens
	{
		key: '<number>',
		syntax: '<number>',
		default: '0.0',
	},
	{
		key: '<integer>',
		syntax: '<integer>',
		default: '0',
	},
	{
		key: '<percentage>',
		syntax: '<percentage>',
		default: '0%',
	},
	{
		key: '<length>',
		syntax: '<length>',
		default: '0px',
	},
	{
		key: '<angle>',
		syntax: '<angle>',
		default: '0deg',
	},
	{
		key: '<flex>',
		syntax: '<flex>',
		default: '1fr',
	},
	{
		key: '<link>',
		syntax: '<link>',
		default: '"https://example.com/image.png"',
	},
	{
		key: '<color>',
		syntax: '<color>',
		default: '#ffffff',
	},

	// Functional tokens
	{
		key: '<minmax>',
		syntax: 'minmax(<length-percentage [0,∞]>,<length-percentage [0,∞]>)',
		default: 'minmax(0px,0px)',
	},
	{
		key: '<fit-content>',
		syntax: 'fit-content(<length-percentage [0,∞]>)',
		default: 'fit-content(0px)',
	},
	{
		key: '<repeat>',
		syntax: 'repeat(<integer [1,∞]>,<track-size>+)',
		default: 'repeat(1,1fr)',
	},
	{
		key: '<translate3d>',
		syntax: 'translate3d(<length-percentage>,<length-percentage>,<length>)',
		default: 'translate3d(0px,0px,0px)',
	},
	{
		key: '<rotate3d>',
		syntax: 'rotate3d(<number>,<number>,<number>,<angle>)',
		default: 'rotate3d(0,0,0,0deg)',
	},
	{
		key: '<scale3d>',
		syntax: 'scale3d(<number>,<number>,<number>)',
		default: 'scale3d(1.0,1.0,1.0)',
	},
	{
		key: '<skew>',
		syntax: 'skew(<angle>,<angle>)',
		default: 'skew(0deg,0deg)',
	},
	{
		key: '<perspective>',
		syntax: 'perspective(<length [0,∞]>)',
		default: 'perspective(0px)',
	},
	{
		key: '<blur>',
		syntax: 'blur(<length [0,∞]>)',
		default: 'blur(0px)',
	},
	{
		key: '<brightness>',
		syntax: 'brightness(<number [0,∞]>)',
		default: 'brightness(1.0)',
	},
	{
		key: '<contrast>',
		syntax: 'contrast(<number [0,∞]>)',
		default: 'contrast(1.0)',
	},
	{
		key: '<drop-shadow>',
		syntax: 'drop-shadow(<length-percentage> <length-percentage> <length-percentage> <color>)',
		default: 'drop-shadow(0px 0px 0px #ffffff)',
	},
	{
		key: '<grayscale>',
		syntax: 'grayscale(<number [0,∞]>)',
		default: 'grayscale(0.0)',
	},
	{
		key: '<hue-rotate>',
		syntax: 'hue-rotate(<angle>)',
		default: 'hue-rotate(0deg)',
	},
	{
		key: '<invert>',
		syntax: 'invert(<number [0,∞]>)',
		default: 'invert(0.0)',
	},
	{
		key: '<opacity>',
		syntax: 'opacity(<number [0,∞]>)',
		default: 'opacity(1.0)',
	},
	{
		key: '<saturate>',
		syntax: 'saturate(<number [0,∞]>)',
		default: 'saturate(1.0)',
	},
	{
		key: '<sepia>',
		syntax: 'sepia(<number [0,∞]>)',
		default: 'sepia(0.0)',
	},
	{
		key: '<url>',
		syntax: 'url(<link>)',
		default: 'url("https://example.com")',
	},

	// Composed tokens
	{
		key: '<length-percentage>',
		syntax: '<length>|<percentage>',
	},

	{
		key: '<track-list>',
		syntax: '[<track-size>|<track-repeat>]+',
	},
	{
		key: '<track-size>',
		syntax: '[<track-breadth>|minmax(<inflexible-breadth>,<track-breadth>)|<fit-content>]',
	},
	{
		key: '<track-breadth>',
		syntax: '<length-percentage [0,∞]>|<flex [0,∞]>|min-content|max-content|auto',
	},
	{
		key: '<inflexible-breadth>',
		syntax: '<length-percentage [0,∞]>|min-content|max-content|auto',
	},
	{
		key: '<track-repeat>',
		syntax: 'repeat(<integer [1,∞]>,<track-size>+)',
	},
	{
		key: '<overflow-block>',
		syntax: 'visible | hidden | clip | scroll | auto',
	},
	{
		key: '<ratio>',
		syntax: '<number [0,∞]> [ / <number [0,∞]> ]',
		default: '1/1',
	},
	{
		key: '<image>',
		syntax: 'url(<link>)',
	},
	{
		key: '<transform-function>',
		syntax: '<translate3d>|<rotate3d>|<scale3d>|<skew>|<perspective>',
	},
	{
		key: '<generic-family>',
		syntax: '<generic-complete>|<generic-incomplete>',
	},
	{
		key: '<generic-complete>',
		syntax: 'serif|sans-serif|system-ui|cursive|fantasy|math|monospace',
	},
	{
		key: '<generic-incomplete>',
		syntax: 'ui-serif|ui-sans-serif|ui-monospace|ui-rounded',
	},
	{
		key: '<text-decoration-line>',
		syntax: 'none|underline|overline|line-through',
	},
	{
		key: '<text-decoration-style>',
		syntax: 'solid|double|dotted|dashed|wavy',
	},
	{
		key: '<text-decoration-color>',
		syntax: '<color>',
	},
	{
		key: '<text-decoration-thickness>',
		syntax: 'auto|from-font|<length-percentage>',
	},
	{
		key: '<bg-size>',
		syntax: '<length-percentage [0,∞]>|auto|cover|contain',
	},
	{
		key: '<bg-position>',
		syntax: '[left|center|right|top|bottom|<length-percentage>] | [[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]] | [center|left|right <length-percentage> && center|top|bottom <length-percentage>]',
	},
	{
		key: '<bg-image>',
		syntax: 'none|<image>',
	},
	{
		key: '<mix-blend-mode>',
		syntax: 'normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity',
	},
	{
		key: '<position>',
		syntax: 'static|relative|absolute|fixed|sticky',
	},
	{
		key: '<border-image-source>',
		syntax: 'none|<image>',
	},
	{
		key: '<border-image-slice>',
		syntax: '[<number [0,∞]>|<percentage [0,∞]>]{1,4}&&fill?',
	},
	{
		key: '<border-image-width>',
		syntax: '[<length-percentage [0,∞]>|<number [0,∞]>|auto]{1,4}',
	},
	{
		key: '<border-image-outset>',
		syntax: '[<length [0,∞]>|<number [0,∞]>]{1,4}',
	},
	{
		key: '<border-image-repeat>',
		syntax: '[stretch|repeat|round|space]{1,2}',
	},
	{
		key: '<filter-function>',
		syntax: '<blur>|brightness(<number [0,∞]>)|contrast(<number [0,∞]>)|drop-shadow(<length-percentage> <length-percentage> <length-percentage> <color>)|grayscale(<number [0,∞]>)|hue-rotate(<angle>)|invert(<number [0,∞]>)|opacity(<number [0,∞]>)|saturate(<number [0,∞]>)|sepia(<number [0,∞]>)',
	},
	{
		key: '<spread-shadow>',
		syntax: '<box-shadow-offset> <box-shadow-blur> <box-shadow-spread> <box-shadow-color> <box-shadow-position>?',
	},
	{
		key: '<box-shadow-position>',
		syntax: 'inset',
	},
	{
		key: '<box-shadow-color>',
		syntax: '<color>',
	},
	{
		key: '<box-shadow-offset>',
		syntax: '<length> <length>',
	},
	{
		key: '<box-shadow-blur>',
		syntax: '<length [0,∞]>',
	},
	{
		key: '<box-shadow-spread>',
		syntax: '<length>',
	},
];
