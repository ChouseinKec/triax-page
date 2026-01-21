// Stores
import { usePageStore } from '@/state/layout/page';

// Types
import type { OrientationKey } from '@/core/layout/page/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateOrientationKey } from '@/core/layout/page/helpers/validators';

// Managers
import { getDefaultOrientationKey } from '@/core/layout/page/managers/queries';

/**
 * Sets the currently selected orientation by ID for page commands.
 * Updates the page store with the new orientation selection.
 *
 * @param orientationKey - The orientation ID to set as current
 */
export function setSelectedOrientationKey(orientationKey: OrientationKey): void {
	if (!orientationKey) orientationKey = getDefaultOrientationKey();

	const safeData = new ResultPipeline('[PageCommands → setSelectedOrientationKey]')
		.validate({
			orientationKey: validateOrientationKey(orientationKey),
		})
		.execute();
	if (!safeData) return;

	usePageStore.getState().setSelected({ orientationKey: safeData.orientationKey });
}
