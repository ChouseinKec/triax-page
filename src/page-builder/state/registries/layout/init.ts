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

	const results: Array<{ id: string; status: string; core: string }> = [];

	tabs.forEach((tab) => {
		const result = registerTab(tab);
		results.push({
			id: tab.id,
			status: result.success ? 'PASS' : `FAIL: ${result.error}`,
			core: 'tab',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
}

/**
 * Initialize and register core panels
 */
function initializePanels() {
	const panels = CorePanels.filter((panel): panel is PanelDefinition => panel !== null);
	if (panels.length === 0) return devLog.warn('[LayoutInit] No core panels found to register');

	const results: Array<{ id: string; status: string; core: string }> = [];

	panels.forEach((panel) => {
		const result = registerPanel(panel);
		results.push({
			id: panel.id,
			status: result.success ? 'PASS' : `FAIL: ${result.error}`,
			core: 'panel',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
}

/**
 * Initialize and register core bars
 */
function initializeBars() {
	const bars = CoreBars.filter((bar): bar is BarDefinition => bar !== null);
	if (bars.length === 0) return devLog.warn('[LayoutInit] No core bars found to register');

	const results: Array<{ id: string; status: string; core: string }> = [];

	bars.forEach((bar) => {
		const result = registerBar(bar);
		results.push({
			id: bar.id,
			status: result.success ? 'PASS' : `FAIL ${result.error}`,
			core: 'bar',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
}

/**
 * Initialize and register all core layout components
 */
export function initializeRegistry() {
	initializePanels();
	initializeBars();
	initializeTabs();
}

// Auto-initialize on module load
initializeRegistry();
