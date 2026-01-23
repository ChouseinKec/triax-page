// Types
import type { PanelKey, TabKey, PanelDefinition, TabDefinition, RegisteredPanels, TabDefinitionRecord } from '@/core/layout/panel/types';
import type { BenchKey } from '@/core/layout/bench/types';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validatePanelDefinition, validateTabDefinition } from '@/core/layout/panel/helpers/validators';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Class-based layout registry for managing panels, bars, and infos
 */
class PanelRegistry {
	private panels: RegisteredPanels = {};
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
	 * Retrieves all registered LayoutPanelEditor.
	 */
	getRegisteredPanels(benchKey?: BenchKey): Readonly<RegisteredPanels> {
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
		let tabs = Object.entries(this.tabs);

		// Filter by panel key if provided
		if (panelKey) tabs = tabs.filter(([_, tab]) => tab.panelKey === panelKey);

		// Sort by tab order
		tabs.sort(([_, a], [__, b]) => a.order - b.order);

		return Object.fromEntries(tabs);
	}

	getRegisteredTab(tabKey: TabKey): TabDefinition | undefined {
		return this.tabs[tabKey];
	}
}

// Create singleton instance and initialization tracking
const panelRegistry = new PanelRegistry();

// Export the registry instance methods
export const registerPanel = (panelDefinition: PanelDefinition): void => {
	const result = panelRegistry.registerPanel(panelDefinition);
	if (!result.valid) devLog.error(`[Registry → Panel]    ❌ Failed: ${panelDefinition.key} - ${result.message}`);
};
export const registerPanels = (panelDefinitions: PanelDefinition[]) => panelDefinitions.forEach(registerPanel);
export const registerTab = (tabDefinition: TabDefinition): void => {
	const result = panelRegistry.registerTab(tabDefinition);
	if (!result.valid) devLog.error(`[Registry → Tab]      ❌ Failed: ${tabDefinition.key} - ${result.message}`);
};
export const registerTabs = (tabDefinitions: TabDefinition[]) => tabDefinitions.forEach(registerTab);

export const getRegisteredPanels = (benchKey?: BenchKey) => panelRegistry.getRegisteredPanels(benchKey);
export const getRegisteredPanel = (panelKey: PanelKey) => panelRegistry.getRegisteredPanel(panelKey);

export const getRegisteredTabs = (panelKey?: PanelKey) => panelRegistry.getRegisteredTabs(panelKey);
export const getRegisteredTab = (tabKey: TabKey) => panelRegistry.getRegisteredTab(tabKey);
