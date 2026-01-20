// Types
import type { PanelKey, TabKey, PanelDefinition, TabDefinition, PanelDefinitionRecord, TabDefinitionRecord } from '@/src/core/layout/panel/types';
import type { BenchKey } from '@/src/core/layout/workbench/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validatePanelDefinition, validateTabDefinition } from '@/src/core/layout/panel/helpers/validators';

/**
 * Class-based layout registry for managing panels, bars, and infos
 */
class PanelRegistry {
	private panels: PanelDefinitionRecord = {};
	private tabs: TabDefinitionRecord = {};

	/**
	 * Registers a LayoutPanel definition in the layout context.
	 * @param panel - The LayoutPanel definition to register.
	 * @returns Success status with optional error message
	 */
	registerPanel(panelDefinition: PanelDefinition): ValidateResult<PanelDefinition> {
		const validation = validatePanelDefinition(panelDefinition);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.panels[panelDefinition.key]) return { valid: false, message: `Panel with key "${panelDefinition.key}" already registered` };

		this.panels = { ...this.panels, [panelDefinition.key]: panelDefinition };
		return { valid: true, value: panelDefinition };
	}

	/**
	 * Registers a Tab definition in the layout context.
	 * @param tab - The Tab definition to register.
	 * @returns Success status with optional error message
	 */
	registerTab(tabDefinition: TabDefinition): ValidateResult<TabDefinition> {
		const validation = validateTabDefinition(tabDefinition);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.tabs[tabDefinition.key]) return { valid: false, message: `Tab with key "${tabDefinition.key}" already registered` };

		this.tabs = { ...this.tabs, [tabDefinition.key]: tabDefinition };
		return { valid: true, value: tabDefinition };
	}

	/**
	 * Retrieves all registered LayoutPanels.
	 */
	getRegisteredPanels(benchKey?: BenchKey): Readonly<PanelDefinitionRecord> {
		if (!benchKey) return { ...this.panels };

		return Object.fromEntries(Object.entries(this.panels).filter(([_, panel]) => panel.benchKey === benchKey));
	}

	getRegisteredPanel(panelKey: PanelKey): PanelDefinition | undefined {
		return this.panels[panelKey];
	}

	/**
	 * Retrieves all registered Tabs.
	 */
	getRegisteredTabs(panelKey?: PanelKey): Readonly<TabDefinitionRecord> {
		if (!panelKey) return { ...this.tabs };

		return Object.fromEntries(Object.entries(this.tabs).filter(([_, tab]) => tab.panelKey === panelKey));
	}

	getRegisteredTab(tabKey: TabKey): TabDefinition | undefined {
		return this.tabs[tabKey];
	}
}

// Create singleton instance and initialization tracking
const panelRegistry = new PanelRegistry();

// Export the registry instance methods
export const registerPanel = (panelDefinition: PanelDefinition) => panelRegistry.registerPanel(panelDefinition);
export const registerTab = (tabDefinition: TabDefinition) => panelRegistry.registerTab(tabDefinition);

export const getRegisteredPanels = (benchKey?: BenchKey) => panelRegistry.getRegisteredPanels(benchKey);
export const getRegisteredPanel = (panelKey: PanelKey) => panelRegistry.getRegisteredPanel(panelKey);

export const getRegisteredTabs = (panelKey?: PanelKey) => panelRegistry.getRegisteredTabs(panelKey);
export const getRegisteredTab = (tabKey: TabKey) => panelRegistry.getRegisteredTab(tabKey);
