// Types
import type { WorkbenchInstance, WorkbenchID } from '@/src/core/layout/workbench/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateWorkbench } from '@/src/core/layout/workbench/helper/validators';

/**
 * Class-based workbench registry for managing workbench definitions
 */
class WorkbenchRegistryClass {
	private workbenches: Record<string, WorkbenchInstance> = {};

	/**
	 * Registers a workbench definition in the workbench registry.
	 * @param workbench - The workbench definition to register
	 * @returns Success status with optional error message
	 */
	registerWorkbench(workbench: WorkbenchInstance): ValidateResult<WorkbenchInstance> {
		const validation = validateWorkbench(workbench);
		if (!validation.valid) return { valid: false, message: validation.message };

		// Check for duplicates
		if (this.workbenches[workbench.id]) {
			return { valid: false, message: `Workbench with id "${workbench.id}" already registered` };
		}

		this.workbenches = { ...this.workbenches, [workbench.id]: workbench };

		return { valid: true, value: workbench };
	}

	/**
	 * Retrieves all registered workbench definitions.
	 * @returns Readonly record of all registered workbenches keyed by their IDs.
	 */
	getRegisteredWorkbenchs(): Readonly<Record<string, WorkbenchInstance>> {
		return { ...this.workbenches };
	}

	/**
	 * Retrieves a specific workbench definition by its ID.
	 * @param id - The workbench ID to retrieve.
	 * @returns The workbench definition if found, undefined otherwise.
	 */
	getRegisteredWorkbench(id: WorkbenchID): WorkbenchInstance | undefined {
		return this.workbenches[id];
	}

}

// Create singleton instance
const workbenchRegistry = new WorkbenchRegistryClass();

// Export the registry instance methods
export const registerWorkbench = (workbench: WorkbenchInstance) => workbenchRegistry.registerWorkbench(workbench);
export const getRegisteredWorkbenchs = () => workbenchRegistry.getRegisteredWorkbenchs();
export const getRegisteredWorkbench = (id: WorkbenchID) => workbenchRegistry.getRegisteredWorkbench(id);
