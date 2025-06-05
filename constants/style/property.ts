import { CSSProperty, CSSProperties, CSSPropertyCategories } from '@/types/style/property';
import { parse, expandDataTypes, filterDataTypes } from '@/utilities/style/parse';

/**
 * Helper function to create a CSSProperty object.
 * @param name - The canonical name of the CSS property (e.g. 'color', 'font-size').
 * @param syntax - The raw CSS Value Definition Syntax string (may contain data-type references).
 * @param description - A brief description of the property for UI/documentation.
 * @param category - The property category for grouping/filtering in the UI.
 * @returns A CSSProperty object with all metadata fields populated, including expanded and parsed syntax.
 */
const createProperty = (name: string, syntax: string, description: string, category: CSSPropertyCategories): CSSProperty => {
	let _expanded: string | undefined;
	let _parsed: ReturnType<typeof parse> | undefined;
	return {
		name,
		description,
		category,
		'syntax-raw': syntax,
		get 'syntax-expanded'() {
			if (_expanded === undefined) _expanded = expandDataTypes(syntax);
			return _expanded!;
		},
		get 'syntax-parsed'() {
			if (_parsed === undefined) {
				const parsed = parse(this['syntax-expanded']!);
				_parsed = filterDataTypes(parsed);
			}
			return _parsed;
		},
	};
};

/**
 * A lookup table of all supported CSS properties and their metadata.
 * Each entry is a CSSProperty object describing the property's name, syntax, description, and category.
 * Used for property validation, UI dropdowns, and documentation.
 */
export const CSSPropertyDefs: Partial<Record<CSSProperties, CSSProperty>> = {
	// -------------------------------- DISPLAY --------------------------------
	display: createProperty('display', 'block | inline | inline-block | flex | grid | none | ...', 'Defines the display behavior of an element', 'display'),
	visibility: createProperty('visibility', 'visible | hidden | collapse', 'Specifies whether an element is visible', 'display'),
	opacity: createProperty('opacity', '<number [0,1]> | <percentage [0%,100%]>', 'Sets the opacity level for an element', 'display'),
	'box-sizing': createProperty('box-sizing', 'content-box | border-box', 'Defines how the width and height of an element are calculated', 'display'),
	'aspect-ratio': createProperty('aspect-ratio', 'auto || <ratio>', 'Sets a preferred aspect ratio for the box', 'display'),
	float: createProperty('float', 'left | right | none', 'Specifies whether an element should float to the left, right, or not at all', 'display'),
	clear: createProperty('clear', 'none | left | right | both', 'Specifies on which sides of an element floating elements are not allowed', 'display'),

	// -------------------------------- FLEX --------------------------------
	'flex-direction': createProperty('flex-direction', 'row | row-reverse | column | column-reverse', 'Specifies the direction of flex items', 'flex'),
	'flex-wrap': createProperty('flex-wrap', 'nowrap | wrap | wrap-reverse', 'Specifies whether flex items are forced on one line or can wrap', 'flex'),
	'flex-flow': createProperty('flex-flow', '<flex-direction> <flex-wrap>', 'Shorthand for flex-direction and flex-wrap', 'flex'),
	'flex-grow': createProperty('flex-grow', '<number>', 'Specifies how much a flex item will grow relative to others', 'flex'),
	'flex-shrink': createProperty('flex-shrink', '<number>', 'Specifies how much a flex item will shrink relative to others', 'flex'),
	'flex-basis': createProperty('flex-basis', 'content | <width>', 'Specifies the initial size of a flex item', 'flex'),
	'justify-content': createProperty('justify-content', 'flex-start | flex-end | center | space-between | space-around | space-evenly', 'Aligns flex items along the main axis', 'flex'),
	'align-items': createProperty('align-items', 'flex-start | flex-end | center | baseline | stretch', 'Aligns flex items along the cross axis', 'flex'),
	'align-content': createProperty('align-content', 'flex-start | flex-end | center | space-between | space-around | stretch', "Aligns flex lines when there's extra space on cross axis", 'flex'),

	// -------------------------------- GRID --------------------------------
	'grid-auto-flow': createProperty('grid-auto-flow', 'row | column | row dense | column dense', 'Controls how auto-placed items are inserted in the grid', 'grid'),
	'grid-template-columns': createProperty('grid-template-columns', 'none | <track-list> | <auto-track-list>', 'Defines the columns of the grid', 'grid'),
	'grid-template-rows': createProperty('grid-template-rows', 'none | <track-list> | <auto-track-list>', 'Defines the rows of the grid', 'grid'),
	'grid-auto-columns': createProperty('grid-auto-columns', '<track-size>', 'Specifies the size of implicitly-created grid columns', 'grid'),
	'grid-auto-rows': createProperty('grid-auto-rows', '<track-size>', 'Specifies the size of implicitly-created grid rows', 'grid'),
	'row-gap': createProperty('row-gap', '<length-percentage>', 'Sets the size of the gap between grid rows', 'grid'),
	'column-gap': createProperty('column-gap', '<length-percentage>', 'Sets the size of the gap between grid columns', 'grid'),
	gap: createProperty('gap', '<row-gap> <column-gap>', 'Shorthand for row-gap and column-gap', 'grid'),

	// -------------------------------- SIZE & OVERFLOW --------------------------------
	width: createProperty('width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'The width of the element.', 'size'),
	'min-width': createProperty('min-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'The minimum width of the element.', 'size'),
	'max-width': createProperty('max-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'The maximum width of the element.', 'size'),
	height: createProperty('height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'The height of the element.', 'size'),
	'min-height': createProperty('min-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'The minimum height of the element.', 'size'),
	'max-height': createProperty('max-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'The maximum height of the element.', 'size'),
	overflow: createProperty('overflow', 'visible | hidden | clip | scroll | auto', 'Specifies what happens if content overflows an element', 'overflow'),
	'overflow-x': createProperty('overflow-x', 'visible | hidden | clip | scroll | auto', 'Specifies overflow behavior on x-axis', 'overflow'),
	'overflow-y': createProperty('overflow-y', 'visible | hidden | clip | scroll | auto', 'Specifies overflow behavior on y-axis', 'overflow'),

	// -------------------------------- POSITION & SPACING --------------------------------
	position: createProperty('position', 'static | relative | absolute | fixed | sticky', 'Specifies the type of positioning for an element', 'position'),
	top: createProperty('top', 'auto | <length-percentage>', 'Specifies the top position of positioned element', 'position'),
	right: createProperty('right', 'auto | <length-percentage>', 'Specifies the right position of positioned element', 'position'),
	bottom: createProperty('bottom', 'auto | <length-percentage>', 'Specifies the bottom position of positioned element', 'position'),
	left: createProperty('left', 'auto | <length-percentage>', 'Specifies the left position of positioned element', 'position'),
	'z-index': createProperty('z-index', 'auto | <integer>', 'Specifies the stack order of an element', 'position'),

	'padding-top': createProperty('padding-top', '<length-percentage [0,∞]>', 'Sets the top padding of an element', 'spacing'),
	'padding-right': createProperty('padding-right', '<length-percentage [0,∞]>', 'Sets the right padding of an element', 'spacing'),
	'padding-bottom': createProperty('padding-bottom', '<length-percentage [0,∞]>', 'Sets the bottom padding of an element', 'spacing'),
	'padding-left': createProperty('padding-left', '<length-percentage [0,∞]>', 'Sets the left padding of an element', 'spacing'),
	padding: createProperty('padding', '<length-percentage [0,∞]>{1,4}', 'Shorthand for all padding properties', 'spacing'),

	'margin-top': createProperty('margin-top', 'auto | <length-percentage>', 'Sets the top margin of an element', 'spacing'),
	'margin-right': createProperty('margin-right', 'auto | <length-percentage>', 'Sets the right margin of an element', 'spacing'),
	'margin-bottom': createProperty('margin-bottom', 'auto | <length-percentage>', 'Sets the bottom margin of an element', 'spacing'),
	'margin-left': createProperty('margin-left', 'auto | <length-percentage>', 'Sets the left margin of an element', 'spacing'),
	margin: createProperty('margin', 'auto | <length-percentage>{1,4}', 'Shorthand for all margin properties', 'spacing'),

	// -------------------------------- BACKGROUND & BORDER --------------------------------
	'background-color': createProperty('background-color', '<color> | transparent', 'Sets the background color of an element', 'background'),
	'background-image': createProperty('background-image', 'none | <image>', 'Sets one or more background images', 'background'),
	'background-position': createProperty('background-position', '<position>', 'Sets the starting position of a background image', 'background'),
	'background-size': createProperty('background-size', 'auto | <length-percentage> | cover | contain', 'Specifies the size of background images', 'background'),
	'background-repeat': createProperty('background-repeat', 'repeat-x | repeat-y | repeat | space | round | no-repeat', 'Sets how background images are repeated', 'background'),
	'background-attachment': createProperty('background-attachment', 'scroll | fixed | local', 'Sets whether background images scroll with content', 'background'),
	'background-clip': createProperty('background-clip', 'border-box | padding-box | content-box | text', 'Defines how far the background extends', 'background'),
	'background-origin': createProperty('background-origin', 'border-box | padding-box | content-box', 'Sets the positioning area of background images', 'background'),

	'border-top-width': createProperty('border-top-width', '<line-width>', 'Sets the width of the top border', 'border'),
	'border-right-width': createProperty('border-right-width', '<line-width>', 'Sets the width of the right border', 'border'),
	'border-bottom-width': createProperty('border-bottom-width', '<line-width>', 'Sets the width of the bottom border', 'border'),
	'border-left-width': createProperty('border-left-width', '<line-width>', 'Sets the width of the left border', 'border'),
	'border-width': createProperty('border-width', '<line-width>{1,4}', 'Shorthand for all border width properties', 'border'),

	'border-top-style': createProperty('border-top-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'Sets the style of the top border', 'border'),
	'border-right-style': createProperty('border-right-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'Sets the style of the right border', 'border'),
	'border-bottom-style': createProperty('border-bottom-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'Sets the style of the bottom border', 'border'),
	'border-left-style': createProperty('border-left-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'Sets the style of the left border', 'border'),
	'border-style': createProperty('border-style', '<border-style>{1,4}', 'Shorthand for all border style properties', 'border'),

	'border-top-color': createProperty('border-top-color', '<color>', 'Sets the color of the top border', 'border'),
	'border-right-color': createProperty('border-right-color', '<color>', 'Sets the color of the right border', 'border'),
	'border-bottom-color': createProperty('border-bottom-color', '<color>', 'Sets the color of the bottom border', 'border'),
	'border-left-color': createProperty('border-left-color', '<color>', 'Sets the color of the left border', 'border'),
	'border-color': createProperty('border-color', '<color>{1,4}', 'Shorthand for all border color properties', 'border'),

	'border-radius': createProperty('border-radius', '<length-percentage>{1,4} [/ <length-percentage>{1,4}]?', 'Rounds the corners of an element', 'border'),
	'border-top-left-radius': createProperty('border-top-left-radius', '<length-percentage>', 'Rounds the top-left corner of an element', 'border'),
	'border-top-right-radius': createProperty('border-top-right-radius', '<length-percentage>', 'Rounds the top-right corner of an element', 'border'),
	'border-bottom-right-radius': createProperty('border-bottom-right-radius', '<length-percentage>', 'Rounds the bottom-right corner of an element', 'border'),
	'border-bottom-left-radius': createProperty('border-bottom-left-radius', '<length-percentage>', 'Rounds the bottom-left corner of an element', 'border'),

	'outline-width': createProperty('outline-width', '<line-width>', 'Sets the width of the outline', 'outline'),
	'outline-style': createProperty('outline-style', 'auto | none | dotted | dashed | solid | double | groove | ridge | inset | outset', 'Sets the style of the outline', 'outline'),
	'outline-color': createProperty('outline-color', '<color> | invert', 'Sets the color of the outline', 'outline'),
	'outline-offset': createProperty('outline-offset', '<length>', 'Sets the space between outline and border', 'outline'),
	outline: createProperty('outline', '<outline-width> <outline-style> <outline-color>', 'Shorthand for outline properties', 'outline'),

	// -------------------------------- FONT & TEXT --------------------------------
	'font-family': createProperty('font-family', '[ <family-name> | <generic-family> ]#', 'Specifies the font for an element', 'font'),
	'font-size': createProperty('font-size', '<absolute-size> | <relative-size> | <length-percentage>', 'Sets the size of the font', 'font'),
	'font-weight': createProperty('font-weight', 'normal | bold | bolder | lighter | 100 | 200 | ... | 900', 'Sets the weight (boldness) of the font', 'font'),
	'font-style': createProperty('font-style', 'normal | italic | oblique <angle>?', 'Specifies the font style', 'font'),
	'line-height': createProperty('line-height', 'normal | <number> | <length-percentage>', 'Sets the height of a line box', 'font'),

	color: createProperty('color', '<color>', 'Sets the color of the text', 'text'),
	'text-align': createProperty('text-align', 'left | right | center | justify | start | end', 'Sets the horizontal alignment of text', 'text'),
	'text-decoration-line': createProperty('text-decoration-line', 'none | underline | overline | line-through', 'Sets the kind of text decoration', 'text'),
	'text-decoration-color': createProperty('text-decoration-color', '<color>', 'Sets the color of text decoration', 'text'),
	'text-decoration-style': createProperty('text-decoration-style', 'solid | double | dotted | dashed | wavy', 'Sets the style of text decoration', 'text'),
	'text-decoration-thickness': createProperty('text-decoration-thickness', 'auto | <length>', 'Sets the thickness of text decoration', 'text'),
	'text-transform': createProperty('text-transform', 'none | capitalize | uppercase | lowercase', 'Controls text capitalization', 'text'),
	'text-indent': createProperty('text-indent', '<length-percentage>', 'Indents the first line of text', 'text'),
	'text-shadow': createProperty('text-shadow', 'none | <shadow>#', 'Adds shadow to text', 'text'),
	'text-overflow': createProperty('text-overflow', 'clip | ellipsis | <string>', 'Specifies how overflowed content is signaled', 'text'),
	'white-space': createProperty('white-space', 'normal | pre | nowrap | pre-wrap | pre-line | break-spaces', 'Controls how whitespace is handled', 'text'),
	'word-break': createProperty('word-break', 'normal | break-all | keep-all | break-word', 'Specifies line breaking rules', 'text'),
	'writing-mode': createProperty('writing-mode', 'horizontal-tb | vertical-rl | vertical-lr', 'Defines text layout direction', 'text'),

	// -------------------------------- EFFECTS --------------------------------
	'box-shadow': createProperty('box-shadow', 'none | <shadow>#', 'Adds shadow effects around an element', 'effect'),
	transform: createProperty('transform', 'none | <transform-function>+', 'Applies 2D or 3D transformations', 'effect'),
	filter: createProperty('filter', 'none | <filter-function>+', 'Applies graphical effects like blur', 'effect'),
	'backdrop-filter': createProperty('backdrop-filter', 'none | <filter-function>+', 'Applies filters to area behind element', 'effect'),

	// -------------------------------- OBJECT --------------------------------
	'object-fit': createProperty('object-fit', 'fill | contain | cover | none | scale-down', 'Specifies how content should fit its container', 'object'),
	'object-position': createProperty('object-position', '<position>', 'Specifies the alignment of content', 'object'),

	// -------------------------------- CURSOR --------------------------------
	cursor: createProperty('cursor', 'auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | grab | grabbing | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out', 'Specifies the mouse cursor', 'cursor'),

	// -------------------------------- SCROLL --------------------------------
	'scroll-behavior': createProperty('scroll-behavior', 'auto | smooth', 'Specifies scrolling behavior', 'scroll'),
};

/**
 * Utility type for extracting all valid property keys from CSSPropertyDefs.
 */
export type PropertyKeys = keyof typeof CSSPropertyDefs & string;
