// Types
import type { WorkbenchInstance, WorkbenchID, WorkbenchIcon, WorkbenchOrder, WorkbenchTitle, WorkbenchRender } from '@/src/core/layout/workbench/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isWorkbenchDefinitionValid, isWorkbenchIDValid, isWorkbenchIconValid, isWorkbenchOrderValid, isWorkbenchRenderValid, isWorkbenchTitleValid } from '@/src/core/layout/workbench/utilities';

/**
 * Validates a workbench ID for workbench operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param id - The workbench ID to validate
 */
export function validateWorkbenchID(id: unknown): ValidateResult<WorkbenchID> {
	if (!isWorkbenchIDValid(id)) return { valid: false, message: `Workbench ID must be a valid string, got: ${id}` };
	return { valid: true, value: id as WorkbenchID };
}

/**
 * Validates a workbench order for workbench operations.
 * Checks if the order is a valid number.
 *
 * @param order - The workbench order to validate
 */
export function validateWorkbenchOrder(order: unknown): ValidateResult<WorkbenchOrder> {
	if (!isWorkbenchOrderValid(order)) return { valid: false, message: `Workbench order must be a valid number, got: ${order}` };
	return { valid: true, value: order as WorkbenchOrder };
}

/**
 * Validates a workbench title for workbench operations.
 * Checks if the title is a valid string.
 *
 * @param title - The workbench title to validate
 */
export function validateWorkbenchTitle(title: unknown): ValidateResult<WorkbenchTitle> {
	if (!isWorkbenchTitleValid(title)) return { valid: false, message: `Workbench title must be a valid string, got: ${title}` };
	return { valid: true, value: title as WorkbenchTitle };
}

/**
 * Validates a workbench render for workbench operations.
 * Checks if the render is a valid function.
 *
 * @param render - The workbench render to validate
 */
export function validateWorkbenchRender(render: unknown): ValidateResult<WorkbenchRender> {
	if (!isWorkbenchRenderValid(render)) return { valid: false, message: `Workbench render must be a valid function, got: ${render}` };
	return { valid: true, value: render as WorkbenchRender };
}

/**
 * Validates a workbench icon for workbench operations.
 * Checks if the icon is valid.
 *
 * @param icon - The workbench icon to validate
 */
export function validateWorkbenchIcon(icon: unknown): ValidateResult<WorkbenchIcon> {
	if (!isWorkbenchIconValid(icon)) return { valid: false, message: `Workbench icon must be valid, got: ${icon}` };
	return { valid: true, value: icon as WorkbenchIcon };
}

/**
 * Validates a complete workbench definition for workbench operations.
 * Checks if the definition has all required valid properties including ID, title, icon, order, and render.
 *
 * @param workbench - The workbench definition to validate
 */
export function validateWorkbench(workbench: unknown): ValidateResult<WorkbenchInstance> {
	if (!isWorkbenchDefinitionValid(workbench)) return { valid: false, message: `Workbench must be an object with required properties, got: ${typeof workbench}` };

	const idValidation = validateWorkbenchID(workbench.id);
	if (!idValidation.valid) return idValidation;

	const titleValidation = validateWorkbenchTitle(workbench.title);
	if (!titleValidation.valid) return titleValidation;

	const iconValidation = validateWorkbenchIcon(workbench.icon);
	if (!iconValidation.valid) return iconValidation;

	const orderValidation = validateWorkbenchOrder(workbench.order);
	if (!orderValidation.valid) return orderValidation;

	const renderValidation = validateWorkbenchRender(workbench.render);
	if (!renderValidation.valid) return renderValidation;

	return { valid: true, value: workbench as WorkbenchInstance };
}
