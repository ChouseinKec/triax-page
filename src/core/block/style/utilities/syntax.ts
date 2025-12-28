// Types
import type { StyleSyntax, StyleSyntaxParsed, StyleSyntaxSet, StyleSyntaxSeparators, TokenDefinitionRecord } from '@/src/core/block/style/types/';

// Utilities
import { expandTokens, parseSyntax, getTokenCanonical, extractSeparators } from '@/src/core/block/style/utilities';
import { splitAdvanced } from '@/src/shared/utilities/string';
import { getColumnSets } from '@/src/shared/utilities/array';

export function getSyntaxSet(syntaxParsed: StyleSyntaxParsed): StyleSyntaxSet {
	const tokens = syntaxParsed.map((variation) => splitAdvanced(variation));
	const columnArrays = getColumnSets(tokens);

	return columnArrays.map((col) => new Set(col));
}

export function getSyntaxParsed(syntaxRaw: StyleSyntax, registeredTokens: TokenDefinitionRecord): StyleSyntaxParsed {
	const expanded = expandTokens(syntaxRaw, registeredTokens);
	return parseSyntax(expanded);
}

export function getSyntaxNormalized(syntaxParsed: StyleSyntaxParsed): StyleSyntaxParsed {
	return syntaxParsed.map((variation) =>
		splitAdvanced(variation)
			.map((token) => getTokenCanonical(token))
			.join(' ')
	);
}

export function getSyntaxSeparators(syntaxParsed: StyleSyntaxParsed): StyleSyntaxSeparators {
	return extractSeparators(syntaxParsed);
}
