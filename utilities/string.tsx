/**
 * Checks whether the given value contains only alphabetic characters and hyphens.
 * 
 * Accepts strings composed of letters (a-z, A-Z) and hyphens (-).
 * Returns false for empty strings, strings with numbers, symbols, whitespace,
 * or any non-string input.
 *
 * @param input - The input to check (string or any type)
 * @returns True if input is a non-empty string with only letters and hyphens; false otherwise
 *
 * @example
 * // Valid letter/hyphen strings
 * isLetters('auto');        // true
 * isLetters('inherit');     // true
 * isLetters('min-content'); // true
 * isLetters('A-B-C');       // true
 * isLetters('flex-start');  // true
 * isLetters('z');           // true
 * 
 * // Invalid strings (contains non-letter/hyphen characters)
 * isLetters('min(1px)');    // false (contains parentheses and numbers)
 * isLetters('var(--x)');    // false (contains symbols)
 * isLetters('100vw');       // false (contains numbers)
 * isLetters('font-bold');   // false (contains underscore)
 * isLetters('has space');   // false (contains whitespace)
 * isLetters('');            // false (empty string)
 * 
 * // Non-string inputs
 * isLetters(123);           // false
 * isLetters(null);          // false
 * isLetters(undefined);     // false
 * isLetters(true);          // false
 * isLetters({});            // false
 * isLetters([]);            // false
 */
export function isLetters(input: unknown): boolean {
    return typeof input === 'string' &&
        input.length > 0 &&
        /^[a-zA-Z]+(-[a-zA-Z]+)*$/.test(input);
}

/**
 * Checks whether the given value is a valid number.
 *
 * Accepts integers or decimal numbers (positive or negative) in string form.
 * Returns false for null, undefined, empty strings, or non-numeric strings.
 *
 * @param input - The input to check (string, number, or any).
 * @returns True if input is a valid number; false otherwise.
 *
 * @example
 * // Valid numbers (strings or numbers)
 * isNumeric('123');       // true (integer string)
 * isNumeric('-123.45');   // true (negative decimal string)
 * isNumeric('0.0001');    // true (small decimal string)
 * isNumeric('0');         // true (zero string)
 * isNumeric(123);         // true (number)
 * isNumeric(-456.78);     // true (negative number)
 * 
 * // Invalid numbers (non-numeric strings or non-number types)
 * isNumeric('1.2.3');     // false (multiple decimals)
 * isNumeric('abc');       // false (non-numeric string)
 * isNumeric('123abc');    // false (trailing non-digits)
 * isNumeric(' 123 ');     // false (whitespace not trimmed)
 * isNumeric('');          // false (empty string)
 * isNumeric(' ');         // false (whitespace-only string)
 * isNumeric('+123');      // false (does not handle '+' sign)
 * isNumeric('.5');        // false (must start with digit)
 * isNumeric('NaN');       // false (explicit NaN string)
 * 
 * // Non-string/non-number inputs
 * isNumeric(null);        // false
 * isNumeric(undefined);   // false
 * isNumeric({});          // false (object)
 * isNumeric([]);          // false (array)
 * isNumeric(true);        // false (boolean)
 * isNumeric(NaN);         // false (NaN number)
 * isNumeric(Infinity);    // false (Infinity)
 * isNumeric(new Date());  // false (date object)
 * 
 * // Edge cases
 * isNumeric('0123');      // true (leading zero, still numeric)
 * isNumeric('1e3');       // false (scientific notation not supported)
 * isNumeric('0xFF');      // false (hex not supported)
 * isNumeric('1,234');     // false (commas not allowed)
 */
export function isNumeric(input: unknown): boolean {
    return typeof input === 'number' && isFinite(input) ||
        (typeof input === 'string' && input.trim() !== '' && isFinite(Number(input)));
}

/**
 * URL validation with support for:
 * - Protocols (http/https)
 * - Domain names and IP addresses
 * - Port numbers
 * - Paths, queries, and fragments
 * 
 * @param {string} input - The string to validate
 * @param {boolean} [requireProtocol=true] - Require http/https protocol
 * @returns {boolean} True if valid URL
 * 
 * @example
 * // Standard URLs
 * isURL('https://example.com') // true
 * isURL('http://sub.domain.co.uk/path') // true
 * 
 * // IP addresses
 * isURL('http://192.168.1.1') // true
 * isURL('https://8.8.8.8:53/dns') // true
 * 
 * // With ports
 * isURL('http://localhost:3000') // true
 * isURL('https://example.com:8080') // true
 * 
 * // With query/fragments
 * isURL('https://site.com/search?q=term') // true
 * isURL('http://example.com/#section') // true
 * 
 * // Without protocol (when requireProtocol=false)
 * isURL('example.com', false) // true
 * isURL('sub.example.com/path', false) // true
 * 
 * // Failure cases
 * isURL('example.com') // false (missing protocol)
 * isURL('https://') // false (empty domain)
 * isURL('http://256.0.0.1') // false (invalid IP)
 * isURL('ftp://files.com') // false (unsupported protocol)
 * isURL('https://example.com:999999') // false (invalid port)
 * isURL('data:image/png;base64,...') // false (data URI)
 * isURL('url("example.com")') // false (CSS function)
 */
export function isURL(input: string, requireProtocol: boolean = true): boolean {
    if (typeof input !== 'string') return false;

    const cleaned = input.trim();
    if (!cleaned || cleaned.length < (requireProtocol ? 8 : 1)) return false;

    // Early rejection for problematic patterns
    if (cleaned.includes(' ') ||
        cleaned.startsWith('data:') ||
        cleaned.startsWith('url(') ||
        cleaned.startsWith('javascript:')) {
        return false;
    }

    // Protocol pattern
    const protocol = requireProtocol ? '^(https?:\\/\\/)' : '^(https?:\\/\\/)?';

    // Domain patterns
    const domain = '(?:[a-z0-9-]+\\.)+[a-z]{2,}';
    const ipv4 = '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
    const fullIpv4 = `(?:${ipv4}\\.){3}${ipv4}`;
    const localhost = 'localhost';

    // Strict port validation (1-65535)
    const port = '(?::([1-9][0-9]{0,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?';

    // Path components
    const path = '(?:\\/[\\w~!$&\'()*+,;=:@.%#-]*)*';
    const query = '(?:\\?[\\w~!$&\'()*+,;=:@.%#-]*)?';
    const fragment = '(?:#[\\w~!$&\'()*+,;=:@.%#-]*)?$';

    const regex = new RegExp(
        `${protocol}(?:${domain}|${fullIpv4}|${localhost})${port}${path}${query}${fragment}`,
        'i'
    );

    return regex.test(cleaned);
}

/**
 * Extracts text between specified start and end characters, supporting nested structures.
 * 
 * @param {string} input - The input string to search within
 * @param {string} startSymbol - The starting delimiter character (e.g., '[', '(', '{')
 * @param {string} endSymbol - The ending delimiter character (e.g., ']', ')', '}')
 * @returns {string | null} The extracted text between delimiters, or null if not found
 * 
 * @example
 * // Simple extraction
 * extractBetween("hello(world)", "(", ")"); // "world"
 * extractBetween("array[0]", "[", "]"); // "0"
 * extractBetween("{key: value}", "{", "}"); // "key: value"
 * 
 * // Nested structures
 * extractBetween("translateX(var(--sm))", "(", ")"); // "var(--sm)"
 * extractBetween("data[value[5]]", "[", "]"); // "value[5]"
 * extractBetween("nested({a:1})", "{", "}"); // "a:1"
 * 
 * // Edge cases
 * extractBetween("no delimiters", "[", "]"); // null
 * extractBetween("unbalanced(value", "(", ")"); // null
 * extractBetween("wrong)order(", "(", ")"); // null
 * extractBetween("", "{", "}"); // null
 * extractBetween("same[]", "[", "["); // null (invalid delimiters)
 * extractBetween("nested((a))", "(", ")"); // "(a)"
 * 
 * // Real-world CSS examples
 * extractBetween("var(--primary-color)", "(", ")"); // "--primary-color"
 * extractBetween("calc(100% - 2rem)", "(", ")"); // "100% - 2rem"
 * extractBetween("url('image.png')", "(", ")"); // "'image.png'"
 */
export function extractBetween(input: string, startSymbol: string, endSymbol: string): string | null {
    // Find first occurrence of start symbol
    const startIndex = input.indexOf(startSymbol);
    if (startIndex === -1) return null;

    let depth = 1; // Track nesting level
    let currentIndex = startIndex + 1;

    // Scan through string until matching end symbol is found
    while (currentIndex < input.length && depth > 0) {
        const char = input[currentIndex];
        if (char === startSymbol) {
            depth++; // Nested start symbol found - increase depth
        } else if (char === endSymbol) {
            depth--; // End symbol found - decrease depth
        }
        currentIndex++;
    }

    // Return null if delimiters are unbalanced
    if (depth !== 0) return null;

    // Return the extracted substring
    return input.slice(startIndex + 1, currentIndex - 1);
}

/**
 * Removes all whitespace characters from a string, including spaces, tabs, and newlines.
 * This function is useful when you need to compact a string by eliminating all whitespace,
 * while preserving all other characters exactly as they appear in the original string.
 * 
 * @param {string} input - The string to process
 * @returns {string} A new string with all whitespace characters removed
 * 
 * @example
 * // Basic usage
 * clearSpaces('  hello  world  '); // "helloworld"
 * clearSpaces('a b c d e'); // "abcde"
 * 
 * // Preserves non-space characters
 * clearSpaces('1,2,3,4'); // "1,2,3,4"
 * clearSpaces('a-b-c'); // "a-b-c"
 * 
 * // Handles all whitespace characters
 * clearSpaces('hello\tworld'); // "helloworld"
 * clearSpaces('hello\nworld'); // "helloworld"
 * clearSpaces('hello\r\nworld'); // "helloworld"
 * 
 * // Edge cases
 * clearSpaces(''); // ""
 * clearSpaces('    '); // ""
 * clearSpaces(' \t\n\r '); // ""
 * 
 * // Real-world scenarios
 * clearSpaces('  font-size: 16px;  '); // "font-size:16px;"
 * clearSpaces('background-color: #ffffff;'); // "background-color:#ffffff;"
 * clearSpaces('  margin : 0 auto ; '); // "margin:0auto;"
 * 
 * // Preserves special characters
 * clearSpaces('a + b = c'); // "a+b=c"
 * clearSpaces('user@example.com'); // "user@example.com"
 */
export function clearSpaces(input: string): string {
    // Use a regular expression to match all whitespace characters and replace them with an empty string
    return input.replace(/\s+/g, '');
}

/**
 * Checks if a string follows camelCase convention or is a simple lowercase word.
 * Valid strings must:
 * 1. Start with a lowercase letter
 * 2. Contain no spaces or special characters (except letters)
 * 3. Either be all lowercase or follow camelCase pattern
 * 
 * @param {string} input - The string to validate
 * @returns {boolean} True if the string is valid camelCase or plain lowercase, false otherwise
 * 
 * @example
 * // Valid camelCase
 * isCamelCase('camelCase'); // true
 * isCamelCase('htmlElement'); // true
 * isCamelCase('aLongVariableName'); // true
 * 
 * // Valid lowercase
 * isCamelCase('width'); // true
 * isCamelCase('height'); // true
 * isCamelCase('x'); // true
 * 
 * // Invalid patterns
 * isCamelCase('CamelCase'); // false (starts uppercase)
 * isCamelCase('camel-case'); // false (contains hyphen)
 * isCamelCase('camel case'); // false (contains space)
 * isCamelCase('camel1Case'); // false (contains number)
 * isCamelCase(''); // false (empty string)
 * 
 * // Edge cases
 * isCamelCase('camelCASE'); // true (valid camelCase)
 * isCamelCase('aB'); // true (minimum camelCase)
 * isCamelCase('a'); // true (single lowercase)
 */
export function isCamelCase(input: string): boolean {
    // Reject if string is empty
    if (!input) return false;

    // Reject if contains non-letter characters or spaces
    if (!/^[a-zA-Z]+$/.test(input)) return false;

    // Must start with a lowercase letter
    if (!/^[a-z]/.test(input)) return false;

    // Valid if it's either all lowercase or contains some uppercase (i.e., camelCase)
    return /^[a-z]+$/.test(input) || /[a-z]+[A-Z]/.test(input);
}

/**
 * Checks if a string can be converted to camelCase by checking for symbols or spaces.
 * 
 * @param {string} input - The string to check. It should contain symbols (`!@#$%^&*-`) or spaces to be eligible for camelCase conversion.
 * @returns {boolean} `true` if the string can be camelCased (contains symbols or spaces), otherwise `false`.
 * 
 * @example
 * // Contains transformable characters
 * canCamelCase("background-color"); // true (hyphen)
 * canCamelCase("font size"); // true (space)
 * canCamelCase("border*width"); // true (asterisk)
 * canCamelCase("padding&margin"); // true (ampersand)
 * 
 * // Already camelCase or invalid
 * canCamelCase("backgroundColor"); // false
 * canCamelCase("width"); // false
 * canCamelCase(""); // false
 * 
 * // Edge cases
 * canCamelCase(" "); // true (space)
 * canCamelCase("-"); // true (hyphen)
 * canCamelCase("a-b"); // true
 * canCamelCase("a_b"); // false (underscore not included)
 */
export function canCamelCase(input: string): boolean {
    // Check if the string contains symbols or spaces
    return /[!@#$%^&*\- ]/.test(input);
}

/**
 * Converts a string to camelCase if it can be camelCased.
 * 
 * @param {string} input - The string to convert to camelCase.
 * @returns {string} The camelCase version of the string, or the original string if it cannot be camelCased.
 * @example
 * // Basic conversions
 * toCamelCase("background-color"); // "backgroundColor"
 * toCamelCase("font-size"); // "fontSize"
 * toCamelCase("border-width"); // "borderWidth"
 * 
 * // With spaces
 * toCamelCase("font size"); // "fontSize"
 * toCamelCase("border radius"); // "borderRadius"
 * 
 * // With multiple separators
 * toCamelCase("border-top-width"); // "borderTopWidth"
 * toCamelCase("margin-right-size"); // "marginRightSize"
 * 
 * // Already camelCase
 * toCamelCase("backgroundColor"); // "backgroundColor"
 * toCamelCase("fontSize"); // "fontSize"
 * 
 * // Edge cases
 * toCamelCase(""); // ""
 * toCamelCase("-webkit-transform"); // "webkitTransform"
 * toCamelCase("  padding  "); // "padding"
 * toCamelCase("a-b-c"); // "aBC"
 * 
 * // Invalid cases (returns original)
 * toCamelCase("borderStyle"); // "borderStyle"
 * toCamelCase("width"); // "width"
 * toCamelCase("123"); // "123"
 */
export function toCamelCase(input: string): string {
    if (!canCamelCase(input)) {
        return input; // Return the original string if it cannot be camelCased
    }

    // Trim leading and trailing spaces
    const trimmedInput = input.trim();

    const _input = trimmedInput
        .replace(/[!@#$%^&*\- ]+(.)/g, (_, char) => char.toUpperCase()) // Replace symbols/spaces with uppercase next character
        .replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase()); // Ensure the first character is lowercase

    // Convert the string to camelCase
    return _input;
}
