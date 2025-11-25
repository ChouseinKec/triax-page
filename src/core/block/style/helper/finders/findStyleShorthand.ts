// Types
import type { StyleKey } from '@/src/core/block/style/types';
import type { FindResult } from '@/src/shared/types/result';

// Constants
import { STYLE_SHORTHAND_DEFINITIONS } from '@/src/core/block/style/constants';

/**
 * Lookup the longhand list for a shorthand StyleKey.
 * Returns a FindResult so callers can distinguish "not found" vs errors vs found data.
 */
export function findStyleShorthand(styleKey: StyleKey): FindResult<StyleKey[]> {
    try {
        const found = STYLE_SHORTHAND_DEFINITIONS[styleKey];
        if (!found) return { status: 'not-found' };
        return { status: 'found', data: found };
    } catch (err: any) {
        return { status: 'error', error: err?.message ?? String(err) };
    }
}
