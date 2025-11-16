export const FONT_PROPERTIES = {
	'font-size': {
		syntax: '<absolute-size> | <relative-size> | <length-percentage>',
		description: 'Sets the size of the font.',
	},
	'font-weight': {
		syntax: 'normal|bold|<integer>',
		description: 'Sets the thickness or boldness of the font.',
	},
	'line-height': {
		syntax: 'normal|<number>|<length-percentage>',
		description: 'Sets the height of each line of text.',
	},
	'font-family': {
		syntax: '<generic-family>',
		description: 'Specifies the font family for the element\'s text.',
	},
	'font-style': {
		syntax: 'normal | italic',
		description: 'Specifies the font style.',
	},
	color: {
		syntax: '<color>',
		description: 'Sets the color of the text.',
	},
	'text-align': {
		syntax: 'left|right|center|justify',
		description: 'Sets the horizontal alignment of text within its container.',
	},
	'text-align-last': {
		syntax: 'auto|left|right|center|justify',
		description: 'Specifies how the last line of a block or a line right before a forced line break is aligned.',
	},
	'text-transform': {
		syntax: 'none | capitalize | uppercase | lowercase',
		description: 'Controls the capitalization of text.',
	},
	'text-combine-upright': {
		syntax: 'none|all|[digits <integer [2,4]>?]',
		description: 'Combines multiple characters into a single upright character, useful for vertical text layout.',
	},
	'text-overflow': {
		syntax: 'clip | ellipsis | <string>',
		description: 'Specifies how overflowed content that is not displayed is signaled to the user.',
	},
	'text-orientation': {
		syntax: 'mixed | upright | sideways',
		description: 'Specifies the orientation of text characters in a line.',
	},
	'text-decoration': {
		syntax: '<text-decoration-line> <text-decoration-style> <text-decoration-thickness> <text-decoration-color> ',
		description: 'Specifies decoration added to text, such as underline, overline, or line-through.',
	},
	'text-shadow': {
		syntax: '<length> <length> <length> <color>',
		description: 'Adds shadow effects to text.',
	},
	'text-indent': {
		syntax: '<length-percentage>',
		description: 'Indents the first line of text by a specified amount.',
	},
	'writing-mode': {
		syntax: 'horizontal-tb|vertical-rl|vertical-lr',
		description: 'Defines whether lines of text are laid out horizontally or vertically.',
	},
	'white-space': {
		syntax: 'normal|pre|nowrap|pre-wrap|pre-line|break-spaces',
		description: 'Controls how whitespace inside the element is handled.',
	},
	'word-break': {
		syntax: 'normal|break-all|keep-all|break-word',
		description: 'Specifies how words should break when reaching the end of a line.',
	},
	'line-break': {
		syntax: 'auto|loose|normal|strict|anywhere',
		description: 'Sets how/where to break lines within text.',
	},
	'letter-spacing': {
		syntax: 'normal|<length>',
		description: 'Sets the spacing between characters of text.',
	},
	'word-spacing': {
		syntax: 'normal|<length>',
		description: 'Sets the spacing between words in text.',
	},
	'column-count': {
		syntax: 'auto|<integer [1,∞]>',
		description: 'Specifies the number of columns an element should be divided into for multi-column layout.',
	},
	'column-width': {
		syntax: 'auto|<length [0,∞]>',
		description: 'Specifies the ideal width of columns in a multi-column layout.',
	},
	'column-rule-width': {
		syntax: '<length [0,∞]>|medium|thick|thin',
		description: 'Specifies the width of the line that separates columns in a multi-column layout.',
	},
	'column-rule-style': {
		syntax: 'none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset',
		description: 'Specifies the style of the line that separates columns.',
	},
	'column-rule-color': {
		syntax: '<color>',
		description: 'Specifies the color of the line that separates columns.',
	},
	'break-before': {
		syntax: 'auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region',
		description: 'Specifies whether a page, column, or region break should occur before the element.',
	},
	'break-inside': {
		syntax: 'auto|avoid|avoid-page|avoid-column|avoid-region',
		description: 'Specifies whether a page, column, or region break should occur inside the element.',
	},
	'break-after': {
		syntax: 'auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region',
		description: 'Specifies whether a page, column, or region break should occur after the element.',
	},
	'column-span': {
		syntax: 'none|<integer [1,∞]>|all|auto',
		description: 'Specifies how many columns an element should span across in a multi-column layout.',
	},
	'column-fill': {
		syntax: 'auto|balance|balance-all',
		description: 'Specifies how content should be distributed between columns.',
	},
};
