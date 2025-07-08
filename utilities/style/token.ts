// Type
import type { CSSTokenGroups } from '@/types/style/token';

// Constants
import { CSSTokenDefaults } from '@/constants/style/token';

// Utilities
import { extractBetween } from '@/utilities/string/string';

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
	const canonical = getTokenCanonical(input);
	if (!canonical) return false;
	return /^[a-zA-Z-]+$/.test(canonical);
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

	if (['<length>', '<percentage>', '<angle>', '<flex>'].includes(canonical)) return true;

	return false;
}

/**
 * Checks if the input string is a valid CSS data integer (e.g., '<integer>').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data integer, false otherwise.
 * @example
 * isTokenInteger('<integer>') → true
 * isTokenInteger('<number>') → false
 */
function isTokenInteger(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<integer>';
}

/**
 * Checks if the input string is a valid CSS data number (e.g., '<number>').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data number, false otherwise.
 * @example
 * isTokenNumber('<number>') → true
 * isTokenNumber('<integer>') → false
 */
function isTokenNumber(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<number>';
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
	const canonical = getTokenCanonical(input);
	if (!canonical) return false;

	// Check if the input is a function format
	return /^([a-zA-Z0-9-]+)\((.*)\)$/.test(canonical);
}

/**
 * Checks if the input string is a valid CSS data color (e.g., '<color>').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data color, false otherwise.
 * @example
 * isTokenColor('<color>') → true
 * isTokenColor('rgb(255, 0, 0)') → false
 */
function isTokenColor(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<color>';
}

/**
 * Checks if the input string is a valid CSS data link (e.g., '<link>').
 * @param input - The string to check.
 * @returns True if the input is a valid CSS data link, false otherwise.
 * @example
 * isTokenLink('<link>') → true
 * isTokenLink('https://example.com/image.png') → false
 */
function isTokenLink(input: string): boolean {
	const canonical = getTokenCanonical(input);
	return canonical === '<link>';
}

/**
 * Determines the group of a CSS data token based on its format.
 * @param input - The CSS data token string (e.g., 'auto', '<length>', 'fit-content(10px)', '10').
 * @returns The group of the token as a string ('keyword', 'dimension', 'function', 'integer', 'number') or undefined if not recognized.
 * @example
 * getTokenType('auto') → 'keyword'
 * getTokenType('<length>') → 'dimension'
 * getTokenType('fit-content(10px)') → 'function'
 * getTokenType('<integer>') → 'integer'
 * getTokenType('<number>') → 'number'
 * getTokenType('<link>') → 'link'
 */
function getTokenType(input: string): CSSTokenGroups | undefined {
	if (isTokenKeyword(input)) return 'keyword';
	if (isTokenDimension(input)) return 'dimension';
	if (isTokenColor(input)) return 'color';
	if (isTokenFunction(input)) return 'function';
	if (isTokenInteger(input)) return 'integer';
	if (isTokenNumber(input)) return 'number';
	if (isTokenLink(input)) return 'link';
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
	const fnMatch = input.match(/^([a-zA-Z0-9-]+)\((.*)\)$/);
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
 * Extracts the range part from a CSS data type string, if present.
 * @param input - The CSS data type string (e.g., '<length [0,10]>').
 * @returns The range string (e.g., '[0,10]') or undefined if not present.
 * @example
 * getTokenRange('<length [0,10]>') → '[0,10]'
 * getTokenRange('fit-content(<length> <percentage>)') → undefined
 */
function getTokenRange(input: string): string | undefined {
	const range = extractBetween(input, '[]');
	return range ? `[${range}]` : undefined;
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
	const group = getTokenType(input);

	switch (group) {
		case 'function': {
			const param = extractBetween(input, '()');
			return param ? { syntax: param } : undefined;
		}
		case 'dimension':
		case 'number':
		case 'integer': {
			// Extract range/step from dimension or number tokens
			const range = getTokenRange(input);
			if (range) {
				const rangeValues = range.replace(/[\[\]]/g, '').split(',');
				if (rangeValues.length === 2) {
					return { min: parseFloat(rangeValues[0]), max: parseFloat(rangeValues[1]) };
				}
			}
			return undefined;
		}

		default:
			return undefined;
	}
}

/**
 * Converts a single token (e.g., <length>, <color>) to its default value.
 * @param token - The token string (without brackets or with brackets)
 * @returns The default value for the token, or the token itself if not found
 * @example
 * getTokenValue('<length>') → '0px'
 * getTokenValue('<color>') → '#ffffff'
 * getTokenValue('<angle>') → '0deg'
 * getTokenValue('<percentage>') → '0%'
 * getTokenValue('<number>') → '0.0'
 */
function getTokenValue(token: string): string | undefined {
	if (isTokenKeyword(token)) return token;

	const tokenCanonical = getTokenCanonical(token);
	if (!tokenCanonical) return undefined;

	const tokenValue = CSSTokenDefaults[tokenCanonical];
	return tokenValue ? tokenValue : undefined;
}

/**
 * Converts an array of tokens to their default values.
 * @param tokens - An array of token strings (e.g., ['<length>', '<color>', '<angle>'])
 * @returns An array of default values for the tokens, filtering out any undefined values
 * @example
 * getTokenValues(['<length>', '<color>', '<angle>']) → ['0px', '#ffffff', '0deg']
 */
function getTokenValues(tokens: string[]): string[] {
	return tokens.map(getTokenValue).filter((token): token is string => token !== undefined);
}

// Export the new helpers
export { getTokenValue, getTokenValues, getTokenType, getTokenCanonical, getTokenBase, getTokenRange, getTokenParam };
