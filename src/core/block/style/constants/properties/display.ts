export const DISPLAY_PROPERTIES = {
	display: {
		syntax: 'block | inline | inline-block | flex | grid | none | ...',
		description: 'Controls the element\'s display type and how it participates in layout.',
	},
	'flex-direction': {
		syntax: 'row | row-reverse | column | column-reverse',
		description: 'Defines the main axis direction for flex container children.',
	},
	'flex-wrap': {
		syntax: 'nowrap | wrap | wrap-reverse',
		description: 'Specifies whether flex items are forced onto a single line or can wrap.',
	},
	'align-items': {
		syntax: 'flex-start | flex-end | center | baseline | stretch',
		description: 'Aligns flex items along the cross axis of the flex container.',
	},
	'align-content': {
		syntax: 'flex-start | flex-end | center | space-between | space-around | space-evenly | stretch',
		description: 'Aligns flex lines within a flex container when there is extra space.',
	},
	'justify-content': {
		syntax: 'flex-start | flex-end | center | space-between | space-around | space-evenly',
		description: 'Aligns flex items along the main axis of the flex container.',
	},
	'row-gap': {
		syntax: '<length-percentage>',
		description: 'Sets the size of the gap between grid rows.',
	},
	'column-gap': {
		syntax: '<length-percentage>',
		description: 'Sets the size of the gap between grid columns.',
	},
	gap: {
		syntax: '<row-gap> <column-gap>',
		description: 'Shorthand for setting both row-gap and column-gap.',
	},
	'justify-items': {
		syntax: 'flex-start | flex-end | center | baseline | stretch',
		description: 'Aligns items along the main axis in a single line or grid cell.',
	},
	'grid-auto-flow': {
		syntax: 'row|column|[row dense]|[column dense]',
		description: 'Controls the placement algorithm for auto-placed grid items.',
	},
	'grid-auto-rows': {
		syntax: '<track-size>+',
		description: 'Specifies the size of rows created automatically in the grid.',
	},
	'grid-auto-columns': {
		syntax: '<track-size>+',
		description: 'Specifies the size of columns created automatically in the grid.',
	},
	'grid-template-rows': {
		syntax: 'none | <track-list> | <auto-track-list>',
		description: 'Defines the row structure of the grid.',
	},
	'grid-template-columns': {
		syntax: '<track-list>',
		description: 'Defines the column structure of the grid.',
	},
	direction: {
		syntax: 'ltr | rtl',
		description: 'Specifies the base writing direction for text and layout.',
	},
	'box-sizing': {
		syntax: 'content-box | border-box',
		description: 'Controls how the total width and height of an element are calculated.',
	},
	visibility: {
		syntax: 'visible | hidden | collapse',
		description: 'Specifies whether the element is visible, hidden, or collapses its space.',
	},
	float: {
		syntax: 'left|right|none',
		description: 'Removes the element from normal flow and positions it to the left or right.',
	},
	clear: {
		syntax: 'none|left|right|both',
		description: 'Specifies which sides of an element floating elements are not allowed to be adjacent to.',
	},
	'object-position': {
		syntax: '[[left|center|right]&&[top|center|bottom]] | <length-percentage> | [<length-percentage> <length-percentage>]',
		description: 'Defines the alignment of replaced content within its box.',
	},
	'object-fit': {
		syntax: 'fill|contain|cover|none|scale-down',
		description: 'Specifies how replaced content should be resized to fit its container.',
	},
};
