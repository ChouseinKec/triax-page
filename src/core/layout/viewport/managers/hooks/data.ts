// Stores
import { useViewportStore } from '@/src/core/layout/viewport/state/store';

// Types
import type { ViewKey, DataKey } from '@/src/core/layout/viewport/types';

/**
 * Hook to get a state value for a specific view and state key.
 */
export function useData(viewKey: ViewKey, dataKey: DataKey) {
	return useViewportStore((state) => state.data[viewKey]?.[dataKey]);
}
