// Stores
import { usePageStore } from '@/src/core/store';

// Types
import type { OrientationID } from '@/src/core/layout/page/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/pipeline/validation';

// Helpers
import { validateOrientationID } from '@/src/core/layout/page/helper/validators';

// Constants
import { DEFAULT_ORIENTATION_ID } from '@/src/core/layout/page/constants';

/**
 * Sets the currently selected orientation by ID for page commands.
 * Updates the page store with the new orientation selection.
 *
 * @param orientationID - The orientation ID to set as current
 * @returns void
 *
 * @example
 * setSelectedOrientationID('portrait') // Sets current orientation to portrait
 */
export function setSelectedOrientationID(orientationID: OrientationID): void {
	if (!orientationID) orientationID = DEFAULT_ORIENTATION_ID;

	const safeData = new ValidationPipeline('[PageCommands → setSelectedOrientationID]')
		.validate({
			orientationID: validateOrientationID(orientationID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelectedOrientationID(safeData.orientationID);
}
