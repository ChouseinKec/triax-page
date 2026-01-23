// Auto-imports for config/ and plugins/
import '@/auto-imports';

// Store initialization functions
import { initializeBlockStore } from '@/state/block/block';
import { initializePageStore } from '@/state/layout/page';
import { initializeBenchEditorStore } from '@/core/layout/bench/state/store';
import { initializePanelStore } from '@/core/layout/panel/state/store';
import { initViewEditorStore } from '@/core/layout/view/state/store';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Initialize all core stores after registries are loaded.
 */
export async function initStores(): Promise<void> {
	try {
		await initializePageStore();
		await initializeBenchEditorStore();
		await initViewEditorStore();
		await initializePanelStore();
		await initializeBlockStore();
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		devLog.error('[Init] Store initialization failed:', errorMessage);
		throw error;
	}
}