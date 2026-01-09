import { create } from 'zustand';

// Types
import type { WorkbenchKey } from '@/src/core/layout/workbench/types';
import type { DeviceID } from '@/src/core/layout/page/types';
import type { OrientationID } from '@/src/core/layout/page/types';
import type { PseudoID } from '@/src/core/layout/page/types';

// Constants
import { DEFAULT_DEVICE_ID, DEFAULT_ORIENTATION_ID, DEFAULT_PSEUDO_ID } from '@/src/core/layout/page/constants';
import { DEFAULT_WORKBENCH_ID } from '@/src/core/layout/workbench/constants';

export type Selected = {
	deviceID: DeviceID;
	orientationID: OrientationID;
	pseudoID: PseudoID;
	workbenchKey: WorkbenchKey;
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
			deviceID: DEFAULT_DEVICE_ID,
			orientationID: DEFAULT_ORIENTATION_ID,
			pseudoID: DEFAULT_PSEUDO_ID,
			workbenchKey: DEFAULT_WORKBENCH_ID,
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
