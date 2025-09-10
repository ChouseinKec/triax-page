import type { PanelDefinition } from '@/editors/layout/types/components/panel';

const panelRegistry: Record<string, PanelDefinition> = {};

/**
 * Registers a panel definition in the layout context.
 * @param panel - The panel definition to register.
 */
export function registerPanel(panel: PanelDefinition) {
	panelRegistry[panel.id] = panel;
}

/**
 * Retrieves all registered panels.
 * @returns A record of panel definitions keyed by their IDs.
 */
export function getRegisteredPanels(): Record<string, PanelDefinition> {
	return panelRegistry;
}

