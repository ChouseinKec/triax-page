/**
 * Result of a variation matching operation.
 */
export interface MatchResult {
    /** The index of the variation that was fully matched, or -1 if no match. */
    full: number;
    /** The indices of variations that were partially matched. */
    partial: number[];
}

/**
 * Match modes for checkMatch:
 * - 'full'    — all tokens must be consumed (top-level validation)
 * - 'partial' — tokens may be exhausted before required slots are matched (autocomplete)
 * - 'inner'   — leftover tokens are allowed (group predicate: the slice may contain
 *               tokens for future repetitions), but required slots must still be satisfied
 */
export type MatchMode = 'full' | 'partial' | 'inner';
