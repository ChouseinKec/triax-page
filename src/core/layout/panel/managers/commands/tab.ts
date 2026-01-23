// Types
import type { PanelKey, TabKey } from '@/core/layout/panel/types';

// Stores
import { usePanelStore } from '@/core/layout/panel/state/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validatePanelKey } from '@/core/layout/panel/helpers';
import { validateTabKey } from '@/core/layout/panel/helpers';

/**
 * Sets the selected tab for a panel.
 * @param panelKey - The key of the panel
 * @param tabKey - The ID of the tab to select
 */
export function setSelectedTab(panelKey: PanelKey, tabKey: TabKey): void {
	// Validate and operate
	const results = new ResultPipeline('[PanelManager → setSelectedTab]')
		.validate({
			panelKey: validatePanelKey(panelKey),
			tabKey: validateTabKey(tabKey),
		})
		.execute();

	if (!results) return;

	usePanelStore.getState().setSelectedTab(results.panelKey, results.tabKey);
}
