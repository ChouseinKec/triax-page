
import { useMemo } from 'react';

// Types
import type { PanelInstance, PanelKey } from '@/core/layout/panel/types';
import type { BenchKey } from '@/core/layout/workbench/types';

// Stores
import { usePanelStore } from '@/core/layout/panel/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredPanel } from '@/core/layout/panel/registries';

// Helpers
import { validateBenchKey } from '@/core/layout/workbench/helpers';
import { validatePanelKey } from '@/core/layout/panel/helpers';

/**
 * Reactive hook to get all panel instances for a bench.
 * @param benchKey - The key of the bench
 * @param options - Optional filters
 */
export function usePanelInstances(benchKey: BenchKey, options?: { open?: boolean }): PanelInstance[] | undefined {
	const data = usePanelStore((state) => state.allPanels);

	const results = new ResultPipeline('[PanelManager → usePanelInstances]')
		.validate({
			benchKey: validateBenchKey(benchKey),
		})
		.execute();

	if (!results) return undefined;

	return useMemo(() => {
		return Object.values(data).filter((instance) => {
			const def = getRegisteredPanel(instance.key);

			if (!def || def.benchKey !== benchKey) return false;
			if (options?.open && !instance.isOpen) return false;

			return true;
		});
	}, [data, benchKey, options?.open]);
}

/**
 * Reactive hook to get a specific panel instance by key.
 * @param panelKey - The key of the panel
 */
export function usePanelInstance(panelKey: PanelKey): PanelInstance | undefined {
	const results = new ResultPipeline('[PanelManager → usePanelInstance]')
		.validate({
			panelKey: validatePanelKey(panelKey),
		})
		.execute();

	if (!results) return undefined;

	return usePanelStore((state) => state.allPanels[panelKey]);
}

/**
 * Optimized reactive hook to get the open state of a specific panel.
 * @param panelKey - The key of the panel
 */
export function usePanelOpenState(panelKey: PanelKey): boolean | undefined {
	const results = new ResultPipeline('[PanelManager → usePanelOpenState]')
		.validate({
			panelKey: validatePanelKey(panelKey),
		})
		.execute();

	if (!results) return undefined;

	return usePanelStore((state) => state.allPanels[panelKey]?.isOpen);
}

/**
 * Optimized reactive hook to get the locked state of a specific panel.
 * @param panelKey - The key of the panel
 */
export function usePanelLockedState(panelKey: PanelKey): boolean | undefined {
	const results = new ResultPipeline('[PanelManager → usePanelLockedState]')
		.validate({
			panelKey: validatePanelKey(panelKey),
		})
		.execute();

	if (!results) return undefined;

	return usePanelStore((state) => state.allPanels[panelKey]?.isLocked);
}
