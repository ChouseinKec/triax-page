// Types
import { STYLE_VALUE } from '@/editors/style/constants/types';
import { OPTIONS_SELECT_OPTION } from '@/components/Select/Options/types';

// Utilities
import { isCamelCase, isLetters, isNumeric, extractBetween, isURL } from '@/utilities/string';
import { devLog } from '@/utilities/dev';

// Constants
import { STYLES_CONSTANTS, STYLES_CONSTANTS_KEY } from '@/editors/style/constants/styles';

import * as OPTIONS from '@/editors/style/constants/options';


/**
 * Extracts the numeric value from a string only if the string starts with a number,
 * and returns the first numeric occurrence.
 *
 * @param {string} input - The input string from which to extract the numeric value.
 *                          Example: "10px", "-10.5rem", "50%", "abc123".
 *
 * @returns {string} - The extracted numeric value as a string.
 *                     - If the input starts with a valid number, it returns the number.
 *                     - If the input is negative and starts with a number, it returns the negative number.
 *                     - If the input does not start with a number, it returns an empty string.
 *
 * @example
 * // Basic cases
 * extractNumber("10px");        // Returns "10"
 * extractNumber("-10.5rem");    // Returns "-10.5"
 * extractNumber("50%");         // Returns "50"
 * extractNumber("0.123abc");    // Returns "0.123"
 * 
 * // Non-numeric or invalid cases
 * extractNumber("abc123");      // Returns "" (does not start with a number)
 * extractNumber(" 10px");       // Returns "" (leading whitespace)
 * extractNumber("");            // Returns "" (empty string)
 * extractNumber("px10");        // Returns "" (number not at start)
 * extractNumber("--10px");      // Returns "" (invalid negative sign)
 * extractNumber("NaN");         // Returns "" (not a number)
 * 
 * // Edge cases with decimals and signs
 * extractNumber(".5px");        // Returns "" (must start with digit, not decimal)
 * extractNumber("-0.0001px");   // Returns "-0.0001"
 * extractNumber("+10px");       // Returns "" (does not handle '+' sign)
 * extractNumber("10.10.10px");  // Returns "10.10" (stops at second decimal)
 * 
 * // No suffix cases
 * extractNumber("123");         // Returns "123"
 * extractNumber("-456");        // Returns "-456"
 * 
 * // Multiple numbers (only first occurrence at start is considered)
 * extractNumber("10px20");      // Returns "10" (ignores trailing numbers)
 */
export function extractNumber(input: string): string {
    // Early return if input is falsy
    if (!input) { return ''; }

    // Check if the input is negative (minus sign only at the beginning)
    const isNegative = input.startsWith('-');

    // Remove the negative sign (if present) for easier processing
    const cleanedInput = isNegative ? input.slice(1) : input;

    // Match the numeric part of the string only if it starts with a number
    const match = cleanedInput.match(/^\d+(\.\d+)?/);

    // If no match is found or the match does not start at the beginning, return an empty string
    if (!match || match.index !== 0) { return ''; }

    // Extract the matched numeric part as a string
    const numericString = match[0];

    // Return the negative value as a string if the input was negative, otherwise return the positive value
    return isNegative ? `-${numericString}` : numericString;
}

/**
 * Extracts the first occurrence of valid lengths (alphabetic characters, '%', hyphenated words, and parentheses) from a string.
 *
 * @param {string} input - The input string from which to extract lengths.
 *                         Example: "10px", "20%", "max-content", "fit-content(10px)".
 *
 * @returns {string} - The extracted lengths as a string.
 *
 * @example
 * // Basic CSS lengths
 * extractLength("10px");                // Returns "px"
 * extractLength("20%");                 // Returns "%"
 * extractLength("-3.5rem");             // Returns "rem"
 * extractLength("0.5vh");               // Returns "vh"
 * extractLength("100vw");               // Returns "vw"
 * extractLength("10foo");               // Returns "foo"
 * extractLength("10ms");                // Returns "ms" 
 * extractLength("10deg");               // Returns "deg"
 * 
 * // Hyphenated lengths (CSS keywords)
 * extractLength("max-content");         // Returns "max-content"
 * extractLength("min-content");         // Returns "min-content"
 * extractLength("fit-content(10px)");   // Returns "fit-content()"
 * extractLength("repeat(2, 1fr)");      // Returns "repeat()"
 * 
 * // Parentheses handling
 * extractLength("calc(100% - 10px)");   // Returns "calc()"
 * extractLength("var(--padding)");      // Returns "var()"
 * extractLength("url(image.png)");      // Returns "url()"
 * 
 * // Edge cases
 * extractLength("vh10rem");             // Returns "vh" 
 * extractLength("10px-20rem");          // Returns "px" 
 * extractLength("10px20rem");           // Returns "px" 
 * extractLength("123");                 // Returns "" 
 * extractLength("");                    // Returns "" 
 * extractLength("  20em  ");            // Returns "em" (ignores whitespace)
 * extractLength(null);                  // Returns ""
 * extractLength(undefined);             // Returns ""
 */
export function extractLength(input: string): string {
    // Early return if input is falsy
    if (!input) { return ""; }

    // Use a regular expression to match the first occurrence of alphabetic characters, '%', hyphenated words, and parentheses
    const unitMatch = input.match(/[a-zA-Z%]+(?:-[a-zA-Z%]+)*(\(\))?/);

    // If a match is found, return the first occurrence
    if (unitMatch) {
        // Extract the matched length and include parentheses if they exist
        const length = unitMatch[0];
        // Check if the length includes parentheses
        if (input.includes("(") && input.includes(")")) {
            // Append "()" to the length if it has parentheses in the input
            return `${length}()`;
        }
        return length;
    }

    // If no lengths are found, return an empty string
    return "";
}

/**
 * Extracts the value from parentheses only when the entire string is a single function call,
 * otherwise returns the original string. Handles nested parentheses.
 * 
 * @param {string} input - The input string to process
 * @returns {string} - The extracted value if pattern matched, original string otherwise
 * 
 * @example
 * // Basic function calls
 * extractValue("repeat(1,10px)");          // Returns "1,10px"
 * extractValue("fit-content(10px)");      // Returns "10px"
 * extractValue("scaleZ(1)");              // Returns "1"
 * 
 * // Nested function calls
 * extractValue("minmax(min(0px,0px),0px)"); // Returns "min(0px,0px),0px"
 * extractValue("repeat(1,minmax(1px,min(0px,0px)))"); // Returns "1,minmax(1px,min(0px,0px))"
 * 
 * // Mathematical expressions
 * extractValue("calc(10px + 5px)");       // Returns "10px + 5px"
 * extractValue("clamp(1px, 2px, 3px)");  // Returns "1px, 2px, 3px"
 * 
 * // Non-function strings
 * extractValue("10px");                   // Returns "10px"
 * extractValue("no-parens");              // Returns "no-parens"
 * 
 * // Multiple function calls/complex strings
 * extractValue("10px 10px 10px rgba(1,1,1,1)"); // Returns original string
 * extractValue("var(--placeholder) 0px 0px rgba(0,0,0,0)"); // Returns original string
 * 
 * // Edge cases
 * extractValue("invalid(1,2");            // Returns original (unmatched parentheses)
 * extractValue("empty()");                // Returns "" (empty parentheses)
 * extractValue("(standalone)");           // Returns original (no function name)
 * extractValue("");                       // Returns ""
 * extractValue("   ");                    // Returns "   " (whitespace)
 * extractValue(null);                     // Returns null
 * extractValue(undefined);                // Returns undefined
 */
export function extractValue(input: string): string {
    if (!input) return input;

    // Only extract if the entire string is a single function call
    // (must start with function pattern and end with matching parenthesis)
    const functionMatch = input.match(/^([^\s(]+)\((.*)\)$/);
    if (!functionMatch) return input;

    // Verify parentheses are balanced in the content
    let balance = 0;
    for (const char of functionMatch[2]) {
        if (char === '(') balance++;
        if (char === ')') balance--;
        if (balance < 0) return input; // Unbalanced closing parenthesis
    }
    if (balance !== 0) return input; // Unbalanced opening parentheses

    return functionMatch[2];
}

/**
 * Extracts the outermost wrapper function name from a CSS-like string,
 * but only if the entire string is a single function call.
 * 
 * @param {string} input - The input string to process
 * @returns {string} - The wrapper name if fully wrapped by single function, else ""
 * 
 * @example
 * // Single function wrappers
 * extractFunction("var(--test)"); // "var"
 * extractFunction("rgba(0,0,0,0)"); // "rgba"
 * extractFunction("fit-content(10px)"); // "fit-content"
 * 
 * // Nested function wrappers
 * extractFunction("repeat(1,minmax(min(var(--placeholder),0px),0px))"); // "repeat"
 * extractFunction("calc(var(--x) + 10px)"); // "calc"
 * 
 * // Non-wrapped values
 * extractFunction("10px"); // ""
 * extractFunction("0px 0px 0px rgba(0,0,0,0)"); // ""
 * extractFunction("var(--test) var(--test)"); // ""
 * 
 * // Edge cases
 * extractFunction(""); // ""
 * extractFunction("   "); // ""
 * extractFunction("invalid(name"); // ""
 * extractFunction("name(valid)extra"); // ""
 * extractFunction("(standalone)"); // ""
 * extractFunction(null); // ""
 * extractFunction(undefined); // ""
 */
export function extractFunction(input: string): string {
    input = input.trim();

    // Match something like "funcName(..."
    const match = /^([a-zA-Z\-]+)\(/.exec(input);
    if (!match) return "";

    const name = match[1];
    let depth = 0;
    let i = name.length;

    // Walk through the string, counting nested parentheses
    for (; i < input.length; i++) {
        if (input[i] === '(') depth++;
        else if (input[i] === ')') depth--;

        // If we’ve closed all parentheses, stop
        if (depth === 0) break;
    }

    // If parentheses are balanced and end matches the input length,
    // it's a single wrapper around the whole string
    if (depth === 0 && i === input.length - 1) {
        return name;
    }

    return "";
}



/**
 * Detects the most likely top-level separator used in a multi-value string by analyzing
 * the first clear separator found outside of nested structures. Useful for parsing CSS-like values.
 * 
 * @param {string} input - The string to analyze for potential separators
 * @returns {string|undefined} The detected separator (or undefined if no clear separator found)
 * 
 * @example
 * // Basic separators
 * extractSeparator('1px 2px 3px'); // ' '
 * extractSeparator('red,green,blue'); // ','
 * extractSeparator('Arial/sans-serif'); // '/'
 * 
 * // Prioritizes first encountered top-level separator
 * extractSeparator('1px, 2px | 3px'); // ','
 * 
 * // Handles nested structures
 * extractSeparator('rgb(255,0,0),hsl(120,100%,50%)'); // ','
 * 
 * // Excludes URL-like strings
 * extractSeparator('url(image.png)'); // undefined
 * extractSeparator('https://example.com'); // undefined
 * 
 * // Edge cases
 * extractSeparator(''); // undefined
 * extractSeparator('no-separator'); // undefined
 * extractSeparator('var(--test)var(--other)'); // undefined
 */
export function extractSeparator(input: string): string | undefined {
    // Skip empty strings or URL-like patterns
    if (!input.trim() || input.includes('://')) {
        return undefined;
    }

    const candidateSeparators = [' ', ',', '/', '|'];
    let nestingDepth = 0;
    let inQuotes = false;

    for (const char of input) {
        // Track nesting and quotes to ignore separators inside them
        if (char === '(' && !inQuotes) nestingDepth++;
        if (char === ')' && !inQuotes) nestingDepth--;
        if (char === '"' || char === "'") inQuotes = !inQuotes;

        // Only check separators at top level and outside quotes
        if (nestingDepth === 0 && !inQuotes && candidateSeparators.includes(char)) {
            return char;
        }
    }

    return undefined;
}



/**
 * Splits a mathematical expression into values and operators.
 * Silently removes leading/trailing operators instead of throwing errors.
 * 
 * @param {string} expression - The expression to split (e.g., "10px + 25px - 30%")
 * @returns {[string[], string[]]} - Tuple containing [values, operators]
 */
export function splitExpression(expression: string): [string[], string[]] {
    if (!expression.trim()) return [[], []];

    let processed = expression.trim();

    // Remove leading operators (except '-' which might indicate negative number)
    processed = processed.replace(/^[+*/]+/, '');

    // Remove trailing operators (including '-')
    processed = processed.replace(/[+\-*/]+$/, '');

    // Normalize the expression (handle negative numbers carefully)
    const normalized = processed
        // Add spaces around operators
        .replace(/([+\-*/])/g, ' $1 ')
        // Handle negative numbers after operators (e.g. "10px+ -5px")
        .replace(/([+\-*/])\s*-\s*(\d)/g, '$1 -$2')
        .trim();

    const parts = normalized.split(/\s+/).filter(part => part !== '');

    const values: string[] = [];
    const operators: string[] = [];

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i % 2 === 0) {
            // Value position
            values.push(part);
        } else {
            // Operator position
            if (['+', '-', '*', '/'].includes(part)) {
                operators.push(part);
            } else {
                // Skip invalid operators (or could push to values for recovery)
                values.push(part);
            }
        }
    }

    // Reconcile any mismatches (due to skipped operators)
    while (operators.length >= values.length) {
        operators.pop();
    }

    return [values, operators];
}

/**
 * Splits a string based on a separator, ignoring separators that appear inside parentheses ().
 * This is particularly useful for splitting CSS values while preserving function arguments.
 *
 * @param {string} input - The input string to split
 * @param {string} separator - The character used to split the string
 * @returns {string[]} An array of strings split by the separator, excluding separators inside parentheses
 *
 * @example
 * // Basic splitting with comma separator
 * splitMultiValue('1px, 2px, 3px', ','); // ['1px', '2px', '3px']
 * 
 * // Auto-detects space separator when none specified
 * splitMultiValue('1px 2px 3px'); // ['1px', '2px', '3px']
 * 
 * // Preserves function contents
 * splitMultiValue('rgb(255,0,0), hsl(120,100%,50%)', ','); // ['rgb(255,0,0)', 'hsl(120,100%,50%)']
 * 
 * // Handles nested parentheses
 * splitMultiValue('1px, calc(2px + (3px / 2)), 4px', ','); // ['1px', 'calc(2px + (3px / 2))', '4px']
 * 
 * // Works with space separators
 * splitMultiValue('red rgb(255 0 0) blue', ' '); // ['red', 'rgb(255 0 0)', 'blue']
 * 
 * // Trims whitespace from results
 * splitMultiValue(' 1px , 2px , 3px ', ','); // ['1px', '2px', '3px']
 * 
 * // Edge cases
 * splitMultiValue(''); // []
 * splitMultiValue('value'); // ['value']
 * splitMultiValue('a(b,c)d,e', ','); // ['a(b,c)d', 'e']
 * 
 * // Complex CSS examples
 * splitMultiValue('var(--x), var(--y), linear-gradient(red, blue)'); // ['var(--x)', 'var(--y)', 'linear-gradient(red, blue)']
 * splitMultiValue('1px 2px / 3px 4px', '/'); // ['1px 2px', '3px 4px']
 */
export function splitMultiValue(input: string, separator: string): string[] {
    const result: string[] = [];
    let currentSegment = '';
    let parenDepth = 0; // Tracks nesting level of parentheses



    for (const char of input) {
        // Update parentheses nesting level
        if (char === '(') parenDepth++;
        if (char === ')') parenDepth--;

        // Split only when we encounter the separator at top level (parenDepth === 0)
        if (char === separator && parenDepth === 0) {
            result.push(currentSegment.trim());
            currentSegment = '';
        } else {
            currentSegment += char;
        }
    }

    // Add the last segment if not empty
    if (currentSegment.trim()) {
        result.push(currentSegment.trim());
    }

    return result;
}

/**
 * Updates a specific value in a string of multiple values separated by a delimiter,
 * while respecting function boundaries (e.g., not splitting inside parentheses).
 * 
 * @param {string} input - The string containing multiple values separated by a delimiter
 * @param {string} value - The new value to insert at the specified index
 * @param {number} index - The zero-based index of the value to update
 * @param {string} [separator] - The delimiter used to separate values
 * @returns {string} A new string with the updated value at the specified index
 * 
 * @example
 * // Basic value replacement
 * updateMultiValue('1px 2px 3px', '4px', 1); // "1px 4px 3px"
 * updateMultiValue('red,green,blue', 'yellow', 2, ','); // "red,green,yellow"
 * 
 * // Preserves function boundaries
 * updateMultiValue('rgba(255,0,0,1) 0px 0px', 'rgba(0,255,0,1)', 0); // "rgba(0,255,0,1) 0px 0px"
 * updateMultiValue('calc(10px + 5px) var(--gap)', '20px', 1); // "calc(10px + 5px) 20px"
 * 
 * // Handles CSS variables
 * updateMultiValue('var(--x) var(--y)', 'var(--z)', 1); // "var(--x) var(--z)"
 * 
 * // Edge cases
 * updateMultiValue('single', 'new', 0); // "new"
 * updateMultiValue('', 'value', 0); // "value"
 * updateMultiValue('a b c', 'x', 5); // "a b c" (index out of bounds)
 * 
 * // Complex CSS examples
 * updateMultiValue('1px solid rgba(255,255,255,0.5)', 'dashed', 1); // "1px dashed rgba(255,255,255,0.5)"
 * updateMultiValue('var(--shadow) 0 0', '2px 2px 5px rgba(0,0,0,0.3)', 0); // "2px 2px 5px rgba(0,0,0,0.3) 0 0"
 * 
 * // Different separators
 * updateMultiValue('left|top|right', 'center', 1, '|'); // "left|center|right"
 */
export function updateMultiValue(input: string, value: string, index: number, separator: string): string {
    // Split the input while respecting function boundaries
    const values = splitMultiValue(input, separator);

    // If the index is out of bounds, return the original input string
    if (index < 0 || index > values.length) {
        return input;
    }

    // Replace the value at the specified index
    const updatedValues = [...values];
    updatedValues[index] = value;

    // Join with detected separator (or space if none found)
    const _separator = separator ?? (extractSeparator(input) || ' ');
    return updatedValues.join(_separator);
}

/**
 * Deletes a specific value in a string of multiple values separated by a delimiter,
 * while respecting excluded characters (e.g., not splitting inside parentheses).
 * 
 * @param {string} input - The string containing multiple values separated by a delimiter.
 * @param {number} index - The index of the value to delete.
 * @param {string} separator - The delimiter used to separate values in the `values` string.
 * @param {string[]} exclude - (Optional) An array of characters to exclude when splitting the `values` string.
 *                  For example, `['(', ')']` ensures that separators inside parentheses are not split.
 * 
 * @returns {string} A new string with the value at the specified index removed.
 * 
 * @example
 * // Basic deletion
 * deleteMultiValue('1px 2px 3px', 1, ' '); // "1px 3px"
 * deleteMultiValue('red,green,blue', 0, ','); // "green,blue"
 * 
 * // Preserves function boundaries
 * deleteMultiValue('rgba(255,0,0,1) 0px 0px', 1, ' '); // "rgba(255,0,0,1) 0px"
 * deleteMultiValue('calc(10px + 5px) var(--gap) 1rem', 1, ' '); // "calc(10px + 5px) 1rem"
 * 
 * // Handles CSS variables
 * deleteMultiValue('var(--x) var(--y) var(--z)', 1, ' '); // "var(--x) var(--z)"
 * 
 * // Edge cases
 * deleteMultiValue('single', 0, ' '); // ""
 * deleteMultiValue('', 0, ' '); // ""
 * deleteMultiValue('a b c', 5, ' '); // "a b c" (index out of bounds)
 * 
 * // Complex CSS examples
 * deleteMultiValue('1px solid rgba(255,255,255,0.5)', 1, ' '); // "1px rgba(255,255,255,0.5)"
 * deleteMultiValue('var(--shadow) 0 0', 0, ' '); // "0 0"
 * 
 * // Different separators
 * deleteMultiValue('left|top|right', 1, '|'); // "left|right"
 * 
 * // Multiple deletions (chained)
 * deleteMultiValue(
 *   deleteMultiValue('1px 2px 3px 4px', 1, ' '),
 *   2, ' '
 * ); // "1px 3px"
 */
export function deleteMultiValue(input: string, index: number, separator: string): string {
    // Split the input into an array, considering excluded values if provided
    const _values = splitMultiValue(input, separator);

    // Set the value at the specified index to an empty string
    _values[index] = '';

    // Filter out empty strings and join the remaining values with the separator
    return _values.filter((input) => input !== '').join(separator);
}



/**
 * Checks if the input is a valid CSS scalable value (number + length).
 * Valid formats:
 * - Positive/negative numbers
 * - Integers or decimals
 * - Followed immediately by a length (no space)
 * - Doesn't allow symbols other than - (for negative values) and . (for decimals)
 *
 * @param input - The value to check
 * @returns {boolean} True if valid scalable CSS value, false otherwise
 *
 * @example
 * // Valid scalable values
 * isLengthScalable("10px");     // true
 * isLengthScalable("-2.5rem");  // true
 * isLengthScalable("0.25%");    // true
 * isLengthScalable("100vw");    // true
 * isLengthScalable("-0.5em");   // true
 * 
 * // Invalid scalable values
 * isLengthScalable("px");       // false (missing number)
 * isLengthScalable("10 px");    // false (space before length)
 * isLengthScalable("10px ");    // false (trailing space)
 * isLengthScalable("10px;");    // false (contains symbol)
 * isLengthScalable("10");       // false (unitless number)
 * isLengthScalable("10em10");   // false (numbers after length)
 * isLengthScalable("10em-5");   // false (symbols after length)
 * isLengthScalable("var(--x)"); // false (CSS variable)
 * isLengthScalable("auto");     // false (CSS keyword)
 * isLengthScalable("0");        // false (missing length)
 * 
 * // Non-string inputs
 * isLengthScalable(10);         // false (unitless number)
 * isLengthScalable(null);       // false
 * isLengthScalable(undefined);  // false
 * isLengthScalable({});         // false
 */
export function isLengthScalable(input: string): boolean {
    return /^-?\d+(\.\d+)?([a-zA-Z%]+)$/.test(input);
}

/**
 * Checks if a given length is a keyword length (e.g., "auto", "inherit", "initial", "unset").
 * First verifies the input contains only letters and hyphens before checking against known keywords.
 *
 * @param {string} input - The length to check. This should be a string representing a CSS length or keyword.
 *                        Example: "auto", "inherit", "px", "%".
 *
 * @returns {boolean} - `true` if:
 *                     - The input passes the letter/hyphen validation AND
 *                     - Exists in the predefined keyword lengths list
 *                     `false` otherwise
 *
 * @example
 * isLengthKeyword("auto"); // Returns true (valid letters and in keywords)
 * isLengthKeyword("inherit"); // Returns true
 * isLengthKeyword("min-content"); // Returns true
 * isLengthKeyword("px"); // Returns false (valid letters but not a keyword)
 * isLengthKeyword("var(--x)"); // Returns false (invalid characters)
 * isLengthKeyword("100vw"); // Returns false (contains numbers)
 * isLengthKeyword(""); // Returns false
 */
export const isLengthKeyword = (input: string): boolean => {
    return isLetters(input);
};

/**
 * Checks if a given CSS value represents a length-related function.
 * Returns false for non-functional values.
 * 
 * @param input - The CSS value string to check (e.g., "min(0px,0px)", "translateX(10px)")
 * @returns {boolean} True if the value is a length function, false otherwise
 * 
 * @example
 * // Returns true for functional length lengths
 * isLengthFunction("min(0px, 10px)");     // true
 * isLengthFunction("translateX(10px)");   // true
 * isLengthFunction("clamp(1px,2px,3px)"); // true
 * isLengthFunction("calc(100% - 10px)");  // true
 * isLengthFunction("rgb(255,0,0)");     // true
 * isLengthFunction("var(--some-var)");    // true
 * 
 * // Returns false for excluded functions or non-length values
 * isLengthFunction("10px");              // false
 * isLengthFunction("1rem");              // false
 * isLengthFunction("justify-center");    // false
 */
export const isLengthFunction = (input: string): boolean => {
    if (typeof (input) !== 'string' || input.length === 0) return false;

    // First check if input starts with any excluded function
    if (['rgb', 'rgba', 'hsl', 'hsla'].some(fn => input.startsWith(`${fn}(`))) {
        return false;
    }

    // Check basic function structure: name(params)
    if (!/^[a-zA-Z-]+\(.*\)$/.test(input)) {
        return false;
    }

    return true;
};

/**
 * Strictly checks if the input is a valid CSS variable function.
 * Valid format: `var(--name-with-dashes[, fallback])`
 * 
 * @param {string} input - The string to validate as a CSS variable
 * @returns {boolean} - True if matches exact CSS variable syntax:
 *                     - Starts exactly with 'var(' and ends with ')'
 *                     - Contains a valid --variable-name immediately after '('
 *                     - Optional fallback value after comma
 *                     - No surrounding spaces inside parentheses
 * 
 * @example
 * // Valid CSS variables
 * isFunctionVariable('var(--primary-color)');          // true
 * isFunctionVariable('var(--spacing-md)');            // true
 * isFunctionVariable('var(--font-size,16px)');        // true
 * isFunctionVariable('var(--color-500,#ffffff)');     // true
 * 
 * @example
 * // Invalid CSS variables (now properly rejected)
 * isFunctionVariable('var( --space )');               // false (spaces inside)
 * isFunctionVariable('var(-- space)');                // false (space after --)
 * isFunctionVariable('var(--valid-name, )');          // false (space in fallback)
 * isFunctionVariable('var(--valid-name ,10px)');      // false (space before comma)
 */
export const isFunctionVariable = (input: string): boolean => {
    if (typeof (input) !== 'string' || input.length === 0) return false;

    // Basic structure check (no surrounding whitespace allowed)
    if (!/^var\([^)]+\)$/.test(input.trim())) {
        return false;
    }

    // Extract content between parentheses (trimming would have caught outer spaces)
    const innerContent = input.slice(4, -1);

    // Early rejection for empty content
    if (!innerContent) return false;

    // Split variable name and optional fallback (disallow spaces around comma)
    const parts = innerContent.split(',');

    // Validate variable name (must start immediately after parenthesis)
    const variableName = parts[0];
    if (!/^--[a-zA-Z][a-zA-Z0-9-]*$/.test(variableName)) {
        return false;
    }

    // Validate fallback if present
    if (parts.length > 1) {
        const fallback = parts.slice(1).join(',').trim();
        if (!fallback) {
            return false;  // Empty fallback
        }
        // Optional: Add additional fallback validation here
    }

    return true;
};

export const isFunctionExpression = (input: string): boolean => {
    return input.startsWith('calc(') && input.endsWith(')');
};

/**
 * Checks if the input string is a valid length list - a series of values separated
 * by spaces, commas, or other separators (excluding separators inside functions).
 * 
 * @param {string} input - The string to check for list formatting
 * @returns {boolean} `true` if the input is a valid multi-value list, `false` otherwise
 * 
 * @example
 * // Space-separated lists
 * isLengthList('1px 2px 3px'); // true
 * isLengthList('0px 0px 0px rgba(0,0,0,0)'); // true
 * 
 * // Comma-separated lists
 * isLengthList('red, green, blue'); // true
 * isLengthList('1px, 2px, 3px'); // true
 * 
 * // Other separators
 * isLengthList('1/2/3'); // true
 * isLengthList('left / center / right'); // true
 * 
 * // With function values
 * isLengthList('var(--x) var(--y)'); // true
 * isLengthList('rgb(255,0,0), hsl(120,100%,50%)'); // true
 * 
 * // Negative cases
 * isLengthList(''); // false
 * isLengthList('single-value'); // false
 * isLengthList('rgb(255,0,0)'); // false (commas are inside function)
 * isLengthList('1px2px3px'); // false (no separator)
 */
export const isLengthList = (input: string): boolean => {
    if (!input.trim()) return false; // empty string is not a list

    const separator = extractSeparator(input);
    if (!separator) return false; // no separator found

    const parts = splitMultiValue(input, separator);

    // Must have at least 2 parts to be considered a list
    return parts.length >= 2;
};


/**
 * Validates if a value is a CSS keyword
 * @param {string} input - The value to check (e.g., "block", "flex")
 * @returns {boolean} - True if value exists in options
 */
export const isKeywordValid = (input: string, options: STYLE_VALUE[]): boolean => {
    return options.some((option) => {
        return option.value === input && option.syntax === 'keyword';
    })
};

/**
 * Validates patterns inside brackets (e.g., [number / number])
 * 
 * @param {string} value - The value to validate
 * @param {string} pattern - The pattern inside brackets
 * @returns {boolean} True if value matches the inner pattern
 *
 * @example
 * isFunctionValid("16/9", "number / number"); // true
 * 
 */
export const isFunctionValid = (input: string, option: STYLE_VALUE): boolean => {
    const pattern = option.syntax as string;

    // Remove the function() from the value to pass only 10px
    const safeValue = extractValue(input);
    const safeLength = extractLength(input);
    const safePattern = extractBetween(pattern, '(', ')') || pattern;

    if (!safeValue) {
        devLog.error(`Value: ${input} is not valid value for function().`)
        return false;
    }

    if (!safePattern) {
        devLog.error(`Pattern: ${pattern} is not valid pattern for function().`)
        return false;
    }

    // Process function pattern
    if (!isLengthFunction(safeLength)) {
        devLog.error(`Pattern: ${pattern} for value: ${input} is not a valid function`)
        return false;
    }

    return isPatternValid(safePattern, safeValue, option.lengths)
};


/**
 * Validates URL strings, handling quoted URLs and various edge cases.
 * @param {string} value - The URL string to validate (may be wrapped in quotes)
 * @returns {boolean} - True if the string is a valid URL after quote removal
 * 
 * @example
 * isURLValid('https://example.com') // true
 * isURLValid('"https://example.com"') // true
 * isURLValid('example.com') // false (requires protocol)
 * isURLValid('data:image/png,...') // false (no data URLs)
 */
export const isURLValid = (value: string): boolean => {
    // Clean the input first
    const cleanedValue = value
        .replace(/^["'`]|["'`]$/g, '')  // Remove surrounding quotes
        .trim();

    // Quick sanity checks
    if (!cleanedValue || cleanedValue.length < 10) {  // "https://a.b" = 10 chars
        return false;
    }

    // Explicitly reject data URLs and CSS functions
    if (cleanedValue.startsWith('data:') ||
        cleanedValue.startsWith('url(') ||
        cleanedValue.includes('://') === false) {
        return false;
    }

    // Use the existing isURL function with strict protocol requirements
    return isURL(cleanedValue, true);  // Force protocol requirement
};


/**
 * Validates if a value is both a valid CSS variable syntax AND matches an existing variable
 * 
 * @param {string} value - The value to validate (e.g., "--main-color")
 * @returns {boolean} True if value is a valid CSS variable that exists in the variables list
 *
 * @example
 * isVariableValid("--main-color"); // true if variable exists
 * @example
 * isVariableValid("--nonexistent"); // false
 * @example 
 * isVariableValid("not-a-var"); // false
*/
export const isVariableValid = (value: string): boolean => {
    const variables = getStyleVariables();
    return variables.some(variable => variable.value === value);
};

/**
 * Validates if a value is a CSS expression
 * @param {string} value - The value to check (e.g., "calc(10px + 20%)")
 * @returns {boolean} - True if value matches 
 */
export const isExpressionValid = (value: string): boolean => {
    return true;
    const extracted = extractLength(value);
    return value.startsWith(extracted);
};

/**
 * Validates if a value is a valid CSS color
 * @param {string} value - The value to check (e.g., "red", "#ff0000", "rgb(255 0 0)")
 * @returns {boolean} - True if value matches color patterns
 */
export const isColorValid = (value: string): boolean => {
    return /^(#[0-9a-fA-F]{3,6}|rgb(a?)\([\d\s,.%]+\)|[a-zA-Z]+)$/.test(value);
};

/**
 * Validates if a value is a valid number
 * @param {string} value - The value to check (e.g., "10", "0.5", "-3")
 * @returns {boolean} - True if value is a valid number
 */
export const isNumberValid = (value: string): boolean => {
    return isNumeric(value);
};



/**
 * Validates if a value is a valid CSS length
 * @param {string} value - The value to check (e.g., "10px", "100%", "0")
 * @returns {boolean} - True if value has valid length/number combination
*/
export const isLengthValid = (value: string, lengths?: STYLE_VALUE[]): boolean => {

    // Keyword
    if (lengths && isKeywordValid(value, lengths)) return true;

    // Function
    if (isLengthFunction(extractLength(value))) {
        // Variable
        if (isFunctionVariable(value)) {
            const option = { name: 'var', value, syntax: 'variable' } as STYLE_VALUE;
            return isOptionValid(value, option)
        }

        if (!lengths) {
            devLog.error(`Lengths must be non-empty array`)
            return false;
        }

        const option = getStyleOptionByValue(value, lengths);
        if (!option) {
            devLog.error(`Couldn't find matching option for options:'${lengths}' and value:'${value}'`);
            return false;
        }

        return isFunctionValid(value, option);
    }

    // Length
    const number = extractNumber(value);
    if (!isNumeric(number)) {
        devLog.error(`Value: ${value} is not valid number.`)
        return false;
    }

    const length = extractLength(value);
    const _units = lengths ? lengths : OPTIONS.LENGTH_MATH;

    return !!length && [..._units].some((u) => length.startsWith(extractLength(u.value)));
};

export const isPatternValid = (pattern: string, input: string, lengths?: STYLE_VALUE[]): boolean => {
    const patterns = pattern.split("|");

    const hasValid = patterns.some((_pattern) => {
        const seperator = extractSeparator(input) || ' ';
        const patternParts = splitSyntax(_pattern);
        const valueParts = splitMultiValue(input, seperator);

        if (!patternParts) {
            devLog.error(`There was an error splitting pattern to parts: ${_pattern}`);
            return false;
        }

        // Validate each part
        return patternParts.every((patternPart, i) => {
            const value = valueParts[i];

            switch (patternPart) {
                case 'length': return isLengthValid(value, lengths);
                case 'number': return isNumberValid(value);
                case 'color': return isColorValid(value);
                case 'keyword': return lengths && isKeywordValid(value, lengths);
                case 'url': return isURLValid(value);
                default: return false;
            }

        });

    })

    if (hasValid) return true;

    devLog.error(`Couldn't find valid pattern for value: ${input} and pattern: ${patterns}`);
    return false;
}

/**
 * Validates if a CSS value matches any of the provided patterns in syntaxPattern
 * Supports multiple patterns separated by | and complex patterns with brackets
 * 
 * @param {string} value - The CSS value to validate (e.g., "16/9", "10px solid")
 * @param {STYLE_VALUE_SYNTAX} syntaxPattern - The pattern(s) to validate against 
 *        (e.g., "number", "[number / number]", "length [keyword]")
 * @returns {boolean} True if value matches any pattern, false otherwise
 *
 * @example
 * // Single pattern
 * isOptionValid("16/9", "[number / number]"); // true
 * 
 * @example
 * // Multiple patterns
 * isOptionValid("1", "number | [number / number]"); // true
 * 
 * @example 
 * // Complex pattern
 * isOptionValid("10px solid red", "length [keyword] color"); // true
 */
export const isOptionValid = (input: string, option: STYLE_VALUE): boolean => {
    const pattern = option.syntax;

    if (pattern === 'keyword') {
        return isKeywordValid(input, [option]);
    }

    if (pattern === 'variable') {
        return isVariableValid(input);
    }

    if (pattern === 'expression') {
        return isExpressionValid(input);
    }

    if (pattern.startsWith('function')) {
        return isFunctionValid(input, option);
    }


    return isPatternValid(pattern, input, option.lengths)

};

/**
 * Type guard function that checks if a property is a valid STYLES_CONSTANTS_KEY
 * 
 * @param {string} property - The property name to validate
 * @returns {property is STYLES_CONSTANTS_KEY} - Type predicate indicating whether the property is valid
 * 
 * @example
 * // Returns true if property is valid
 * isPropertyValid('backgroundColor'); // true if 'backgroundColor' exists in STYLES_CONSTANTS
 * 
 * // Returns false for invalid properties
 * isPropertyValid(''); // false
 * isPropertyValid('background-color'); // false
 * isPropertyValid('unknownProperty'); // false
 */
export const isPropertyValid = (property: string): property is STYLES_CONSTANTS_KEY => {
    // If property is not valid string
    if (typeof property !== 'string' || property.length <= 0) {
        devLog.error(`Property: ${property} should be non-empty string`);
        return false;
    }

    // If property is not in camel-case
    if (!isCamelCase(property)) {
        devLog.error(`Invalid property: '${property}'. Must be in 'camelCase' format`);
        return false;
    }

    // Check if property exists in STYLES_CONSTANTS object
    return property in STYLES_CONSTANTS;
};

export const isSingleValueValid = (property: STYLES_CONSTANTS_KEY, value: string): boolean => {
    // If valie is not valid string
    if (typeof value !== 'string') {
        devLog.error(`Value: ${value} should be non-empty string`);
        return false;
    }

    // If property is not valid
    if (!isPropertyValid(property)) {
        devLog.error(`Property: ${property} is not valid.`);
        return false;
    }

    const options = STYLES_CONSTANTS[property]?.options;
    const option = getStyleOptionByValue(value, options);

    // If no option found 
    if (!option) {
        devLog.error(`Couldn't find matching option for property:'${property}' and value:'${value}'`);
        return false;
    }


    // Validate option
    return isOptionValid(value, option);
};

export const isMultiValueValid = (property: STYLES_CONSTANTS_KEY, value: string, separator: string): boolean => {
    // If valie is not valid string
    if (typeof value !== 'string') {
        devLog.error(`Value: ${value} should be non-empty string`);
        return false;
    }

    if (typeof separator !== 'string' || separator.length !== 1) {
        devLog.error(`Invalid separator: '${separator}'. Must be a non-empty single-char string.`);
        return false;
    }

    const splitValues = splitMultiValue(value, separator);
    const hasInvalidValue = splitValues.some((splitValue) => {
        return !isSingleValueValid(property, splitValue);
    });


    if (hasInvalidValue) {
        devLog.error(`Value: '${value}' for property: '${property}' is not in correct pattern.`);
        return false;
    }

    return true;
};

export const isIndexValid = (index: number): boolean => {
    if (typeof index !== 'number' || index < 0) return false;

    return true;
};



/**
 * Splits a CSS syntax string based on whether it contains parentheses or not.
 * If the syntax contains parentheses, extracts the content between them before splitting.
 * 
 * @param syntax - The CSS syntax string to split
 * @example 
 * // Returns ['length', 'number', 'color']
 * splitSyntax('fit-content(length,number,color)');
 * // Returns ['auto']
 * splitSyntax('auto');
 * // Returns undefined
 * splitSyntax('');
 * 
 * @returns An array of split values if successful, undefined if the syntax is empty
 */
export const splitSyntax = (input: string): string[] | undefined => {
    // Check if syntax contains parentheses, if yes extract content between them
    const safeInput = input.includes('(') ? extractBetween(input, '(', ')') : input;

    // Return undefined if the syntax is empty
    if (!safeInput) return undefined;

    const seperator = extractSeparator(safeInput) || ' ';


    // Split the extracted or original syntax by commas
    return splitMultiValue(safeInput, seperator);
}


/**
 * Finds a style option from an array that matches the given value.
 * The matching logic differs based on whether the value is numeric or not.
 * 
 * @param {string} value - The style value to match against options. 
 *                         Examples: "100", "12px", "bold"
 * @param {STYLE_VALUE[]} options - Array of style options to search through.
 *                                  Example: [{value: "100", name: "Thin"}, 
 *                                           {value: "10px", name: "px"}]
 * 
 * @returns {STYLE_VALUE | undefined} The matching style option or undefined if not found.
 * 
 * @example
 * // Numeric value match
 * options = [{value: "100", name: "Thin"},{value: "200", name: "200"}]
 * getStyleOptionByValue("100", options); * // returns {value: "100", name: "Thin"}
 * 
 * // Non-numeric value match
 * options = [{value: "10px", name: "Medium"}, *{value: "10rem", name: "Small"}]
 * getStyleOptionByValue("10px", options); * // returns {value: "10px", name: "Small"}
 * 
 * // No match found
 * options = [{value: "normal", name: "Normal"}]
 * getStyleOptionByValue("bold", options); * // returns undefined
*/
export const getStyleOptionByValue = (value: string, options: STYLE_VALUE[]): STYLE_VALUE | undefined => {

    // Check if options is a valid non-empty array
    if (!Array.isArray(options) || options.length <= 0) {
        devLog.error(`Options should be non-empty array<STYLE_VALUE[]>.`);
        return undefined;
    }

    // If there's only one option, return it immediately
    if (options.length === 1) return options[0];

    // Handle numeric values (like font-weight: 100, 200, etc.)
    if (isNumeric(value)) {
        return options.find((option) => {
            return option.value === value;
        });;
    }

    // Handle other values by comparing extracted length values
    return options.find((option) => {
        return extractLength(option.value) === extractLength(value);
    });;
};

export const getStyleVariables = (): OPTIONS_SELECT_OPTION[] => {
    return [
        { name: '--placeholder', value: 'var(--placeholder)' },
        { name: '--font-sm', value: 'var(--font-sm)' },
        { name: '--font-md', value: 'var(--font-md)' },
        { name: '--font-lg', value: 'var(--font-lg)' },
    ]
};

export const getStyleOptions: (property: STYLES_CONSTANTS_KEY) => STYLE_VALUE[] = (property): STYLE_VALUE[] => {
    // Check if the property exists in STYLES_CONSTANTS and is an array
    if (!STYLES_CONSTANTS[property]) {
        throw Error(`Property "${property}" not found in STYLES_CONSTANTS or is not an array.`);
    }

    return STYLES_CONSTANTS[property].options;
};

