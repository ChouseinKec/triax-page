// Types
import type { CSSProperty, CSSProperties } from '@/types/style/property';

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
export const createProperty = (name: string, syntax: string): CSSProperty => {
	let _expanded: string | undefined;
	let _parsed: string[] | undefined;
	let _set: Set<string>[] | undefined;
	let _normalized: string[] | undefined;
	let _separators: string[][] | undefined;

	return {
		name,
		description: CSSPropertyDesc[name as keyof typeof CSSPropertyDefs] ?? '',

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
	display: createProperty('display', 'block | inline | inline-block | flex | grid | none | ...'),
	visibility: createProperty('visibility', 'visible | hidden | collapse'),
	opacity: createProperty('opacity', '<number [0,1]> | <percentage [0%,100%]>'),

	'flex-direction': createProperty('flex-direction', 'row | row-reverse | column | column-reverse'),
	'flex-wrap': createProperty('flex-wrap', 'nowrap | wrap | wrap-reverse'),
	'flex-flow': createProperty('flex-flow', '<flex-direction> <flex-wrap>'),
	'flex-grow': createProperty('flex-grow', '<number>'),
	'flex-shrink': createProperty('flex-shrink', '<number>'),
	'flex-basis': createProperty('flex-basis', 'content | <width>'),
	'justify-content': createProperty('justify-content', 'flex-start | flex-end | center | space-between | space-around | space-evenly'),
	'align-items': createProperty('align-items', 'flex-start | flex-end | center | baseline | stretch'),
	'align-content': createProperty('align-content', 'flex-start | flex-end | center | space-between | space-around | space-evenly | stretch'),

	'justify-items': createProperty('justify-items', 'flex-start | flex-end | center | baseline | stretch'),
	'grid-auto-flow': createProperty('grid-auto-flow', 'row | column | row dense | column dense'),
	'grid-template-columns': createProperty('grid-template-columns', '<track-list>'),
	'grid-template-rows': createProperty('grid-template-rows', 'none | <track-list> | <auto-track-list>'),
	'grid-auto-columns': createProperty('grid-auto-columns', '<track-size>+'),
	'grid-auto-rows': createProperty('grid-auto-rows', '<track-size>+'),
	'row-gap': createProperty('row-gap', '<length-percentage>'),
	'column-gap': createProperty('column-gap', '<length-percentage>'),
	gap: createProperty('gap', '<row-gap> <column-gap>'),

	// ============ Size & Dimension =============
	width: createProperty('width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>'),
	'min-width': createProperty('min-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>'),
	'max-width': createProperty('max-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>'),
	height: createProperty('height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>'),
	'min-height': createProperty('min-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>'),
	'max-height': createProperty('max-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>'),
	overflow: createProperty('overflow', '[<overflow-block>]{1,2}'),
	'object-fit': createProperty('object-fit', 'fill|contain|cover|none|scale-down'),
	'box-sizing': createProperty('box-sizing', 'content-box | border-box'),
	'aspect-ratio': createProperty('aspect-ratio', 'auto || <ratio>'),
	float: createProperty('float', 'left | right | none'),
	clear: createProperty('clear', 'none | left | right | both'),

	// ============ Position & Spacing =============
	position: createProperty('position', 'static | relative | absolute | fixed | sticky'),
	top: createProperty('top', 'auto | <length-percentage>'),
	right: createProperty('right', 'auto | <length-percentage>'),
	bottom: createProperty('bottom', 'auto | <length-percentage>'),
	left: createProperty('left', 'auto | <length-percentage>'),
	'z-index': createProperty('z-index', 'auto | <integer>'),

	'padding-top': createProperty('padding-top', '<length-percentage [0,∞]>'),
	'padding-right': createProperty('padding-right', '<length-percentage [0,∞]>'),
	'padding-bottom': createProperty('padding-bottom', '<length-percentage [0,∞]>'),
	'padding-left': createProperty('padding-left', '<length-percentage [0,∞]>'),
	padding: createProperty('padding', '<length-percentage [0,∞]>{1,4}'),

	'margin-top': createProperty('margin-top', 'auto | <length-percentage>'),
	'margin-right': createProperty('margin-right', 'auto | <length-percentage>'),
	'margin-bottom': createProperty('margin-bottom', 'auto | <length-percentage>'),
	'margin-left': createProperty('margin-left', 'auto | <length-percentage>'),
	margin: createProperty('margin', 'auto | <length-percentage>{1,4}'),

	transform: createProperty('transform', 'none | [<transform-function>]+'),

	// ============ Background & Border =============
	'background-color': createProperty('background-color', '<color>'),
	'background-position': createProperty('background-position', '<bg-position>'),
	'background-size': createProperty('background-size', '<bg-size>'),
	'background-repeat': createProperty('background-repeat', 'repeat-x | repeat-y | repeat | space | round | no-repeat'),

	'background-image': createProperty('background-image', '<bg-image>'),
	'background-attachment': createProperty('background-attachment', 'scroll | fixed | local'),
	'background-clip': createProperty('background-clip', 'border-box | padding-box | content-box | text'),
	'background-origin': createProperty('background-origin', 'border-box | padding-box | content-box'),

	'border-width': createProperty('border-width', '<length [0,∞]>'),
	'border-style': createProperty('border-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset'),
	'border-color': createProperty('border-color', '<color>'),

	'border-top-width': createProperty('border-top-width', '<length [0,∞]>'),
	'border-right-width': createProperty('border-right-width', '<length [0,∞]>'),
	'border-bottom-width': createProperty('border-bottom-width', '<length [0,∞]>'),
	'border-left-width': createProperty('border-left-width', '<length [0,∞]>'),

	'border-top-style': createProperty('border-top-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset'),
	'border-right-style': createProperty('border-right-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset'),
	'border-bottom-style': createProperty('border-bottom-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset'),
	'border-left-style': createProperty('border-left-style', 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset'),

	'border-top-color': createProperty('border-top-color', '<color>'),
	'border-right-color': createProperty('border-right-color', '<color>'),
	'border-bottom-color': createProperty('border-bottom-color', '<color>'),
	'border-left-color': createProperty('border-left-color', '<color>'),

	'border-radius': createProperty('border-radius', '<length-percentage>{1,4} [/ <length-percentage>{1,4}]?'),
	'border-top-left-radius': createProperty('border-top-left-radius', '<length-percentage>'),
	'border-top-right-radius': createProperty('border-top-right-radius', '<length-percentage>'),
	'border-bottom-right-radius': createProperty('border-bottom-right-radius', '<length-percentage>'),
	'border-bottom-left-radius': createProperty('border-bottom-left-radius', '<length-percentage>'),

	'outline-width': createProperty('outline-width', '<length [0,∞]>'),
	'outline-style': createProperty('outline-style', 'auto|none|dotted|dashed|solid|double|groove|ridge|inset|outset'),
	'outline-color': createProperty('outline-color', '<color>'),

	// ============ Font & Text =============
	'font-family': createProperty('font-family', '<generic-family>'),
	'font-size': createProperty('font-size', '<absolute-size> | <relative-size> | <length-percentage>'),
	'font-weight': createProperty('font-weight', 'normal|bold|<integer>'),
	'line-height': createProperty('line-height', 'normal | <number> | <length-percentage>'),
	color: createProperty('color', '<color>'),

	'font-style': createProperty('font-style', 'normal | italic'),

	direction: createProperty('direction', 'ltr | rtl'),
	'text-align': createProperty('text-align', 'left | right | center | justify | start | end'),

	'text-decoration': createProperty('text-decoration', '<text-decoration-line> || <text-decoration-style> || <text-decoration-color> || <text-decoration-thickness>'),

	'text-transform': createProperty('text-transform', 'none | capitalize | uppercase | lowercase'),
	'text-indent': createProperty('text-indent', '<length-percentage>'),
	'text-shadow': createProperty('text-shadow', 'none | <shadow>#'),
	'text-overflow': createProperty('text-overflow', 'clip | ellipsis | <string>'),
	'white-space': createProperty('white-space', 'normal | pre | nowrap | pre-wrap | pre-line | break-spaces'),
	'word-break': createProperty('word-break', 'normal | break-all | keep-all | break-word'),
	'writing-mode': createProperty('writing-mode', 'horizontal-tb | vertical-rl | vertical-lr'),
	'letter-spacing': createProperty('letter-spacing', 'normal | <length>'),
	'line-break': createProperty('line-break', 'auto | loose | normal | strict | anywhere'),
	'text-orientation': createProperty('text-orientation', 'mixed | upright | sideways'),

	'column-count': createProperty('column-count', 'auto|<integer [1,∞]>'),
	'column-width': createProperty('column-width', 'auto|<length [0,∞]>'),
	'column-rule-width': createProperty('column-rule-width', '<length [0,∞]>|medium|thick|thin'),
	'column-rule-style': createProperty('column-rule-style', 'none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset'),
	'column-rule-color': createProperty('column-rule-color', '<color>'),
	'break-before': createProperty('break-before', 'auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region'),
	'break-inside': createProperty('break-inside', 'auto|avoid|avoid-page|avoid-column|avoid-region'),
	'break-after': createProperty('break-after', 'auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region'),
	'column-span': createProperty('column-span', 'none|<integer [1,∞]>|all|auto'),
	'column-fill': createProperty('column-fill', 'auto|balance|balance-all'),

	// -------------------------------- EFFECTS --------------------------------
	'box-shadow': createProperty('box-shadow', 'none | <shadow>#'),
	filter: createProperty('filter', 'none | <filter-function>+'),
	'backdrop-filter': createProperty('backdrop-filter', 'none | <filter-function>+'),
};
