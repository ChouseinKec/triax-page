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
 * getTokenGroup('auto') → 'keyword'
 * getTokenGroup('<length>') → 'dimension'
 * getTokenGroup('fit-content(10px)') → 'function'
 * getTokenGroup('10') → 'number'
 */
function getTokenGroup(input: string): CSSTokenGroups | undefined {
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
 * getTokenCanonical('fit-content(10px)') → 'fit-content()'
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
 * Extracts the type arguments (e.g. range, min/max, step) from a CSS data type string.
 * @param input - The CSS data type string (e.g., '<length [0,10]>', 'fit-content(<length> <percentage>)').
 * @returns An object with the extracted arguments (e.g., { min: '0', max: '10', step: '1' } or { param: '<length> <percentage>' }) or undefined if not recognized.
 * @example
 * getTokenParam('<length [0,10,1]>') → { min: '0', max: '10', step: '1' }
 * getTokenParam('<percentage [0,100]>') → { min: '0', max: '100' }
 * getTokenParam('auto') → undefined
 * getTokenParam('<angle>') → undefined
 * getTokenParam('fit-content(<length> <percentage>)') → { param: '<length> <percentage>' }
 */
function getTokenParam(input: string): Record<string, any> | undefined {
	// Use getTokenGroup to determine the type
	const group = getTokenGroup(input);

	if (group === 'function') {
		// Extract function arguments
		const fnMatch = input.match(/^([a-zA-Z-]+)\((.*)\)$/);
		if (fnMatch) {
			const param = fnMatch[2].trim();
			if (param) {
				return { args: param };
			}
		}
		return undefined;
	}

	if (group === 'dimension' || group === 'number') {
		// Extract dimension range arguments
		const dimMatch = input.match(/^<([a-zA-Z0-9-]+)(\s*\[([^\]]+)\])?>$/);
		if (dimMatch?.[3]) {
			const range = dimMatch[3].split(',').map((s: string) => s.trim());
			if (range.length >= 2) {
				const param: Record<string, any> = { min: range[0], max: range[1] };
				if (range[2]) param.step = range[2];
				return param;
			} else if (range.length === 1) {
				return { range: dimMatch[3] };
			}
		}
	}
	return undefined;
}

export { getTokenParam, getTokenGroup, isTokenDimension };
