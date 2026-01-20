// Types
import type { ViewKey } from '@/src/core/layout/viewport/types';
import type { BenchKey } from '@/src/core/layout/workbench/types';

// Stores
import { useViewportStore } from '@/src/core/layout/viewport/state/store';

/**
 * Gets the currently selected view key for a specific bench from the viewport store.
 */
export function getSelectedView(benchKey: BenchKey): ViewKey | undefined {
	return useViewportStore.getState().selectedKeys[benchKey];
}