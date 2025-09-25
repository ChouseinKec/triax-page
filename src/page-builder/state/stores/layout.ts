import { create } from 'zustand';

// Types
import type { PanelID, PanelInstance, TabInstance, PanelRecord } from '@/src/page-builder/core/editor/layout/types';
import type { BarDefinition, BarID } from '@/src/page-builder/core/editor/layout/types';
import type { BarInstance, BarRecord, ActionInstance, ActionID } from '@/src/page-builder/core/editor/layout/types/bar';

// Registry
import { getRegisteredPanels, getRegisteredTabs, getRegisteredBars } from '@/src/page-builder/state/registries/layout';

interface LayoutStoreState {
	layoutPanels: PanelRecord;
    
	layoutBars: BarRecord;

	updatePanel: (panelID: PanelID, updates: Partial<PanelInstance>) => void;

	updateBar: (barID: BarID, updates: Partial<BarInstance>) => void;
}

type LayoutStore = LayoutStoreState;

/**
 * Zustand store for layout management (panels and bars).
 * Provides state and actions for panels and bars with selective subscriptions.
 */
export const useLayoutStore = create<LayoutStore>((set, get) => {
	// Build initial panels
	const initialPanels: PanelRecord = (() => {
		const panels = getRegisteredPanels();
		const tabs = getRegisteredTabs();

		// Sort panels by order (stable)
		const sortedPanels = Object.values(panels).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

		const panelEntries = sortedPanels.map((panelDef) => {
			// Collect and sort tabs belonging to this panel
			const relatedTabs = Object.values(tabs)
				.filter((tab) => tab.panelID === panelDef.id)
				.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

			const panelTabs = relatedTabs.reduce<Record<string, TabInstance>>((acc, tab) => {
				acc[tab.id] = {
					id: tab.id,
					title: tab.title,
					render: () => tab.component,
					icon: () => tab.icon,
					order: tab.order,
				};
				return acc;
			}, {});

			return [
				panelDef.id,
				{
					...panelDef,
					tabs: panelTabs,
					isOpen: panelDef.initialOpen,
					isLocked: panelDef.initialLocked,
				},
			] as const;
		});

		return Object.fromEntries(panelEntries);
	})();

	// Build initial bars
	const initialBars: BarRecord = Object.fromEntries(Object.values(getRegisteredBars()).map((barDef: BarDefinition) => [barDef.id, { ...barDef, actions: {}, isOpen: true }]));

	return {
		// Initial state
		layoutPanels: initialPanels,
		layoutBars: initialBars,

		// Panel actions
		updatePanel: (panelID: PanelID, updates: Partial<PanelInstance>) => {
			set((state) => {
				const panel = state.layoutPanels[panelID];
				if (!panel) return state;

				return {
					layoutPanels: {
						...state.layoutPanels,
						[panelID]: {
							...panel,
							...updates,
						},
					},
				};
			});
		},

		// Bar actions
		updateBar: (barID: BarID, updates: Partial<BarInstance>) => {
			set((state) => {
				const bar = state.layoutBars[barID];
				if (!bar) return state;

				return {
					layoutBars: {
						...state.layoutBars,
						[barID]: {
							...bar,
							...updates,
						},
					},
				};
			});
		},
	};
});
