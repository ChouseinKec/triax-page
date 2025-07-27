/**
 * Checks if the input contains only alphabetic characters and hyphens.
 * Accepts non-empty strings with letters (a-z, A-Z) and hyphens (-).
 * Returns false for empty strings, numbers, symbols, whitespace, or non-string input.
 */
export function isLetters(input: unknown): boolean {
    return typeof input === 'string' &&
        input.length > 0 &&
        /^[a-zA-Z]+(-[a-zA-Z]+)*$/.test(input);
}

/**
 * Checks if the input is a valid number (integer or decimal, positive or negative).
 * Accepts numbers or numeric strings. Rejects empty, non-numeric, or non-string/number input.
 */
export function isNumeric(input: unknown): boolean {
    return typeof input === 'number' && isFinite(input) ||
        (typeof input === 'string' && input.trim() !== '' && isFinite(Number(input)));
}

/**
 * Validates a URL string. Supports http/https, domain names, IPs, ports, paths, queries, and fragments.
 * @param requireProtocol - If true, require http/https protocol (default: true).
 */
export function isURL(input: string, requireProtocol: boolean = true): boolean {
    if (typeof input !== 'string') return false;
    const cleaned = input.trim();
    if (!cleaned || cleaned.length < (requireProtocol ? 8 : 1)) return false;
    if (cleaned.includes(' ') ||
        cleaned.startsWith('data:') ||
        cleaned.startsWith('url(') ||
        cleaned.startsWith('javascript:') ||
        cleaned.startsWith('vbscript:')) {
        return false;
    }
    const protocol = requireProtocol ? '^(https?:\\/\\/)' : '^(https?:\\/\\/)?';
    const domain = '(?:[a-z0-9-]+\\.)+[a-z]{2,}';
    const ipv4 = '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
    const fullIpv4 = `(?:${ipv4}\\.){3}${ipv4}`;
    const localhost = 'localhost';
    const port = '(?::([1-9][0-9]{0,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?';
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
 * Checks if a string is camelCase or a simple lowercase word.
 * Must start with a lowercase letter, contain only letters, and have no spaces or symbols.
 */
export function isCamelCase(input: string): boolean {
    if (!input) return false;
    if (!/^[a-zA-Z]+$/.test(input)) return false;
    if (!/^[a-z]/.test(input)) return false;
    return /^[a-z]+$/.test(input) || /[a-z]+[A-Z]/.test(input);
}

/**
 * Checks if a string contains symbols or spaces and can be converted to camelCase.
 */
export function canCamelCase(input: string): boolean {
    return /[!@#$%^&*\- ]/.test(input);
}
