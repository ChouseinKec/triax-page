// Stores
import { useViewEditorStore } from '@/core/layout/view/state/store';

// Types
import type { ViewKey, DataKey } from '@/core/layout/view/types';

/**
 * Hook to get a state value for a specific view and state key.
 */
export function useData(viewKey: ViewKey, dataKey: DataKey) {
	return useViewEditorStore((state) => state.data[viewKey]?.[dataKey]);
}
