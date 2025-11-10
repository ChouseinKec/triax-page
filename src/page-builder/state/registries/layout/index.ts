// Types
import type { PanelDefinition, BarDefinition, TabDefinition, InfoDefinition } from '@/src/page-builder/core/editor/layout/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validatePanelDefinition, validateTabDefinition, validateBarDefinition } from '@/src/page-builder/services/helpers/layout';

/**
 * Class-based layout registry for managing panels, bars, and infos
 */
class LayoutRegistry {
	private panels: Record<string, PanelDefinition> = {};
	private bars: Record<string, BarDefinition> = {};
	private tabs: Record<string, TabDefinition> = {};
	private infos: Record<string, InfoDefinition> = {};

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
	registerTab(tab: TabDefinition): ValidateResult<TabDefinition> {
		const validation = validateTabDefinition(tab);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.tabs[tab.id]) {
			return { valid: false, message: `Tab with id "${tab.id}" already registered` };
		}

		this.tabs = { ...this.tabs, [tab.id]: tab };
		return { valid: true, value: tab };
	}

	/**
	 * Registers a LayoutBar definition in the layout context.
	 * @param bar - The LayoutBar definition to register.
	 * @returns Success status with optional error message
	 */
	registerBar(bar: BarDefinition): ValidateResult<BarDefinition> {
		// Validate bar
		const validation = validateBarDefinition(bar);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.bars[bar.id]) {
			return { valid: false, message: `Bar with id "${bar.id}" already registered` };
		}

		// Register bar
		this.bars = { ...this.bars, [bar.id]: bar };
		return { valid: true, value: bar };
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

	/**
	 * Registers a LayoutInfo definition in the layout context.
	 * @param info - The LayoutInfo definition to register.
	 * @returns Success status with optional error message
	 */
	registerInfo(info: InfoDefinition): ValidateResult<InfoDefinition> {
		// Check for duplicates
		if (this.infos[info.id]) {
			return { valid: false, message: `Info with id "${info.id}" already registered` };
		}

		// Register info
		this.infos = { ...this.infos, [info.id]: info };
		return { valid: true, value: info };
	}

	/**
	 * Retrieves all registered LayoutInfos.
	 */
	getRegisteredInfos(): Readonly<Record<string, InfoDefinition>> {
		return { ...this.infos };
	}

	/**
	 * Retrieves a specific info by ID.
	 */
	getInfo(id: string): InfoDefinition | undefined {
		return this.infos[id];
	}
}

// Create singleton instance and initialization tracking
const layoutRegistry = new LayoutRegistry();

// Export the registry instance methods
export const registerPanel = (panel: PanelDefinition) => layoutRegistry.registerPanel(panel);
export const registerBar = (bar: BarDefinition) => layoutRegistry.registerBar(bar);
export const registerTab = (tab: TabDefinition) => layoutRegistry.registerTab(tab);
export const registerInfo = (info: InfoDefinition) => layoutRegistry.registerInfo(info);
export const getRegisteredPanels = () => layoutRegistry.getRegisteredPanels();
export const getRegisteredBars = () => layoutRegistry.getRegisteredBars();
export const getRegisteredTabs = () => layoutRegistry.getRegisteredTabs();
export const getRegisteredInfos = () => layoutRegistry.getRegisteredInfos();
export const getPanelById = (id: string) => layoutRegistry.getPanelById(id);
export const getBarById = (id: string) => layoutRegistry.getBarById(id);
export const getTabById = (id: string) => layoutRegistry.getTabById(id);
export const getInfo = (id: string) => layoutRegistry.getInfo(id);
