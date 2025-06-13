// Types
import type { CSSProperty, CSSProperties, CSSPropertyCategories } from '@/types/style/property';

// Constants
import { ValueSeparators } from './value';

// Utilities
import { getColumnSets } from '@/utilities/array/array';
import { splitAdvanced } from '@/utilities/string/string';
import { getTokenCanonical } from '@/utilities/style/token';
import { parse, expandTokens, filterTokens } from '@/utilities/style/parse';

/**
 * Helper function to create a CSSProperty object.
 * @param name - The canonical name of the CSS property (e.g. 'color', 'font-size').
 * @param syntax - The raw CSS Value Definition Syntax string (may contain data-type references).
 * @param description - A brief description of the property for UI/documentation.
 * @param category - The property category for grouping/filtering in the UI.
 * @returns A CSSProperty object with all metadata fields populated, including expanded and parsed syntax.
 */
export const createProperty = (name: string, syntax: string, initialValue: string, description: string, category: CSSPropertyCategories): CSSProperty => {
	let _expanded: string | undefined;
	let _parsed: ReturnType<typeof parse> | undefined;
	let _set: string[][] | undefined;
	let _normalized: string[] | undefined;

	return {
		name,
		description,
		category,
		initialValue,

		syntaxRaw: syntax,
		get syntaxExpanded() {
			if (_expanded === undefined) _expanded = expandTokens(syntax);
			return _expanded!;
		},

		get syntaxParsed() {
			if (_parsed === undefined) {
				const parsed = parse(this.syntaxExpanded!);
				_parsed = filterTokens(parsed);
			}
			return _parsed;
		},

		get syntaxSet() {
			if (_set === undefined) {
				const parsed = this.syntaxParsed;

				// Split each variation into top-level tokens
				const tokens = parsed.map((variation) => {
					return splitAdvanced(variation, [...ValueSeparators]);
				});

				const columnSets = getColumnSets(tokens);
				_set = columnSets;
			}
			return _set;
		},

		get syntaxNormalized() {
			if (_normalized === undefined) {
				_normalized = this.syntaxParsed.map((variation) =>
					splitAdvanced(variation, [...ValueSeparators])
						.map((token) => getTokenCanonical(token))
						.join(' ')
				);
			}
			return _normalized;
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
	display: createProperty('display', 'block | inline | inline-block | flex | grid | none | ...', 'block', 'Defines the display behavior of an element', 'display'),
	visibility: createProperty('visibility', 'visible | hidden | collapse', 'visible', 'Specifies whether an element is visible', 'display'),
	opacity: createProperty('opacity', '<number [0,1]> | <percentage [0%,100%]>', '1', 'Sets the opacity level for an element', 'display'),
	'box-sizing': createProperty('box-sizing', 'content-box | border-box', 'border-box', 'Defines how the width and height of an element are calculated', 'display'),
	'aspect-ratio': createProperty('aspect-ratio', 'auto || <ratio>', 'auto', 'Sets a preferred aspect ratio for the box', 'display'),
	float: createProperty('float', 'left | right | none', 'none', 'Specifies whether an element should float to the left, right, or not at all', 'display'),
	clear: createProperty('clear', 'none | left | right | both', 'none', 'Specifies on which sides of an element floating elements are not allowed', 'display'),

	// -------------------------------- FLEX --------------------------------
	'flex-direction': createProperty('flex-direction', 'row | row-reverse | column | column-reverse', 'row', 'Specifies the direction of flex items', 'flex'),
	'flex-wrap': createProperty('flex-wrap', 'nowrap | wrap | wrap-reverse', 'nowrap', 'Specifies whether flex items are forced on one line or can wrap', 'flex'),
	'flex-flow': createProperty('flex-flow', '<flex-direction> <flex-wrap>', 'row nowrap', 'Shorthand for flex-direction and flex-wrap', 'flex'),
	'flex-grow': createProperty('flex-grow', '<number>', '0', 'Specifies how much a flex item will grow relative to others', 'flex'),
	'flex-shrink': createProperty('flex-shrink', '<number>', '1', 'Specifies how much a flex item will shrink relative to others', 'flex'),
	'flex-basis': createProperty('flex-basis', 'content | <width>', 'auto', 'Specifies the initial size of a flex item', 'flex'),
	'justify-content': createProperty('justify-content', 'flex-start | flex-end | center | space-between | space-around | space-evenly', 'flex-start', 'Aligns flex items along the main axis', 'flex'),
	'align-items': createProperty('align-items', 'flex-start | flex-end | center | baseline | stretch', 'stretch', 'Aligns flex items along the cross axis', 'flex'),
	'align-content': createProperty('align-content', 'flex-start | flex-end | center | space-between | space-around | stretch', 'stretch', "Aligns flex lines when there's extra space on cross axis", 'flex'),

	// -------------------------------- GRID --------------------------------
	'grid-auto-flow': createProperty('grid-auto-flow', 'row | column | row dense | column dense', 'row', 'Controls how auto-placed items are inserted in the grid', 'grid'),
	'grid-template-columns': createProperty('grid-template-columns', 'none | <track-list> | <auto-track-list>', 'none', 'Defines the columns of the grid', 'grid'),
	'grid-template-rows': createProperty('grid-template-rows', 'none | <track-list> | <auto-track-list>', 'none', 'Defines the rows of the grid', 'grid'),
	'grid-auto-columns': createProperty('grid-auto-columns', '<track-size>', 'auto', 'Specifies the size of implicitly-created grid columns', 'grid'),
	'grid-auto-rows': createProperty('grid-auto-rows', '<track-size>', 'auto', 'Specifies the size of implicitly-created grid rows', 'grid'),
	'row-gap': createProperty('row-gap', '<length-percentage>', 'normal', 'Sets the size of the gap between grid rows', 'grid'),
	'column-gap': createProperty('column-gap', '<length-percentage>', 'normal', 'Sets the size of the gap between grid columns', 'grid'),
	gap: createProperty('gap', '<row-gap> <column-gap>', 'normal', 'Shorthand for row-gap and column-gap', 'grid'),

	// -------------------------------- SIZE & OVERFLOW --------------------------------
	width: createProperty('width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content([<length-percentage [0,∞]>]*) | <calc-size()> | <anchor-size()>', 'auto', 'The width of the element.', 'size'),

	// width: createProperty('width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'auto', 'The width of the element.', 'size'),
	'min-width': createProperty('min-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', '0', 'The minimum width of the element.', 'size'),
	'max-width': createProperty('max-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'none', 'The maximum width of the element.', 'size'),
	height: createProperty('height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'auto', 'The height of the element.', 'size'),
	'min-height': createProperty('min-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', '0', 'The minimum height of the element.', 'size'),
	'max-height': createProperty('max-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'none', 'The maximum height of the element.', 'size'),
	overflow: createProperty('overflow', 'visible | hidden | clip | scroll | auto', 'visible', 'Specifies what happens if content overflows an element', 'overflow'),
	'overflow-x': createProperty('overflow-x', 'visible | hidden | clip | scroll | auto', 'visible', 'Specifies overflow behavior on x-axis', 'overflow'),
	'overflow-y': createProperty('overflow-y', 'visible | hidden | clip | scroll | auto', 'visible', 'Specifies overflow behavior on y-axis', 'overflow'),

	// -------------------------------- POSITION & SPACING --------------------------------
	position: createProperty('position', 'static | relative | absolute | fixed | sticky', 'static', 'Specifies the type of positioning for an element', 'position'),
	top: createProperty('top', 'auto | <length-percentage>', 'auto', 'Specifies the top position of positioned element', 'position'),
	right: createProperty('right', 'auto | <length-percentage>', 'auto', 'Specifies the right position of positioned element', 'position'),
	bottom: createProperty('bottom', 'auto | <length-percentage>', 'auto', 'Specifies the bottom position of positioned element', 'position'),
	left: createProperty('left', 'auto | <length-percentage>', 'auto', 'Specifies the left position of positioned element', 'position'),
	'z-index': createProperty('z-index', 'auto | <integer>', 'auto', 'Specifies the stack order of an element', 'position'),

	'padding-top': createProperty('padding-top', '<length-percentage [0,∞]>', '0', 'Sets the top padding of an element', 'spacing'),
	'padding-right': createProperty('padding-right', '<length-percentage [0,∞]>', '0', 'Sets the right padding of an element', 'spacing'),
	'padding-bottom': createProperty('padding-bottom', '<length-percentage [0,∞]>', '0', 'Sets the bottom padding of an element', 'spacing'),
	'padding-left': createProperty('padding-left', '<length-percentage [0,∞]>', '0', 'Sets the left padding of an element', 'spacing'),
	padding: createProperty('padding', '<length-percentage [0,∞]>{1,4}', '0', 'Shorthand for all padding properties', 'spacing'),

	'margin-top': createProperty('margin-top', 'auto | <length-percentage>', '0', 'Sets the top margin of an element', 'spacing'),
	'margin-right': createProperty('margin-right', 'auto | <length-percentage>', '0', 'Sets the right margin of an element', 'spacing'),
	'margin-bottom': createProperty('margin-bottom', 'auto | <length-percentage>', '0', 'Sets the bottom margin of an element', 'spacing'),
	'margin-left': createProperty('margin-left', 'auto | <length-percentage>', '0', 'Sets the left margin of an element', 'spacing'),
	margin: createProperty('margin', 'auto | <length-percentage>{1,4}', '0', 'Shorthand for all margin properties', 'spacing'),

	// -------------------------------- BACKGROUND & BORDER --------------------------------
	'background-color': createProperty('background-color', '<color> | transparent', 'transparent', 'Sets the background color of an element', 'background'),
	'background-image': createProperty('background-image', 'none | <image>', 'none', 'Sets one or more background images', 'background'),
	'background-position': createProperty('background-position', '<position>', '0% 0%', 'Sets the starting position of a background image', 'background'),
	'background-size': createProperty('background-size', 'auto | <length-percentage> | cover | contain', 'auto', 'Specifies the size of background images', 'background'),
	'background-repeat': createProperty('background-repeat', 'repeat-x | repeat-y | repeat | space | round | no-repeat', 'repeat', 'Sets how background images are repeated', 'background'),
	'background-attachment': createProperty('background-attachment', 'scroll | fixed | local', 'scroll', 'Sets whether background images scroll with content', 'background'),
	'background-clip': createProperty('background-clip', 'border-box | padding-box | content-box | text', 'border-box', 'Defines how far the background extends', 'background'),
	'background-origin': createProperty('background-origin', 'border-box | padding-box | content-box', 'border-box', 'Sets the positioning area of background images', 'background'),

	'border-top-width': createProperty('border-top-width', '<line-width>', 'medium', 'Sets the width of the top border', 'border'),
	'border-right-width': createProperty('border-right-width', '<line-width>', 'medium', 'Sets the width of the right border', 'border'),
	'border-bottom-width': createProperty('border-bottom-width', '<line-width>', 'medium', 'Sets the width of the bottom border', 'border'),
	'border-left-width': createProperty('border-left-width', '<line-width>', 'medium', 'Sets the width of the left border', 'border'),
	'border-width': createProperty('border-width', '<line-width>{1,4}', 'medium', 'Shorthand for all border width properties', 'border'),

	'border-top-style': createProperty('border-top-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'none', 'Sets the style of the top border', 'border'),
	'border-right-style': createProperty('border-right-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'none', 'Sets the style of the right border', 'border'),
	'border-bottom-style': createProperty('border-bottom-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'none', 'Sets the style of the bottom border', 'border'),
	'border-left-style': createProperty('border-left-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'none', 'Sets the style of the left border', 'border'),
	'border-style': createProperty('border-style', '<border-style>{1,4}', 'none', 'Shorthand for all border style properties', 'border'),

	'border-top-color': createProperty('border-top-color', '<color>', 'transparent', 'Sets the color of the top border', 'border'),
	'border-right-color': createProperty('border-right-color', '<color>', 'transparent', 'Sets the color of the right border', 'border'),
	'border-bottom-color': createProperty('border-bottom-color', '<color>', 'transparent', 'Sets the color of the bottom border', 'border'),
	'border-left-color': createProperty('border-left-color', '<color>', 'transparent', 'Sets the color of the left border', 'border'),
	'border-color': createProperty('border-color', '<color>{1,4}', 'transparent', 'Shorthand for all border color properties', 'border'),

	'border-radius': createProperty('border-radius', '<length-percentage>{1,4} [/ <length-percentage>{1,4}]?', '0', 'Rounds the corners of an element', 'border'),
	'border-top-left-radius': createProperty('border-top-left-radius', '<length-percentage>', '0', 'Rounds the top-left corner of an element', 'border'),
	'border-top-right-radius': createProperty('border-top-right-radius', '<length-percentage>', '0', 'Rounds the top-right corner of an element', 'border'),
	'border-bottom-right-radius': createProperty('border-bottom-right-radius', '<length-percentage>', '0', 'Rounds the bottom-right corner of an element', 'border'),
	'border-bottom-left-radius': createProperty('border-bottom-left-radius', '<length-percentage>', '0', 'Rounds the bottom-left corner of an element', 'border'),

	'outline-width': createProperty('outline-width', '<line-width>', 'medium', 'Sets the width of the outline', 'outline'),
	'outline-style': createProperty('outline-style', 'auto | none | dotted | dashed | solid | double | groove | ridge | inset | outset', 'none', 'Sets the style of the outline', 'outline'),
	'outline-color': createProperty('outline-color', '<color> | invert', 'invert', 'Sets the color of the outline', 'outline'),
	'outline-offset': createProperty('outline-offset', '<length>', '0', 'Sets the space between outline and border', 'outline'),
	outline: createProperty('outline', '<outline-width> <outline-style> <outline-color>', 'medium none invert', 'Shorthand for outline properties', 'outline'),

	// -------------------------------- FONT & TEXT --------------------------------
	'font-family': createProperty('font-family', '[ <family-name> | <generic-family> ]#', 'unset', 'Specifies the font for an element', 'font'),
	'font-size': createProperty('font-size', '<absolute-size> | <relative-size> | <length-percentage>', 'medium', 'Sets the size of the font', 'font'),
	'font-weight': createProperty('font-weight', 'normal | bold | bolder | lighter | 100 | 200 | ... | 900', 'normal', 'Sets the weight (boldness) of the font', 'font'),
	'font-style': createProperty('font-style', 'normal | italic | oblique <angle>?', 'normal', 'Specifies the font style', 'font'),
	'line-height': createProperty('line-height', 'normal | <number> | <length-percentage>', 'normal', 'Sets the height of a line box', 'font'),

	color: createProperty('color', '<color>', 'currentColor', 'Sets the color of the text', 'text'),
	'text-align': createProperty('text-align', 'left | right | center | justify | start | end', 'left', 'Sets the horizontal alignment of text', 'text'),
	'text-decoration-line': createProperty('text-decoration-line', 'none | underline | overline | line-through', 'none', 'Sets the kind of text decoration', 'text'),
	'text-decoration-color': createProperty('text-decoration-color', '<color>', 'currentColor', 'Sets the color of text decoration', 'text'),
	'text-decoration-style': createProperty('text-decoration-style', 'solid | double | dotted | dashed | wavy', 'solid', 'Sets the style of text decoration', 'text'),
	'text-decoration-thickness': createProperty('text-decoration-thickness', 'auto | <length>', 'auto', 'Sets the thickness of text decoration', 'text'),
	'text-transform': createProperty('text-transform', 'none | capitalize | uppercase | lowercase', 'none', 'Controls text capitalization', 'text'),
	'text-indent': createProperty('text-indent', '<length-percentage>', '0', 'Indents the first line of text', 'text'),
	'text-shadow': createProperty('text-shadow', 'none | <shadow>#', 'none', 'Adds shadow to text', 'text'),
	'text-overflow': createProperty('text-overflow', 'clip | ellipsis | <string>', 'clip', 'Specifies how overflowed content is signaled', 'text'),
	'white-space': createProperty('white-space', 'normal | pre | nowrap | pre-wrap | pre-line | break-spaces', 'normal', 'Controls how whitespace is handled', 'text'),
	'word-break': createProperty('word-break', 'normal | break-all | keep-all | break-word', 'normal', 'Specifies line breaking rules', 'text'),
	'writing-mode': createProperty('writing-mode', 'horizontal-tb | vertical-rl | vertical-lr', 'horizontal-tb', 'Defines text layout direction', 'text'),

	// -------------------------------- EFFECTS --------------------------------
	'box-shadow': createProperty('box-shadow', 'none | <shadow>#', 'none', 'Adds shadow effects around an element', 'effect'),
	transform: createProperty('transform', 'none | <transform-function>+', 'none', 'Applies 2D or 3D transformations', 'effect'),
	filter: createProperty('filter', 'none | <filter-function>+', 'none', 'Applies graphical effects like blur', 'effect'),
	'backdrop-filter': createProperty('backdrop-filter', 'none | <filter-function>+', 'none', 'Applies filters to area behind element', 'effect'),

	// -------------------------------- OBJECT --------------------------------
	'object-fit': createProperty('object-fit', 'fill | contain | cover | none | scale-down', 'fill', 'Specifies how content should fit its container', 'object'),
	'object-position': createProperty('object-position', '<position>', '50% 50%', 'Specifies the alignment of content', 'object'),

	// -------------------------------- CURSOR --------------------------------
	cursor: createProperty('cursor', 'auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | grab | grabbing | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out', 'auto', 'Specifies the mouse cursor', 'cursor'),

	// -------------------------------- SCROLL --------------------------------
	'scroll-behavior': createProperty('scroll-behavior', 'auto | smooth', 'auto', 'Specifies scrolling behavior', 'scroll'),
};

/**
 * Utility type for extracting all valid property keys from CSSPropertyDefs.
 */
export type PropertyKeys = keyof typeof CSSPropertyDefs & string;
