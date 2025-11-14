// Stores
import { useLayoutStore } from '@/src/core/layout/store';

// React
import { useMemo } from 'react';

// Types
import type {  BarID, BarActionInstance} from '@/src/core/layout/bar/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateBarID } from '@/src/core/layout/bar/helper/validators';

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
            new ValidationPipeline('[LayoutQueries → useBarActions]')
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
