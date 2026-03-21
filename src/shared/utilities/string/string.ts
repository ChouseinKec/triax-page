type SymbolType = '()' | '[]' | '{}' | '<>';

/**
 * Finds the first matching pair of opening/closing characters (nested-aware).
 * Returns indices and the inner content and the trailing text after the closing char.
 *
 * @param input - The input string to search
 * @param openChar - Opening character (e.g. '[')
 * @param closeChar - Closing character (e.g. ']')
 */
export function findMatchingPair(input: string, openChar = '[', closeChar = ']') {
	let depth = 0;
	let openIndex = -1;
	for (let i = 0; i < input.length; i++) {
		const ch = input[i];
		if (ch === openChar) {
			if (openIndex === -1) openIndex = i;
			depth++;
		} else if (ch === closeChar) {
			depth--;
			if (depth === 0 && openIndex !== -1) {
				const closeIndex = i;
				return {
					openIndex,
					closeIndex,
					inner: input.slice(openIndex + 1, closeIndex),
					after: input.slice(closeIndex + 1),
				};
			}
		}
	}
	return null;
}

/**
 * Extracts the first substring between paired symbols at the topmost level.
 * Returns the content between the first pair of symbols found.
 *
 * @param input - The input string to search within.
 * @param symbol - The paired symbol type: '()' | '[]' | '{}' | '<>'.
 */
export function extractBetween(input: string, symbol: SymbolType): string | undefined {
	// Map symbols to their opening and closing characters
	const symbolMap: Record<string, { open: string; close: string }> = {
		'()': { open: '(', close: ')' },
		'[]': { open: '[', close: ']' },
		'{}': { open: '{', close: '}' },
		'<>': { open: '<', close: '>' },
	};

	const symbolInfo = symbolMap[symbol];
	const { open, close } = symbolInfo;

	// Track nesting depth: 0 = outside all symbols, 1+ = inside nested symbols
	let depth = 0;
	// Remember where the first (outermost) opening symbol content starts
	let startIndex = -1;

	for (let i = 0; i < input.length; i++) {
		const char = input[i];

		if (char === open) {
			// When we find an opening symbol
			if (depth === 0) {
				// This is the first opening symbol (topmost level)
				// Record where content starts (after this opening symbol)
				startIndex = i + 1;
			}
			// Increase depth for any opening symbol (nested or not)
			depth++;
		} else if (char === close) {
			// When we find a closing symbol
			// Decrease depth first
			depth--;

			// If depth is back to 0, we found the matching closing symbol
			// for our first opening symbol (the topmost level pair)
			if (depth === 0 && startIndex !== -1) {
				// Extract everything between startIndex and current position
				return input.slice(startIndex, i);
			}
		}
	}

	return undefined; // No matching symbol pair found
}

/**
 * Inserts a string between the first pair of specified symbols in the input string.
 * If no matching pair is found, returns the original string unchanged.
 *
 * @param input - The input string to modify.
 * @param symbol - The paired symbol type: '()' | '[]' | '{}' | '<>'.
 * @param text - The string to insert between the symbols.
 */
export function insertBetween(input: string, symbol: SymbolType, text: string): string {
	const symbolMap: Record<string, { open: string; close: string }> = {
		'()': { open: '(', close: ')' },
		'[]': { open: '[', close: ']' },
		'{}': { open: '{', close: '}' },
		'<>': { open: '<', close: '>' },
	};

	const { open, close } = symbolMap[symbol];
	const match = findMatchingPair(input, open, close);

	if (match === null) return input;

	return input.slice(0, match.openIndex + 1) + text + input.slice(match.closeIndex);
}

export function extractBefore(input: string, delimiter: string): string | undefined {
	const index = input.indexOf(delimiter);
	if (index === -1) return undefined; // Delimiter not found, return undefined

	return input.slice(0, index);
}

/**
 * Converts a given string to kebab-case.
 * Replaces spaces and underscores with hyphens, and converts to lowercase.
 *
 * @param input - The input string to convert.
 */
export function toKebabCase(input: string): string {
	return input
		.replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen between lowercase and uppercase letters
		.replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
		.toLowerCase(); // Convert the entire string to lowercase
}
