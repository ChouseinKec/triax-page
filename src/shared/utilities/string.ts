type symbolType = '()' | '[]' | '{}' | '<>';

/**
 * Splits a string by one or more separators at the top level (not inside brackets or quotes).
 * Handles (), [], <>, {}, and "" as grouping symbols.
 * @param s - The string to split
 * @param seps - The separator string or array of separator strings
 * @returns Array of split strings
 * @example
 * splitAdvanced('a [b|c] d|e', ['|', ' ']); → ['a', '[b|c]', 'd', 'e']
 * splitAdvanced('x(y z) a|b', [' ', '|']); → ['x(y z)', 'a', 'b']
 * splitAdvanced('a <b> c|d', ['|', ' ']); → ['a', '<b>', 'c', 'd']
 * splitAdvanced('foo "bar baz"|qux', ['|', ' ']); → ['foo', '"bar baz"', 'qux']
 */
export function splitAdvanced(input: string, separators: string | string[]): string[] {
	// Normalize separators to an array
	const seps = Array.isArray(separators) ? separators : [separators];
	// Result array to hold split parts
	const result: string[] = [];
	// Depth counters for each bracket type
	let depthSquare = 0;
	let depthRound = 0;
	let depthAngle = 0;
	let depthCurly = 0;
	let inQuotes = false;

	// Buffer to accumulate characters for the current segment
	let buf = '';
	// Iterate over each character in the input string
	for (let i = 0; i < input.length; i++) {
		const c = input[i];
		// Update depth counters based on bracket type
		if (inQuotes) {
			if (c === '"') inQuotes = false;
		} else {
			if (c === '[') depthSquare++;
			if (c === ']') depthSquare--;
			if (c === '(') depthRound++;
			if (c === ')') depthRound--;
			if (c === '<') depthAngle++;
			if (c === '>') depthAngle--;
			if (c === '{') depthCurly++;
			if (c === '}') depthCurly--;
			if (c === '"') inQuotes = true;
		}
		// Only consider splitting if not inside any brackets
		let matchedSep = null;
		if (depthSquare === 0 && depthRound === 0 && depthAngle === 0 && depthCurly === 0 && !inQuotes) {
			// Check if any separator matches at the current position
			for (const sep of seps) {
				if (sep && input.slice(i, i + sep.length) === sep) {
					matchedSep = sep;
					break;
				}
			}
		}
		if (matchedSep) {
			// If a separator is matched, push the current buffer (trimmed) to result
			if (buf.trim()) result.push(buf.trim());
			buf = '';
			// Skip the length of the matched separator
			i += matchedSep.length - 1;
		} else {
			// Otherwise, add the character to the buffer
			buf += c;
		}
	}

	// After the loop, push any remaining buffer (trimmed) to result
	if (buf.trim()) result.push(buf.trim());
	return result;
}

/**
 * Joins an array of values with their corresponding separators.
 * If no separators are provided, joins with a single space.
 * @param vals - The array of values to join.
 * @param seps - The array of separators to use between values.(Defaults to a single space if empty)
 * @returns A single string with values joined by their respective separators.
 * @example
 * joinAdvanced(['10px', 'auto'], [' ', '/']) → '10px auto'
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
 * @returns The first extracted string between the symbols, or empty string if none found.
 *
 * @example
 * extractBetween('text (content1) more (content2) end', 'parenthesis'); → Returns 'content1'
 * extractBetween('outer (inner (nested) content) more', 'parenthesis'); → Returns 'inner (nested) content'
 * extractBetween('data [array1] text [array2]', 'bracket'); → Returns 'array1'
 */
export function extractBetween(input: string, symbol: symbolType): string | undefined {
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

export function toKebabCase(input: string): string {
	return input
		.replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen between lowercase and uppercase letters
		.replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
		.toLowerCase(); // Convert the entire string to lowercase
}
