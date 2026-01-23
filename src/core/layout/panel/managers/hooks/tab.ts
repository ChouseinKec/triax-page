// Types
import type { PanelKey } from '@/core/layout/panel/types';

// Stores
import { usePanelStore } from '@/core/layout/panel/state/store';

/**
 * Hook to get the selected tab for a panel.
 * @param panelKey - The key of the panel
 * @returns The selected tab ID or undefined
 */
export function useSelectedTab(panelKey: PanelKey): string | undefined {
	return usePanelStore((state) => state.selectedTabs[panelKey]);
}
