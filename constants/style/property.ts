// Types
import type { CSSProperty, CSSProperties, CSSPropertyCategories } from '@/types/style/property';

// Constants
import { ValueSeparators } from './value';

// Utilities
import { getColumnSets } from '@/utilities/array/array';
import { splitAdvanced } from '@/utilities/string/string';
import { getTokenCanonical } from '@/utilities/style/token';
import { parse, expandTokens } from '@/utilities/style/parse';
import { extractSeparators } from '@/utilities/style/value';

/**
 * Helper function to create a CSSProperty object.
 * @param name - The canonical name of the CSS property (e.g. 'color', 'font-size').
 * @param syntax - The raw CSS Value Definition Syntax string (may contain data-type references).
 * @param category - The property category for grouping/filtering in the UI.
 * @returns A CSSProperty object with all metadata fields populated, including expanded and parsed syntax.
 */
export const createProperty = (name: string, syntax: string, category: CSSPropertyCategories): CSSProperty => {
	let _expanded: string | undefined;
	let _parsed: string[] | undefined;
	let _set: Set<string>[] | undefined;
	let _normalized: string[] | undefined;
	let _separators: string[][] | undefined;

	return {
		name,
		description: CSSPropertyDesc[name as keyof typeof CSSPropertyDefs] ?? '',
		category,

		syntaxRaw: syntax,
		get syntaxExpanded() {
			if (_expanded === undefined) _expanded = expandTokens(syntax);
			return _expanded!;
		},

		get syntaxParsed() {
			if (_parsed === undefined) {
				_parsed = parse(this.syntaxExpanded);
			}
			return _parsed;
		},

		get syntaxSet() {
			if (_set === undefined) {
				const tokens = this.syntaxParsed.map((variation) => [...splitAdvanced(variation, [...ValueSeparators])]);
				const columnArrays = getColumnSets(tokens);
				_set = columnArrays.map((col) => new Set(col));
			}
			return _set;
		},

		get syntaxNormalized() {
			if (_normalized === undefined) {
				_normalized = this.syntaxParsed.map((variation) => [...splitAdvanced(variation, [...ValueSeparators])].map((token) => getTokenCanonical(token)).join(' '));
			}
			return _normalized!;
		},

		get syntaxSeparators() {
			if (_separators === undefined) {
				_separators = extractSeparators(this.syntaxParsed);
			}
			return _separators;
		},
	};
};

// New: Centralized descriptions for all CSS properties
export const CSSPropertyDesc: Partial<Record<keyof typeof CSSPropertyDefs, string>> = {
	display: 'Defines the display behavior of an element',
	visibility: 'Specifies whether an element is visible',
	opacity: 'Sets the opacity level for an element',
	'box-sizing': 'Defines how the width and height of an element are calculated',
	'aspect-ratio': 'Sets a preferred aspect ratio for the box',
	float: 'Specifies whether an element should float to the left, right, or not at all',
	clear: 'Specifies on which sides of an element floating elements are not allowed',
	'flex-direction': 'Specifies the direction of flex items',
	'flex-wrap': 'Specifies whether flex items are forced on one line or can wrap',
	'flex-flow': 'Shorthand for flex-direction and flex-wrap',
	'flex-grow': 'Specifies how much a flex item will grow relative to others',
	'flex-shrink': 'Specifies how much a flex item will shrink relative to others',
	'flex-basis': 'Specifies the initial size of a flex item',
	'justify-content': 'Aligns flex items along the main axis',
	'align-items': 'Aligns flex items along the cross axis',
	'align-content': "Aligns flex lines when there's extra space on cross axis",
	'justify-items': 'Aligns flex items along the main axis in a single line',
	'grid-auto-flow': 'Controls how auto-placed items are inserted in the grid',
	'grid-template-columns': 'Defines the columns of the grid',
	'grid-template-rows': 'Defines the rows of the grid',
	'grid-auto-columns': 'Specifies the size of implicitly-created grid columns',
	'grid-auto-rows': 'Specifies the size of implicitly-created grid rows',
	'row-gap': 'Sets the size of the gap between grid rows',
	'column-gap': 'Sets the size of the gap between grid columns',
	gap: 'Shorthand for row-gap and column-gap',
	width: 'The width of the element.',
	'min-width': 'The minimum width of the element.',
	'max-width': 'The maximum width of the element.',
	height: 'The height of the element.',
	'min-height': 'The minimum height of the element.',
	'max-height': 'The maximum height of the element.',
	overflow: 'Specifies what happens if content overflows an element',
	'overflow-x': 'Specifies overflow behavior on x-axis',
	'overflow-y': 'Specifies overflow behavior on y-axis',
	position: 'Specifies the type of positioning for an element',
	top: 'Specifies the top position of positioned element',
	right: 'Specifies the right position of positioned element',
	bottom: 'Specifies the bottom position of positioned element',
	left: 'Specifies the left position of positioned element',
	'z-index': 'Specifies the stack order of an element',
	'padding-top': 'Sets the top padding of an element',
	'padding-right': 'Sets the right padding of an element',
	'padding-bottom': 'Sets the bottom padding of an element',
	'padding-left': 'Sets the left padding of an element',
	padding: 'Shorthand for all padding properties',
	'margin-top': 'Sets the top margin of an element',
	'margin-right': 'Sets the right margin of an element',
	'margin-bottom': 'Sets the bottom margin of an element',
	'margin-left': 'Sets the left margin of an element',
	margin: 'Shorthand for all margin properties',
	'background-color': 'Sets the background color of an element',
	'background-image': 'Sets one or more background images',
	'background-position': 'Sets the starting position of a background image',
	'background-size': 'Specifies the size of background images',
	'background-repeat': 'Sets how background images are repeated',
	'background-attachment': 'Sets whether background images scroll with content',
	'background-clip': 'Defines how far the background extends',
	'background-origin': 'Sets the positioning area of background images',
	'border-top-width': 'Sets the width of the top border',
	'border-right-width': 'Sets the width of the right border',
	'border-bottom-width': 'Sets the width of the bottom border',
	'border-left-width': 'Sets the width of the left border',
	'border-width': 'Shorthand for all border width properties',
	'border-top-style': 'Sets the style of the top border',
	'border-right-style': 'Sets the style of the right border',
	'border-bottom-style': 'Sets the style of the bottom border',
	'border-left-style': 'Sets the style of the left border',
	'border-style': 'Shorthand for all border style properties',
	'border-top-color': 'Sets the color of the top border',
	'border-right-color': 'Sets the color of the right border',
	'border-bottom-color': 'Sets the color of the bottom border',
	'border-left-color': 'Sets the color of the left border',
	'border-color': 'Shorthand for all border color properties',
	'border-radius': 'Rounds the corners of an element',
	'border-top-left-radius': 'Rounds the top-left corner of an element',
	'border-top-right-radius': 'Rounds the top-right corner of an element',
	'border-bottom-right-radius': 'Rounds the bottom-right corner of an element',
	'border-bottom-left-radius': 'Rounds the bottom-left corner of an element',
	'outline-width': 'Sets the width of the outline',
	'outline-style': 'Sets the style of the outline',
	'outline-color': 'Sets the color of the outline',
	'outline-offset': 'Sets the space between outline and border',
	outline: 'Shorthand for outline properties',
	'font-family': 'Specifies the font for an element',
	'font-size': 'Sets the size of the font',
	'font-weight': 'Sets the weight (boldness) of the font',
	'font-style': 'Specifies the font style',
	'line-height': 'Sets the height of a line box',
	color: 'Sets the color of the text',
	'text-align': 'Sets the horizontal alignment of text',
	'text-decoration-line': 'Sets the kind of text decoration',
	'text-decoration-color': 'Sets the color of text decoration',
	'text-decoration-style': 'Sets the style of text decoration',
	'text-decoration-thickness': 'Sets the thickness of text decoration',
	'text-transform': 'Controls text capitalization',
	'text-indent': 'Indents the first line of text',
	'text-shadow': 'Adds shadow to text',
	'text-overflow': 'Specifies how overflowed content is signaled',
	'white-space': 'Controls how whitespace is handled',
	'word-break': 'Specifies line breaking rules',
	'writing-mode': 'Defines text layout direction',
	'box-shadow': 'Adds shadow effects around an element',
	transform: 'Applies 2D or 3D transformations',
	filter: 'Applies graphical effects like blur',
	'backdrop-filter': 'Applies filters to area behind element',
	'object-fit': 'Specifies how content should fit its container',
	'object-position': 'Specifies the alignment of content',
	cursor: 'Specifies the mouse cursor',
	'scroll-behavior': 'Specifies scrolling behavior',
};

/**
 * A lookup table of all supported CSS properties and their metadata.
 * Each entry is a CSSProperty object describing the property's name, syntax, description, and category.
 * Used for property validation, UI dropdowns, and documentation.
 */
export const CSSPropertyDefs: Partial<Record<CSSProperties, CSSProperty>> = {
	// ============ Display & Visibility =============
	display: createProperty('display', 'block | inline | inline-block | flex | grid | none | ...', 'display'),
	visibility: createProperty('visibility', 'visible | hidden | collapse', 'display'),
	opacity: createProperty('opacity', '<number [0,1]> | <percentage [0%,100%]>', 'display'),

	'flex-direction': createProperty('flex-direction', 'row | row-reverse | column | column-reverse', 'flex'),
	'flex-wrap': createProperty('flex-wrap', 'nowrap | wrap | wrap-reverse', 'flex'),
	'flex-flow': createProperty('flex-flow', '<flex-direction> <flex-wrap>', 'flex'),
	'flex-grow': createProperty('flex-grow', '<number>', 'flex'),
	'flex-shrink': createProperty('flex-shrink', '<number>', 'flex'),
	'flex-basis': createProperty('flex-basis', 'content | <width>', 'flex'),
	'justify-content': createProperty('justify-content', 'flex-start | flex-end | center | space-between | space-around | space-evenly', 'flex'),
	'align-items': createProperty('align-items', 'flex-start | flex-end | center | baseline | stretch', 'flex'),
	'align-content': createProperty('align-content', 'flex-start | flex-end | center | space-between | space-around | stretch', 'flex'),

	'justify-items': createProperty('justify-items', 'flex-start | flex-end | center | baseline | stretch', 'flex'),
	'grid-auto-flow': createProperty('grid-auto-flow', 'row | column | row dense | column dense', 'grid'),
	'grid-template-columns': createProperty('grid-template-columns', '<track-list>', 'grid'),
	'grid-template-rows': createProperty('grid-template-rows', 'none | <track-list> | <auto-track-list>', 'grid'),
	'grid-auto-columns': createProperty('grid-auto-columns', '<track-size>', 'grid'),
	'grid-auto-rows': createProperty('grid-auto-rows', '<track-size>', 'grid'),
	'row-gap': createProperty('row-gap', '<length-percentage>', 'grid'),
	'column-gap': createProperty('column-gap', '<length-percentage>', 'grid'),
	gap: createProperty('gap', '<row-gap> <column-gap>', 'grid'),

	// ============ Size & Dimension =============
	width: createProperty('width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'size'),
	'min-width': createProperty('min-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'size'),
	'max-width': createProperty('max-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'size'),
	height: createProperty('height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'size'),
	'min-height': createProperty('min-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'size'),
	'max-height': createProperty('max-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>', 'size'),
	overflow: createProperty('overflow', 'visible | hidden | clip | scroll | auto', 'overflow'),
	'object-fit': createProperty('object-fit', 'fill|contain|cover|none|scale-down', 'size'),
	'box-sizing': createProperty('box-sizing', 'content-box | border-box', 'size'),
	'aspect-ratio': createProperty('aspect-ratio', 'auto || <ratio>', 'size'),
	float: createProperty('float', 'left | right | none', 'size'),
	clear: createProperty('clear', 'none | left | right | both', 'size'),

	// ============ Position & Spacing =============
	position: createProperty('position', 'static | relative | absolute | fixed | sticky', 'position'),
	top: createProperty('top', 'auto | <length-percentage>', 'position'),
	right: createProperty('right', 'auto | <length-percentage>', 'position'),
	bottom: createProperty('bottom', 'auto | <length-percentage>', 'position'),
	left: createProperty('left', 'auto | <length-percentage>', 'position'),
	'z-index': createProperty('z-index', 'auto | <integer>', 'position'),

	'padding-top': createProperty('padding-top', '<length-percentage [0,∞]>', 'spacing'),
	'padding-right': createProperty('padding-right', '<length-percentage [0,∞]>', 'spacing'),
	'padding-bottom': createProperty('padding-bottom', '<length-percentage [0,∞]>', 'spacing'),
	'padding-left': createProperty('padding-left', '<length-percentage [0,∞]>', 'spacing'),
	padding: createProperty('padding', '<length-percentage [0,∞]>{1,4}', 'spacing'),

	'margin-top': createProperty('margin-top', 'auto | <length-percentage>', 'spacing'),
	'margin-right': createProperty('margin-right', 'auto | <length-percentage>', 'spacing'),
	'margin-bottom': createProperty('margin-bottom', 'auto | <length-percentage>', 'spacing'),
	'margin-left': createProperty('margin-left', 'auto | <length-percentage>', 'spacing'),
	margin: createProperty('margin', 'auto | <length-percentage>{1,4}', 'spacing'),

	// ============ Background & Border =============
	'background-color': createProperty('background-color', '<color> | transparent', 'background'),
	'background-image': createProperty('background-image', 'none | <image>', 'background'),
	'background-position': createProperty('background-position', '<position>', 'background'),
	'background-size': createProperty('background-size', 'auto | <length-percentage> | cover | contain', 'background'),
	'background-repeat': createProperty('background-repeat', 'repeat-x | repeat-y | repeat | space | round | no-repeat', 'background'),
	'background-attachment': createProperty('background-attachment', 'scroll | fixed | local', 'background'),
	'background-clip': createProperty('background-clip', 'border-box | padding-box | content-box | text', 'background'),
	'background-origin': createProperty('background-origin', 'border-box | padding-box | content-box', 'background'),

	'border-top-width': createProperty('border-top-width', '<line-width>', 'border'),
	'border-right-width': createProperty('border-right-width', '<line-width>', 'border'),
	'border-bottom-width': createProperty('border-bottom-width', '<line-width>', 'border'),
	'border-left-width': createProperty('border-left-width', '<line-width>', 'border'),
	'border-width': createProperty('border-width', '<line-width>{1,4}', 'border'),

	'border-top-style': createProperty('border-top-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'border'),
	'border-right-style': createProperty('border-right-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'border'),
	'border-bottom-style': createProperty('border-bottom-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'border'),
	'border-left-style': createProperty('border-left-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset', 'border'),
	'border-style': createProperty('border-style', '<border-style>{1,4}', 'border'),

	'border-top-color': createProperty('border-top-color', '<color>', 'border'),
	'border-right-color': createProperty('border-right-color', '<color>', 'border'),
	'border-bottom-color': createProperty('border-bottom-color', '<color>', 'border'),
	'border-left-color': createProperty('border-left-color', '<color>', 'border'),
	'border-color': createProperty('border-color', '<color>{1,4}', 'border'),

	'border-radius': createProperty('border-radius', '<length-percentage>{1,4} [/ <length-percentage>{1,4}]?', 'border'),
	'border-top-left-radius': createProperty('border-top-left-radius', '<length-percentage>', 'border'),
	'border-top-right-radius': createProperty('border-top-right-radius', '<length-percentage>', 'border'),
	'border-bottom-right-radius': createProperty('border-bottom-right-radius', '<length-percentage>', 'border'),
	'border-bottom-left-radius': createProperty('border-bottom-left-radius', '<length-percentage>', 'border'),

	'outline-width': createProperty('outline-width', '<line-width>', 'outline'),
	'outline-style': createProperty('outline-style', 'auto | none | dotted | dashed | solid | double | groove | ridge | inset | outset', 'outline'),
	'outline-color': createProperty('outline-color', '<color> | invert', 'outline'),
	'outline-offset': createProperty('outline-offset', '<length>', 'outline'),
	outline: createProperty('outline', '<outline-width> <outline-style> <outline-color>', 'outline'),
	// ============ Font & Text =============
	'font-family': createProperty('font-family', '[ <family-name> | <generic-family> ]#', 'font'),
	'font-size': createProperty('font-size', '<absolute-size> | <relative-size> | <length-percentage>', 'font'),
	'font-weight': createProperty('font-weight', 'normal | bold | bolder | lighter | 100 | 200 | ... | 900', 'font'),
	'line-height': createProperty('line-height', 'normal | <number> | <length-percentage>', 'font'),
	color: createProperty('color', '<color>', 'text'),

	'font-style': createProperty('font-style', 'normal | italic | oblique <angle>?', 'font'),

	direction: createProperty('direction', 'ltr | rtl', 'text'),
	'text-align': createProperty('text-align', 'left | right | center | justify | start | end', 'text'),

	'text-decoration': createProperty('text-decoration', '[<text-decoration-line>] [<text-decoration-style>] [<text-decoration-color>]', 'text'),
	// 'text-decoration-line': createProperty('text-decoration-line', 'none | underline | overline | line-through', 'text'),
	// 'text-decoration-color': createProperty('text-decoration-color', '<color>', 'text'),
	// 'text-decoration-style': createProperty('text-decoration-style', 'solid | double | dotted | dashed | wavy', 'text'),
	// 'text-decoration-thickness': createProperty('text-decoration-thickness', 'auto | <length>', 'text'),

	'text-transform': createProperty('text-transform', 'none | capitalize | uppercase | lowercase', 'text'),
	'text-indent': createProperty('text-indent', '<length-percentage>', 'text'),
	'text-shadow': createProperty('text-shadow', 'none | <shadow>#', 'text'),
	'text-overflow': createProperty('text-overflow', 'clip | ellipsis | <string>', 'text'),
	'white-space': createProperty('white-space', 'normal | pre | nowrap | pre-wrap | pre-line | break-spaces', 'text'),
	'word-break': createProperty('word-break', 'normal | break-all | keep-all | break-word', 'text'),
	'writing-mode': createProperty('writing-mode', 'horizontal-tb | vertical-rl | vertical-lr', 'text'),
	'letter-spacing': createProperty('letter-spacing', 'normal | <length>', 'text'),
	'line-break': createProperty('line-break', 'auto | loose | normal | strict | anywhere', 'text'),
	'text-orientation': createProperty('text-orientation', 'mixed | upright | sideways', 'text'),
	// -------------------------------- EFFECTS --------------------------------
	'box-shadow': createProperty('box-shadow', 'none | <shadow>#', 'effect'),
	transform: createProperty('transform', 'none | <transform-function>+', 'effect'),
	filter: createProperty('filter', 'none | <filter-function>+', 'effect'),
	'backdrop-filter': createProperty('backdrop-filter', 'none | <filter-function>+', 'effect'),

	// -------------------------------- CURSOR --------------------------------
	cursor: createProperty('cursor', 'auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | grab | grabbing | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out', 'cursor'),

	// -------------------------------- SCROLL --------------------------------
	'scroll-behavior': createProperty('scroll-behavior', 'auto | smooth', 'scroll'),
};
