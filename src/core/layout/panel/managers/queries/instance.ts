// Types
import type { PanelKey } from '@/src/core/layout/panel/types';

// Store
import { usePanelStore } from '@/src/core/layout/panel/store';

/**
 * Retrieves the open state of a panel instance.
 * @param panelKey - The key of the panel instance
 * @returns True if the panel is open, false if closed, or undefined if the panel does not exist
 */
export function isPanelOpen(panelKey: PanelKey): boolean | undefined {
	return usePanelStore.getState().allPanels[panelKey]?.isOpen;
}

/**
 * Retrieves the locked state of a panel instance.
 * @param panelKey - The key of the panel instance
 * @returns True if the panel is locked, false if unlocked, or undefined if the panel does not exist
 */
export function isPanelLocked(panelKey: PanelKey): boolean | undefined {
	return usePanelStore.getState().allPanels[panelKey]?.isLocked;
}
