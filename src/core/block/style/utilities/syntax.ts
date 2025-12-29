// Types
import type { StyleSyntaxRaw, StyleSyntaxParsed, StyleSyntaxSet, StyleSyntaxSeparators, TokenDefinitionRecord, TokenTypeDefinitionRecord } from '@/src/core/block/style/types/';

// Utilities
import { expandTokens, parseSyntax, getTokenCanonical, extractSeparators } from '@/src/core/block/style/utilities';
import { splitAdvanced } from '@/src/shared/utilities/string';
import { getColumnSets } from '@/src/shared/utilities/array';

export function getSyntaxSet(syntaxParsed: StyleSyntaxParsed): StyleSyntaxSet {
	const tokens = syntaxParsed.map((variation) => splitAdvanced(variation));
	const columnArrays = getColumnSets(tokens);

	return columnArrays.map((col) => new Set(col));
}

export function getSyntaxParsed(syntaxRaw: StyleSyntaxRaw, tokenDefinitions: TokenDefinitionRecord, tokenTypeDefinitions: TokenTypeDefinitionRecord): StyleSyntaxParsed {
	const expanded = expandTokens(syntaxRaw, tokenDefinitions, tokenTypeDefinitions);
	// console.log(syntaxRaw,' ------------------- ',expanded);
	return parseSyntax(expanded);
}

export function getSyntaxNormalized(syntaxParsed: StyleSyntaxParsed, tokenTypeDefinitions: TokenTypeDefinitionRecord): StyleSyntaxParsed {
	return syntaxParsed.map((variation) =>
		splitAdvanced(variation)
			.map((token) => getTokenCanonical(token, tokenTypeDefinitions))
			.join(' ')
	);
}

export function getSyntaxSeparators(syntaxParsed: StyleSyntaxParsed): StyleSyntaxSeparators {
	return extractSeparators(syntaxParsed);
}
