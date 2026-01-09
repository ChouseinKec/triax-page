import { create } from 'zustand';

// Types
import type { PanelID, PanelInstance, PanelTabInstance, PanelInstanceRecord } from '@/src/core/layout/panel/types';
import type { BarDefinition, BarID } from '@/src/core/layout/bar/types';
import type { BarRecord, BarActionInstance, BarActionID } from '@/src/core/layout/bar/types';

// Registry
import { getRegisteredPanels, getRegisteredPanelTabs } from '@/src/core/layout/panel/registries';
import { getRegisteredBars } from '@/src/core/layout/bar/registries';

interface LayoutStore {
	allPanels: PanelInstanceRecord;
	allBars: BarRecord;

	updatePanel: (panelID: PanelID, updates: Partial<PanelInstance>) => void;
	registerBarAction: (barID: BarID, action: BarActionInstance) => void;
	unregisterBarAction: (barID: BarID, actionID: BarActionID) => void;
}

/**
 * Creates the layout store after REGISTRY_DEFINITIONS are initialized
 * @returns The initialized Zustand store
 */
export function createLayoutStore() {
	return create<LayoutStore>((set, get) => {
		// Build initial panels
		const initialPanels: PanelInstanceRecord = (() => {
			const panels = getRegisteredPanels();
			const tabs = getRegisteredPanelTabs();

			// Sort panels by order (stable)
			const sortedPanels = Object.values(panels).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

			const panelEntries = sortedPanels.map((panelDef) => {
				// Collect and sort tabs belonging to this panel
				const relatedTabs = Object.values(tabs)
					.filter((tab) => tab.panelID === panelDef.id)
					.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

				const panelTabs = relatedTabs.reduce<Record<string, PanelTabInstance>>((acc, tab) => {
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
		const initialBars: BarRecord = Object.fromEntries(
			Object.values(getRegisteredBars()).map((barDef: BarDefinition) => {
				return [barDef.id, { ...barDef, actions: {}, isOpen: true }];
			})
		);

		return {
			// Initial state
			allPanels: initialPanels,
			allBars: initialBars,

			// Panel actions
			updatePanel: (panelID: PanelID, updates: Partial<PanelInstance>) => {
				set((state) => {
					const panel = state.allPanels[panelID];
					if (!panel) return state;

					return {
						allPanels: {
							...state.allPanels,
							[panelID]: {
								...panel,
								...updates,
							},
						},
					};
				});
			},

			registerBarAction: (barID: BarID, action: BarActionInstance) => {
				set((state) => {
					const bar = state.allBars[barID];
					if (!bar) return state;

					const updatedActions = {
						...bar.actions,
						[action.id]: action,
					};

					const sortedActions = Object.fromEntries(
						Object.values(updatedActions)
							.sort((a: BarActionInstance, b: BarActionInstance) => a.order - b.order)
							.map((act: BarActionInstance) => [act.id, act])
					);

					return {
						allBars: {
							...state.allBars,
							[barID]: {
								...bar,
								actions: sortedActions,
							},
						},
					};
				});
			},

			unregisterBarAction: (barID: BarID, actionID: BarActionID) => {
				set((state) => {
					const bar = state.allBars[barID];
					if (!bar || !bar.actions[actionID]) return state;

					const { [actionID]: _, ...restActions } = bar.actions;

					const sortedActions = Object.fromEntries(
						Object.values(restActions)
							.sort((a: BarActionInstance, b: BarActionInstance) => a.order - b.order)
							.map((act: BarActionInstance) => [act.id, act])
					);

					return {
						allBars: {
							...state.allBars,
							[barID]: {
								...bar,
								actions: sortedActions,
							},
						},
					};
				});
			},
		};
	});
}

// Export a reference that will be set after initialization
export let useLayoutStore: ReturnType<typeof createLayoutStore>;

/**
 * Initialize the layout store after REGISTRY_DEFINITIONS are ready
 */
export function initLayoutStore(): Promise<void> {
	return new Promise((resolve) => {
		useLayoutStore = createLayoutStore();
		resolve();
	});
}
