export const EFFECT_PROPERTIES = {
	filter: {
		syntax: 'none|[<filter-function>]+',
		description: 'Applies graphical effects such as blurring, brightness, contrast, and more to the element itself.',
	},
	'backdrop-filter': {
		syntax: 'none|[<filter-function>]+',
		description: 'Applies graphical effects such as blurring or color shifting to the area behind an element.',
	},
	transform: {
		syntax: 'none|[<transform-function>]{1,4}',
		description: 'Transforms the element in 2D or 3D space.',
	},
	'box-shadow': {
		syntax: '<spread-shadow>',
		description: 'Adds shadow effects around the element\'s frame.',
	},
	opacity: {
		syntax: '<number [0,1]>',
		description: 'Sets the transparency level of the element, affecting its content and children.',
	},
};
