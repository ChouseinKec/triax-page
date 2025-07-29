import type { PanelDefinition } from '@/types/layout/panel';

const registry: Record<string, PanelDefinition> = {};

export function registerPanel(panel: PanelDefinition) {
	registry[panel.id] = panel;
}

export function getRegisteredPanels(): Record<string, PanelDefinition> {
	return registry;
}
