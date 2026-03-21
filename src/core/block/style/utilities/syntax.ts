/**
 * Normalizes a CSS Value Definition Syntax string to canonical form.
 *
 * Applies consistent formatting rules to ensure equivalent syntaxes are represented identically.
 * This includes space normalization, multiplier deduplication, and operator formatting.\n *
 * Normalization order:
 * 1. Trim and collapse multiple spaces to single spaces
 * 2. Remove spaces before multipliers (?, +, *, #)
 * 3. Remove spaces before explicit ranges {m,n}
 * 4. Normalize spaces around || operator (space before and after)
 * 5. Normalize spaces around | operator (space before and after)
 * 6. Normalize spaces around && operator (space before and after)
 * 7. Remove spaces around , separator
 * 8. Remove spaces around / separator
 * 9. Remove spaces after [ and before ]
 * 10. Remove spaces after ( and before )
 * 11. Remove spaces inside type tokens (<...>)
 *
 * @param syntax - The CSS Value Definition Syntax string to normalize
 * @returns The normalized syntax string in canonical form
 * @example
 * normalizeSyntax('  <color>  +  ||  inherit  ')  // '<color>+ || inherit'
 * normalizeSyntax('red|blue|green')  // 'red | blue | green'
 * normalizeSyntax('<length>  ,  <length>')  // '<length>,<length>'
 * normalizeSyntax('< color >')  // '<color>'
 */
export function normalizeSyntax(syntax: string): string {
	let normalized = syntax.trim();

	// 1. Collapse multiple spaces to single space
	normalized = normalized.replace(/\s+/g, ' ');

	// 2. Remove spaces before multipliers (?, +, *, #)
	normalized = normalized.replace(/\s+([?+*#])/g, '$1');

	// 3. Remove spaces before explicit ranges {m,n}
	normalized = normalized.replace(/\s+(\{[\d,]+\})/g, '$1');

	// 4. Normalize || operator - ensure single space before and after
	normalized = normalized.replace(/\s*\|\|\s*/g, ' || ');

	// 5. Normalize | operator (but not ||) - ensure single space before and after
	// Use negative lookahead/lookbehind to avoid matching ||
	normalized = normalized.replace(/(?<!\|)\s*\|\s*(?!\|)/g, ' | ');

	// 6. Normalize && operator - ensure single space before and after
	normalized = normalized.replace(/\s*&&\s*/g, ' && ');

	// 7. Remove spaces around comma separator
	normalized = normalized.replace(/\s*,\s*/g, ',');

	// 8. Remove spaces around slash separator — only when there is content on BOTH sides
	// A leading slash like '[ / <x>' must NOT have its space stripped; the '/' after '[' is a literal token.
	// Use a lookbehind that excludes '[' (bracket) and whitespace as valid left context.
	normalized = normalized.replace(/(?<=[^\[\s])\s*\/\s*(?=\S)/g, '/');

	// 9. Remove spaces after [ and before ]
	// EXCEPT if they are quoted (as literal tokens)
	normalized = normalized.replace(/(?<!['"])\[\s+/g, '[').replace(/\s+\](?!['"])/g, ']');

	// 10. Remove spaces after ( and before )
	normalized = normalized.replace(/(?<!['"])\(\s+/g, '(').replace(/\s+\)(?!['"])/g, ')');

	// 11. Remove spaces inside type tokens and brackets within them
	// Match patterns like <color>, <length[percentage]>, etc.
	// Also remove [xxxx] inside <...>
	return normalized.replace(/<\s*([^>]+?)\s*>/g, (match, content) => {
		// Remove all spaces within the angle brackets
		const cleaned = content.replace(/\s+/g, '');
		return `<${cleaned}>`;
	});
}
