import { useCallback } from 'react';

// Context
import { useLayoutContext } from '@/context/layout';

// Types
import type { PanelTabInstance } from '@/types/layout/panel';

/**
 * useLayoutManager
 * Custom hook for managing layout panels and their tabs.
 * Provides helpers for retrieving, toggling, and updating panels and tabs.
 * @returns Object with panel management methods
 */
export const useLayoutManager = () => {
	// Get panel state and actions from context
	const {
		//
		panels: panelMap,
		togglePanel: contextTogglePanel,
		registerPanelTab: contextRegisterTab,
		unregisterPanelTab: contextUnregisterTab,
	} = useLayoutContext();

	/**
	 * Get all registered panels.
	 * @returns Array of all panel instances.
	 */
	const getAllPanels = useCallback(() => {
		return Object.values(panelMap);
	}, [panelMap]);

	/**
	 * Get all open panels.
	 * @returns Array of panel instances where isOpen is true.
	 */
	const getOpenPanels = useCallback(() => {
		return Object.values(panelMap).filter((panel) => panel.isOpen);
	}, [panelMap]);

	/**
	 * Toggle the open/closed state of a panel.
	 * @param panelId - The ID of the panel to toggle.
	 * @returns The new open state of the panel, or undefined if not found.
	 */
	const togglePanel = useCallback(
		(panelId: string) => {
			contextTogglePanel(panelId);
		},
		[contextTogglePanel]
	);

	/**
	 * Register (add) a new tab to a panel.
	 * @param panelId - The ID of the panel to add the tab to.
	 * @param tab - The PanelTabInstance to add.
	 */
	const registerTab = useCallback(
		(panelId: string, tab: PanelTabInstance) => {
			contextRegisterTab(panelId, tab);
		},
		[contextRegisterTab]
	);

	/**
	 * Unregister (remove) a tab from a panel.
	 * @param panelId - The ID of the panel to remove the tab from.
	 * @param tabId - The ID of the tab to remove.
	 */
	const unregisterTab = useCallback(
		(panelId: string, tabId: string) => {
			contextUnregisterTab(panelId, tabId);
		},
		[contextUnregisterTab]
	);

	// Expose panel management methods
	return {
		getAllPanels,
		getOpenPanels,
		togglePanel,
		registerTab,
		unregisterTab,
	};
};
