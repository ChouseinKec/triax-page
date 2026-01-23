// Types
import type { PanelKey, PanelDefinition, RegisteredPanels } from '@/core/layout/panel/types';
import type { PickResult } from '@/shared/types/result';


/**
 * Picks a panel from the record by key.
 * @param panelKey - The key of the panel
 * @param panels - The record of panels
 * @returns The pick result with the panel or error
 */
export function pickPanel(panelKey: PanelKey, panels: RegisteredPanels): PickResult<PanelDefinition> {
	const panel = panels[panelKey];
	if (!panel) return { success: false, error: `Panel not found: '${panelKey}' does not exist in the panel collection` };

	return { success: true, data: panel };
}