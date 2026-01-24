// Stores
import { useBenchEditorStore } from '@/core/layout/bench/state/store';

// Types
import type { BenchKey, DataKey, DataValue } from '@/core/layout/bench/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateString } from '@/shared/helpers';

// Helpers
import { validateBenchKey } from '@/core/layout/bench/helpers/validators';

/**
 * Sets a data value for a specific bench and data key.
 */
export function setData(benchKey: BenchKey, dataKey: DataKey, dataValue: DataValue) {
	const safeData = new ResultPipeline('[BenchCommands → setData]')
		.validate({
			benchKey: validateBenchKey(benchKey),
			dataKey: validateString(dataKey),
		})
		.execute();
	if (!safeData) return;

	useBenchEditorStore.setState((state) => ({
		data: {
			...state.data,
			[safeData.benchKey]: {
				...state.data[safeData.benchKey],
				[safeData.dataKey]: dataValue,
			},
		},
	}));
}