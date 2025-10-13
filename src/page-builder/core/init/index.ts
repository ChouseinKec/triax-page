// Types
import type { ValidateResult } from '@/src/shared/types/result';
import type { InitStep } from './types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

// Config
import { CoreSteps } from '@/src/page-builder/config/init';

/**
 * Centralized initialization coordinator for the page builder.
 * Ensures proper initialization order: registries → stores → services.
 */
class InitializationCoordinator {
	private steps: InitStep[] = [];
	private initialized = false;

	/**
	 * Add an initialization step to the pipeline.
	 */
	addStep(step: InitStep): void {
		this.steps.push(step);
	}

	/**
	 * Execute all initialization steps in order.
	 */
	async initialize(): Promise<ValidateResult<null>> {
		if (this.initialized) {
			devLog.info('[InitCoordinator] Already initialized, skipping');
			return { valid: true, value: null };
		}

		devLog.info('[InitCoordinator] Starting initialization pipeline...');

		for (const step of this.steps) {
			const startTime = Date.now();

			try {
				devLog.info(`[InitCoordinator] Running step: ${step.name}`, step.description ? `(${step.description})` : '');
				await step.init();
				const duration = Date.now() - startTime;
				devLog.info(`[InitCoordinator] ✅ Completed: ${step.name} (${duration}ms)`);
			} catch (error) {
				const duration = Date.now() - startTime;
				const errorMessage = error instanceof Error ? error.message : String(error);
				devLog.error(`[InitCoordinator] ❌ Failed: ${step.name} (${duration}ms)`, errorMessage);

				if (step.required) {
					devLog.error('[InitCoordinator] Required step failed, aborting initialization');
					return {
						valid: false,
						message: `Required initialization step "${step.name}" failed: ${errorMessage}`,
					};
				}
			}
		}

		this.initialized = true;
		devLog.info(`[InitCoordinator] 🎉 Initialization complete!`);

		return { valid: true, value: null };
	}
}

// Create singleton instance
export const initCoordinator = new InitializationCoordinator();

Object.values(CoreSteps).forEach((step) => initCoordinator.addStep(step));
