// Stores
import { usePageStore } from '@/src/state/layout/page';

// Types
import type { OrientationID } from '@/src/core/layout/page/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateOrientationID } from '@/src/core/layout/page/helpers/validators';

// Managers
import { getDefaultOrientationID } from '@/src/core/layout/page/managers/queries';

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
	if (!orientationID) orientationID = getDefaultOrientationID();

	const safeData = new ResultPipeline('[PageCommands → setSelectedOrientationID]')
		.validate({
			orientationID: validateOrientationID(orientationID),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelected({ orientationID: safeData.orientationID });
}
