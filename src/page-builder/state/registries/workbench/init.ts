import { registerWorkbench } from '.';

// Config
import { CoreWorkbenches } from '@/src/page-builder/config/workbenches';

// Types
import type { WorkbenchDefinition } from '@/src/page-builder/core/editor/workbench/types/workbench';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Initialize and register core workbenches
 */
function initializeWorkbenchs() {
	const workbenches = CoreWorkbenches.filter((workbench): workbench is WorkbenchDefinition => {
		if (!workbench || typeof workbench !== 'object' || !('id' in workbench)) {
			devLog.warn('[WorkbenchInit] Skipping invalid workbench definition');
			return false;
		}
		return true;
	});

	if (workbenches.length === 0) {
		devLog.warn('[WorkbenchInit] No valid core workbenches found to register');
		return;
	}

	const results: Array<{ id: string; status: string; core: string }> = [];

	workbenches.forEach((workbench) => {
		const result = registerWorkbench(workbench);
		results.push({
			id: workbench.id,
			status: result.success ? 'PASS' : `FAIL: ${result.error}`,
			core: 'workbench',
		});
	});

	devLog.table(results, ['core', 'id', 'status']);
}

/**
 * Initialize and register all core workbench components
 */
export function initializeRegistry() {
	initializeWorkbenchs();
}

// Auto-initialize on module load
initializeRegistry();
