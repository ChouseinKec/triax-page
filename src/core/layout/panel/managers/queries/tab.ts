// Types
import type { PanelKey } from '@/src/core/layout/panel/types';

// Stores
import { usePanelStore } from '@/src/core/layout/panel/store';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validatePanelKey } from '@/src/core/layout/panel/helpers';

/**
 * Gets the selected tab for a panel.
 * @param panelKey - The key of the panel
 * @returns The selected tab ID or undefined
 */
export function getSelectedTab(panelKey: PanelKey): string | undefined {
	const panelStore = usePanelStore.getState();

	// Validate and pick
	const results = new ResultPipeline('[PanelQueries → getSelectedTab]')
		.validate({
			panelKey: validatePanelKey(panelKey),
		})

		.execute();
	if (!results) return undefined;

	return panelStore.selectedTabs[results.panelKey];
}
