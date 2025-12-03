// Types
import type { OrientationID, OrientationInstance, OrientationRecord } from '@/src/core/layout/page/types';
import type { PickResult } from '@/src/shared/types/result';

/**
 * Fetches an orientation instance from the orientation registry by its ID.
 * @param orientationID - The unique identifier of the orientation to fetch
 * @param registeredOrientations - The record of registered orientations
 */
export function pickOrientation(orientationID: OrientationID, registeredOrientations: OrientationRecord): PickResult<OrientationInstance> {
	// Then find the specific orientation by ID
	const orientation = registeredOrientations[orientationID];
	if (!orientation) return { success: false, error: `Orientation not found: '${orientationID}' does not exist in the orientation registry` };

	// Return the found orientation
	return { success: true, data: orientation };
}
