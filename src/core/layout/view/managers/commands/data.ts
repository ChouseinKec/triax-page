// Stores
import { useViewEditorStore } from '@/core/layout/view/state/store';

// Types
import type { ViewKey, DataKey, DataValue } from '@/core/layout/view/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateViewKey } from '@/core/layout/view/helpers/validators';
import { validateString } from '@/shared/helpers';

/**
 * Hook to set a state value for a specific view and state key.
 */
export function setData(viewKey: ViewKey, dataKey: DataKey, dataValue: DataValue) {
	const safeData = new ResultPipeline('[ViewCommands → setData]')
		.validate({
			viewKey: validateViewKey(viewKey),
			dataKey: validateString(dataKey),
		})
		.execute();
	if (!safeData) return;

	useViewEditorStore.setState((state) => ({
		data: {
			...state.data,
			[safeData.viewKey]: {
				...state.data[safeData.viewKey],
				[safeData.dataKey]: dataValue,
			},
		},
	}));
}
