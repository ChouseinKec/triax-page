// Stores
import { useLayoutStore } from '@/src/state/layout/layout';

// React
import { useMemo } from 'react';

// Types
import type {  BarID, BarActionInstance} from '@/src/core/layout/bar/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateBarID } from '@/src/core/layout/bar/helpers/validators';

/**
 * Reactive hook to get all action instances for a specific bar in layout queries.
 * Returns a memoized array of actions that updates when the bar's actions change.
 *
 * @param barID - The bar identifier
 * @returns Reactive array of action instances or undefined if bar not found
 *
 * @example
 * const actions = useBarActions('bar-123') // Returns reactive array of actions
 */
export function useBarActions(barID: BarID): BarActionInstance[] | undefined {
    const safeParams = useMemo(
        () =>
            new ResultPipeline('[LayoutQueries → useBarActions]')
                .validate({
                    barID: validateBarID(barID),
                })
                .execute(),
        [barID]
    );
    if (!safeParams) return undefined;

    const barActions = useLayoutStore((state) => {
        const barInstance = state.allBars[safeParams.barID];
        if (!barInstance) return undefined;

        return barInstance.actions;
    });
    if (!barActions) return undefined;

    return Object.values(barActions);
}
