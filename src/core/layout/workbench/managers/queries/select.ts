// Types
import type { BenchKey } from '@/src/core/layout/workbench/types';

// Stores
import { useWorkbenchStore } from '@/src/core/layout/workbench/state/store';

/**
 * Gets the currently selected workbench ID from the page store for page queries.
 */
export function getSelectedWorkbench(): BenchKey {
	return useWorkbenchStore.getState().selectedKey;
}
