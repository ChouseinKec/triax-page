import { create } from 'zustand';

// Types
import type { PanelID, PanelInstance, TabInstance, PanelRecord } from '@/src/page-builder/core/editor/layout/types';
import type { BarDefinition, BarID } from '@/src/page-builder/core/editor/layout/types';
import type { BarRecord, BarActionInstance, BarActionID } from '@/src/page-builder/core/editor/layout/types/bar';

// Registry
import { getRegisteredPanels, getRegisteredTabs, getRegisteredBars } from '@/src/page-builder/state/registries/layout';

interface LayoutStoreState {
	layoutPanels: PanelRecord;
	layoutBars: BarRecord;

	updatePanel: (panelID: PanelID, updates: Partial<PanelInstance>) => void;
	getPanel: (panelID: PanelID) => PanelInstance | undefined;
	getBar: (barID: BarID) => BarRecord[BarID] | undefined;
	registerBarAction: (barID: BarID, action: BarActionInstance) => void;
	unregisterBarAction: (barID: BarID, actionID: BarActionID) => void;
}
type LayoutStore = LayoutStoreState;

/**
 * Creates the layout store after registries are initialized
 * @returns The initialized Zustand store
 */
export function createLayoutStore() {
	return create<LayoutStore>((set, get) => {
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
		const initialBars: BarRecord = Object.fromEntries(
			Object.values(getRegisteredBars()).map((barDef: BarDefinition) => {
				return [barDef.id, { ...barDef, actions: {}, isOpen: true }];
			})
		);

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

			getPanel: (panelID: PanelID) => {
				return get().layoutPanels[panelID];
			},

			getBar: (barID: BarID) => {
				return get().layoutBars[barID];
			},

			registerBarAction: (barID: BarID, action: BarActionInstance) => {
				set((state) => {
					const bar = state.layoutBars[barID];
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
						layoutBars: {
							...state.layoutBars,
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
					const bar = state.layoutBars[barID];
					if (!bar || !bar.actions[actionID]) return state;

					const { ...restActions } = bar.actions;

					const sortedActions = Object.fromEntries(
						Object.values(restActions)
							.sort((a: BarActionInstance, b: BarActionInstance) => a.order - b.order)
							.map((act: BarActionInstance) => [act.id, act])
					);

					return {
						layoutBars: {
							...state.layoutBars,
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
 * Initialize the layout store after registries are ready
 */
export function initializeLayoutStore(): Promise<void> {
	return new Promise((resolve) => {
		useLayoutStore = createLayoutStore();
		resolve();
	});
}
