import { create } from 'zustand';

// Types
import type { DeviceKey } from '@/core/layout/page/types';
import type { OrientationKey } from '@/core/layout/page/types';
import type { PseudoKey } from '@/core/layout/page/types';

// Registry
import { getDefaultDeviceKey, getDefaultOrientationKey, getDefaultPseudoKey } from '@/core/layout/page/registries';

export type Selected = {
	deviceKey: DeviceKey;
	orientationKey: OrientationKey;
	pseudoKey: PseudoKey;
};

export type PageStore = {
	selected: Selected;
	setSelected: (selected: Partial<Selected>) => void;
};

/**
 * Creates the page store after initialization.
 * @returns The initialized Zustand store
 */
export function createPageStore() {
	return create<PageStore>()((set, get) => ({
		selected: {
			deviceKey: getDefaultDeviceKey(),
			orientationKey: getDefaultOrientationKey(),
			pseudoKey: getDefaultPseudoKey(),
		},
		/**
		 * Updates selected values. Accepts a partial Selected object.
		 */
		setSelected: (selected: Partial<Selected>) => {
			set((state) => ({
				selected: {
					...state.selected,
					...selected,
				},
			}));
		},
	}));
}

// Export a reference that will be set after initialization
export let usePageStore: ReturnType<typeof createPageStore>;

/**
 * Initialize the page store.
 */
export function initializePageStore(): Promise<void> {
	return new Promise((resolve) => {
		usePageStore = createPageStore();
		resolve();
	});
}
