// Registry
import { registerPanel, registerBar, registerTab } from '.';

// Definitions
import { CorePanels } from '@/src/page-builder/config/layouts/panels';
import { CoreBars } from '@/src/page-builder/config/layouts/bars';
import { CoreTabs } from '@/src/page-builder/config/layouts/tabs';

// Types
import type { PanelDefinition, BarDefinition, TabDefinition } from '@/src/page-builder/core/editor/layout/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Initialize and register core tabs
 */
function initializeTabs() {
	const tabs = CoreTabs.filter((tab): tab is TabDefinition => tab !== null);
	if (tabs.length === 0) return devLog.warn('[LayoutInit] No core tabs found to register');

	devLog.info('[LayoutInit] Initializing Tabs:');

	tabs.forEach((tab) => {
		const result = registerTab(tab);
		if (result.success) {
			devLog.info(`         ${tab.id} registration successful.`);
		} else {
			devLog.error(`         ${tab.id} registration failed. ${result.error}`);
		}
	});
}

/**
 * Initialize and register core panels
 */
function initializePanels() {
	const panels = CorePanels.filter((panel): panel is PanelDefinition => panel !== null);
	if (panels.length === 0) return devLog.warn('[LayoutInit] No core panels found to register');

	devLog.info('[LayoutInit] Initializing Panels:');

	panels.forEach((panel) => {
		const result = registerPanel(panel);
		if (result.success) {
			devLog.info(`         ${panel.id} registration successful.`);
		} else {
			devLog.error(`         ${panel.id} registration failed. ${result.error}`);
		}
	});
}

/**
 * Initialize and register core bars
 */
function initializeBars() {
	const bars = CoreBars.filter((bar): bar is BarDefinition => bar !== null);
	if (bars.length === 0) return devLog.warn('[LayoutInit] No core bars found to register');

	devLog.info('[LayoutInit] Initializing Bars:');

	bars.forEach((bar) => {
		const result = registerBar(bar);
		if (result.success) {
			devLog.info(`         ${bar.id} registration successful.`);
		} else {
			devLog.error(`         ${bar.id} registration failed. ${result.error}`);
		}
	});
}

/**
 * Initialize and register all core layout components
 */
export async function initializeRegistry(): Promise<void> {
	return new Promise<void>((resolve) => {
		initializePanels();
		initializeBars();
		initializeTabs();
		resolve();
	});
}
