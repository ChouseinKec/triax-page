// Stores
import { useViewportStore } from '@/src/core/layout/viewport/state/store';

// Types
import type { ViewKey, ViewDefinition } from '@/src/core/layout/viewport/types';
import type { BenchKey } from '@/src/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';
import { validateBenchKey } from '@/src/core/layout/workbench/helpers/validators';

// Registry
import { getRegisteredView } from '@/src/core/layout/viewport/state/registry';

/**
 * Reactive hook to get the currently selected view key for a specific bench.
 * Returns the view identifier from the viewport store state for the given bench.
 */
export function useSelectedViewKey(benchKey: BenchKey): ViewKey | undefined {
	const safeData = new ResultPipeline('[ViewportHooks → useSelectedViewKey]')
		.validate({
			benchKey: validateBenchKey(benchKey),
		})
		.execute();
	if (!safeData) return undefined;

	return useViewportStore((state) => state.selectedKeys[safeData.benchKey]);
}

export function useSelectedView(benchKey: BenchKey): ViewDefinition | undefined {
	const viewKey = useSelectedViewKey(benchKey);
	if (!viewKey) return undefined;

	return getRegisteredView(viewKey);
}
