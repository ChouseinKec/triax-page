// Types
import type { WorkbenchDefinition, WorkbenchKey } from '@/src/core/layout/workbench/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateWorkbenchDefinition } from '@/src/core/layout/workbench/helpers/validators';

/**
 * Class-based workbench registry for managing workbench definitions
 */
class WorkbenchRegistryClass {
	private workbenches: Record<string, WorkbenchDefinition> = {};
	private defaultWorkbenchKey = 'main';

	/**
	 * Registers a workbench definition in the workbench registry.
	 * @param workbench - The workbench definition to register
	 * @returns Success status with optional error message
	 */
	registerWorkbench(workbench: WorkbenchDefinition): ValidateResult<WorkbenchDefinition> {
		const validation = validateWorkbenchDefinition(workbench);
		if (!validation.valid) return { valid: false, message: validation.message };

		// Check for duplicates
		if (this.workbenches[workbench.key]) return { valid: false, message: `Workbench with key "${workbench.key}" already registered` };

		this.workbenches = { ...this.workbenches, [workbench.key]: workbench };

		return { valid: true, value: workbench };
	}

	/**
	 * Retrieves all registered workbench definitions.
	 * @returns Readonly record of all registered workbenches keyed by their IDs.
	 */
	getRegisteredWorkbenchs(): Readonly<Record<string, WorkbenchDefinition>> {
		return { ...this.workbenches };
	}

	/**
	 * Retrieves a specific workbench definition by its ID.
	 * @param id - The workbench ID to retrieve.
	 * @returns The workbench definition if found, undefined otherwise.
	 */
	getRegisteredWorkbench(workbenchKey: WorkbenchKey): WorkbenchDefinition | undefined {
		return this.workbenches[workbenchKey];
	}

	/**
	 * Retrieves the default workbench key.
	 * @returns The default workbench key.
	 */
	getDefaultWorkbenchKey(): WorkbenchKey {
		return this.defaultWorkbenchKey;
	}
}

// Create singleton instance
const workbenchRegistry = new WorkbenchRegistryClass();

// Export the registry instance methods
export const registerWorkbench = (workbench: WorkbenchDefinition) => workbenchRegistry.registerWorkbench(workbench);
export const getRegisteredWorkbenchs = () => workbenchRegistry.getRegisteredWorkbenchs();
export const getRegisteredWorkbench = (workbenchKey: WorkbenchKey) => workbenchRegistry.getRegisteredWorkbench(workbenchKey);
export const getWorkbenchDefaultKey = () => workbenchRegistry.getDefaultWorkbenchKey();
