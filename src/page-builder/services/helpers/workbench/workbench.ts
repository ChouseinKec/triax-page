// Types
import { WorkbenchDefinition } from '@/src/page-builder/core/editor/workbench/types';
import type { ValidationResult } from '@/src/shared/types/result';

/**
 * Type guard to check if a value is a valid WorkbenchDefinition shape
 */
function isWorkbenchDefinitionShape(value: unknown): value is Record<keyof WorkbenchDefinition, unknown> {
	return typeof value === 'object' && value !== null && 'id' in value && 'title' in value && 'icon' in value && 'order' in value && 'render' in value;
}

/**
 * Validates a workbench definition
 */
export function validateWorkbench(workbench: unknown): ValidationResult {
	if (!workbench) return { success: false, error: 'Workbench definition is required' };

	if (!isWorkbenchDefinitionShape(workbench)) return { success: false, error: `Workbench must be an object with required properties, got: ${typeof workbench}` };

	if (typeof workbench.id !== 'string' || workbench.id.length === 0) return { success: false, error: `Workbench requires a valid string id, got: ${workbench.id}` };

	if (typeof workbench.title !== 'string' || workbench.title.length === 0) return { success: false, error: `Workbench "${workbench.id}" requires a valid title, got: ${workbench.title}` };

	if (workbench.icon === undefined || workbench.icon === null) return { success: false, error: `Workbench "${workbench.id}" requires a valid icon, got: ${workbench.icon}` };

	if (typeof workbench.order !== 'number' || isNaN(workbench.order)) return { success: false, error: `Workbench "${workbench.id}" requires a valid order number, got: ${workbench.order}` };

	if (typeof workbench.render !== 'function') return { success: false, error: `Workbench "${workbench.id}" requires a render function, got: ${typeof workbench.render}` };

	return { success: true };
}
