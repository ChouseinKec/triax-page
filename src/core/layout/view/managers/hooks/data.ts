// Stores
import { useViewEditorStore } from '@/core/layout/view/state/store';

// Types
import type { ViewKey, DataKey } from '@/core/layout/view/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateViewKey } from '@/core/layout/view/helpers/validators';
import { validateString } from '@/shared/helpers';

/**
 * Hook to get a state value for a specific view and state key.
 */
export function useData(viewKey: ViewKey, dataKey: DataKey) {
	const safeData = new ResultPipeline('[ViewCommands → setData]')
		.validate({
			viewKey: validateViewKey(viewKey),
			dataKey: validateString(dataKey),
		})
		.execute();
	if (!safeData) return;

	return useViewEditorStore((state) => state.data[safeData.viewKey]?.[safeData.dataKey]);
}
