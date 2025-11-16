export const SIZE_PROPERTIES = {
	width: {
		syntax: 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content',
		description: 'Specifies the width of the element\'s content area.',
	},
	'min-width': {
		syntax: 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content',
		description: 'Sets the minimum width the element\'s content area can be.',
	},
	'max-width': {
		syntax: '<length-percentage [0,∞]> | min-content | max-content | fit-content',
		description: 'Sets the maximum width the element\'s content area can be.',
	},
	height: {
		syntax: 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content',
		description: 'Specifies the height of the element\'s content area.',
	},
	'min-height': {
		syntax: 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content',
		description: 'Sets the minimum height the element\'s content area can be.',
	},
	'max-height': {
		syntax: '<length-percentage [0,∞]> | min-content | max-content | fit-content',
		description: 'Sets the maximum height the element\'s content area can be.',
	},
	'aspect-ratio': {
		syntax: 'auto || <ratio>',
		description: 'Sets a preferred width-to-height ratio for the element\'s box.',
	},
	overflow: {
		syntax: '[<overflow-block>]{1,2}',
		description: 'Controls what happens when content overflows the element\'s box.',
	},
	position: {
		syntax: 'static | relative | absolute | fixed | sticky',
		description: 'Specifies the positioning method for the element.',
	},
	'padding-top': {
		syntax: '<length-percentage [0,∞]>',
		description: 'Sets the space between the element\'s content and its top border.',
	},
	'padding-right': {
		syntax: '<length-percentage [0,∞]>',
		description: 'Sets the space between the element\'s content and its right border.',
	},
	'padding-bottom': {
		syntax: '<length-percentage [0,∞]>',
		description: 'Sets the space between the element\'s content and its bottom border.',
	},
	'padding-left': {
		syntax: '<length-percentage [0,∞]>',
		description: 'Sets the space between the element\'s content and its left border.',
	},
	padding: {
		syntax: '<length-percentage [0,∞]>{1,4}',
		description: 'Sets the space between the element\'s content and all its borders.',
	},
	'margin-top': {
		syntax: 'auto | <length-percentage>',
		description: 'Sets the space outside the element\'s top border.',
	},
	'margin-right': {
		syntax: 'auto | <length-percentage>',
		description: 'Sets the space outside the element\'s right border.',
	},
	'margin-bottom': {
		syntax: 'auto | <length-percentage>',
		description: 'Sets the space outside the element\'s bottom border.',
	},
	'margin-left': {
		syntax: 'auto | <length-percentage>',
		description: 'Sets the space outside the element\'s left border.',
	},
	margin: {
		syntax: 'auto | <length-percentage>{1,4}',
		description: 'Sets the space outside all the element\'s borders.',
	},
	top: {
		syntax: 'auto | <length-percentage>',
		description: 'Specifies the vertical offset of a positioned element from its containing block\'s top edge.',
	},
	right: {
		syntax: 'auto | <length-percentage>',
		description: 'Specifies the horizontal offset of a positioned element from its containing block\'s right edge.',
	},
	bottom: {
		syntax: 'auto | <length-percentage>',
		description: 'Specifies the vertical offset of a positioned element from its containing block\'s bottom edge.',
	},
	left: {
		syntax: 'auto | <length-percentage>',
		description: 'Specifies the horizontal offset of a positioned element from its containing block\'s left edge.',
	},
	'z-index': {
		syntax: '<integer>',
		description: 'Controls the stacking order of positioned elements.',
	},
	'scroll-behavior': {
		syntax: 'auto|smooth',
		description: 'Specifies the scrolling behavior for the element when scrolling is triggered.',
	},
	'scroll-snap-stop': {
		syntax: 'normal|always',
		description: 'Controls whether the scroll snap point is always respected or not.',
	},
	'overscroll-behavior': {
		syntax: '[contain|none|auto]{1,2}',
		description: 'Specifies the behavior when scrolling reaches the boundary of a scroll container.',
	},
	'scroll-snap-type': {
		syntax: 'none|[[x|y|block|inline|both] [mandatory|proximity]?]',
		description: 'Defines how the element\'s children snap to a grid or points when scrolling.',
	},
	'scroll-snap-align': {
		syntax: '  [none|start|end|center]{1,2}',
		description: 'Defines the alignment of the element\'s children within the scroll container.',
	},
	'scroll-margin': {
		syntax: '<length>{1,4}',
		description: 'Sets the margin around the element for scroll snapping.',
	},
	'scroll-margin-block': {
		syntax: '<length>{1,2}',
		description: 'Sets the margin around the element for scroll snapping in the block direction.',
	},
	'scroll-margin-inline': {
		syntax: '<length>{1,2}',
		description: 'Sets the margin around the element for scroll snapping in the inline direction.',
	},
	'scroll-padding': {
		syntax: '[auto|<length-percentage [0,∞]>]{1,4}',
		description: 'Sets the padding around the element for scroll snapping.',
	},
	'scroll-padding-block': {
		syntax: '[auto|<length-percentage [0,∞]>]{1,2}',
		description: 'Sets the padding around the element for scroll snapping in the block direction.',
	},
	'scroll-padding-inline': {
		syntax: '[auto|<length-percentage [0,∞]>]{1,2}',
		description: 'Sets the padding around the element for scroll snapping in the inline direction.',
	},
};
