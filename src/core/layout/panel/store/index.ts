import { create } from 'zustand';

// Types
import type { PanelInstance, PanelInstanceRecord, PanelKey, TabKey } from '@/src/core/layout/panel/types';

// Registry
import { getRegisteredPanels, getRegisteredTabs } from '@/src/core/layout/panel/registries';

export type PanelStore = {
	allPanels: PanelInstanceRecord;
	selectedTabs: Record<PanelKey, TabKey>;
	updatePanel: (panelKey: PanelKey, updates: Partial<PanelInstance>) => void;
	setSelectedTab: (panelKey: PanelKey, tabKey: string) => void;
};

/**
 * Creates the panel store.
 * @returns The initialized Zustand store
 */
export function createPanelStore() {
	return create<PanelStore>()((set, get) => ({
		// Initial state
		allPanels: Object.fromEntries(
			Object.values(getRegisteredPanels())
				.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
				.map((panelDef) => [
					panelDef.key,
					{
						key: panelDef.key,
						isOpen: panelDef.initialOpen ?? false,
						isLocked: panelDef.initialLocked ?? false,
						position: panelDef.initialPosition,
						size: panelDef.initialSize,
					},
				])
		),
		selectedTabs: Object.fromEntries(Object.values(getRegisteredPanels()).map((panelDef) => [panelDef.key, Object.keys(getRegisteredTabs(panelDef.key))[0] || ''])),

		// Panel actions
		updatePanel: (panelKey: PanelKey, updates: Partial<PanelInstance>) => {
			set((state) => {
				const panel = state.allPanels[panelKey];
				if (!panel) return state;

				return {
					allPanels: {
						...state.allPanels,
						[panelKey]: {
							...panel,
							...updates,
						},
					},
				};
			});
		},
		setSelectedTab: (panelKey: PanelKey, tabKey: string) => {
			set((state) => ({
				selectedTabs: {
					...state.selectedTabs,
					[panelKey]: tabKey,
				},
			}));
		},
	}));
}

// Export a reference that will be set after initialization
export let usePanelStore: ReturnType<typeof createPanelStore>;

/**
 * Initialize the panel store.
 */
export function initializePanelStore(): Promise<void> {
	return new Promise((resolve) => {
		usePanelStore = createPanelStore();
		resolve();
	});
}
