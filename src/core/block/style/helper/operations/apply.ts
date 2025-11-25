// Types
import type { BlockStyles } from '@/src/core/block/instance/types';
import type { StyleKey } from '@/src/core/block/style/types';
import type { DeviceName, OrientationName, PseudoName } from '@/src/core/layout/page/types';
import type { OperationResult } from '@/src/shared/types/result';

import { findStyleShorthand } from '@/src/core/block/style/helper/finders';

/**
 * Apply a style value (supports shorthand) to a styles map immutably.
 */
export function applyStyle(styleKey: StyleKey, value: string, currentStyles: BlockStyles, deviceID: DeviceName, orientationID: OrientationName, pseudoID: PseudoName): OperationResult<BlockStyles> {
    try {
        const shorthandLookup = findStyleShorthand(styleKey);
        // If the style key is shorthand, expand to its longhands
        if (shorthandLookup.status === 'found') {
            const propertyUpdates: Partial<Record<StyleKey, string>> = {};
            shorthandLookup.data.forEach((shorthand) => (propertyUpdates[shorthand] = value));

            const out = {
                ...currentStyles,
                [deviceID]: {
                    ...currentStyles?.[deviceID],
                    [orientationID]: {
                        ...currentStyles?.[deviceID]?.[orientationID],
                        [pseudoID]: {
                            ...currentStyles?.[deviceID]?.[orientationID]?.[pseudoID],
                            ...propertyUpdates,
                        },
                    },
                },
            };

            return { success: true, data: out };
        }

        // Not a shorthand — apply directly
        const newStyles = {
            ...currentStyles,
            [deviceID]: {
                ...currentStyles?.[deviceID],
                [orientationID]: {
                    ...currentStyles?.[deviceID]?.[orientationID],
                    [pseudoID]: {
                        ...currentStyles?.[deviceID]?.[orientationID]?.[pseudoID],
                        [styleKey]: value,
                    },
                },
            },
        };

        return { success: true, data: newStyles };
    } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) };
    }
}
