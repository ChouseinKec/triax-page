/**
 * Extracts the function name from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 * @returns The function name (e.g., 'fit-content', 'repeat') or undefined if not a valid function call.
 * @example
 * extractFunctionName('fit-content(100px)') → 'fit-content'
 * extractFunctionName('repeat(1,100px)') → 'repeat'
*/
function extractFunctionName(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\(/);
	return match ? match[1] : undefined;
}

/**
 * Extracts the function value (the content inside parentheses) from a CSS function string.
 * @param input - The CSS function string (e.g., 'fit-content(100px)', 'repeat(1,100px)').
 * @returns The function value (e.g., '100px', '1,100px') or undefined if not a valid function call.
 * @example
 * extractFunctionValue('fit-content(100px)') → '100px'
 * extractFunctionValue('repeat(1,100px)') → '1,100px'
 */
function extractFunctionValue(input: string): string | undefined {
	const match = input.match(/^([a-zA-Z0-9\-]+)\s*\((.*)\)$/);
	return match ? match[2] : undefined;
}


export {
    extractFunctionName,
    extractFunctionValue
}