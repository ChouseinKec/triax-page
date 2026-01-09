// Stores
import { useLayoutStore } from '@/src/state/layout/layout';

// React
import { useMemo } from 'react';

// Types
import type { PanelInstance } from '@/src/core/layout/panel/types';
import type { WorkbenchKey } from '@/src/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateWorkbenchKey } from '@/src/core/layout/workbench/helpers';

/**
 * Reactive hook to get panel instances with optional workbench and open filters.
 * Returns a memoized array of panels based on options.
 *
 * @param workbenchKey - The workbench identifier to filter panels (used if options.workbench is true)
 * @param options - Optional configuration for filtering
 * @returns Reactive array of panel instances or undefined if validation fails
 *
 * @example
 * const allPanels = usePanels('workbench-123') // Returns all panels
 * const workbenchPanels = usePanels('workbench-123', { workbench: true }) // Returns panels for workbench
 * const openPanels = usePanels('workbench-123', { open: true }) // Returns all open panels
 * const openWorkbenchPanels = usePanels('workbench-123', { workbench: true, open: true }) // Returns open panels for workbench
 */
export function usePanels(workbenchKey: WorkbenchKey, options?: { workbench?: boolean; open?: boolean }): PanelInstance[] | undefined {
	const safeParams = useMemo(
		() =>
			new ResultPipeline('[LayoutQueries → usePanels]')
				.validate({
					workbenchKey: validateWorkbenchKey(workbenchKey),
				})
				.execute(),
		[workbenchKey]
	);
	if (!safeParams) return undefined;

	const allPanels = useLayoutStore((state) => state.allPanels);

	return useMemo(() => {
		let panels = Object.values(allPanels);

		if (options?.workbench) panels = panels.filter((panel) => panel.workbenchKey === safeParams.workbenchKey);

		if (options?.open) panels = panels.filter((panel) => panel.isOpen);

		return panels;
	}, [allPanels, safeParams.workbenchKey, options]);
}
