import { useMemo } from 'react';

// Types
import type { ActionDefinition } from '@/src/core/layout/page/types';

// Registry
import { getRegisteredPageActions } from '@/src/core/layout/page/registries';

/**
 * Reactive hook to get all page actions for page queries.
 * Returns a reactive array of action instances sorted by order.
 *
 * @returns Reactive array of action instances sorted by order
 *
 * @example
 * const actions = usePageActions() // Returns sorted array of page actions
 */
export function usePageActions(): ActionDefinition[] {
	const actions = Object.values(getRegisteredPageActions()).sort((a, b) => a.order - b.order);
	return useMemo(() => actions, [actions]);
}
