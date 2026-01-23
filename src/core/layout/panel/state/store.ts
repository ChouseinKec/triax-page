import { create } from 'zustand';

// Types
import type { PanelDefinition, RegisteredPanels, PanelKey, TabKey } from '@/core/layout/panel/types';

// Registry
import { getRegisteredPanels, getRegisteredTabs } from '@/core/layout/panel/state/registry';

export type PanelStore = {
	allPanels: RegisteredPanels;
	selectedTabs: Record<PanelKey, TabKey>;

	updatePanel: (panelKey: PanelKey, updates: Partial<Pick<PanelDefinition, 'position' | 'size' | 'isOpen' | 'isLocked'>>) => void;
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
				.map((panelDef) => [panelDef.key, panelDef]),
		),
		selectedTabs: Object.fromEntries(Object.values(getRegisteredPanels()).map((panelDef) => [panelDef.key, Object.keys(getRegisteredTabs(panelDef.key))[0] || ''])),

		// Panel actions
		updatePanel: (panelKey: PanelKey, updates: Partial<Pick<PanelDefinition, 'position' | 'size' | 'isOpen' | 'isLocked'>>) => {
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
