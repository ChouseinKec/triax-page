import { CSSPropertyDefs } from './property';

// New: Centralized descriptions for all CSS properties
export const CSSPropertyDesc: Partial<Record<keyof typeof CSSPropertyDefs, string>> = {
	// ============ Display & Visibility =============
	display: 'Controls the element’s display type and how it participates in layout.',
	visibility: 'Specifies whether the element is visible, hidden, or collapses its space.',
	opacity: 'Sets the transparency level of the element, affecting its content and children.',

	'flex-direction': 'Defines the main axis direction for flex container children.',
	'flex-wrap': 'Specifies whether flex items are forced onto a single line or can wrap.',
	'flex-flow': 'Shorthand for setting both flex-direction and flex-wrap.',
	'flex-grow': 'Determines how much a flex item will grow relative to others in the container.',
	'flex-shrink': 'Determines how much a flex item will shrink relative to others in the container.',
	'flex-basis': 'Specifies the initial main size of a flex item before space distribution.',
	'justify-content': 'Aligns flex items along the main axis of the flex container.',
	'align-items': 'Aligns flex items along the cross axis of the flex container.',
	'align-content': 'Aligns flex lines within a flex container when there is extra space.',
	'justify-items': 'Aligns items along the main axis in a single line or grid cell.',

	'grid-auto-flow': 'Controls the placement algorithm for auto-placed grid items.',
	'grid-template-columns': 'Defines the column structure of the grid.',
	'grid-template-rows': 'Defines the row structure of the grid.',
	'grid-auto-columns': 'Specifies the size of columns created automatically in the grid.',
	'grid-auto-rows': 'Specifies the size of rows created automatically in the grid.',
	'row-gap': 'Sets the size of the gap between grid rows.',
	'column-gap': 'Sets the size of the gap between grid columns.',
	gap: 'Shorthand for setting both row-gap and column-gap.',

	direction: 'Specifies the base writing direction for text and layout.',
	'box-sizing': 'Controls how the total width and height of an element are calculated.',

	// ============ Size & Dimension =============
	width: 'Specifies the width of the element’s content area.',
	'min-width': 'Sets the minimum width the element’s content area can be.',
	'max-width': 'Sets the maximum width the element’s content area can be.',
	height: 'Specifies the height of the element’s content area.',
	'min-height': 'Sets the minimum height the element’s content area can be.',
	'max-height': 'Sets the maximum height the element’s content area can be.',
	overflow: 'Controls what happens when content overflows the element’s box.',
	'object-fit': 'Specifies how replaced content should be resized to fit its container.',
	'aspect-ratio': 'Sets a preferred width-to-height ratio for the element’s box.',
	float: 'Removes the element from normal flow and positions it to the left or right.',
	clear: 'Specifies which sides of an element floating elements are not allowed to be adjacent to.',

	// ============ Position & Spacing =============
	position: 'Specifies the positioning method for the element.',
	top: 'Specifies the vertical offset of a positioned element from its containing block’s top edge.',
	right: 'Specifies the horizontal offset of a positioned element from its containing block’s right edge.',
	bottom: 'Specifies the vertical offset of a positioned element from its containing block’s bottom edge.',
	left: 'Specifies the horizontal offset of a positioned element from its containing block’s left edge.',
	'z-index': 'Controls the stacking order of positioned elements.',

	'padding-top': 'Sets the space between the element’s content and its top border.',
	'padding-right': 'Sets the space between the element’s content and its right border.',
	'padding-bottom': 'Sets the space between the element’s content and its bottom border.',
	'padding-left': 'Sets the space between the element’s content and its left border.',
	padding: 'Shorthand for setting all four padding sides at once.',

	'margin-top': 'Sets the space outside the element’s top border.',
	'margin-right': 'Sets the space outside the element’s right border.',
	'margin-bottom': 'Sets the space outside the element’s bottom border.',
	'margin-left': 'Sets the space outside the element’s left border.',
	margin: 'Shorthand for setting all four margin sides at once.',
	transform: 'Applies 2D or 3D transformations to the element.',

	// ============ Background & Border =============
	'background-color': 'Sets the background color of the element.',
	'background-position': 'Specifies the initial position of a background image within the element’s box.',
	'background-size': 'Specifies the size of background images.',
	'background-repeat': 'Controls how background images are repeated.',

	'background-image': 'Sets one or more background images for the element.',
	'background-attachment': 'Specifies whether a background image scrolls with the page or is fixed.',
	'background-clip': 'Defines how far the background extends within the element.',
	'background-origin': 'Specifies the positioning area for background images.',

	'border-width': 'Shorthand for setting the width of all four borders.',
	'border-style': 'Shorthand for setting the style of all four borders.',
	'border-color': 'Shorthand for setting the color of all four borders.',
	'border-radius': 'Rounds the corners of the element.',

	outline: 'Shorthand for setting outline color, style, and width.',

	// ============ Font & Text =============
	'font-family': 'Specifies the font family for the element’s text.',
	'font-size': 'Sets the size of the font.',
	'font-weight': 'Sets the thickness or boldness of the font.',
	'line-height': 'Sets the height of each line of text.',
	color: 'Sets the color of the text.',

	'font-style': 'Specifies the font style.',
	'text-align': 'Sets the horizontal alignment of text within its container.',
	'text-decoration': 'Specifies decoration added to text, such as underline, overline, or line-through.',
	'text-transform': 'Controls the capitalization of text.',

	'text-indent': 'Indents the first line of text by a specified amount.',
	'text-shadow': 'Adds shadow effects to text.',
	'text-overflow': 'Specifies how overflowed content that is not displayed is signaled to the user.',
	'white-space': 'Controls how whitespace inside the element is handled.',
	'word-break': 'Specifies how words should break when reaching the end of a line.',
	'writing-mode': 'Defines whether lines of text are laid out horizontally or vertically.',
	'letter-spacing': 'Sets the spacing between characters of text.',
	'line-break': 'Sets how/where to break lines within text.',
	'text-orientation': 'Specifies the orientation of text characters in a line.',

	'column-count': 'Specifies the number of columns an element should be divided into for multi-column layout.',
	'column-width': 'Specifies the ideal width of columns in a multi-column layout.',
	'column-rule-width': 'Specifies the width of the line that separates columns in a multi-column layout.',
	'column-rule-style': 'Specifies the style of the line that separates columns.',
	'column-rule-color': 'Specifies the color of the line that separates columns.',
	'break-before': 'Specifies whether a page, column, or region break should occur before the element.',
	'break-inside': 'Specifies whether a page, column, or region break should occur inside the element.',
	'break-after': 'Specifies whether a page, column, or region break should occur after the element.',
	'column-span': 'Specifies how many columns an element should span across in a multi-column layout.',
	'column-fill': 'Specifies how content should be distributed between columns.',

	// -------------------------------- EFFECTS --------------------------------
};
