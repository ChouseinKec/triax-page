import { create } from 'zustand';

// Types
import { PAGE_EDITOR_STORE } from '@/stores/page/types';

/**
 * Zustand store for managing page editor state, including device, orientation, and pseudo state.
 * Provides functions for selecting and manipulating the current device, orientation, and pseudo classes.
 */
const usePageStore = create<PAGE_EDITOR_STORE>()((set, get) => ({

}));

export default usePageStore;
