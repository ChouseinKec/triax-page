// Stores
import { useViewportStore } from '@/core/layout/viewport/state/store';

// Types
import type { ViewKey, ViewDefinition } from '@/core/layout/viewport/types';
import type { BenchKey } from '@/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { validateBenchKey } from '@/core/layout/workbench/helpers/validators';

// Registry
import { getRegisteredView } from '@/core/layout/viewport/state/registry';

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
