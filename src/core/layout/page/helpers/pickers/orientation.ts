// Types
import type { OrientationKey, OrientationDefinition, OrientationDefinitionRecord } from '@/src/core/layout/page/types';
import type { PickResult } from '@/src/shared/types/result';

/**
 * Fetches an orientation instance from the orientation registry by its ID.
 * @param orientationKey - The unique identifier of the orientation to fetch
 * @param registeredOrientations - The record of registered orientations
 */
export function pickOrientation(orientationKey: OrientationKey, registeredOrientations: OrientationDefinitionRecord): PickResult<OrientationDefinition> {
	// Then find the specific orientation by ID
	const orientation = registeredOrientations[orientationKey];
	if (!orientation) return { success: false, error: `Orientation not found: '${orientationKey}' does not exist in the orientation registry` };

	// Return the found orientation
	return { success: true, data: orientation };
}
