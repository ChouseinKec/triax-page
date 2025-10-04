import { registerViewport } from '.';

// Config
import { CoreViewports } from '@/src/page-builder/config/viewports';

// Types
import type { ViewportDefinition } from '@/src/page-builder/core/editor/viewport/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Initialize and register core viewports
 */
function initializeViewports() {
	const viewports = CoreViewports.filter((viewport): viewport is ViewportDefinition => {
		if (!viewport || typeof viewport !== 'object' || !('id' in viewport)) {
			devLog.warn('[ViewportInit] Skipping invalid viewport definition');
			return false;
		}
		return true;
	});

	if (viewports.length === 0) {
		devLog.warn('[ViewportInit] No valid core viewports found to register');
		return;
	}

	devLog.info('[ViewportInit] Initializing Viewports:');

	viewports.forEach((viewport) => {
		const result = registerViewport(viewport);
		if (result.valid) {
			devLog.info(`         ${viewport.id} registration successful.`);
		} else {
			devLog.error(`         ${viewport.id} registration failed. ${result.message}`);
		}
	});
}

/**
 * Initialize and register all core viewport components
 */
export async function initializeRegistry(): Promise<void> {
	return new Promise<void>((resolve) => {
		initializeViewports();
		resolve();
	});
}
