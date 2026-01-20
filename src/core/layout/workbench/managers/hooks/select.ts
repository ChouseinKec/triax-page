// Stores
import { useWorkbenchStore } from '@/src/core/layout/workbench/state/store';

// Types
import type { BenchKey, BenchDefinition } from '@/src/core/layout/workbench/types';

// Registry
import { getRegisteredBench } from '@/src/core/layout/workbench/state/registry';

/**
 * Reactive hook to get the currently selected workbench ID for page queries.
 * Returns the workbench identifier from the page store state.
 */
export function useSelectedBenchKey(): BenchKey {
	return useWorkbenchStore((state) => state.selectedKey);
}

/**
 *  Reactive hook to get the currently selected workbench definition for page queries.
 * Returns the workbench definition from the registry based on the selected workbench ID in the store.
 */
export function useSelectedBench(): BenchDefinition | undefined {
	const selectedKey = useWorkbenchStore((state) => state.selectedKey);
	return getRegisteredBench(selectedKey);
}
