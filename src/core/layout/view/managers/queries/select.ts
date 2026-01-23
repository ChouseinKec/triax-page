// Types
import type { ViewKey } from '@/core/layout/view/types';
import type { BenchKey } from '@/core/layout/bench/types';

// Stores
import { useViewEditorStore } from '@/core/layout/view/state/store';

/**
 * Gets the currently selected view key for a specific bench from the viewport store.
 */
export function getSelectedView(benchKey: BenchKey): ViewKey | undefined {
	return useViewEditorStore.getState().selectedKeys[benchKey];
}