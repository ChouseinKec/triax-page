// Types
import type { ValidateResult } from '@/src/shared/types/result';
import type { Step } from './types';

// Config
import { Steps } from '@/src/core/init/steps';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Centralized initialization coordinator for the page builder.
 * Ensures proper initialization order: REGISTRY_DEFINITIONS → stores → services.
 */
class Init {
	private steps: Step[] = [];
	private initialized = false;
	private status: Array<{ name: string; state: 'pending' | 'running' | 'success' | 'failed'; duration?: number; error?: string }> = [];

	/**
	 * Add an initialization step to the pipeline.
	 */
	addStep(step: Step): void {
		this.steps.push(step);
		this.status.push({ name: step.name, state: 'pending' });
	}

	/**
	 * Execute all initialization steps in order.
	 */
	async run(): Promise<ValidateResult<null>> {
		if (this.initialized) {
			devLog.info('[Init → Main] Already initialized, skipping');
			return { valid: true, value: null };
		}

		devLog.info('[Init → Main]            🔵 Starting initialization pipeline...');

		for (const step of this.steps) {
			const startTime = Date.now();

			try {
				devLog.info(`[Init → Main]            🟡 Running: ${step.name}`, step.description);
				this.setStepState(step.name, 'running');
				await step.init();

				const duration = Date.now() - startTime;
				this.setStepState(step.name, 'success', duration);
				devLog.info(`[Init → Main]            🟢 Completed: ${step.name} (${duration}ms)`);
			} catch (error) {
				const duration = Date.now() - startTime;
				const errorMessage = error instanceof Error ? error.message : String(error);

				devLog.error(`[Init → Main]            🔴 Failed: ${step.name} (${duration}ms)`, errorMessage);
				this.setStepState(step.name, 'failed', duration, errorMessage);

				devLog.error('[Init → Main]            🔴 Required step failed, aborting initialization');
				return { valid: false, message: `Required initialization step "${step.name}" failed: ${errorMessage}` };
			}
		}

		this.initialized = true;
		devLog.info(`[Init → Main]            ⚪ Initialization complete!`);

		return { valid: true, value: null };
	}

	/** Update internal status for a step */
	private setStepState(name: string, state: 'pending' | 'running' | 'success' | 'failed', duration?: number, error?: string) {
		const s = this.status.find((x) => x.name === name);
		if (s) {
			s.state = state;
			if (duration !== undefined) s.duration = duration;
			if (error) s.error = error;
		}
	}
}

// Create singleton instance
export const init = new Init();

// Load core steps synchronously to avoid race conditions
Steps.forEach((step) => init.addStep(step));
