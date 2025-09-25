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

	const results: Array<{ id: string; status: string; core: string }> = [];

	viewports.forEach((viewport) => {
		const result = registerViewport(viewport);
		results.push({
			id: viewport.id,
			status: result.success ? 'PASS' : `FAIL: ${result.error}`,
			core: 'viewport',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
}

/**
 * Initialize and register all core viewport components
 */
export function initializeRegistry() {
	initializeViewports();
}

// Auto-initialize on module load
initializeRegistry();
