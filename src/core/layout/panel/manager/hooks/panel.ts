// Stores
import { useLayoutStore } from '@/src/core/layout/store';

// React
import { useMemo } from 'react';

// Types
import type { PanelInstance } from '@/src/core/layout/panel/types';
import type { WorkbenchID } from '@/src/core/layout/workbench/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateWorkbenchID } from '@/src/core/layout/workbench/helper';

/**
 * Reactive hook to get all panel instances filtered by workbench for layout queries.
 * Returns a memoized array of panels associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter panels
 * @returns Reactive array of panel instances or undefined if validation fails
 *
 * @example
 * const panels = usePanelsByWorkbench('workbench-123') // Returns all panels for workbench
 */
export function usePanelsByWorkbench(workbenchID: WorkbenchID): PanelInstance[] | undefined {
    const safeParams = useMemo(
        () =>
            new ResultPipeline('[LayoutQueries → usePanelsByWorkbench]')
                .validate({
                    workbenchID: validateWorkbenchID(workbenchID),
                })
                .execute(),
        [workbenchID]
    );
    if (!safeParams) return undefined;

    const allPanels = useLayoutStore((state) => state.allPanels);

    return useMemo(() => {
        return Object.values(allPanels).filter((panel) => panel.workbenchID === safeParams.workbenchID);
    }, [allPanels, safeParams.workbenchID]);
}

/**
 * Reactive hook to get all open panel instances filtered by workbench for layout queries.
 * Returns a memoized array of panels that are currently open and associated with the specified workbench.
 *
 * @param workbenchID - The workbench identifier to filter panels
 * @returns Reactive array of open panel instances or undefined if validation fails
 *
 * @example
 * const openPanels = useOpenPanels('workbench-123') // Returns open panels for workbench
 */
export function useOpenPanels(workbenchID: WorkbenchID): PanelInstance[] | undefined {
    const safeParams = useMemo(
        () =>
            new ResultPipeline('[LayoutQueries → useOpenPanels]')
                .validate({
                    workbenchID: validateWorkbenchID(workbenchID),
                })
                .execute(),
        [workbenchID]
    );
    if (!safeParams) return undefined;

    const panels = useLayoutStore((state) => state.allPanels);

    return useMemo(() => {
        return Object.values(panels).filter((panel: PanelInstance) => panel.isOpen && panel.workbenchID === safeParams.workbenchID);
    }, [panels, safeParams.workbenchID]);
}
