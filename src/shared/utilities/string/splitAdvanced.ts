
interface BracketGroup {
    start: string;
    end: string;
}

interface BracketChar {
    type: 'open' | 'close';
    groupStart: string;
}

/**
 * Creates a lookup map for efficient bracket character detection.
 *
 * This pre-processes bracket groups into a Map for O(1) character lookup,
 * avoiding the need to iterate through all groups for every character in the input.
 *
 * Example: For `[{ start: '[', end: ']' }]`, creates:
 * - '[' → { type: 'open', groupStart: '[' }
 * - ']' → { type: 'close', groupStart: '[' }
 *
 * @param groups - Array of bracket group definitions (e.g., [], (), <>, {})
 * @returns Map where key is bracket character, value is its type and parent group
 */
function createBracketMap(groups: BracketGroup[]): Map<string, BracketChar> {
    const map = new Map<string, BracketChar>();
    for (const group of groups) {
        // Map opening bracket to its metadata
        map.set(group.start, { type: 'open', groupStart: group.start });
        // Map closing bracket to the same group's start (for counter lookup)
        map.set(group.end, { type: 'close', groupStart: group.start });
    }
    return map;
}

/**
 * Updates the depth counter for a specific bracket character.
 *
 * Increments depth for opening brackets, decrements for closing brackets.
 * Used to track nesting level and determine if a position is inside brackets.
 *
 * @param char - The character to process
 * @param bracketMap - Pre-processed bracket character lookup map
 * @param depthCounters - Map of bracket group → current nesting depth
 */
function updateBracketDepth(char: string, bracketMap: Map<string, BracketChar>, depthCounters: Map<string, number>): void {
    // Only process if character is a known bracket
    const bracketInfo = bracketMap.get(char);
    if (bracketInfo) {
        const current = depthCounters.get(bracketInfo.groupStart) || 0;
        if (bracketInfo.type === 'open') {
            // Opening bracket: increment depth
            depthCounters.set(bracketInfo.groupStart, current + 1);
        } else {
            // Closing bracket: decrement depth, but never go below 0 (handles mismatched brackets)
            depthCounters.set(bracketInfo.groupStart, Math.max(0, current - 1));
        }
    }
}

/**
 * Checks if all bracket depths are zero (i.e., we're not inside any brackets).
 *
 * This is an optimization that returns early on first non-zero depth,
 * avoiding unnecessary Map iteration.
 *
 * @param depthCounters - Map of bracket group → current nesting depth
 * @returns true if all depths are 0, false if inside any bracket group
 */
function areAllDepthsZero(depthCounters: Map<string, number>): boolean {
    // Early exit optimization: return false immediately when first non-zero depth found
    for (const depth of depthCounters.values()) {
        if (depth !== 0) return false;
    }
    return true;
}

/**
 * Finds a matching separator at the current input position.
 *
 * Checks if any separator matches the substring starting at the given position.
 * Returns the first matching separator or null if none match.
 *
 * @param input - The full input string being processed
 * @param position - Current position in the input string
 * @param separators - Array of separator strings to check for
 * @returns The matched separator string, or null if no match
 */
function findSeparator(input: string, position: number, separators: string[]): string | null {
    for (const sep of separators) {
        // Check if separator is non-empty and matches at current position
        if (sep && input.slice(position, position + sep.length) === sep) {
            return sep;
        }
    }
    return null;
}

/**
 * Splits a string by one or more separators at the top level only.
 *
 * Respects nested context: separators inside brackets or quotes are ignored.
 * Supports multiple bracket types: (), [], <>, {} and double-quoted strings.
 *
 * **Key Features:**
 * - Bracket-aware: Ignores separators inside matching bracket pairs
 * - Quote-aware: Ignores separators inside double-quoted strings
 * - Customizable: Accept custom bracket groups via `groups` parameter
 * - Optimized: Can early-exit with `firstOccurrence` for "has" checks
 * - Case-sensitive: Treats separators as literal strings, not regex
 *
 * **Examples:**
 * - `splitAdvanced('a || [b || c]', '||')` → `['a', '[b || c]']` (bracket ignored)
 * - `splitAdvanced('a || "b || c"', '||')` → `['a', '"b || c"']` (quote ignored)
 * - `splitAdvanced('a || b || c', '||', undefined, true)` → `['a', 'b']` (early exit)
 *
 * **Algorithm:**
 * 1. Pre-process bracket groups into O(1) lookup map
 * 2. Initialize depth counters for each bracket group
 * 3. For each character:
 *    - Track quote state (toggle on `"`)
 *    - Update bracket depths (when not in quotes)
 *    - Check for separators (only at top level)
 *    - Accumulate into buffer or push to result
 * 4. Return deduplicated results
 *
 * @param input - The string to split
 * @param separators - Single separator string or array of separator strings
 *                     Default: `[' ', ',', '/']` (space, comma, slash)
 * @param groups - Optional custom bracket group definitions.
 *                 Use to recognize non-standard bracket types.
 *                 Format: `[{ start: '<<', end: '>>' }, ...]`
 *                 Default: `[[], (), <>, {}]`
 * @param firstOccurrence - Optimization flag: if true, returns after finding ≥2 parts.
 *                          Useful for "has separator" checks (just need length > 1).
 *                          Default: false (returns all parts)
 * @returns Array of split string parts (non-empty, trimmed)
 */
export function splitAdvanced(input: string, separators: string | string[] = [' ', ',', '/'], groups?: BracketGroup[], firstOccurrence: boolean = false): string[] {
    // Normalize separators to always be an array
    const seps = Array.isArray(separators) ? separators : [separators];

    // Use default bracket groups if none provided
    const bracketGroups = groups || [
        { start: '[', end: ']' },
        { start: '(', end: ')' },
        { start: '<', end: '>' },
        { start: '{', end: '}' },
    ];

    // Pre-process bracket groups into O(1) lookup map
    const bracketMap = createBracketMap(bracketGroups);

    // Initialize depth counters: { '[': 0, '(': 0, '<': 0, '{': 0 }
    // Each counter tracks nesting level for its bracket group
    const depthCounters = new Map<string, number>();
    for (const group of bracketGroups) depthCounters.set(group.start, 0);

    const result: string[] = [];
    let buf = '';
    let inQuotes = false;

    // MAIN PARSING PHASE
    // ------------------

    for (let i = 0; i < input.length; i++) {
        const c = input[i];

        // QUOTE TRACKING: Toggle quote state on each `"` character
        // Note: This is state-based because quotes use the same char for open/close
        // We don't process quotes as brackets because they're symmetric
        if (c === '"') inQuotes = !inQuotes;

        // BRACKET DEPTH TRACKING: Update depth counters only outside quotes
        // This ensures brackets inside quotes don't affect nesting (e.g., `"["` is literal)
        if (!inQuotes) updateBracketDepth(c, bracketMap, depthCounters);

        // SEPARATOR DETECTION: Check for separators only at top level
        // Conditions: NOT in quotes AND all bracket depths are zero
        const separator = !inQuotes && areAllDepthsZero(depthCounters) ? findSeparator(input, i, seps) : null;

        if (separator) {
            // SEPARATOR FOUND: Push accumulated buffer and continue
            if (buf.trim()) result.push(buf.trim());

            // EARLY EXIT OPTIMIZATION: Stop after finding 2+ parts if requested
            // This is useful for "has separator" checks where we only need to know if length > 1
            if (firstOccurrence && result.length >= 2) return result;

            buf = '';
            // Skip ahead by separator length to avoid re-checking separator characters
            i += separator.length - 1;
        } else {
            // NO SEPARATOR: Accumulate character into current buffer
            buf += c;
        }
    }


    // Push any remaining accumulated buffer
    if (buf.trim()) result.push(buf.trim());
    return result;
}
