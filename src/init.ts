// Auto-imports for config/ and plugins/
import '@/auto-imports';

// Store initialization functions
import { initializeBlockStore } from '@/state/block/block';
import { initializePageStore } from '@/state/layout/page';
import { initializeBarStore } from '@/core/layout/bar/state/store';
import { initializeWorkbenchStore } from '@/core/layout/workbench/state/store';
import { initializePanelStore } from '@/core/layout/panel/store';
import { initViewportStore } from '@/core/layout/viewport/state/store';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Initialize all core stores after registries are loaded.
 */
export async function initStores(): Promise<void> {
	try {
		await initializePageStore();
		await initializeWorkbenchStore();
		await initViewportStore();
		await initializePanelStore();
		await initializeBarStore();
		await initializeBlockStore();
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		devLog.error('[Init] Store initialization failed:', errorMessage);
		throw error;
	}
}