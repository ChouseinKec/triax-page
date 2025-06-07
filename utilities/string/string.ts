import { canCamelCase } from '@/utilities/string/validation';

/**
 * Splits a string by one or more separators at the top level (not inside brackets).
 * Handles (), [], and <> as grouping symbols.
 * Example: splitTopLevel('a [b|c] d|e', ['|', ' ']) → ['a', '[b|c]', 'd', 'e']
 * @param s - The string to split
 * @param seps - The separator string or array of separator strings
 * @returns Array of split strings
 */
function splitTopLevel(s: string, seps: string | string[]): string[] {
	const separators = Array.isArray(seps) ? seps : [seps];
	const result: string[] = [];
	let depthSquare = 0;
	let depthRound = 0;
	let depthAngle = 0;
	let buf = '';
	for (let i = 0; i < s.length; i++) {
		const c = s[i];
		if (c === '[') depthSquare++;
		if (c === ']') depthSquare--;
		if (c === '(') depthRound++;
		if (c === ')') depthRound--;
		if (c === '<') depthAngle++;
		if (c === '>') depthAngle--;
		// Only split if not inside any brackets and matches any separator
		let matchedSep = null;
		if (depthSquare === 0 && depthRound === 0 && depthAngle === 0) {
			for (const sep of separators) {
				if (sep && s.slice(i, i + sep.length) === sep) {
					matchedSep = sep;
					break;
				}
			}
		}
		if (matchedSep) {
			if (buf.trim()) result.push(buf.trim());
			buf = '';
			i += matchedSep.length - 1;
		} else {
			buf += c;
		}
	}
	if (buf.trim()) result.push(buf.trim());
	return result;
}

/**
 * Extracts the first substring between specified start and end delimiters, supporting nested structures.
 *
 * @param input - The string to search within.
 * @param startSymbol - The starting delimiter (e.g., '(', '[', '{').
 * @param endSymbol - The ending delimiter (e.g., ')', ']', '}').
 * @returns The extracted substring, or null if delimiters are not found, unbalanced, or invalid.
 *
 * @example
 * extractBetween('hello(world)', '(', ')'); // 'world'
 * extractBetween('data[value[5]]', '[', ']'); // 'value[5]'
 * extractBetween('var(--primary-color)', '(', ')'); // '--primary-color'
 * extractBetween('no delimiters', '[', ']'); // null
 * extractBetween('nested((a))', '(', ')'); // '(a)'
 * extractBetween('', '{', '}'); // null
 * extractBetween('same[]', '[', '['); // null (invalid delimiters)
 */
function extractBetween(input: string, startSymbol: string, endSymbol: string): string | null {
	// Validate input and delimiters
	if (!input || typeof input !== 'string' || startSymbol.length !== 1 || endSymbol.length !== 1 || startSymbol === endSymbol) {
		return null;
	}
	const startIndex = input.indexOf(startSymbol);
	if (startIndex === -1) return null;

	let depth = 1;
	// Use a for loop for efficiency and clarity
	for (let i = startIndex + 1; i < input.length; i++) {
		const char = input[i];
		if (char === startSymbol) {
			depth++;
		} else if (char === endSymbol) {
			depth--;
			if (depth === 0) {
				// Return substring between the first matching pair (including nested)
				return input.slice(startIndex + 1, i);
			}
		}
	}
	// If we reach here, delimiters were unbalanced
	return null;
}

/**
 * Removes all whitespace characters (spaces, tabs, newlines) from a string.
 *
 * @param input - String to process.
 * @returns String with all whitespace removed.
 *
 * @example
 * clearSpaces('  hello  world  '); // "helloworld"
 * clearSpaces('a b c d e');        // "abcde"
 * clearSpaces('hello\tworld');     // "helloworld"
 * clearSpaces('');                 // ""
 */
function clearSpaces(input: string): string {
	return input.replace(/\s+/g, '');
}

/**
 * Converts a string to camelCase if possible.
 * If not, returns the original string.
 *
 * @param input - String to convert.
 * @returns CamelCased string or original.
 *
 * @example
 * toCamelCase("background-color"); // "backgroundColor"
 * toCamelCase("font size");        // "fontSize"
 * toCamelCase("backgroundColor");  // "backgroundColor"
 * toCamelCase("");                 // ""
 */
function toCamelCase(input: string): string {
	if (!canCamelCase(input)) {
		return input;
	}

	const trimmedInput = input.trim();
	const _input = trimmedInput.replace(/[!@#$%^&*\- ]+(.)/g, (_, char) => char.toUpperCase()).replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase());
	return _input;
}

export { splitTopLevel, extractBetween, clearSpaces, toCamelCase };
