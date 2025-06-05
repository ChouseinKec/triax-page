// Types
import { STYLE_OPTION, STYLE_OPTION_FUNCTION, STYLE_OPTION_SYNTAX } from '@/editors/style/constants/types';
import { Option } from '@/components/Select/Options/types';

// Utilities
import { isCamelCase, isLetters, isNumeric, extractBetween, isURL } from '@/utilities/string';
import { devLog } from '@/utilities/dev';

// Constants
import { STYLE_CONSTANTS, STYLE_PROPERTIES } from '@/editors/style/constants/styles';

import { KEYWORD_KEYS } from '@/editors/style/constants/lengths';
import { isNumber } from 'util';


import { CSSPropertyDefs, PropertyKeys } from '@/constants/style/property'
import { Property } from '@/types/style/property';

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
 * Extracts the unit from a string that contains a number followed by a unit.
 * This function is designed to handle cases where the number is followed by a unit (like 'px', 'em', '%', etc.),
 * but it will only return the unit part, not the number.
 * @param {string} input - The input string from which to extract the unit.
 * @returns {string | undefined} - The extracted unit as a string, or undefined if no valid unit is found.
 * 
 * @example
 * 
 * // Basic unit extraction
 * extractUnit("10px"); → "px"
 * extractUnit("-2.5rem"); → "rem"
 *
 * // Percentage extraction
 * extractUnit("50%"); → "%"
 * 
 * // Decimal extraction
 * extractUnit("0.75em"); → "em"
 * 
 * // Unit only
 * extractUnit("px"); → "px"
 *
 * // Standalone numbers
 * extractUnit("-5"); → undefined (no unit)
 * extractUnit(".5"); → undefined (no unit)
 * extractUnit("20"); → undefined (no unit)
 * extractUnit("20.5"); → undefined (no unit)
 * 
 * // Invalid cases
 * extractUnit("10px10px"); → undefined (not a valid single value)
 * extractUnit("10px 20px"); → undefined (multiple values)
 * extractUnit("10px;"); → undefined (trailing semicolon)
 * extractUnit("10px 20px 30px"); → undefined (multiple values)
 * 
 * // Edge cases
 * extractUnit(""); → undefined (empty string)
 * extractUnit("   "); → undefined (whitespace only)
 * 
 * // Non-string inputs
 * extractUnit(10); → undefined (not a string)
 * extractUnit(null); → undefined (null input)
 * extractUnit(undefined); → undefined (undefined input)
 */
export function extractUnit(input: string): string | undefined {
    // Check if input is a non-empty string
    if (typeof input !== "string") {
        devLog.error('[extractUnit] Input must be string');
        return undefined;
    }

    // Trim whitespace from the input
    input = input.trim();

    // If input is empty after trimming, return undefined
    if (input.length === 0) {
        return undefined;
    }

    // If input is a valid unit (like "px", "em", "%"), return it directly
    if (isLetters(input) || input === '%') {
        return input;
    }

    // Match valid [sign][number][unit] with nothing else
    const match = input.match(/^[+-]?((\d+(\.\d*)?)|(\.\d+))([a-zA-Z%]+)$/);
    if (!match) {
        return undefined;
    }

    // Group 5 is the unit
    return match[5];
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
export function extractValue(input: string): string | undefined {
    if (!input) return undefined;

    // Only extract if the entire string is a single function call
    // (must start with function pattern and end with matching parenthesis)
    const functionMatch = input.match(/^([^\s(]+)\((.*)\)$/);
    if (!functionMatch) return input;

    // Verify parentheses are balanced in the content
    let balance = 0;
    for (const char of functionMatch[2]) {
        if (char === '(') balance++;
        if (char === ')') balance--;
        if (balance < 0) return undefined; // Unbalanced closing parenthesis
    }
    if (balance !== 0) return undefined; // Unbalanced opening parentheses

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
export function extractFunction(input: string, parentheses: boolean = false): string | undefined {
    input = input.trim();

    // Match something like "funcName(..."
    const match = /^([a-zA-Z\-]+)\(/.exec(input);
    if (!match) return undefined;

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
        return parentheses ? `${name}()` : name;
    }

    return undefined;
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
    return updatedValues.filter(Boolean).join(_separator);
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
 * isValueScalable("10px");     // true
 * isValueScalable("-2.5rem");  // true
 * isValueScalable("0.25%");    // true
 * isValueScalable("100vw");    // true
 * isValueScalable("-0.5em");   // true
 * 
 * // Invalid scalable values
 * isValueScalable("px");       // false (missing number)
 * isValueScalable("10 px");    // false (space before length)
 * isValueScalable("10px ");    // false (trailing space)
 * isValueScalable("10px;");    // false (contains symbol)
 * isValueScalable("10");       // false (unitless number)
 * isValueScalable("10em10");   // false (numbers after length)
 * isValueScalable("10em-5");   // false (symbols after length)
 * isValueScalable("var(--x)"); // false (CSS variable)
 * isValueScalable("auto");     // false (CSS keyword)
 * isValueScalable("0");        // false (missing length)
 * 
 * // Non-string inputs
 * isValueScalable(10);         // false (unitless number)
 * isValueScalable(null);       // false
 * isValueScalable(undefined);  // false
 * isValueScalable({});         // false
 */
export function isValueScalable(input: string): boolean {
    return /^-?\d+(\.\d+)?([a-zA-Z%]+)$/.test(input);
}

export function isValueNumber(input: string): boolean {
    if (isNumeric(input)) return true;

    return false;
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
 * isValueKeyword("auto"); // Returns true (valid letters and in keywords)
 * isValueKeyword("inherit"); // Returns true
 * isValueKeyword("min-content"); // Returns true
 * isValueKeyword("px"); // Returns false (valid letters but not a keyword)
 * isValueKeyword("var(--x)"); // Returns false (invalid characters)
 * isValueKeyword("100vw"); // Returns false (contains numbers)
 * isValueKeyword(""); // Returns false
 */
export function isValueKeyword(input: string): boolean {
    if (KEYWORD_KEYS.includes(input)) return true;

    return false;
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
 * isValueFunction("min(0px, 10px)");     // true
 * isValueFunction("translateX(10px)");   // true
 * isValueFunction("clamp(1px,2px,3px)"); // true
 * isValueFunction("calc(100% - 10px)");  // true
 * isValueFunction("rgb(255,0,0)");     // true
 * isValueFunction("var(--some-var)");    // true
 * 
 * // Returns false for excluded functions or non-length values
 * isValueFunction("10px");              // false
 * isValueFunction("1rem");              // false
 * isValueFunction("justify-center");    // false
 */
export function isValueFunction(input: string): boolean {
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


export function isValueLength(input: string): boolean {

    if (isValueScalable(input)) return true;
    if (isValueNumber(input)) return true;
    if (isValueKeyword(input)) return true;
    if (isValueFunction(input)) return true;

    return false;
}

/**
 * Checks if the input string is a valid length list - a series of values separated
 * by spaces, commas, or other separators (excluding separators inside functions).
 * 
 * @param {string} input - The string to check for list formatting
 * @returns {boolean} `true` if the input is a valid multi-value list, `false` otherwise
 * 
 * @example
 * // Space-separated lists
 * isValueList('1px 2px 3px'); // true
 * isValueList('0px 0px 0px rgba(0,0,0,0)'); // true
 * 
 * // Comma-separated lists
 * isValueList('red, green, blue'); // true
 * isValueList('1px, 2px, 3px'); // true
 * 
 * // Other separators
 * isValueList('1/2/3'); // true
 * isValueList('left / center / right'); // true
 * 
 * // With function values
 * isValueList('var(--x) var(--y)'); // true
 * isValueList('rgb(255,0,0), hsl(120,100%,50%)'); // true
 * 
 * // Negative cases
 * isValueList(''); // false
 * isValueList('single-value'); // false
 * isValueList('rgb(255,0,0)'); // false (commas are inside function)
 * isValueList('1px2px3px'); // false (no separator)
 */
export function isValueList(input: string): boolean {
    if (!input.trim()) return false; // empty string is not a list

    const separator = extractSeparator(input);
    if (!separator) return false; // no separator found

    const parts = splitMultiValue(input, separator);

    // Must have at least 2 parts to be considered a list
    return parts.length >= 2;
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











export const isScalableValid = (input: string, options: STYLE_OPTION[]): boolean => {
    const option = options.find(opt => extractUnit(opt.value) === extractUnit(input));
    if (option) return true;

    return false;
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
 * Validates if a value is a CSS keyword
 * @param {string} input - The value to check (e.g., "block", "flex")
 * @returns {boolean} - True if value exists in options
 */
export const isKeywordValid = (input: string, options: STYLE_OPTION[]): boolean => {
    const option = options.find(opt => extractUnit(opt.value) === extractUnit(input));
    if (option) return true;

    return false;
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
export const isFunctionValid = (value: string, option: STYLE_OPTION_FUNCTION): boolean => {

    const optionLengths = option.lengths;
    const optionSeparator = option.separator;

    if (!optionLengths || optionLengths.length === 0) {
        devLog.error(`[isFunctionValid] No lengths defined for option: ${option.value}.`);
        return false;
    }


    if (!optionSeparator) {
        devLog.error(`[isFunctionValid] No separator defined for option: ${option.value}.`);
        return false;
    }

    const extractedFunction = extractFunction(value);
    if (extractedFunction !== extractFunction(option.value)) {
        devLog.error(`[isSyntaxValid] Input: ${value} does not match function: ${option.value}.`);
        return false;
    }

    // Extract the function name and value
    const extractedValue = extractValue(value);
    if (!extractedValue) {
        devLog.error(`[isFunctionValid] Invalid function or value in input: ${extractedValue}`);
        return false;
    }

    const valueParts = splitMultiValue(extractedValue, optionSeparator);

    return valueParts.every(value => isSyntaxValid(value, optionLengths));
};

/**
 * Validates if a value is a valid CSS length or matches allowed options.
 * 
 * @param {string} value - The CSS value to validate (e.g., "10px", "100%", "var(--size)", "0")
 * @param {STYLE_OPTION[]} [lengths] - Optional array of allowed style values. If not provided, 
 *                                    defaults to standard length units.
 * @returns {boolean} True if the value is a valid CSS length/number or matches allowed options.
 * 
 * @example
 * // Basic length validation
 * isLengthValid("10px"); // returns true
 * isLengthValid("5rem"); // returns true
 * isLengthValid("abc");  // returns false
 * 
 * // With allowed options
 * const allowed = [{value: "10px"}, {value: "20px"}, {value: "var(--size)"}];
 * isLengthValid("10px", allowed); // returns true
 * isLengthValid("var(--size)", allowed); // returns true
 * isLengthValid("30px", allowed); // returns false
 */
export const isLengthValid = (value: string, options: STYLE_OPTION[]): boolean => {

    if (isScalableValid(value, options)) return true;
    if (isNumberValid(value)) return true;
    if (isKeywordValid(value, options)) return true;
    if (isFunctionValid(value, options)) return true;

    return false;
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
 * Validates if a value is a valid CSS color
 * @param {string} value - The value to check (e.g., "red", "#ff0000", "rgb(255 0 0)")
 * @returns {boolean} - True if value matches color patterns
 */
export const isColorValid = (value: string): boolean => {
    return /^(#[0-9a-fA-F]{3,6}|rgb(a?)\([\d\s,.%]+\)|[a-zA-Z]+)$/.test(value);
};




/**
 * Validates if a CSS value matches any pattern in a syntax string.
 * Handles complex patterns including variants (||), multi-value patterns, and atomic types.
 * 
 * @param pattern - The syntax pattern to validate against (e.g., "length", "number/number")
 * @param input - The CSS value to validate (e.g., "10px", "16/9")
 * @param lengths - Optional array of valid length/keyword values for reference
 * @returns Whether the input matches any variant of the pattern
 * 
 * @example
 * // Atomic types
 * isSyntaxValid('length', '10px'); // true
 * isSyntaxValid('color', '#fff'); // true
 * 
 * // Multi-value patterns
 * isSyntaxValid('number/number', '16/9'); // true
 * isSyntaxValid('length keyword', '2px solid'); // true
 * 
 * // Variant patterns
 * isSyntaxValid('length || color', '50%'); // true
 * isSyntaxValid('auto || length', '10px'); // true
 * 
 * // With length references
 * isSyntaxValid('keyword', 'solid', [{ 
    syntax: 'keyword', value: 'solid' }]); // true
 */
export const isSyntaxValid = (value: string, options: STYLE_OPTION[]): boolean => {
    const option = getOptionByValue(value, options);
    if (!option) {
        devLog.error(`[isSyntaxValid] No matching option found for value: ${value}`);
        return false;
    }


    const optionType = option.type;
    if (optionType === 'generic') {
        const optionSyntax = option.syntax;
        const optionLengths = option.lengths || [option];

        const syntaxStr = optionSyntax.join('') as STYLE_OPTION_SYNTAX;
        switch (syntaxStr) {
            case 'length': return isLengthValid(value, optionLengths);
            case 'scalable': return isScalableValid(value, optionLengths);
            case 'number': return isNumberValid(value);
            case 'keyword': return isKeywordValid(value, optionLengths);
            case 'color': return isColorValid(value);
            case 'url': return isURLValid(value);
            default: {
                devLog.error(`No valid pattern for value: ${value} in syntax: ${optionSyntax}`);
                return false;
            }
        }
    }


    if (optionType === 'function') {
        return isFunctionValid(value, option);
    }


    return false;

}

/**
 * Validates if a CSS value matches any variant in a syntax-variant option.
 * Designed for options where syntax === 'variant' (contains multiple possible syntax patterns).
 * 
 * @param value - The CSS value to validate (e.g., "repeat", "10px 20px")
 * @param option - The style option containing variant definitions
 * @returns True if the value matches any variant syntax, false otherwise
 * 
 * @example
 * const option = {
 *   
syntax: 'variant',

 *   lengths: [
 *     { 
    syntax: 'keyword', value: 'repeat' },
 *     { 
syntax: 'length length', value: '10px 20px' }
 *   ]
 * };
 * isVariantValid('repeat', option); // true
 * isVariantValid('10px 20px', option); // true
 * isVariantValid('invalid', option); // false
 */
export const isVariantValid = (value: string, option: STYLE_OPTION): boolean => {
    if (!option || option.syntax !== 'variant') return false;
    if (!option.lengths?.length) return false;

    return option.lengths.some(variant => {
        return isSyntaxValid(value, variant);
    });
};



/**
 * Type guard function that checks if a property is a valid STYLE_PROPERTIES
 * 
 * @param {string} property - The property name to validate
 * @returns {property is STYLE_PROPERTIES} - Type predicate indicating whether the property is valid
 * 
 * @example
 * // Returns true if property is valid
 * isPropertyValid('backgroundColor'); // true if 'backgroundColor' exists in STYLE_CONSTANTS
 * 
 * // Returns false for invalid properties
 * isPropertyValid(''); // false
 * isPropertyValid('background-color'); // false
 * isPropertyValid('unknownProperty'); // false
 */
export const isPropertyValid = (property: string): property is STYLE_PROPERTIES => {
    // If property is not valid string
    if (typeof property !== 'string') {
        devLog.error(`Property: ${property} should be a string`);
        return false;
    }

    // Check if property exists in STYLE_CONSTANTS object
    return property in STYLE_CONSTANTS;
};

export const isValueValid = (property: STYLE_PROPERTIES, value: string): boolean => {
    // If value is not valid string
    if (typeof value !== 'string') {
        devLog.error(`[isValueValid] Value: ${value} should be non-empty string`);
        return false;
    }

    // If property is not valid
    if (!isPropertyValid(property)) {
        devLog.error(`Property: ${property} is not valid.`);
        return false;
    }

    // Get the options for the property from STYLE_CONSTANTS
    const options = STYLE_CONSTANTS[property]?.options;

    console.log(options);
    if (!options) {
        devLog.error(`[isValueValid] Property: ${property} has no options defined.`);
        return false;
    }

    return isSyntaxValid(value, options);
};










/**
 * Extracts and splits CSS syntax identifiers from a given input string.
 * Handles both parenthesized syntax (e.g., 'function(a,b,c)') and simple values.
 * 
 * @param input - The CSS syntax string to process
 * @example 
 * extractSyntaxTypes('fit-content(length,number,color)'); // Returns ['length', 'number', 'color']
 * extractSyntaxTypes('auto');                             // Returns ['auto']
 * extractSyntaxTypes('');                                 // Returns undefined
 * extractSyntaxTypes('linear-gradient(color,percentage)'); // Returns ['color', 'percentage']
 * 
 * @returns An array of identifiers if successful, undefined for empty input
 */
export const extractSyntaxTypes = (input: string): string[] | undefined => {
    if (!input) return undefined;

    // Extract content between parentheses if they exist
    const content = input.includes('(')
        ? extractBetween(input, '(', ')')
        : input;

    if (!content) return undefined;

    // Determine separator (defaults to space if none found)
    const separator = extractSeparator(content) || ' ';

    // Split and trim whitespace from each part
    return splitMultiValue(content, separator)
        ?.map(part => part.trim())
        .filter(part => part.length > 0);
};

/**
 * Finds which variant in a syntax string matches the given value.
 * 
 * @param value - The CSS value to validate (e.g., "10px", "auto")
 * @param variants - The variants array (e.g., ['number','number length'])
 * @param lengths - Optional array of valid lengths/keywords
 * @returns The index of the matching variant or null if no match found
 * 
 * @example
 * matchSyntaxVariant('10', ['number', 'number number']); // Returns 0
 * matchSyntaxVariant('16/9', ['number', 'number/number']); // Returns 1
 * matchSyntaxVariant('auto', ['number', 'color']); // Returns null
 */
export const matchSyntaxVariant = (value: string, variants: string[], lengths?: STYLE_OPTION[]): number | null => {

    if (!variants) {
        devLog.error(`Invalid variants: ${variants}`);
        return null;
    }

    // Check each variant until we find a match
    for (let i = 0; i < variants.length; i++) {
        if (isSyntaxValid(value, variants[i], lengths)) {
            return i;
        }
    }

    return null;
};

/**
 * Extracts syntax variants from a CSS style option.
 * 
 * @param option - The style option to process
 * @returns Array of syntax strings if valid, `undefined` if input is invalid
 * 
 * @example
 * getSyntaxVariants({
 *   
syntax: 'variant',
 
 *   lengths: [{ syntax: 'length', ... }, { syntax: 'percentage', ... }]
 * }); // Returns ['length', 'percentage']
 */
export const getSyntaxVariants = (option: STYLE_OPTION): string[] | undefined => {
    if (!option || option?.syntax !== 'variant') {
        devLog.error(('Invalid option or syntax value'));
        return undefined
    };


    if (!option?.lengths) {
        devLog.error(('Invalid option lengths'));
        return undefined
    }

    return option.lengths.map(length => length.syntax);

}







/**
 * Finds a style option from an array that matches the given value.
 * The matching logic differs based on whether the value is numeric or not.
 * 
 * @param {string} value - The style value to match against options. 
 *                         Examples: "100", "12px", "bold"
 * @param {STYLE_OPTION[]} options - Array of style options to search through.
 *                                  Example: [{value: "100", name: "Thin"}, 
 *                                           {value: "10px", name: "px"}]
 * 
 * @returns {STYLE_OPTION | undefined} The matching style option or undefined if not found.
 * 
 * @example
 * // Numeric value match
 * options = [{value: "100", name: "Thin"},{value: "200", name: "200"}]
 * getOptionByValue("100", options); * // returns {value: "100", name: "Thin"}
 * 
 * // Non-numeric value match
 * options = [{value: "10px", name: "Medium"}, *{value: "10rem", name: "Small"}]
 * getOptionByValue("10px", options); * // returns {value: "10px", name: "Small"}
 * 
 * // No match found
 * options = [{value: "normal", name: "Normal"}]
 * getOptionByValue("bold", options); * // returns undefined
*/
export const getOptionByValue = (value: string, options: STYLE_OPTION[]): STYLE_OPTION | undefined => {


    // Early return for invalid inputs
    if (!Array.isArray(options) || options.length === 0) {
        devLog.error('Options must be a non-empty array');
        return undefined;
    }

    // If there's only one option, return it immediately
    if (options.length === 1) return options[0];

    // Handle numeric values (like font-weight: 100, 200, etc.)
    if (isNumeric(value)) {
        return options.find(option => option.value === value);
    }

    // Handle other values by comparing extracted length values
    return options.find(option =>
        extractLength(option.value) === extractLength(value)
    );
};

export const getStyleVariables = (): Option[] => {
    return [
        { name: '--placeholder', value: 'var(--placeholder)' },
        { name: '--font-sm', value: 'var(--font-sm)' },
        { name: '--font-md', value: 'var(--font-md)' },
        { name: '--font-lg', value: 'var(--font-lg)' },
    ]
};

export const getStyleOptions = (property: PropertyKey): Property | undefined => {

    console.log(CSSPropertyDefs);
    return undefined;

};

