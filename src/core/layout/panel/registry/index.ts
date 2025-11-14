// Types
import type { PanelDefinition, PanelTabDefinition } from '@/src/core/layout/panel/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validatePanelDefinition, validatePanelTabDefinition } from '@/src/core/layout/panel/helper/validators';

/**
 * Class-based layout registry for managing panels, bars, and infos
 */
class PanelRegistry {
	private panels: Record<string, PanelDefinition> = {};
	private tabs: Record<string, PanelTabDefinition> = {};

	/**
	 * Registers a LayoutPanel definition in the layout context.
	 * @param panel - The LayoutPanel definition to register.
	 * @returns Success status with optional error message
	 */
	registerPanel(panel: PanelDefinition): ValidateResult<PanelDefinition> {
		const validation = validatePanelDefinition(panel);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.panels[panel.id]) {
			return { valid: false, message: `Panel with id "${panel.id}" already registered` };
		}

		this.panels = { ...this.panels, [panel.id]: panel };
		return { valid: true, value: panel };
	}

	/**
	 * Registers a Tab definition in the layout context.
	 * @param tab - The Tab definition to register.
	 * @returns Success status with optional error message
	 */
	registerPanelTab(tab: PanelTabDefinition): ValidateResult<PanelTabDefinition> {
		const validation = validatePanelTabDefinition(tab);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.tabs[tab.id]) {
			return { valid: false, message: `Tab with id "${tab.id}" already registered` };
		}

		this.tabs = { ...this.tabs, [tab.id]: tab };
		return { valid: true, value: tab };
	}

	/**
	 * Retrieves all registered LayoutPanels.
	 */
	getRegisteredPanels(): Readonly<Record<string, PanelDefinition>> {
		return { ...this.panels };
	}

	/**
	 * Retrieves all registered Tabs.
	 */
	getRegisteredPanelTabs(): Readonly<Record<string, PanelTabDefinition>> {
		return { ...this.tabs };
	}

	/**
	 * Retrieves a specific panel by ID.
	 */
	getPanelById(id: string): PanelDefinition | undefined {
		return this.panels[id];
	}

	/**
	 * Retrieves a specific tab by ID.
	 */
	getPanelTabById(id: string): PanelTabDefinition | undefined {
		return this.tabs[id];
	}
}

// Create singleton instance and initialization tracking
const panelRegistry = new PanelRegistry();

// Export the registry instance methods
export const registerPanel = (panel: PanelDefinition) => panelRegistry.registerPanel(panel);
export const registerPanelTab = (tab: PanelTabDefinition) => panelRegistry.registerPanelTab(tab);
export const getRegisteredPanels = () => panelRegistry.getRegisteredPanels();
export const getRegisteredPanelTabs = () => panelRegistry.getRegisteredPanelTabs();
export const getPanelById = (id: string) => panelRegistry.getPanelById(id);
export const getPanelTabById = (id: string) => panelRegistry.getPanelTabById(id);