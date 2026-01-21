// Types
import type { BenchDefinition, BenchDefinitionRecord, BenchKey, ActionDefinition, ActionDefinitionRecord } from '@/core/layout/workbench/types';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateBenchDefinition } from '@/core/layout/workbench/helpers/validators';
import { validateActionDefinition } from '@/core/layout/workbench/helpers/validators/action';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Class-based workbench registry for managing workbench definitions
 */
class WorkbenchRegistryClass {
	private benches: BenchDefinitionRecord = {};
	private actions: ActionDefinitionRecord = {};
	private defaultBenchKey: BenchKey = 'main';

	/**
	 * Registers a workbench definition in the workbench registry.
	 * @param workbench - The workbench definition to register
	 */
	registerBench(benchDefinition: BenchDefinition): ValidateResult<BenchDefinition> {
		const validation = validateBenchDefinition(benchDefinition);
		if (!validation.valid) return { valid: false, message: validation.message };

		// Check for duplicates
		if (this.benches[benchDefinition.key]) return { valid: false, message: `Workbench with key "${benchDefinition.key}" already registered` };

		this.benches = { ...this.benches, [benchDefinition.key]: benchDefinition };

		return { valid: true, value: benchDefinition };
	}

	/**
	 * Registers an action definition in the workbench registry.
	 * @param action - The action definition to register
	 */
	registerAction(actionDefinition: ActionDefinition): ValidateResult<ActionDefinition> {
		const validation = validateActionDefinition(actionDefinition);
		if (!validation.valid) return { valid: false, message: validation.message };

		// Check for duplicates
		if (this.actions[actionDefinition.key]) return { valid: false, message: `Action with key "${actionDefinition.key}" already registered` };

		this.actions = { ...this.actions, [actionDefinition.key]: actionDefinition };

		return { valid: true, value: actionDefinition };
	}

	/**
	 * Retrieves all registered workbench definitions.
	 */
	getRegisteredBenches(): Readonly<BenchDefinitionRecord> {
		return { ...this.benches };
	}

	/**
	 * Retrieves a specific workbench definition by its ID.
	 * @param id - The workbench ID to retrieve.
	 */
	getRegisteredBench(benchKey: BenchKey): BenchDefinition | undefined {
		return this.benches[benchKey];
	}

	/**
	 * Retrieves the default workbench key.
	 */
	getDefaultWorkbenchKey(): BenchKey {
		return this.defaultBenchKey;
	}

	/**
	 * Retrieves all registered action definitions, optionally filtered by bench key.
	 * @param benchKey - Optional bench key to filter actions by their associated bench.
	 */
	getRegisteredActions(benchKey?: BenchKey): Readonly<ActionDefinitionRecord> {
		if (!benchKey) return { ...this.actions };

		return Object.fromEntries(Object.entries(this.actions).filter(([key, action]) => action.benchKey === benchKey));
	}

	/**
	 * Retrieves a specific action definition by its key.
	 * @param actionKey - The action key to retrieve.
	 */
	getRegisteredAction(actionKey: string): ActionDefinition | undefined {
		return this.actions[actionKey];
	}
}

// Create singleton instance
const workbenchRegistry = new WorkbenchRegistryClass();

// Export the registry instance methods
export const registerBench = (workbenchDefinition: BenchDefinition): void => {
	const result = workbenchRegistry.registerBench(workbenchDefinition);
	if (!result.valid) devLog.error(`[Registry → Bench]     ❌ Failed: ${workbenchDefinition.key} - ${result.message}`);
};
export const registerBenches = (workbenchDefinitions: BenchDefinition[]) => workbenchDefinitions.forEach(registerBench);
export const registerAction = (actionDefinition: ActionDefinition): void => {
	const result = workbenchRegistry.registerAction(actionDefinition);
	if (!result.valid) devLog.error(`[Registry → Action]    ❌ Failed: ${actionDefinition.key} - ${result.message}`);
};
export const registerActions = (actionDefinitions: ActionDefinition[]) => actionDefinitions.forEach(registerAction);

export const getRegisteredActions = (benchKey?: BenchKey) => workbenchRegistry.getRegisteredActions(benchKey);
export const getRegisteredAction = (actionKey: string) => workbenchRegistry.getRegisteredAction(actionKey);

export const getRegisteredBenches = () => workbenchRegistry.getRegisteredBenches();
export const getRegisteredBench = (benchKey: BenchKey) => workbenchRegistry.getRegisteredBench(benchKey);
export const getDefaultBenchKey = () => workbenchRegistry.getDefaultWorkbenchKey();
