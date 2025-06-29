import { canCamelCase } from '@/utilities/string/validation';

/**
 * Splits a string by one or more separators at the top level (not inside brackets or quotes).
 * Handles (), [], <>, {}, and "" as grouping symbols.
 * @param s - The string to split
 * @param seps - The separator string or array of separator strings
 * @returns Array of split strings
 * @example
 * splitAdvanced('a [b|c] d|e', ['|', ' ']); // ['a', '[b|c]', 'd', 'e']
 * splitAdvanced('x(y z) a|b', [' ', '|']); // ['x(y z)', 'a', 'b']
 * splitAdvanced('a <b> c|d', ['|', ' ']); // ['a', '<b>', 'c', 'd']
 * splitAdvanced('foo "bar baz"|qux', ['|', ' ']); // ['foo', '"bar baz"', 'qux']
 */
function splitAdvanced(input: string, separators: string | string[]): string[] {
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
 * @param seps - The array of separators to use between values.
 * @returns A single string with values joined by their respective separators.
 * @example
 * joinAdvanced(['10px', 'auto'], [' ', '/']) → '10px auto'
 */
function joinAdvanced(inputs: string[], separators: string[]): string {
	if (!separators.length) return inputs.join(' ');
	let result = '';

	for (let i = 0; i < inputs.length; i++) {
		result += inputs[i];
		if (separators[i]) result += separators[i];
	}
	return result.trim();
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

export { splitAdvanced, clearSpaces, joinAdvanced };
