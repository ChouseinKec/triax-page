import { registerWorkbench } from '.';

// Config
import { CoreWorkbenches } from '@/src/page/config/workbench';

// Types
import type { WorkbenchDefinition } from '@/src/page/core/workbench/types/workbench';

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

	devLog.info('[WorkbenchInit] Initializing Workbenches:');

	workbenches.forEach((workbench) => {
		const result = registerWorkbench(workbench);
		if (result.valid) {
			devLog.info(`         ${workbench.id} registration successful.`);
		} else {
			devLog.error(`         ${workbench.id} registration failed. ${result.message}`);
		}
	});
}

/**
 * Initialize and register all core workbench components
 */
export async function initializeRegistry(): Promise<void> {
	return new Promise<void>((resolve) => {
		initializeWorkbenchs();
		resolve();
	});
}
