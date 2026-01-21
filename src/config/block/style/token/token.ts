// Types
import type { TokenDefinition } from '@/core/block/style/types/token';

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
		type: 'number',
	},
	{
		key: '<integer>',
		syntax: '<integer>',
		default: '0',
		type: 'integer',
	},
	{
		key: '<percentage>',
		syntax: '<percentage>',
		default: '0%',
		type: 'length',
	},
	{
		key: '<length>',
		syntax: '<length>',
		default: '0px',
		type: 'length',
	},
	{
		key: '<angle>',
		syntax: '<angle>',
		default: '0deg',
		type: 'length',
	},
	{
		key: '<flex>',
		syntax: '<flex>',
		default: '1fr',
		type: 'length',
	},
	{
		key: '<link>',
		syntax: '<link>',
		default: '"https://example.com/image.png"',
		type: 'link',
	},
	{
		key: '<color>',
		syntax: '<color>',
		default: '#ffffff',
		type: 'color',
	},

	// Composed tokens
	{
		key: '<length-percentage>',
		syntax: '<length>|<percentage>',
		type: 'composed',
	},
	{
		key: '<track-list>',
		syntax: '[<track-size> | <track-repeat>]+',
		type: 'composed',
	},
	{
		key: '<track-size>',
		syntax: '<track-breadth> | minmax(<inflexible-breadth>,<track-breadth>) | fit-content(<length-percentage [0,∞]>)',
		type: 'composed',
	},
	{
		key: '<track-breadth>',
		syntax: '<length-percentage [0,∞]> | <flex [0,∞]> | min-content | max-content | auto',
		type: 'composed',
	},
	{
		key: '<inflexible-breadth>',
		syntax: '<length-percentage [0,∞]> | min-content | max-content | auto',
		type: 'composed',
	},
	{
		key: '<track-repeat>',
		syntax: 'repeat(<integer [1,∞]> , [<track-size>]+)',
		type: 'composed',
	},
	{
		key: '<overflow-block>',
		syntax: 'visible | hidden | clip | scroll | auto',
		type: 'composed',
	},
	{
		key: '<ratio>',
		syntax: '<number [0,∞]> [ / <number [0,∞]> ]',
		type: 'composed',
	},
	{
		key: '<image>',
		syntax: 'url(<link>)',
		type: 'composed',
	},
	{
		key: '<transform-function>',
		syntax: 'translate3d(<length-percentage>,<length-percentage>,<length>) | rotate3d(<number>,<number>,<number>,<angle>) | scale3d(<number>,<number>,<number>) | skew(<angle>,<angle>) | perspective(<length [0,∞]>)',
		type: 'composed',
	},
	{
		key: '<generic-family>',
		syntax: '<generic-complete>|<generic-incomplete>',
		type: 'composed',
	},
	{
		key: '<generic-complete>',
		syntax: 'serif|sans-serif|system-ui|cursive|fantasy|math|monospace',
		type: 'composed',
	},
	{
		key: '<generic-incomplete>',
		syntax: 'ui-serif|ui-sans-serif|ui-monospace|ui-rounded',
		type: 'composed',
	},
	{
		key: '<text-decoration-line>',
		syntax: 'none|underline|overline|line-through',
		type: 'composed',
	},
	{
		key: '<text-decoration-style>',
		syntax: 'solid|double|dotted|dashed|wavy',
		type: 'composed',
	},
	{
		key: '<text-decoration-color>',
		syntax: '<color>',
		type: 'composed',
	},
	{
		key: '<text-decoration-thickness>',
		syntax: 'auto|from-font|<length-percentage>',
		type: 'composed',
	},
	{
		key: '<bg-size>',
		syntax: '<length-percentage [0,∞]>|auto|cover|contain',
		type: 'composed',
	},
	{
		key: '<bg-position>',
		syntax: '[left|center|right|top|bottom|<length-percentage>] | [[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]] | [center|left|right <length-percentage> && center|top|bottom <length-percentage>]',
		type: 'composed',
	},
	{
		key: '<bg-image>',
		syntax: 'none|<image>',
		type: 'composed',
	},
	{
		key: '<mix-blend-mode>',
		syntax: 'normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity',
		type: 'composed',
	},
	{
		key: '<position>',
		syntax: 'static|relative|absolute|fixed|sticky',
		type: 'composed',
	},
	{
		key: '<border-image-source>',
		syntax: 'none|<image>',
		type: 'composed',
	},
	{
		key: '<border-image-slice>',
		syntax: '[<number [0,∞]>|<percentage [0,∞]>]{1,4}&&fill?',
		type: 'composed',
	},
	{
		key: '<border-image-width>',
		syntax: '[<length-percentage [0,∞]>|<number [0,∞]>|auto]{1,4}',
		type: 'composed',
	},
	{
		key: '<border-image-outset>',
		syntax: '[<length [0,∞]>|<number [0,∞]>]{1,4}',
		type: 'composed',
	},
	{
		key: '<border-image-repeat>',
		syntax: '[stretch|repeat|round|space]{1,2}',
		type: 'composed',
	},
	{
		key: '<filter-function>',
		syntax: 'blur(<length [0,∞]>) | brightness(<number [0,∞]>) | contrast(<number [0,∞]>) | drop-shadow(<length-percentage> <length-percentage> <length-percentage> <color>) | grayscale(<number [0,∞]>) | hue-rotate(<angle>) | invert(<number [0,∞]>) | opacity(<number [0,∞]>) | saturate(<number [0,∞]>) | sepia(<number [0,∞]>)',
		type: 'composed',
	},

	{
		key: '<spread-shadow>',
		syntax: '<box-shadow-position> <length> <length>   <box-shadow-blur> <box-shadow-spread>  <box-shadow-color> ',
		type: 'composed',
	},
	{
		key: '<box-shadow-blur>',
		syntax: '<length [0,∞]>',
		type: 'composed',
	},
	{
		key: '<box-shadow-spread>',
		syntax: '<length>',
		type: 'composed',
	},
	{
		key: '<box-shadow-color>',
		syntax: '<color>',
		type: 'composed',
	},
	{
		key: '<box-shadow-position>',
		syntax: 'outset | inset',
		type: 'composed',
	},
];
