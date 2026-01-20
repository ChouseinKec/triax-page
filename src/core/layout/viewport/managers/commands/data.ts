// Stores
import { useViewportStore } from '@/src/core/layout/viewport/state/store';

// Types
import type { ViewKey, DataKey, DataValue } from '@/src/core/layout/viewport/types';

/**
 * Hook to set a state value for a specific view and state key.
 */
export function setData(viewKey: ViewKey, dataKey: DataKey, dataValue: DataValue) {
	const viewportStore = useViewportStore.getState();

	return viewportStore.setData(viewKey, dataKey, dataValue);
}
