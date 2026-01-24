import { create } from 'zustand';

// Types
import type { StoredData } from '@/core/layout/view/types/data';

/**
 * The structure of the viewport store.
 */
export type ViewEditorStore = {
	data: StoredData;
};

/**
 * Creates the viewport store after REGISTRY_DEFINITIONS are initialized
 * @returns The initialized Zustand store
 */
export function createViewEditorStore() {
	return create<ViewEditorStore>((set, get) => {
		return {
			// Initial state
			data: {
				global: {
					selectedKeys: {
						main: 'block',
					},
				},
				block: {
					activeDeviceIDs: ['default', 'mobile-sm', 'mobile-lg', 'tablet-sm'],
				},
			},
		};
	});
}

// Export a reference that will be set after initialization
export let useViewEditorStore: ReturnType<typeof createViewEditorStore>;

/**
 * Initialize the viewport store after REGISTRY_DEFINITIONS are ready
 */
export function initViewEditorStore(): Promise<void> {
	return new Promise((resolve) => {
		useViewEditorStore = createViewEditorStore();
		resolve();
	});
}
