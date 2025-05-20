import { STYLE_VALUE } from '@/editors/style/constants/types';
import { LENGTHS } from '@/editors/style/constants/lengths';

export const ABSOLUTE_UNITS: STYLE_VALUE[] = [LENGTHS.scalable.linear.px];
export const RELATIVE_UNITS: STYLE_VALUE[] = [
	//
	LENGTHS.scalable.linear.perce,
	LENGTHS.scalable.linear.em,
	LENGTHS.scalable.linear.rem,
	LENGTHS.scalable.linear.ch,
];
export const VIEWPORT_UNITS: STYLE_VALUE[] = [
	//
	LENGTHS.scalable.linear.vw,
	LENGTHS.scalable.linear.vh,
	LENGTHS.scalable.linear.vmin,
	LENGTHS.scalable.linear.vmax,
];
export const FLEXIBLE_UNITS: STYLE_VALUE[] = [LENGTHS.scalable.linear.fr];
export const ROTATION_UNITS: STYLE_VALUE[] = [
	//
	LENGTHS.scalable.angle.deg,
	LENGTHS.scalable.angle.rad,
	LENGTHS.scalable.angle.grad,
	LENGTHS.scalable.angle.turn,
];

export const MATH_FUNCTIONS: STYLE_VALUE[] = [
	//
	LENGTHS.functions.math.min,
	LENGTHS.functions.math.max,
	LENGTHS.functions.math.clamp,
	LENGTHS.functions.math.calc,
];

export const LAYOUT_KEYWORDS: STYLE_VALUE[] = [
	//
	LENGTHS.keywords.special.auto,
	LENGTHS.keywords.special.minContent,
	LENGTHS.keywords.special.maxContent,
	LENGTHS.keywords.special.fitContent,
];

export const GLOBAL_KEYWORDS: STYLE_VALUE[] = [
	//
	LENGTHS.keywords.global.initial,
	LENGTHS.keywords.global.inherit,
	LENGTHS.keywords.global.unset,
	LENGTHS.keywords.global.revert,
	LENGTHS.keywords.global.revertLayer,
];

/**
 * - Units: `px`, `%`, `em`, `rem`, `ch`, `vw`, `vh`, `vmin`, `vmax`, `var()`
 * - Functions:
 * - Keywords:
 */
export const LENGTH: STYLE_VALUE[] = [
	//
	...ABSOLUTE_UNITS,
	...RELATIVE_UNITS,
	...VIEWPORT_UNITS,
	LENGTHS.scalable.linear.var,
];

/**
 * - Units: `px`, `%`, `em`, `rem`, `ch`, `vw`, `vh`, `vmin`, `vmax`, `var()`
 * - Functions: `min()`, `max()`, `clamp()`, `calc()`
 * - Keywords:
 */
export const LENGTH_MATH: STYLE_VALUE[] = [
	//
	...LENGTH,
	...MATH_FUNCTIONS,
];

/**
 * - Units: `px`, `%`, `em`, `rem`, `ch`, `vw`, `vh`, `vmin`, `vmax`, `var()`
 * - Functions: `min()`, `max()`, `clamp()`, `calc()`
 * - Keywords: `auto`, `min-content`, `max-content`, `fit-content`
 */
export const LENGTH_MATH_LAYOUT: STYLE_VALUE[] = [
	//
	...LENGTH_MATH,
	...LAYOUT_KEYWORDS,
];

/**
 * Includes all LENGTH_MATH lengths plus `auto`:
 * - Units: `px`, `%`, `em`, `rem`, `ch`, `vw`, `vh`, `vmin`, `vmax`, `var()`
 * - Functions: `min()`, `max()`, `clamp()`, `calc()`
 * - Keywords: `auto`
 */
export const LENGTH_MATH_AUTO: STYLE_VALUE[] = [
	//
	...LENGTH_MATH,
	LENGTHS.keywords.special.auto,
];

/**
 * Includes all LENGTH_MATH lengths plus `auto`:
 * - Units: `fr`, `px`, `%`, `em`, `rem`, `ch`, `vw`, `vh`, `vmin`, `vmax`, `var()`
 * - Functions: `min()`, `max()`, `clamp()`, `calc()`, `minmax()`, `fit-content()`, `repeat()`
 * - Keywords: `auto`, `min-content`, `max-content`, `fit-content`, `subgrid`, `masonry`
 */
export const GRID_TRACK: STYLE_VALUE[] = [
	//
	...FLEXIBLE_UNITS,
	...LENGTH_MATH_LAYOUT,
	LENGTHS.keywords.special.subgrid,
	LENGTHS.keywords.special.masonry,

	LENGTHS.functions.grid.minmax,
	LENGTHS.functions.grid.fitContent,
	LENGTHS.functions.grid.repeat,
];

// Display
export const DISPLAY: STYLE_VALUE[] = [
	{ name: 'block', value: 'block', syntax: 'keyword' },
	{ name: 'flex', value: 'flex', syntax: 'keyword' },
	{ name: 'grid', value: 'grid', syntax: 'keyword' },
	{ name: 'none', value: 'none', syntax: 'keyword' },
];

// Flex
export const FLEX_DIRECTION: STYLE_VALUE[] = [
	{ name: 'row', value: 'row', syntax: 'keyword' },
	{ name: 'column', value: 'column', syntax: 'keyword' },
	{ name: 'row-reverse', value: 'row-reverse', syntax: 'keyword' },
	{ name: 'column-reverse', value: 'column-reverse', syntax: 'keyword' },
];

export const FLEX_WRAP: STYLE_VALUE[] = [
	{ name: 'wrap', value: 'wrap', syntax: 'keyword' },
	{ name: 'nowrap', value: 'nowrap', syntax: 'keyword' },
	{ name: 'wrap-reverse', value: 'wrap-reverse', syntax: 'keyword' },
];

// Alignment
export const JUSTIFY_ITEMS: STYLE_VALUE[] = [
	{ name: 'start', value: 'start', syntax: 'keyword' },
	{ name: 'center', value: 'center', syntax: 'keyword' },
	{ name: 'end', value: 'end', syntax: 'keyword' },
	{ name: 'stretch', value: 'stretch', syntax: 'keyword' },
];

export const JUSTIFY_CONTENT: STYLE_VALUE[] = [
	{ name: 'flex-start', value: 'flex-start', syntax: 'keyword' },
	{ name: 'center', value: 'center', syntax: 'keyword' },
	{ name: 'flex-end', value: 'flex-end', syntax: 'keyword' },
	{ name: 'space-between', value: 'space-between', syntax: 'keyword' },
	{ name: 'space-evenly', value: 'space-evenly', syntax: 'keyword' },
	{ name: 'space-around', value: 'space-around', syntax: 'keyword' },
];

export const ALIGN_ITEMS: STYLE_VALUE[] = [
	{ name: 'flex-start', value: 'flex-start', syntax: 'keyword' },
	{ name: 'center', value: 'center', syntax: 'keyword' },
	{ name: 'flex-end', value: 'flex-end', syntax: 'keyword' },
	{ name: 'stretch', value: 'stretch', syntax: 'keyword' },
	{ name: 'baseline', value: 'baseline', syntax: 'keyword' },
];

export const ALIGN_CONTENT: STYLE_VALUE[] = [
	{ name: 'flex-start', value: 'flex-start', syntax: 'keyword' },
	{ name: 'center', value: 'center', syntax: 'keyword' },
	{ name: 'flex-end', value: 'flex-end', syntax: 'keyword' },
	{ name: 'space-between', value: 'space-between', syntax: 'keyword' },
	{ name: 'space-evenly', value: 'space-evenly', syntax: 'keyword' },
	{ name: 'stretch', value: 'stretch', syntax: 'keyword' },
];

// Grid
export const GRID_AUTO_FLOW: STYLE_VALUE[] = [
	{ name: 'row', value: 'row', syntax: 'keyword' },
	{ name: 'column', value: 'column', syntax: 'keyword' },
	{ name: 'row dense', value: 'row dense', syntax: 'keyword' },
	{ name: 'column dense', value: 'column dense', syntax: 'keyword' },
];

// Overflow
export const OVERFLOW: STYLE_VALUE[] = [
	{ name: 'visible', value: 'visible', syntax: 'keyword', icon: 'overflow_visible' },
	{ name: 'hidden', value: 'hidden', syntax: 'keyword', icon: 'overflow_hidden' },
	{ name: 'scroll', value: 'scroll', syntax: 'keyword', icon: 'overflow_scroll' },
	{ name: 'auto', value: 'auto', syntax: 'keyword', icon: 'overflow_auto' },
];

// Object Fit
export const OBJECT_FIT: STYLE_VALUE[] = [
	{ name: 'fill', value: 'fill', syntax: 'keyword' },
	{ name: 'contain', value: 'contain', syntax: 'keyword' },
	{ name: 'cover', value: 'cover', syntax: 'keyword' },
	{ name: 'scale-down', value: 'scale-down', syntax: 'keyword' },
	{ name: 'none', value: 'none', syntax: 'keyword' },
];

// Box Sizing
export const BOX_SIZING: STYLE_VALUE[] = [
	{ name: 'border-box', value: 'border-box', syntax: 'keyword', icon: 'boxSizing_border-box' },
	{ name: 'content-box', value: 'content-box', syntax: 'keyword', icon: 'boxSizing_content-box' },
];

// Position
export const POSITION_TYPE: STYLE_VALUE[] = [
	{ name: 'static', value: 'static', syntax: 'keyword' },
	{ name: 'relative', value: 'relative', syntax: 'keyword' },
	{ name: 'absolute', value: 'absolute', syntax: 'keyword' },
	{ name: 'fixed', value: 'fixed', syntax: 'keyword' },
	{ name: 'sticky', value: 'sticky', syntax: 'keyword' },
];

// Float/Clear
export const FLOAT: STYLE_VALUE[] = [
	{ name: 'none', value: 'none', syntax: 'keyword', icon: 'float_none' },
	{ name: 'left', value: 'left', syntax: 'keyword', icon: 'float_left' },
	{ name: 'right', value: 'right', syntax: 'keyword', icon: 'float_right' },
];

export const CLEAR: STYLE_VALUE[] = [
	{ name: 'none', value: 'none', syntax: 'keyword', icon: 'clear_none' },
	{ name: 'left', value: 'left', syntax: 'keyword', icon: 'clear_left' },
	{ name: 'right', value: 'right', syntax: 'keyword', icon: 'clear_right' },
	{ name: 'both', value: 'both', syntax: 'keyword', icon: 'clear_both' },
];

// Transform
export const TRANSFORM: STYLE_VALUE[] = [
	//
	LENGTHS.functions.transform.translateX,
	LENGTHS.functions.transform.translateY,
	LENGTHS.functions.transform.translateZ,

	LENGTHS.functions.transform.rotateX,
	LENGTHS.functions.transform.rotateY,
	LENGTHS.functions.transform.rotateZ,

	LENGTHS.functions.transform.scaleX,
	LENGTHS.functions.transform.scaleY,
	LENGTHS.functions.transform.scaleZ,
];

// Font & Text
export const FONT_FAMILY: STYLE_VALUE[] = [
	{ name: 'Arial', value: 'Arial', syntax: 'keyword' },
	{ name: 'Times New Roman', value: 'Times New Roman', syntax: 'keyword' },
	{ name: 'Courier New', value: 'Courier New', syntax: 'keyword' },
];

export const FONT_WEIGHT: STYLE_VALUE[] = [
	{ name: '100', value: '100', syntax: 'keyword' },
	{ name: '200', value: '200', syntax: 'keyword' },
	{ name: '300', value: '300', syntax: 'keyword' },
	{ name: '400', value: '400', syntax: 'keyword' },
	{ name: '500', value: '500', syntax: 'keyword' },
	{ name: '600', value: '600', syntax: 'keyword' },
	{ name: '700', value: '700', syntax: 'keyword' },
	{ name: '800', value: '800', syntax: 'keyword' },
	{ name: '900', value: '900', syntax: 'keyword' },
];

export const FONT_STYLE: STYLE_VALUE[] = [
	{ name: 'normal', value: 'normal', syntax: 'keyword', icon: 'fontStyle_normal' },
	{ name: 'italic', value: 'italic', syntax: 'keyword', icon: 'fontStyle_italic' },
];

export const TEXT_ALIGN: STYLE_VALUE[] = [
	{ name: 'left', value: 'left', syntax: 'keyword', icon: 'textAlign_left' },
	{ name: 'center', value: 'center', syntax: 'keyword', icon: 'textAlign_center' },
	{ name: 'right', value: 'right', syntax: 'keyword', icon: 'textAlign_right' },
	{ name: 'justify', value: 'justify', syntax: 'keyword', icon: 'textAlign_justify' },
];

export const TEXT_TRANSFORM: STYLE_VALUE[] = [
	{ name: 'none', value: 'none', syntax: 'keyword', icon: 'textTransform_none' },
	{ name: 'uppercase', value: 'uppercase', syntax: 'keyword', icon: 'textTransform_uppercase' },
	{ name: 'lowercase', value: 'lowercase', syntax: 'keyword', icon: 'textTransform_lowercase' },
	{ name: 'capitalize', value: 'capitalize', syntax: 'keyword', icon: 'textTransform_capitalize' },
];

export const TEXT_DECORATION_LINE: STYLE_VALUE[] = [
	{ name: 'none', value: 'none', syntax: 'keyword', icon: 'textDecorationLine_none' },
	{ name: 'line-through', value: 'line-through', syntax: 'keyword', icon: 'textDecorationLine_line-through' },
	{ name: 'underline', value: 'underline', syntax: 'keyword', icon: 'textDecorationLine_underline' },
	{ name: 'overline', value: 'overline', syntax: 'keyword', icon: 'textDecorationLine_overline' },
];

export const TEXT_DECORATION_STYLE: STYLE_VALUE[] = [
	{ name: 'solid', value: 'solid', syntax: 'keyword' },
	{ name: 'dotted', value: 'dotted', syntax: 'keyword' },
	{ name: 'dashed', value: 'dashed', syntax: 'keyword' },
];

export const DIRECTION: STYLE_VALUE[] = [
	{ name: 'ltr', value: 'ltr', syntax: 'keyword', icon: 'direction_ltr' },
	{ name: 'rtl', value: 'rtl', syntax: 'keyword', icon: 'direction_rtl' },
];

export const WORD_BREAK: STYLE_VALUE[] = [
	{ name: 'normal', value: 'normal', syntax: 'keyword' },
	{ name: 'break-all', value: 'break-all', syntax: 'keyword' },
	{ name: 'keep-all', value: 'keep-all', syntax: 'keyword' },
	{ name: 'break-word', value: 'break-word', syntax: 'keyword' },
];

export const LINE_BREAK: STYLE_VALUE[] = [
	{ name: 'normal', value: 'normal', syntax: 'keyword' },
	{ name: 'loose', value: 'loose', syntax: 'keyword' },
	{ name: 'strict', value: 'strict', syntax: 'keyword' },
];

export const WHITE_SPACE: STYLE_VALUE[] = [
	{ name: 'normal', value: 'normal', syntax: 'keyword' },
	{ name: 'nowrap', value: 'nowrap', syntax: 'keyword' },
	{ name: 'pre', value: 'pre', syntax: 'keyword' },
	{ name: 'pre-wrap', value: 'pre-wrap', syntax: 'keyword' },
	{ name: 'pre-line', value: 'pre-line', syntax: 'keyword' },
];

export const TEXT_OVERFLOW: STYLE_VALUE[] = [
	{ name: 'ellipsis', value: 'ellipsis', syntax: 'keyword' },
	{ name: 'clip', value: 'clip', syntax: 'keyword' },
];

export const WRITING_MODE: STYLE_VALUE[] = [
	{ name: 'horizontal-tb', value: 'horizontal-tb', syntax: 'keyword' },
	{ name: 'vertical-rl', value: 'vertical-rl', syntax: 'keyword' },
	{ name: 'vertical-lr', value: 'vertical-lr', syntax: 'keyword' },
	{ name: 'sideways-rl', value: 'sideways-rl', syntax: 'keyword' },
	{ name: 'sideways-lr', value: 'sideways-lr', syntax: 'keyword' },
];

export const TEXT_ORIENTATION: STYLE_VALUE[] = [
	{ name: 'mixed', value: 'mixed', syntax: 'keyword' },
	{ name: 'upright', value: 'upright', syntax: 'keyword' },
	{ name: 'sideways-right', value: 'sideways-right', syntax: 'keyword' },
	{ name: 'sideways', value: 'sideways', syntax: 'keyword' },
	{ name: 'sideways-lr', value: 'sideways-lr', syntax: 'keyword' },
];

// Border
export const BORDER_STYLE: STYLE_VALUE[] = [
	{ name: 'none', value: 'none', syntax: 'keyword', icon: 'borderStyle_none' },
	{ name: 'solid', value: 'solid', syntax: 'keyword', icon: 'borderStyle_solid' },
	{ name: 'dashed', value: 'dashed', syntax: 'keyword', icon: 'borderStyle_dashed' },
	{ name: 'dotted', value: 'dotted', syntax: 'keyword', icon: 'borderStyle_dotted' },
];

export const OUTLINE_STYLE: STYLE_VALUE[] = [
	{ name: 'none', value: 'none', syntax: 'keyword' },
	{ name: 'dotted', value: 'dotted', syntax: 'keyword' },
	{ name: 'solid', value: 'solid', syntax: 'keyword' },
	{ name: 'groove', value: 'groove', syntax: 'keyword' },
	{ name: 'inset', value: 'inset', syntax: 'keyword' },
];

// Shadow
export const SHADOW: STYLE_VALUE[] = [{ name: 'default', value: '0px 0px 0px rgba(0,0,0,0)', syntax: 'length length length color', lengths: LENGTH }];

// Columns
export const COLUMN_RULE_STYLE: STYLE_VALUE[] = [
	{ name: 'none', value: 'none', syntax: 'keyword' },
	{ name: 'hidden', value: 'hidden', syntax: 'keyword' },
	{ name: 'dotted', value: 'dotted', syntax: 'keyword' },
	{ name: 'dashed', value: 'dashed', syntax: 'keyword' },
	{ name: 'solid', value: 'solid', syntax: 'keyword' },
	{ name: 'double', value: 'double', syntax: 'keyword' },
	{ name: 'groove', value: 'groove', syntax: 'keyword' },
	{ name: 'ridge', value: 'ridge', syntax: 'keyword' },
	{ name: 'inset', value: 'inset', syntax: 'keyword' },
	{ name: 'outset', value: 'outset', syntax: 'keyword' },
];

export const COLUMN_SPAN: STYLE_VALUE[] = [
	{ name: 'none', value: 'none', syntax: 'keyword' },
	{ name: 'all', value: 'all', syntax: 'keyword' },
];

export const COLUMN_FILL: STYLE_VALUE[] = [
	{ name: 'auto', value: 'auto', syntax: 'keyword' },
	{ name: 'balance', value: 'balance', syntax: 'keyword' },
	{ name: 'balance-all', value: 'balance-all', syntax: 'keyword' },
];

export const BREAK: STYLE_VALUE[] = [
	{ name: 'auto', value: 'auto', syntax: 'keyword' },
	{ name: 'avoid', value: 'avoid', syntax: 'keyword' },
	{ name: 'always', value: 'always', syntax: 'keyword' },
	{ name: 'column', value: 'column', syntax: 'keyword' },
];

// Aspect Ratio
export const ASPECT_RATIO: STYLE_VALUE[] = [{ name: '', value: '', syntax: 'number || number/number' }];

// Background-Image
export const BACKGROUND_ATTACHMENT: STYLE_VALUE[] = [
	{ name: 'scroll', value: 'scroll', syntax: 'keyword' },
	{ name: 'fixed', value: 'fixed', syntax: 'keyword' },
	{ name: 'local', value: 'local', syntax: 'keyword' },
];
export const BACKGROUND_CLIP: STYLE_VALUE[] = [
	{ name: 'border-box', value: 'border-box', syntax: 'keyword' },
	{ name: 'padding-box', value: 'padding-box', syntax: 'keyword' },
	{ name: 'content-box', value: 'content-box', syntax: 'keyword' },
	{ name: 'text', value: 'text', syntax: 'keyword' },
];

export const BACKGROUND_ORIGIN: STYLE_VALUE[] = [
	{ name: 'border-box', value: 'border-box', syntax: 'keyword' },
	{ name: 'padding-box', value: 'padding-box', syntax: 'keyword' },
	{ name: 'content-box', value: 'content-box', syntax: 'keyword' },
];

export const BACKGROUND_POSITION: STYLE_VALUE[] = [
	{
		name: 'variant',
		value: 'variant',
		syntax: 'variant',
		lengths: [
			{
				name: 'center',
				value: 'center',
				syntax: 'keyword',
				lengths: [
					{ name: 'top', value: 'top', syntax: 'keyword' },
					{ name: 'right', value: 'right', syntax: 'keyword' },
					{ name: 'bottom', value: 'bottom', syntax: 'keyword' },
					{ name: 'left', value: 'left', syntax: 'keyword' },
					{ name: 'center', value: 'center', syntax: 'keyword' },
				],
			},

			{
				name: '50% 50%',
				value: '50% 50%',
				syntax: 'length length',
				lengths: [...LENGTH],
			},
		],
	},
];

export const BACKGROUND_REPEAT: STYLE_VALUE[] = [
	{
		name: 'variant',
		value: 'variant',
		syntax: 'variant',
		lengths: [
			{
				name: 'repeat',
				value: 'repeat',
				syntax: 'keyword',
				lengths: [
					{ name: 'repeat', value: 'repeat', syntax: 'keyword' },
					{ name: 'repeat-x', value: 'repeat-x', syntax: 'keyword' },
					{ name: 'repeat-y', value: 'repeat-y', syntax: 'keyword' },
					{ name: 'space', value: 'space', syntax: 'keyword' },
					{ name: 'round', value: 'round', syntax: 'keyword' },
					{ name: 'no-repeat', value: 'no-repeat', syntax: 'keyword' },
				],
			},

			{
				name: 'repeat repeat',
				value: 'repeat repeat',
				syntax: 'keyword keyword',
				lengths: [
					{ name: 'repeat', value: 'repeat', syntax: 'keyword' },
					{ name: 'space', value: 'space', syntax: 'keyword' },
					{ name: 'round', value: 'round', syntax: 'keyword' },
					{ name: 'no-repeat', value: 'no-repeat', syntax: 'keyword' },
				],
			},
		],
	},
];

// GENERICS
export const COLOR: STYLE_VALUE[] = [{ name: '', value: '', syntax: 'color' }];
export const URL: STYLE_VALUE[] = [{ name: 'url()', value: "url('https://github.com/ChouseinKec/triax-page')", syntax: 'function(url)' }];
