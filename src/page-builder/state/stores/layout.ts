import { create } from 'zustand';

// Types
import type { PanelID, PanelInstance, TabInstance, PanelRecord } from '@/src/page-builder/core/editor/layout/types';
import type { BarDefinition, BarID } from '@/src/page-builder/core/editor/layout/types';
import type { BarRecord, BarActionInstance, BarActionID } from '@/src/page-builder/core/editor/layout/types/bar';
import type { InfoDefinition, InfoID, InfoRecord, InfoDataInstance, InfoDataID } from '@/src/page-builder/core/editor/layout/types/info';

// Registry
import { getRegisteredPanels, getRegisteredTabs, getRegisteredBars, getRegisteredInfos } from '@/src/page-builder/state/registries/layout';

interface LayoutStoreState {
	layoutPanels: PanelRecord;
	layoutBars: BarRecord;
	layoutInfos: InfoRecord;

	updatePanel: (panelID: PanelID, updates: Partial<PanelInstance>) => void;
	getPanel: (panelID: PanelID) => PanelInstance | undefined;
	getBar: (barID: BarID) => BarRecord[BarID] | undefined;
	getInfo: (infoID: InfoID) => InfoRecord[InfoID] | undefined;
	registerBarAction: (barID: BarID, action: BarActionInstance) => void;
	unregisterBarAction: (barID: BarID, actionID: BarActionID) => void;
	registerInfoData: (infoID: InfoID, dataItem: InfoDataInstance) => void;
	unregisterInfoData: (infoID: InfoID, dataID: InfoDataID) => void;
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

		// Build initial infos
		const initialInfos: InfoRecord = Object.fromEntries(
			Object.values(getRegisteredInfos()).map((infoDef: InfoDefinition) => {
				return [infoDef.id, { ...infoDef, data: {} }];
			})
		);

		return {
			// Initial state
			layoutPanels: initialPanels,
			layoutBars: initialBars,
			layoutInfos: initialInfos,

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

			getInfo: (infoID: InfoID) => {
				return get().layoutInfos[infoID];
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

					const { [actionID]: _, ...restActions } = bar.actions;

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

			registerInfoData: (infoID: InfoID, dataItem: InfoDataInstance) => {
				set((state) => {
					const info = state.layoutInfos[infoID];
					if (!info) return state;

					const updatedData = {
						...info.data,
						[dataItem.id]: dataItem,
					};

					const sortedData = Object.fromEntries(
						Object.values(updatedData)
							.sort((a: InfoDataInstance, b: InfoDataInstance) => a.order - b.order)
							.map((item: InfoDataInstance) => [item.id, item])
					);

					return {
						layoutInfos: {
							...state.layoutInfos,
							[infoID]: {
								...info,
								data: sortedData,
							},
						},
					};
				});
			},

			unregisterInfoData: (infoID: InfoID, dataID: InfoDataID) => {
				set((state) => {
					const info = state.layoutInfos[infoID];
					if (!info || !info.data[dataID]) return state;

					const { [dataID]: _, ...restData } = info.data;

					const sortedData = Object.fromEntries(
						Object.values(restData)
							.sort((a: InfoDataInstance, b: InfoDataInstance) => a.order - b.order)
							.map((item: InfoDataInstance) => [item.id, item])
					);

					return {
						layoutInfos: {
							...state.layoutInfos,
							[infoID]: {
								...info,
								data: sortedData,
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
