// Types
import type { CSSPropertyDefinition, CSSPropertyKey } from '@/types/block/style/property';

// Constants
import { ValueSeparatorDefaults } from './value';
import { StylePropertyDescription } from './property-description';

// Utilities
import { getColumnSets } from '@/utilities/array';
import { splitAdvanced } from '@/utilities/string';
import { getTokenCanonical, expandTokens } from '@/utilities/style/token';
import { parse } from '@/utilities/style/parse';
import { extractSeparators } from '@/utilities/style/separator';

/**
 * Helper function to create a CSSPropertyDefinition object.
 * @param name - The canonical name of the CSS property (e.g. 'color', 'font-size').
 * @param syntax - The raw CSS Value Definition Syntax string (may contain data-type references).
 * @param category - The property category for grouping/filtering in the UI.
 * @returns A CSSPropertyDefinition object with all metadata fields populated, including expanded and parsed syntax.
 */
export const createProperty = (name: CSSPropertyKey, syntax: string): CSSPropertyDefinition => {
	let _expanded: string | undefined;
	let _parsed: string[] | undefined;
	let _set: Set<string>[] | undefined;
	let _normalized: string[] | undefined;
	let _separators: string[][] | undefined;

	return {
		name,
		description: StylePropertyDescription[name as keyof typeof CSSPropertyDefinitions] ?? '',
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
				const tokens = this.syntaxParsed.map((variation) => splitAdvanced(variation, ValueSeparatorDefaults));
				const columnArrays = getColumnSets(tokens);
				_set = columnArrays.map((col) => new Set(col));
			}
			return _set;
		},

		get syntaxNormalized() {
			if (_normalized === undefined) {
				_normalized = this.syntaxParsed.map((variation) =>
					splitAdvanced(variation, ValueSeparatorDefaults)
						.map((token) => getTokenCanonical(token))
						.join(' ')
				);
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
 * Each entry is a CSSPropertyDefinition object describing the property's name, syntax, description, and category.
 */
export const CSSPropertyDefinitions: Record<CSSPropertyKey, CSSPropertyDefinition> = {
	// ============ Display & Layout =============
	display: createProperty('display', 'block | inline | inline-block | flex | grid | none | ...'),

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

	'grid-auto-flow': createProperty('grid-auto-flow', 'row|column|[row dense]|[column dense]'),
	'grid-template-columns': createProperty('grid-template-columns', '<track-list>'),
	'grid-template-rows': createProperty('grid-template-rows', 'none | <track-list> | <auto-track-list>'),
	'grid-auto-columns': createProperty('grid-auto-columns', '<track-size>+'),
	'grid-auto-rows': createProperty('grid-auto-rows', '<track-size>+'),
	'row-gap': createProperty('row-gap', '<length-percentage>'),
	'column-gap': createProperty('column-gap', '<length-percentage>'),
	gap: createProperty('gap', '<row-gap> <column-gap>'),

	direction: createProperty('direction', 'ltr | rtl'),
	'box-sizing': createProperty('box-sizing', 'content-box | border-box'),
	'object-fit': createProperty('object-fit', 'fill|contain|cover|none|scale-down'),
	'object-position': createProperty('object-position', '[[left|center|right]&&[top|center|bottom]] | <length-percentage> | [<length-percentage> <length-percentage>]'),

	float: createProperty('float', 'left|right|none'),
	clear: createProperty('clear', 'none|left|right|both'),
	visibility: createProperty('visibility', 'visible | hidden | collapse'),

	// ============ Size & Scroll =============
	width: createProperty('width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content'),
	'min-width': createProperty('min-width', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content'),
	'max-width': createProperty('max-width', '<length-percentage [0,∞]> | min-content | max-content | fit-content'),
	height: createProperty('height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content'),
	'min-height': createProperty('min-height', 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content'),
	'max-height': createProperty('max-height', '<length-percentage [0,∞]> | min-content | max-content | fit-content'),
	'aspect-ratio': createProperty('aspect-ratio', 'auto || <ratio>'),
	overflow: createProperty('overflow', '[<overflow-block>]{1,2}'),

	'scroll-behavior': createProperty('scroll-behavior', 'auto|smooth'),
	'overscroll-behavior': createProperty('overscroll-behavior', '[contain|none|auto]{1,2}'),

	'scroll-snap-type': createProperty('scroll-snap-type', 'none|[[x|y|block|inline|both] [mandatory|proximity]?]'),
	'scroll-snap-align': createProperty('scroll-snap-align', '  [none|start|end|center]{1,2}'),
	'scroll-snap-stop': createProperty('scroll-snap-stop', 'normal|always'),

	'scroll-margin': createProperty('scroll-margin', '<length>{1,4}'),
	'scroll-margin-block': createProperty('scroll-margin-block', '<length>{1,2}'),
	'scroll-margin-inline': createProperty('scroll-margin-inline', '<length>{1,2}'),

	'scroll-padding': createProperty('scroll-padding', '[auto|<length-percentage [0,∞]>]{1,4}'),
	'scroll-padding-block': createProperty('scroll-padding-block', '[auto|<length-percentage [0,∞]>]{1,2}'),
	'scroll-padding-inline': createProperty('scroll-padding-inline', '[auto|<length-percentage [0,∞]>]{1,2}'),

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

	// ============ Background & Mask =============
	'background-color': createProperty('background-color', '<color>'),
	background: createProperty('background', '<color>'),

	'background-image': createProperty('background-image', 'none|<bg-image>'),
	'background-position': createProperty('background-position', '<bg-position>'),
	'background-size': createProperty('background-size', '<bg-size>'),
	'background-repeat': createProperty('background-repeat', 'repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}'),
	'background-clip': createProperty('background-clip', 'border-box|padding-box|content-box|text'),
	'background-origin': createProperty('background-origin', 'border-box|padding-box|content-box'),
	'background-blend-mode': createProperty('background-blend-mode', 'normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity'),
	'background-attachment': createProperty('background-attachment', 'scroll|fixed|local'),

	'mask-image': createProperty('mask-image', 'none|<image>'),
	'mask-position': createProperty('mask-position', '<bg-position>'),
	'mask-size': createProperty('mask-size', '<bg-size>'),
	'mask-repeat': createProperty('mask-repeat', 'repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}'),
	'mask-clip': createProperty('mask-clip', 'no-clip|view-box|fill-box|stroke-box|content-box|padding-box|border-box'),
	'mask-origin': createProperty('mask-origin', 'view-box|fill-box|stroke-box|content-box|padding-box|border-box'),
	'mask-mode': createProperty('mask-mode', 'match-source|alpha|luminance'),
	'mask-type': createProperty('mask-type', 'luminance|alpha'),
	'mask-composite': createProperty('mask-composite', 'add|subtract|intersect|exclude'),

	// ============  Border =============
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

	'border-image-source': createProperty('border-image-source', 'none|<border-image-source>'),
	'border-image-slice': createProperty('border-image-slice', '<border-image-slice>'),
	'border-image-width': createProperty('border-image-width', '<border-image-width>'),
	'border-image-outset': createProperty('border-image-outset', '<border-image-outset>'),
	'border-image-repeat': createProperty('border-image-repeat', '<border-image-repeat>'),

	'outline-width': createProperty('outline-width', 'medium|thin|thick|<length [0,∞]>'),
	'outline-style': createProperty('outline-style', 'none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset'),
	'outline-color': createProperty('outline-color', '<color>'),
	'outline-offset': createProperty('outline-offset', '<length [0,∞]>'),

	// ============ Font & Text =============
	'font-family': createProperty('font-family', '<generic-family>'),
	'font-size': createProperty('font-size', '<absolute-size> | <relative-size> | <length-percentage>'),
	'font-weight': createProperty('font-weight', 'normal|bold|<integer>'),
	'font-style': createProperty('font-style', 'normal | italic'),
	'line-height': createProperty('line-height', 'normal|<number>|<length-percentage>'),

	color: createProperty('color', '<color>'),
	'text-indent': createProperty('text-indent', '<length-percentage>'),
	'text-shadow': createProperty('text-shadow', '<length> <length> <length> <color>'),
	'text-overflow': createProperty('text-overflow', 'clip | ellipsis | <string>'),
	'text-orientation': createProperty('text-orientation', 'mixed | upright | sideways'),
	'text-align': createProperty('text-align', 'left|right|center|justify'),
	'text-decoration': createProperty('text-decoration', '<text-decoration-line> <text-decoration-style> <text-decoration-thickness> <text-decoration-color> '),
	'text-transform': createProperty('text-transform', 'none | capitalize | uppercase | lowercase'),
	'text-align-last': createProperty('text-align-last', 'auto|left|right|center|justify'),
	'text-combine-upright': createProperty('text-combine-upright', 'none|all|[digits <integer [2,4]>?]'),

	'white-space': createProperty('white-space', 'normal|pre|nowrap|pre-wrap|pre-line|break-spaces'),
	'word-break': createProperty('word-break', 'normal|break-all|keep-all|break-word'),
	'writing-mode': createProperty('writing-mode', 'horizontal-tb|vertical-rl|vertical-lr'),
	'letter-spacing': createProperty('letter-spacing', 'normal|<length>'),
	'line-break': createProperty('line-break', 'auto|loose|normal|strict|anywhere'),
	'word-spacing': createProperty('word-spacing', 'normal|<length>'),

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
	filter: createProperty('filter', 'none|[<filter-function>]+'),
	'backdrop-filter': createProperty('backdrop-filter', 'none|[<filter-function>]+'),
	transform: createProperty('transform', 'none|[<transform-function>]{1,4}'),
	'box-shadow': createProperty('box-shadow', '<spread-shadow>'),
	opacity: createProperty('opacity', '<number [0,1]>'),
} as const;

/**
 * A lookup table of CSS shorthand properties and their expanded definitions.
 * Each entry maps a shorthand property to an array of its longhand properties.
 */
export const CSSPropertyShortDefinitions: Partial<Record<CSSPropertyKey, CSSPropertyKey[]>> = {
	'border-width': ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
	'border-color': ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
	'border-style': ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'],
	margin: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
	padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
} as const;
