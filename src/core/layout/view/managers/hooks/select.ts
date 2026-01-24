// Stores
import { useViewEditorStore } from '@/core/layout/view/state/store';

// Types
import type { ViewKey, ViewDefinition } from '@/core/layout/view/types';
import type { BenchKey } from '@/core/layout/bench/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateBenchKey } from '@/core/layout/bench/helpers/validators';
import { validateViewKey } from '@/core/layout/view/helpers/validators';

// Registry
import { getRegisteredView } from '@/core/layout/view/state/registry';

/**
 * Reactive hook to get the currently selected view key for a specific bench.
 * Returns the view identifier from the viewport store state for the given bench.
 */
export function useSelectedViewKey(benchKey: BenchKey): ViewKey | undefined {
	const safeData = new ResultPipeline('[ViewEditorHooks → useSelectedViewKey]')
		.validate({
			benchKey: validateBenchKey(benchKey),
		})
		.execute();
	if (!safeData) return undefined;

	return useViewEditorStore((state) => (state.data.global?.selectedKeys as Record<BenchKey, ViewKey> | undefined)?.[safeData.benchKey]);
}

export function useSelectedView(benchKey: BenchKey): ViewDefinition | undefined {
	const safeData = new ResultPipeline('[ViewEditorHooks → useSelectedViewKey]')
		.validate({
			benchKey: validateBenchKey(benchKey),
			viewKey: validateViewKey(useSelectedViewKey(benchKey)),
		})
		.execute();
	if (!safeData) return undefined;

	return getRegisteredView(safeData.viewKey);
}
