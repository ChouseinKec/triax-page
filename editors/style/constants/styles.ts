import { STYLE_VALUE } from '@/editors/style/constants/types';

import * as OPTIONS from '@/editors/style/constants/options';

export const STYLES_CONSTANTS = {
	// -------------------------------- DISPLAY --------------------------------
	display: {
		options: OPTIONS.DISPLAY,
	},
	flexDirection: {
		options: OPTIONS.FLEX_DIRECTION,
	},
	flexWrap: {
		options: OPTIONS.FLEX_WRAP,
	},
	justifyItems: {
		options: OPTIONS.JUSTIFY_ITEMS,
	},
	justifyContent: {
		options: OPTIONS.JUSTIFY_CONTENT,
	},
	alignItems: {
		options: OPTIONS.ALIGN_ITEMS,
	},
	alignContent: {
		options: OPTIONS.ALIGN_CONTENT,
	},
	gridAutoFlow: {
		options: OPTIONS.GRID_AUTO_FLOW,
	},
	gridTemplateColumns: {
		options: OPTIONS.GRID_TRACK,
	},
	gridTemplateRows: {
		options: OPTIONS.GRID_TRACK,
	},
	gridAutoColumns: {
		options: OPTIONS.GRID_TRACK,
	},
	gridAutoRows: {
		options: OPTIONS.GRID_TRACK,
	},
	rowGap: {
		options: OPTIONS.LENGTH_MATH,
	},
	columnGap: {
		options: OPTIONS.LENGTH_MATH,
	},

	// -------------------------------- SIZE & OVERFLOW --------------------------------
	width: {
		options: OPTIONS.LENGTH_MATH_LAYOUT,
	},
	minWidth: {
		options: OPTIONS.LENGTH_MATH_LAYOUT,
	},
	maxWidth: {
		options: OPTIONS.LENGTH_MATH_LAYOUT,
	},
	height: {
		options: OPTIONS.LENGTH_MATH_LAYOUT,
	},
	minHeight: {
		options: OPTIONS.LENGTH_MATH_LAYOUT,
	},
	maxHeight: {
		options: OPTIONS.LENGTH_MATH_LAYOUT,
	},
	overflow: {
		options: OPTIONS.OVERFLOW,
	},
	objectFit: {
		options: OPTIONS.OBJECT_FIT,
	},
	boxSizing: {
		options: OPTIONS.BOX_SIZING,
	},
	aspectRatio: {
		options: OPTIONS.ASPECT_RATIO,
	},

	// -------------------------------- POSITION & SPACING --------------------------------
	position: {
		options: OPTIONS.POSITION_TYPE,
	},
	top: {
		options: OPTIONS.LENGTH_MATH_AUTO,
	},
	right: {
		options: OPTIONS.LENGTH_MATH_AUTO,
	},
	bottom: {
		options: OPTIONS.LENGTH_MATH_AUTO,
	},
	left: {
		options: OPTIONS.LENGTH_MATH_AUTO,
	},
	paddingTop: {
		options: OPTIONS.LENGTH_MATH,
	},
	paddingBottom: {
		options: OPTIONS.LENGTH_MATH,
	},
	paddingRight: {
		options: OPTIONS.LENGTH_MATH,
	},
	paddingLeft: {
		options: OPTIONS.LENGTH_MATH,
	},
	marginTop: {
		options: OPTIONS.LENGTH_MATH_AUTO,
	},
	marginBottom: {
		options: OPTIONS.LENGTH_MATH_AUTO,
	},
	marginRight: {
		options: OPTIONS.LENGTH_MATH_AUTO,
	},
	marginLeft: {
		options: OPTIONS.LENGTH_MATH_AUTO,
	},

	float: {
		options: OPTIONS.FLOAT,
	},
	clear: {
		options: OPTIONS.CLEAR,
	},
	transform: {
		options: OPTIONS.TRANSFORM,
	},

	// -------------------------------- FONT & TEXT --------------------------------
	fontFamily: {
		options: OPTIONS.FONT_FAMILY,
	},
	fontWeight: {
		options: OPTIONS.FONT_WEIGHT,
	},
	fontSize: {
		options: OPTIONS.LENGTH_MATH,
	},

	lineHeight: {
		options: OPTIONS.LENGTH_MATH,
	},
	color: {
		options: OPTIONS.COLOR,
	},
	textShadow: {
		options: OPTIONS.SHADOW,
	},
	textAlign: {
		options: OPTIONS.TEXT_ALIGN,
	},
	fontStyle: {
		options: OPTIONS.FONT_STYLE,
	},
	direction: {
		options: OPTIONS.DIRECTION,
	},
	textTransform: {
		options: OPTIONS.TEXT_TRANSFORM,
	},
	textDecorationLine: {
		options: OPTIONS.TEXT_DECORATION_LINE,
	},
	textDecorationColor: {
		options: OPTIONS.COLOR,
	},
	textDecorationStyle: {
		options: OPTIONS.TEXT_DECORATION_STYLE,
	},
	textDecorationThickness: {
		options: OPTIONS.LENGTH_MATH,
	},
	letterSpacing: {
		options: OPTIONS.LENGTH_MATH,
	},
	textIndent: {
		options: OPTIONS.LENGTH_MATH,
	},
	wordBreak: {
		options: OPTIONS.WORD_BREAK,
	},
	lineBreak: {
		options: OPTIONS.LINE_BREAK,
	},
	whiteSpace: {
		options: OPTIONS.WHITE_SPACE,
	},
	textOverflow: {
		options: OPTIONS.TEXT_OVERFLOW,
	},
	writingMode: {
		options: OPTIONS.WRITING_MODE,
	},
	textOrientation: {
		options: OPTIONS.TEXT_ORIENTATION,
	},
	strokeWidth: {
		options: OPTIONS.LENGTH_MATH,
	},
	strokeColor: {
		options: OPTIONS.COLOR,
	},
	columnCount: {
		options: [],
	},
	columnWidth: {
		options: OPTIONS.LENGTH_MATH,
	},
	columnRuleWidth: {
		options: OPTIONS.LENGTH_MATH,
	},
	columnRuleStyle: {
		options: OPTIONS.COLUMN_RULE_STYLE,
	},
	columnRuleColor: {
		options: OPTIONS.COLOR,
	},
	breakBefore: {
		options: OPTIONS.BREAK,
	},
	breakInside: {
		options: OPTIONS.BREAK,
	},
	breakAfter: {
		options: OPTIONS.BREAK,
	},
	columnSpan: {
		options: OPTIONS.COLUMN_SPAN,
	},
	columnFill: {
		options: OPTIONS.COLUMN_FILL,
	},
	widows: {
		options: OPTIONS.LENGTH_MATH,
	},
	orphans: {
		options: OPTIONS.LENGTH_MATH,
	},

	// -------------------------------- BACKGROUND & BORDER --------------------------------
	borderTopWidth: {
		options: OPTIONS.LENGTH_MATH,
	},
	borderRightWidth: {
		options: OPTIONS.LENGTH_MATH,
	},
	borderBottomWidth: {
		options: OPTIONS.LENGTH_MATH,
	},
	borderLeftWidth: {
		options: OPTIONS.LENGTH_MATH,
	},

	borderTopRightRadius: {
		options: OPTIONS.LENGTH_MATH,
	},
	borderBottomRightRadius: {
		options: OPTIONS.LENGTH_MATH,
	},
	borderTopLeftRadius: {
		options: OPTIONS.LENGTH_MATH,
	},
	borderBottomLeftRadius: {
		options: OPTIONS.LENGTH_MATH,
	},

	borderTopStyle: {
		options: OPTIONS.BORDER_STYLE,
	},
	borderRightStyle: {
		options: OPTIONS.BORDER_STYLE,
	},
	borderBottomStyle: {
		options: OPTIONS.BORDER_STYLE,
	},
	borderLeftStyle: {
		options: OPTIONS.BORDER_STYLE,
	},

	borderTopColor: {
		options: OPTIONS.COLOR,
	},
	borderRightColor: {
		options: OPTIONS.COLOR,
	},
	borderBottomColor: {
		options: OPTIONS.COLOR,
	},
	borderLeftColor: {
		options: OPTIONS.COLOR,
	},

	outlineColor: {
		options: OPTIONS.COLOR,
	},
	outlineStyle: {
		options: OPTIONS.OUTLINE_STYLE,
	},
	outlineWidth: {
		options: OPTIONS.LENGTH_MATH,
	},

	backgroundImage: {
		options: OPTIONS.URL,
	},
	backgroundColor: {
		options: OPTIONS.COLOR,
	},
	backgroundAttachment: {
		options: OPTIONS.BACKGROUND_ATTACHMENT,
	},
	backgroundClip: {
		options: OPTIONS.BACKGROUND_CLIP,
	},
	backgroundOrigin: {
		options: OPTIONS.BACKGROUND_ORIGIN,
	},
	backgroundPosition: {
		options: OPTIONS.BACKGROUND_POSITION,
	},

	// -------------------------------- SHADOW & EFFECTS --------------------------------
	boxShadow: {
		options: OPTIONS.SHADOW,
	},
} as const satisfies Readonly<STYLE>;

export type STYLE = {
	[key: string]: {
		options: STYLE_VALUE[];
	};
};

//Enforce it to only be string as we do not use index
export type STYLES_CONSTANTS_KEY = keyof typeof STYLES_CONSTANTS & string;
