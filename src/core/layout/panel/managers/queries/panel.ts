// Stores
import { useLayoutStore } from '@/src/state/layout/layout';

// Types
import type { PanelID, PanelInstance } from '@/src/core/layout/panel/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validatePanelID } from '@/src/core/layout/panel/helpers/validators';
import { fetchPanel } from '@/src/core/layout/panel/helpers/fetchers';

/**
 * Gets a panel instance by its unique identifier for layout queries.
 * Retrieves the complete panel object from the layout store.
 *
 * @param panelID - The panel identifier
 * @returns The panel instance or undefined if not found or validation fails
 *
 * @example
 * const panel = getPanelById('panel-123') // Returns panel instance or undefined
 */
export function getPanelById(panelID: PanelID): PanelInstance | undefined {
	const layoutStore = useLayoutStore.getState();
	const safeParams = new ResultPipeline('[LayoutQueries → getPanelById]')
		.validate({
			panelID: validatePanelID(panelID),
		})
		.pick((data) => ({
			panel: fetchPanel(data.panelID, layoutStore.allPanels),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.panel;
}
