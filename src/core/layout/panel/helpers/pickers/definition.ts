// Types
import type { PanelKey, PanelDefinition, PanelDefinitionRecord } from '@/core/layout/panel/types';
import type { PickResult } from '@/shared/types/result';


/**
 * Picks a panel definition from the registry by key.
 * @param panelKey - The key of the panel
 * @returns The pick result with the panel definition or error
 */
export function pickPanelDefinition(panelKey: PanelKey, registeredPanels: PanelDefinitionRecord): PickResult<PanelDefinition> {
	const definition = registeredPanels[panelKey];
	if (!definition) return { success: false, error: `Panel definition not found: '${panelKey}' does not exist in the panel registry` };

	return { success: true, data: definition };
}
