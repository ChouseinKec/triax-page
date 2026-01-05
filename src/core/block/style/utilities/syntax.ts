// Types
import type { StyleKey, StyleSyntaxRaw, StyleSyntaxParsed, StyleSyntaxSet, StyleSyntaxSeparators, TokenDefinitionRecord, TokenTypeDefinitionRecord } from '@/src/core/block/style/types/';

// Utilities
import { expandTokens, parseSyntax, getTokenCanonical, extractSeparators } from '@/src/core/block/style/utilities';
import { splitAdvanced } from '@/src/shared/utilities/string';
import { getColumnSets } from '@/src/shared/utilities/array';

// Caches
const syntaxParsedCache = new Map<StyleKey, StyleSyntaxParsed>();
const syntaxSetCache = new Map<StyleKey, StyleSyntaxSet>();
const syntaxNormalizedCache = new Map<StyleKey, StyleSyntaxParsed>();
const syntaxSeparatorsCache = new Map<StyleKey, StyleSyntaxSeparators>();

export function getSyntaxParsed(styleKey: StyleKey, syntaxRaw: StyleSyntaxRaw, tokenDefinitions: TokenDefinitionRecord, tokenTypeDefinitions: TokenTypeDefinitionRecord): StyleSyntaxParsed {
	// if (syntaxParsedCache.has(styleKey)) return syntaxParsedCache.get(styleKey)!;

	const expanded = expandTokens(syntaxRaw, tokenDefinitions, tokenTypeDefinitions);
	const parsed = parseSyntax(expanded);

	// syntaxParsedCache.set(styleKey, parsed);
	return parsed;
}

export function getSyntaxSet(styleKey: StyleKey, syntaxParsed: StyleSyntaxParsed): StyleSyntaxSet {
	// if (syntaxSetCache.has(styleKey)) return syntaxSetCache.get(styleKey)!;

	const tokens = syntaxParsed.map((variation) => splitAdvanced(variation));
	const columnArrays = getColumnSets(tokens);
	const result = columnArrays.map((col) => new Set(col));

	// syntaxSetCache.set(styleKey, result);
	return result;
}

export function getSyntaxNormalized(styleKey: StyleKey, syntaxParsed: StyleSyntaxParsed, tokenTypeDefinitions: TokenTypeDefinitionRecord): StyleSyntaxParsed {
	// if (syntaxNormalizedCache.has(styleKey)) return syntaxNormalizedCache.get(styleKey)!;

	const result = syntaxParsed.map((variation) =>
		splitAdvanced(variation)
			.map((token) => getTokenCanonical(token, tokenTypeDefinitions))
			.join(' ')
	);

	// syntaxNormalizedCache.set(styleKey, result);
	return result;
}

export function getSyntaxSeparators(styleKey: StyleKey, syntaxParsed: StyleSyntaxParsed): StyleSyntaxSeparators {
	// if (syntaxSeparatorsCache.has(styleKey)) return syntaxSeparatorsCache.get(styleKey)!;

	const result = extractSeparators(syntaxParsed);
	
	// syntaxSeparatorsCache.set(styleKey, result);
	return result;
}
