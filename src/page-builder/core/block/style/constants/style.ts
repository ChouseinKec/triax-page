// Types
import type { StyleDefinition, StyleKey } from '@/src/page-builder/core/block/style/types';

// Constants
import { StyleValueSeparatorDefaults } from './value';

// Utilities
import { getColumnSets } from '@/src/shared/utilities/array';
import { splitAdvanced } from '@/src/shared/utilities/string';
import { getTokenCanonical, expandTokens, parseSyntax, extractSeparators } from '@/src/page-builder/core/block/style/utilities';
import JSON from './style.json';

/**
 * Helper function to create a StyleDefinition object.
 * @param name - The canonical name of the CSS property (e.g. 'color', 'font-size').
 * @param syntax - The raw CSS Value Definition Syntax string (may contain data-type references).
 * @param description - The description of the CSS property.
 * @returns A StyleDefinition object with all metadata fields populated, including expanded and parsed syntax.
 */
export function createProperty(name: StyleKey, syntax: string, description: string = ''): StyleDefinition {
	let _expanded: string | undefined;
	let _parsed: string[] | undefined;
	let _set: Set<string>[] | undefined;
	let _normalized: string[] | undefined;
	let _separators: string[][] | undefined;

	return {
		name,
		description,
		syntaxRaw: syntax,
		get syntaxExpanded() {
			if (_expanded === undefined) _expanded = expandTokens(syntax);
			return _expanded!;
		},

		get syntaxParsed() {
			if (_parsed === undefined) {
				_parsed = parseSyntax(this.syntaxExpanded);
			}
			return _parsed;
		},

		get syntaxSet() {
			if (_set === undefined) {
				const tokens = this.syntaxParsed.map((variation) => splitAdvanced(variation, StyleValueSeparatorDefaults));
				const columnArrays = getColumnSets(tokens);
				_set = columnArrays.map((col) => new Set(col));
			}
			return _set;
		},

		get syntaxNormalized() {
			if (_normalized === undefined) {
				_normalized = this.syntaxParsed.map((variation) =>
					splitAdvanced(variation, StyleValueSeparatorDefaults)
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
}

/**
 * A lookup table of all supported CSS properties and their metadata.
 * Each entry is a StyleDefinition object describing the property's name, syntax, description, and category.
 */
export const StyleDefinitions: Record<StyleKey, StyleDefinition> = Object.entries(JSON.properties).reduce((acc, [key, data]) => {
	acc[key as StyleKey] = createProperty(key as StyleKey, data.syntax, data.description);
	return acc;
}, {} as Record<StyleKey, StyleDefinition>);

/**
 * A lookup table of CSS shorthand properties and their expanded definitions.
 * Each entry maps a shorthand property to an array of its longhand properties.
 */
export const StyleShorthandDefinitions: Partial<Record<StyleKey, StyleKey[]>> = JSON.shorthands as Partial<Record<StyleKey, StyleKey[]>>;
