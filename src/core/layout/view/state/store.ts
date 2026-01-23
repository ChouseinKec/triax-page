import { create } from 'zustand';

// Types
import type { ViewKey } from '@/core/layout/view/types';
import type { BenchKey } from '@/core/layout/bench/types';
import type { DataDefinitionRecord, DataKey, DataValue } from '@/core/layout/view/types/data';

/**
 * The structure of the viewport store.
 */
export type ViewEditorStore = {
	selectedKeys: Record<BenchKey, ViewKey>;
	setSelectedKey: (benchKey: BenchKey, viewKey: ViewKey) => void;

	data: DataDefinitionRecord;
	getData: (viewKey: ViewKey, dataKey: DataKey) => DataValue | undefined;
	setData: (viewKey: ViewKey, dataKey: DataKey, dataValue: DataValue) => void;
};

/**
 * Creates the viewport store after REGISTRY_DEFINITIONS are initialized
 * @returns The initialized Zustand store
 */
export function createViewEditorStore() {
	return create<ViewEditorStore>((set, get) => {
		return {
			// Initial state
			selectedKeys: {
				main: 'block',
			},
			actions: {},
			data: {
				block: {
					activeDeviceIDs: ['default','mobile-sm','mobile-lg','tablet-sm'],
				},
			},

			/**
			 * Updates the selected view key for a specific bench.
			 */
			setSelectedKey: (benchKey: BenchKey, viewKey: ViewKey) => {
				set((state) => ({
					selectedKeys: {
						...state.selectedKeys,
						[benchKey]: viewKey,
					},
				}));
			},

			/**
			 * Gets a state value for a specific view and state key.
			 */
			getData: (viewKey: ViewKey, dataKey: DataKey) => {
				const state = get();
				return state.data[viewKey]?.[dataKey];
			},

			/**
			 * Sets a state value for a specific view and state key.
			 */
			setData: (viewKey: ViewKey, dataKey: DataKey, dataValue: DataValue) => {
				set((state) => ({
					data: {
						...state.data,
						[viewKey]: {
							...state.data[viewKey],
							[dataKey]: dataValue,
						},
					},
				}));
			},
		};
	});
}

// Export a reference that will be set after initialization
export let useViewEditorStore: ReturnType<typeof createViewEditorStore>;

/**
 * Initialize the viewport store after REGISTRY_DEFINITIONS are ready
 */
export function initViewEditorStore(): Promise<void> {
	return new Promise((resolve) => {
		useViewEditorStore = createViewEditorStore();
		resolve();
	});
}
