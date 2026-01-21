// Stores
import { usePageStore } from '@/state/layout/page';

// Types
import type { OrientationKey, OrientationDefinition } from '@/core/layout/page/types';

// Registry
import { getRegisteredOrientation } from '@/core/layout/page/registries';

/**
 * Reactive hook to get the currently selected orientation instance for page queries.
 */
export function useSelectedOrientation(): OrientationDefinition | undefined {
	const selectedOrientationKey = usePageStore((state) => state.selected.orientationKey);
	return getRegisteredOrientation(selectedOrientationKey);
}

/**
 * Reactive hook to get the currently selected orientation ID for page queries.
 */
export function useSelectedOrientationKey(): OrientationKey {
	return usePageStore((state) => state.selected.orientationKey);
}
