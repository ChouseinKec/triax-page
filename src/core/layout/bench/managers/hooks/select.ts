// Stores
import { useBenchEditorStore } from '@/core/layout/bench/state/store';

// Types
import type { BenchKey, BenchDefinition } from '@/core/layout/bench/types';

// Registry
import { getRegisteredBench } from '@/core/layout/bench/state/registry';

/**
 * Reactive hook to get the currently selected workbench ID for page queries.
 * Returns the workbench identifier from the page store state.
 */
export function useSelectedBenchKey(): BenchKey {
	return useBenchEditorStore((state) => state.data.global.selectedKey as BenchKey);
}

/**
 *  Reactive hook to get the currently selected workbench definition for page queries.
 * Returns the workbench definition from the registry based on the selected workbench ID in the store.
 */
export function useSelectedBench(): BenchDefinition | undefined {
	const selectedKey = useBenchEditorStore((state) => state.data.global.selectedKey as BenchKey);
	return getRegisteredBench(selectedKey);
}
