import { create } from 'zustand';

// Types
import type { StoredData } from '@/core/layout/bench/types';

// Registry
import { getDefaultBenchKey } from '@/core/layout/bench/state/registry';

export type BenchEditorStore = {
	data: StoredData;
};

/**
 * Creates the bench store after initialization.
 * @returns The initialized Zustand store
 */
export function createBenchEditorStore() {
	return create<BenchEditorStore>((set, get) => {
		return {
			// Initial state
			data: {
				global: {
					selectedKey: getDefaultBenchKey(),
				},
			},
		};
	});
}

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
