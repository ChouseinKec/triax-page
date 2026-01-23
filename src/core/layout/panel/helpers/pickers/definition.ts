// Types
import type { PanelKey, PanelDefinition, RegisteredPanels } from '@/core/layout/panel/types';
import type { PickResult } from '@/shared/types/result';


/**
 * Picks a panel definition from the registry by key.
 * @param panelKey - The key of the panel
 * @returns The pick result with the panel definition or error
 */
export function pickPanelDefinition(panelKey: PanelKey, registeredPanelEditor: RegisteredPanels): PickResult<PanelDefinition> {
	const definition = registeredPanelEditor[panelKey];
	if (!definition) return { success: false, error: `Panel definition not found: '${panelKey}' does not exist in the panel registry` };

	return { success: true, data: definition };
}
