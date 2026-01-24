// Stores
import { useBenchEditorStore } from '@/core/layout/bench/state/store';

// Types
import type { BenchKey, DataKey, DataValue } from '@/core/layout/bench/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateBenchKey } from '@/core/layout/bench/helpers/validators';
import { validateString } from '@/shared/helpers';

/**
 * Gets a data value for a specific bench and data key.
 */
export function getData(benchKey: BenchKey, dataKey: DataKey): DataValue | undefined {
	const safeData = new ResultPipeline('[BenchHooks → useData]')
		.validate({
			benchKey: validateBenchKey(benchKey),
			dataKey: validateString(dataKey),
		})
		.execute();

	if (!safeData) return undefined;

	return useBenchEditorStore.getState().data[safeData.benchKey]?.[safeData.dataKey];
}
