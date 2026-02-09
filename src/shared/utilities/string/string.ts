type SymbolType = '()' | '[]' | '{}' | '<>';

/**
 * Joins an array of values with their corresponding separators.
 * If no separators are provided, joins with a single space.
 * @param inputs - The array of values to join.
 * @param separators - The array of separators to use between values.(Defaults to a single space if empty)
 */
export function joinAdvanced(inputs: string[], separators: string[]): string {
	if (!separators.length) return inputs.join(' ');
	let result = '';

	for (let i = 0; i < inputs.length; i++) {
		result += inputs[i];
		if (separators[i]) result += separators[i];
	}
	return result.trim();
}

/**
 * Extracts the first substring between paired symbols at the topmost level.
 * Returns the content between the first pair of symbols found.
 *
 * @param input - The input string to search within.
 * @param symbol - The paired symbol type: 'parenthesis', 'bracket', 'brace', or 'angle'
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
