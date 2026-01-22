import { create } from 'zustand';

// Types
import type { BenchKey } from '@/core/layout/workbench/types';

// Registry
import { getDefaultBenchKey } from '@/core/layout/workbench/state/registry';

export type WorkbenchStore = {
	selectedKey: BenchKey;
	setSelectedKey: (workbenchKey: BenchKey) => void;
};

/**
 * Creates the workbench store after initialization.
 * @returns The initialized Zustand store
 */
export function createWorkbenchStore() {
	return create<WorkbenchStore>()((set, get) => ({
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
export let useWorkbenchStore: ReturnType<typeof createWorkbenchStore>;

/**
 * Initialize the workbench store.
 */
export function initializeWorkbenchStore(): Promise<void> {
	return new Promise((resolve) => {
		useWorkbenchStore = createWorkbenchStore();
		resolve();
	});
}
