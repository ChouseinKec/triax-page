// Registry
import { registerPanel, registerBar, registerTab, registerInfo } from '.';

// Definitions
import { CorePanels } from '@/src/page-builder/config/layouts/panels';
import { CoreBars } from '@/src/page-builder/config/layouts/bars';
import { CoreTabs } from '@/src/page-builder/config/layouts/tabs';
import { CoreInfos } from '@/src/page-builder/config/layouts/info';

// Types
import type { PanelDefinition, BarDefinition, TabDefinition, InfoDefinition } from '@/src/page-builder/core/editor/layout/types';

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
		if (result.valid) {
			devLog.info(`         ${tab.id} registration successful.`);
		} else {
			console.log(result.message);
			devLog.error(`         ${tab.id} registration failed. ${result.message}`);
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
		if (result.valid) {
			devLog.info(`         ${panel.id} registration successful.`);
		} else {
			devLog.error(`         ${panel.id} registration failed. ${result.message}`);
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
		if (result.valid) {
			devLog.info(`         ${bar.id} registration successful.`);
		} else {
			devLog.error(`         ${bar.id} registration failed. ${result.message}`);
		}
	});
}

/**
 * Initialize and register core infos
 */
function initializeInfos() {
	const infos = CoreInfos.filter((info): info is InfoDefinition => info !== null);
	if (infos.length === 0) return devLog.warn('[LayoutInit] No core infos found to register');

	devLog.info('[LayoutInit] Initializing Infos:');

	infos.forEach((info) => {
		const result = registerInfo(info);
		if (result.valid) {
			devLog.info(`         ${info.id} registration successful.`);
		} else {
			devLog.error(`         ${info.id} registration failed. ${result.message}`);
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
		initializeInfos();
		initializeTabs();
		resolve();
	});
}
