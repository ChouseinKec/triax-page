// Types
import type { ViewKey } from '@/core/layout/view/types';
import type { BenchKey } from '@/core/layout/bench/types';

// Stores
import { useViewEditorStore } from '@/core/layout/view/state/store';

// Helpers
import { validateBenchKey } from '@/core/layout/bench/helpers/validators/bench';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateObject } from '@/shared/helpers';

/**
 * Gets the currently selected view key for a specific bench from the viewport store.
 */
export function getSelectedView(benchKey: BenchKey): ViewKey | undefined {
	const safeData = new ResultPipeline('[ViewEditorCommands → getSelectedView]')
		.validate({
			benchKey: validateBenchKey(benchKey),
			currentKeys: validateObject<Record<BenchKey, ViewKey>>(useViewEditorStore.getState().data.global?.selectedKeys),
		})
		.execute();
	if (!safeData) return undefined;

	return safeData.currentKeys[safeData.benchKey];
}
