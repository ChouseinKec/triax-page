// Types
import type { StyleSyntax, StyleSyntaxParsed, StyleSyntaxSet, StyleSyntaxSeparators } from '@/src/core/block/style/types/';

// Constants
import { DEFAULT_VALUE_SEPARATORS } from '@/src/core/block/style/constants/';

// Utilities
import { expandTokens, parseSyntax, getTokenCanonical, extractSeparators } from '@/src/core/block/style/utilities';
import { splitAdvanced } from '@/src/shared/utilities/string';
import { getColumnSets } from '@/src/shared/utilities/array';

export function getSyntaxSet(parsedSyntax: StyleSyntaxParsed): StyleSyntaxSet {
	const tokens = parsedSyntax.map((variation) => splitAdvanced(variation, DEFAULT_VALUE_SEPARATORS));
	const columnArrays = getColumnSets(tokens);

	return columnArrays.map((col) => new Set(col));
}

export function getSyntaxExpanded(syntax: StyleSyntax): StyleSyntax {
	return expandTokens(syntax);
}

export function getSyntaxParsed(syntax: StyleSyntax): StyleSyntaxParsed {
	const expanded = getSyntaxExpanded(syntax);
	return parseSyntax(expanded);
}

export function getSyntaxNormalized(syntax: StyleSyntax): StyleSyntaxParsed {
	const parsed = getSyntaxParsed(syntax);

	return parsed.map((variation) =>
		splitAdvanced(variation, DEFAULT_VALUE_SEPARATORS)
			.map((token) => getTokenCanonical(token))
			.join(' ')
	);
}

export function getSyntaxSeparators(syntax: StyleSyntax): StyleSyntaxSeparators {
	const parsed = getSyntaxParsed(syntax);
	return extractSeparators(parsed);
}
