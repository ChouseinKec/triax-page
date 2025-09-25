// Types
import type { PanelDefinition, BarDefinition, TabDefinition } from '@/src/page-builder/core/editor/layout/types';
import type { ValidationResult } from '@/src/shared/types/result';

// Helpers
import { validatePanel, validateTab, validateBar } from '@/src/page-builder/services/helpers/layout';

/**
 * Class-based layout registry for managing panels and bars
 */
class LayoutRegistry {
	private panels: Record<string, PanelDefinition> = {};
	private bars: Record<string, BarDefinition> = {};
	private tabs: Record<string, TabDefinition> = {};

	/**
	 * Registers a LayoutPanel definition in the layout context.
	 * @param panel - The LayoutPanel definition to register.
	 * @returns Success status with optional error message
	 */
	registerPanel(panel: PanelDefinition): ValidationResult {
		const validation = validatePanel(panel);
		if (!validation.success) return { success: false, error: validation.error };

		// Check for duplicates
		if (this.panels[panel.id]) {
			return { success: false, error: `Panel with id "${panel.id}" already registered` };
		}

		this.panels = { ...this.panels, [panel.id]: panel };
		return { success: true };
	}

	/**
	 * Registers a Tab definition in the layout context.
	 * @param tab - The Tab definition to register.
	 * @returns Success status with optional error message
	 */
	registerTab(tab: TabDefinition): ValidationResult {
		const validation = validateTab(tab);
		if (!validation.success) return { success: false, error: validation.error };

		// Check for duplicates
		if (this.tabs[tab.id]) {
			return { success: false, error: `Tab with id "${tab.id}" already registered` };
		}

		this.tabs = { ...this.tabs, [tab.id]: tab };
		return { success: true };
	}

	/**
	 * Registers a LayoutBar definition in the layout context.
	 * @param bar - The LayoutBar definition to register.
	 * @returns Success status with optional error message
	 */
	registerBar(bar: BarDefinition): ValidationResult {
		// Validate bar
		const validation = validateBar(bar);
		if (!validation.success) return { success: false, error: validation.error };

		// Check for duplicates
		if (this.bars[bar.id]) {
			return { success: false, error: `Bar with id "${bar.id}" already registered` };
		}

		// Register bar
		this.bars = { ...this.bars, [bar.id]: bar };
		return { success: true };
	}

	/**
	 * Retrieves all registered LayoutPanels.
	 */
	getRegisteredPanels(): Readonly<Record<string, PanelDefinition>> {
		return { ...this.panels };
	}

	/**
	 * Retrieves all registered LayoutBars.
	 */
	getRegisteredBars(): Readonly<Record<string, BarDefinition>> {
		return { ...this.bars };
	}

	/**
	 * Retrieves all registered Tabs.
	 */
	getRegisteredTabs(): Readonly<Record<string, TabDefinition>> {
		return { ...this.tabs };
	}

	/**
	 * Retrieves a specific panel by ID.
	 */
	getPanelById(id: string): PanelDefinition | undefined {
		return this.panels[id];
	}

	/**
	 * Retrieves a specific bar by ID.
	 */
	getBarById(id: string): BarDefinition | undefined {
		return this.bars[id];
	}

	/**
	 * Retrieves a specific tab by ID.
	 */
	getTabById(id: string): TabDefinition | undefined {
		return this.tabs[id];
	}
}

// Create singleton instance and initialization tracking
const layoutRegistry = new LayoutRegistry();

// Export the registry instance methods
export const registerPanel = (panel: PanelDefinition) => layoutRegistry.registerPanel(panel);
export const registerBar = (bar: BarDefinition) => layoutRegistry.registerBar(bar);
export const registerTab = (tab: TabDefinition) => layoutRegistry.registerTab(tab);
export const getRegisteredPanels = () => layoutRegistry.getRegisteredPanels();
export const getRegisteredBars = () => layoutRegistry.getRegisteredBars();
export const getRegisteredTabs = () => layoutRegistry.getRegisteredTabs();
export const getPanelById = (id: string) => layoutRegistry.getPanelById(id);
export const getBarById = (id: string) => layoutRegistry.getBarById(id);
export const getTabById = (id: string) => layoutRegistry.getTabById(id);
