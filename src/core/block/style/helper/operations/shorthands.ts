// Types
import type { StyleKey } from '@/src/core/block/style/types';
import type { OperationResult } from '@/src/shared/types/result';

// Constants
import { STYLE_SHORTHAND_DEFINITIONS } from '@/src/core/block/style/constants';

export function resolveStyleShorthand(styleShorthands: string[]): OperationResult<string> {
    try {
        const filteredValues = styleShorthands.filter(Boolean);
        const uniqueValues = Array.from(new Set(filteredValues));
        const data = uniqueValues.length === 1 ? uniqueValues[0] : 'mixed';
        return { success: true, data };
    } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) };
    }
}
