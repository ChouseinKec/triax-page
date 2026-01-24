// Types
import type { BenchKey } from '@/core/layout/bench/types';

// Stores
import { useBenchEditorStore } from '@/core/layout/bench/state/store';

/**
 * Gets the currently selected workbench ID from the page store for page queries.
 */
export function getSelectedBenchEditor(): BenchKey {
	return useBenchEditorStore.getState().data.global.selectedKey as BenchKey;
}
