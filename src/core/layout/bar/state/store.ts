import { create } from 'zustand';

// Types
import type { BarDefinition, BarID } from '@/core/layout/bar/types';
import type { BarRecord, BarActionInstance, BarActionID } from '@/core/layout/bar/types';

// Registry
import { getRegisteredBars } from '@/core/layout/bar/registries';

interface LayoutStore {
	allBars: BarRecord;

	registerBarAction: (barID: BarID, action: BarActionInstance) => void;
	unregisterBarAction: (barID: BarID, actionID: BarActionID) => void;
}

/**
 * Creates the layout store after REGISTRY_DEFINITIONS are initialized
 * @returns The initialized Zustand store
 */
export function createBarStore() {
	return create<LayoutStore>((set, get) => {
		// Build initial bars
		const initialBars: BarRecord = Object.fromEntries(
			Object.values(getRegisteredBars()).map((barDef: BarDefinition) => {
				return [barDef.id, { ...barDef, actions: {}, isOpen: true }];
			})
		);

		return {
			// Initial state
			allBars: initialBars,

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
export let useBarStore: ReturnType<typeof createBarStore>;

/**
 * Initialize the layout store after REGISTRY_DEFINITIONS are ready
 */
export function initializeBarStore(): Promise<void> {
	return new Promise((resolve) => {
		useBarStore = createBarStore();
		resolve();
	});
}
