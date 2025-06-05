// import { canCamelCase } from '@/utilities/string/validation';

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
export function extractBetween(input: string, startSymbol: string, endSymbol: string): string | null {
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
export function clearSpaces(input: string): string {
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
export function toCamelCase(input: string): string {
    // if (!canCamelCase(input)) {
    //     return input;
    // }

    const trimmedInput = input.trim();
    const _input = trimmedInput
        .replace(/[!@#$%^&*\- ]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase());
    return _input;
}
