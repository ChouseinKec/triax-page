// Types
import type { OrientationID, OrientationInstance } from '@/src/core/layout/page/types';
import type { FetchResult } from '@/src/shared/types/result';

// REGISTRY_DEFINITIONS
import { getRegisteredOrientation } from '@/src/core/layout/page/registry';

/**
 * Fetches an orientation instance from the orientation registry by its ID.
 * Returns a result object indicating success with the orientation data or failure with an error message.
 * @param orientationID - The unique identifier of the orientation to fetch
 * @returns FetchResult containing the orientation instance or error message
 * @example
 * fetchOrientation('portrait') → { success: true, data: OrientationInstance }
 * fetchOrientation('invalid-id') → { success: false, error: 'Orientation not found...' }
 */
export function fetchOrientation(orientationID: OrientationID): FetchResult<OrientationInstance> {
    const orientation = getRegisteredOrientation(orientationID);
    if (!orientation) return { success: false, error: `Orientation not found: '${orientationID}' does not exist in the orientation registry` };

    return { success: true, data: orientation };
}
