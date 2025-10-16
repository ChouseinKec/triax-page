// Registry
import { getRegisteredActions } from '@/src/page-builder/state/registries/page';

// React
import { useMemo } from 'react';

// Types
import type { BarActionInstance } from '@/src/page-builder/core/page/types/action';

/**
 * Reactive hook to get all page actions.
 * @returns Reactive array of action instances sorted by order
 * @example
 * const actions = usePageActions();
 */
export function usePageActions(): BarActionInstance[] {
	const actions = Object.values(getRegisteredActions()).sort((a, b) => a.order - b.order);
	return useMemo(() => actions, [actions]);
}
