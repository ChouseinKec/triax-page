// Types
import type { StyleKey } from '@/src/core/block/style/types';
import type { CheckResult } from '@/src/shared/types/result';

// Constants
import { STYLE_SHORTHAND_DEFINITIONS } from '@/src/core/block/style/constants';

/**
 * Determine whether a given style key has shorthand definitions.
 * Returns a CheckResult so callers can handle errors and boolean OK values the same way
 */
export function isStyleLonghand(styleKey: StyleKey): CheckResult {
    try {
        const ok = Boolean(STYLE_SHORTHAND_DEFINITIONS[styleKey]);
        return { success: true, ok };
    } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) };
    }
}
