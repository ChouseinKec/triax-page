import { useMemo } from 'react';

// Types
import type { PanelDefinition, PanelKey } from '@/core/layout/panel/types';
import type { BenchKey } from '@/core/layout/bench/types';

// Stores
import { usePanelStore } from '@/core/layout/panel/state/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateBenchKey } from '@/core/layout/bench/helpers';
import { validatePanelKey } from '@/core/layout/panel/helpers';

/**
 * Reactive hook to get all panels for a bench.
 * @param benchKey - The key of the bench
 * @param options - Optional filters
 */
export function usePanels(benchKey: BenchKey, options?: { open?: boolean }): PanelDefinition[] | undefined {
	const data = usePanelStore((state) => state.allPanels);

	const results = new ResultPipeline('[PanelManager → usePanels]')
		.validate({
			benchKey: validateBenchKey(benchKey),
		})
		.execute();

	if (!results) return undefined;

	return useMemo(() => {
		return Object.values(data).filter((panel) => {
			if (!panel || panel.benchKey !== benchKey) return false;
			if (options?.open && !panel.isOpen) return false;

			return true;
		});
	}, [data, benchKey, options?.open]);
}

/**
 * Reactive hook to get a specific panel by key.
 * @param panelKey - The key of the panel
 */
export function usePanel(panelKey: PanelKey): PanelDefinition | undefined {
	const results = new ResultPipeline('[PanelManager → usePanel]')
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