import { create } from 'zustand';

// Types
import type { BenchKey } from '@/core/layout/bench/types';

// Registry
import { getDefaultBenchKey } from '@/core/layout/bench/state/registry';

export type BenchEditorStore = {
	selectedKey: BenchKey;
	setSelectedKey: (workbenchKey: BenchKey) => void;
};

/**
 * Creates the workbench store after initialization.
 * @returns The initialized Zustand store
 */
export function createBenchEditorStore() {
	return create<BenchEditorStore>()((set, get) => ({
		selectedKey: getDefaultBenchKey(),

		/**
		 * Updates the selected workbench key.
		 */
		setSelectedKey: (workbenchKey: BenchKey) => {
			set(() => ({
				selectedKey: workbenchKey,
			}));
		},
	}));
}

// Export a reference that will be set after initialization
export let useBenchEditorStore: ReturnType<typeof createBenchEditorStore>;

/**
 * Initialize the workbench store.
 */
export function initializeBenchEditorStore(): Promise<void> {
	return new Promise((resolve) => {
		useBenchEditorStore = createBenchEditorStore();
		resolve();
	});
}
