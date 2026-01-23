// Stores
import { useViewEditorStore } from '@/core/layout/view/state/store';

// Types
import type { ViewKey, DataKey, DataValue } from '@/core/layout/view/types';

/**
 * Hook to set a state value for a specific view and state key.
 */
export function setData(viewKey: ViewKey, dataKey: DataKey, dataValue: DataValue) {
	const viewportStore = useViewEditorStore.getState();

	return viewportStore.setData(viewKey, dataKey, dataValue);
}
