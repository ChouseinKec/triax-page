// Types
import type { CSSProperty, CSSProperties } from '@/types/style/property';

// Constants
import { ValueSeparators } from './separator';
import { CSSPropertyDesc } from './property-description';

// Utilities
import { getColumnSets } from '@/utilities/array/array';
import { splitAdvanced } from '@/utilities/string/string';
import { getTokenCanonical } from '@/utilities/style/token';
import { parse, expandTokens } from '@/utilities/style/parse';
import { extractSeparators } from '@/utilities/style/separator';

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
	width: createProperty('width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content'),
	'min-width': createProperty('min-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content'),
	'max-width': createProperty('max-width', '<length-percentage [0,∞]> | min-content | max-content | fit-content'),
	height: createProperty('height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content'),
	'min-height': createProperty('min-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content'),
	'max-height': createProperty('max-height', '<length-percentage [0,∞]> | min-content | max-content | fit-content'),
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
	'z-index': createProperty('z-index', '<integer>'),

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
	'text-shadow': createProperty('text-shadow', 'none | <color> <length> <length>'),
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
