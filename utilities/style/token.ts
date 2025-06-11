// Type
import { CSSTokenGroups } from '@/types/style/token';

/**
 * Checks if the input string is a valid CSS data keyword (e.g., 'auto', 'fit-content').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data keyword, false otherwise.
 * @example
 * isTokenKeyword('auto') → true
 * isTokenKeyword('fit-content') → true
 * isTokenKeyword('10px') → false
 */
function isTokenKeyword(input: string): boolean {
	return /^[a-zA-Z-]+$/.test(input);
}

/**
 * Checks if a value is a CSS dimension (e.g., <length>, <percentage>).
 * @param input - The string to check.
 * @returns True if the input is a valid dimension format, false otherwise.
 * @example
 * isTokenDimension('<length>') → true
 * isTokenDimension('<percentage>') → true
 * isTokenDimension('10px') → false
 * isTokenDimension('fit-content(10px)') → false
 */
function isTokenDimension(input: string): boolean {
	const canonical = getTokenCanonical(input);
	if (!canonical) return false;

	if (['<length>', '<percentage>', '<angle>', '<flex>'].includes(canonical)) {
		return true;
	}

	return false;
}

/**
 * Checks if the input string i a valid CSS data number (e.g., '<number>', '<integer>').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data number, false otherwise.
 * @example
 * isTokenNumber('<number>') → true
 * isTokenNumber('<integer>') → true
 * isTokenNumber('10') → false
 * isTokenNumber('10px') → false
 * isTokenNumber('auto') → false
 */
function isTokenNumber(input: string): boolean {
	const canonical = getTokenCanonical(input);

	if (canonical === '<number>' || canonical === '<integer>') return true;

	return false;
}

/**
 * Checks if the input string is a valid CSS data function (e.g., 'fit-content(10px)', 'calc(100% - 20px)').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data function, false otherwise.
 * @example
 * isTokenFunction('fit-content(10px)') → true
 * isTokenFunction('calc(100% - 20px)') → true
 * isTokenFunction('10px') → false
 */
function isTokenFunction(input: string): boolean {
	const fnMatch = input.match(/^([a-zA-Z-]+)\((.*)\)$/);
	if (fnMatch) {
		const functionName = fnMatch[1];
		// Check if the function name is a valid CSS function
		return /^[a-zA-Z-]+$/.test(functionName);
	}
	return false;
}

/**
 * Determines the group of a CSS data token based on its format.
 * @param input - The CSS data token string (e.g., 'auto', '<length>', 'fit-content(10px)', '10').
 * @returns The group of the token as a string ('keyword', 'dimension', 'function', 'number') or undefined if not recognized.
 * @example
 * getTokenType('auto') → 'keyword'
 * getTokenType('<length>') → 'dimension'
 * getTokenType('fit-content(10px)') → 'function'
 * getTokenType('10') → 'number'
 */
function getTokenType(input: string): CSSTokenGroups | undefined {
	if (isTokenKeyword(input)) return 'keyword';
	if (isTokenDimension(input)) return 'dimension';
	if (isTokenFunction(input)) return 'function';
	if (isTokenNumber(input)) return 'number';
	return undefined;
}

/**
 * Extracts the canonical type string from a CSS data type string.
 * @param input - The CSS data type string (e.g., 'fit-content(10px)', '<length [0,10]>').
 * @returns The canonical type string (e.g., 'fit-content()', '<length>') or undefined if not recognized.
 * @example
 * getTokenCanonical('fit-content(<length> <percentage>)') → 'fit-content()'
 * getTokenCanonical('<length [0,10]>') → '<length>'
 * getTokenCanonical('auto') → 'auto'
 * getTokenCanonical('10px') → undefined
 * getTokenCanonical('10') → undefined
 */
function getTokenCanonical(input: string): string | undefined {
	if (!input) return undefined;

	// Function: e.g. fit-content(<length [10,20]>)
	const fnMatch = input.match(/^([a-zA-Z-]+)\((.*)\)$/);
	if (fnMatch) return `${fnMatch[1]}()`;

	// Dimension: e.g. <length [0,10]>
	const dimMatch = input.match(/^<([a-zA-Z0-9-]+)(\s*\[[^\]]+\])?>$/);
	if (dimMatch) return `<${dimMatch[1]}>`;

	// Keyword: e.g. auto
	if (/^[a-zA-Z-]+$/.test(input)) return input;
	return undefined;
}

/**
 * Extracts the base token from a CSS data type string, removing any range or step part.
 * @param input - The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
 * @returns The base token string (e.g., 'length', 'fit-content') or undefined if not recognized.
 * @example
 * getTokenBase('<length [0,10]>') → 'length'
 * getTokenBase('fit-content(<length> <percentage>)') → 'fit-content'
 * getTokenBase('auto') → 'auto'
 *
 */
function getTokenBase(input: string): string | undefined {
	const canonical = getTokenCanonical(input);
	if (!canonical) return undefined;

	return canonical
		.replace(/<|>/g, '') // Remove < and >
		.replace(/\(\)/g, ''); // Remove ()
}

/**
 * Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.
 * @param input - The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
 * @returns An object with the extracted arguments (e.g., { min: '0', max: '10', step: '1' } or { args: '<length> <percentage>' }) or undefined if not recognized.
 * @example
 * getTokenParam('<length [0,10]>') → { min: 0, max: 10 }
 * getTokenParam('fit-content(<length> <percentage>)') → { syntax: '<length> <percentage>' }
 * getTokenParam('<number [0,15]>') → { min: 0, max: 15 }
 *
 */
function getTokenParam(input: string): Record<string, any> | undefined {
	// Determine the token group/type
	const group = getTokenType(input);

	switch (group) {
		case 'function': {
			// Extract function arguments inside the parentheses
			const fnMatch = input.match(/^([a-zA-Z-]+)\((.*)\)$/);
			if (fnMatch) {
				const param = fnMatch[2].trim();
				if (param) {
					return { syntax: param };
				}
			}
			return undefined;
		}
		case 'dimension':
		case 'number': {
			// Extract range/step from dimension or number tokens
			const dimMatch = input.match(/^<([a-zA-Z0-9-]+)(\s*\[([^\]]+)\])?>$/);
			if (dimMatch?.[3]) {
				const range = dimMatch[3].split(',').map((s: string) => s.trim());
				if (range.length >= 2) {
					// If both min and max are present, normalize them
					return {
						min: normalizeRange(range[0]),
						max: normalizeRange(range[1]),
					};
				}
			}
			return undefined;
		}
		// For keywords and unrecognized types, return undefined
		default:
			return undefined;
	}
}

/**
 * Normalizes a range value from a string to a number.
 * @param value - The range value as a string (e.g., '10', '∞', '-∞').
 * @returns The normalized number or undefined if the value is not valid.
 * @example
 * normalizeRange('10') → 10
 * normalizeRange('∞') → Infinity
 * normalizeRange('-∞') → -Infinity
 * normalizeRange('abc') → undefined
 */
function normalizeRange(value: string | undefined): number | undefined {
	if (value === undefined) return undefined;
	if (value === '∞') return Infinity;
	if (value === '-∞') return -Infinity;
	if (!isNaN(Number(value))) return Number(value);
	return undefined;
}

export { getTokenBase, getTokenCanonical, getTokenParam, getTokenType, isTokenDimension };
