// Types
import type { ViewportDefinition, ViewportRender, ViewportID, ViewportTitle } from '@/src/page-builder/core/editor/viewport/types';
import type { WorkbenchDefinition, WorkbenchID, WorkbenchIcon, WorkbenchOrder, WorkbenchTitle, WorkbenchRender } from '@/src/page-builder/core/editor/workbench/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isViewportDefinitionValid, isViewportIDValid, isViewportTitleValid, isViewportRenderValid } from '@/src/page-builder/core/editor/viewport/utilities/viewport';
import { isWorkbenchDefinitionValid, isWorkbenchIDValid, isWorkbenchIconValid, isWorkbenchOrderValid, isWorkbenchRenderValid, isWorkbenchTitleValid } from '@/src/page-builder/core/editor/workbench/utilities';

/**
 * Validates a workbench ID for workbench operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param id - The workbench ID to validate
 * @returns ValidateResult containing validity and the validated WorkbenchID if valid
 *
 * @example
 * validateWorkbenchID('workbench-123') → { valid: true, value: 'workbench-123' }
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
 * @returns ValidateResult containing validity and the validated WorkbenchOrder if valid
 *
 * @example
 * validateWorkbenchOrder(1) → { valid: true, value: 1 }
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
 * @returns ValidateResult containing validity and the validated WorkbenchTitle if valid
 *
 * @example
 * validateWorkbenchTitle('My Workbench') → { valid: true, value: 'My Workbench' }
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
 * @returns ValidateResult containing validity and the validated WorkbenchRender if valid
 *
 * @example
 * validateWorkbenchRender(() => <div>Workbench</div>) → { valid: true, value: () => <div>Workbench</div> }
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
 * @returns ValidateResult containing validity and the validated WorkbenchIcon if valid
 *
 * @example
 * validateWorkbenchIcon(<Icon name="star" />) → { valid: true, value: <Icon name="star" /> }
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
 * @returns ValidateResult containing validity and the validated WorkbenchDefinition if valid
 *
 * @example
 * validateWorkbench({ id: 'wb-1', title: 'My Workbench', icon: <Icon />, order: 1, render: () => <div>Content</div> }) → { valid: true, value: {...} }
 */
export function validateWorkbench(workbench: unknown): ValidateResult<WorkbenchDefinition> {
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

	return { valid: true, value: workbench as WorkbenchDefinition };
}

/**
 * Validates a viewport ID for viewport operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param viewportID - The viewport ID to validate
 * @returns ValidateResult containing validity and the validated string if valid
 *
 * @example
 * validateViewportID('viewport-123') → { valid: true, value: 'viewport-123' }
 */
export function validateViewportID(viewportID: unknown): ValidateResult<ViewportID> {
	if (!isViewportIDValid(viewportID)) return { valid: false, message: `Viewport ID must be a valid string, got: ${viewportID}` };
	return { valid: true, value: viewportID as ViewportID };
}

/**
 * Validates a viewport title for viewport operations.
 * Checks if the title is a valid string.
 *
 * @param viewportTitle - The viewport title to validate
 * @returns ValidateResult containing validity and the validated string if valid
 *
 * @example
 * validateViewportTitle('My Viewport') → { valid: true, value: 'My Viewport' }
 */
export function validateViewportTitle(viewportTitle: unknown): ValidateResult<ViewportTitle> {
	if (!isViewportTitleValid(viewportTitle)) return { valid: false, message: `Viewport title must be a valid string, got: ${viewportTitle}` };
	return { valid: true, value: viewportTitle as ViewportTitle };
}

/**
 * Validates a viewport render for viewport operations.
 * Checks if the render is a valid function.
 *
 * @param viewportRender - The viewport render to validate
 * @returns ValidateResult containing validity and the validated Function if valid
 *
 * @example
 * validateViewportRender(() => <div>Viewport</div>) → { valid: true, value: () => <div>Viewport</div> }
 */
export function validateViewportRender(viewportRender: unknown): ValidateResult<ViewportRender> {
	if (!isViewportRenderValid(viewportRender)) return { valid: false, message: `Viewport render must be a valid function, got: ${typeof viewportRender}` };
	return { valid: true, value: viewportRender as ViewportRender };
}

/**
 * Validates a complete viewport definition for viewport operations.
 * Checks if the definition has all required valid properties including ID, title, workbench ID, and render.
 *
 * @param viewportDefinition - The viewport definition to validate
 * @returns ValidateResult containing validity and the validated ViewportDefinition if valid
 *
 * @example
 * validateViewport({ id: 'vp-1', title: 'My Viewport', workbenchID: 'wb-1', render: () => <div>Content</div> }) → { valid: true, value: {...} }
 */
export function validateViewport(viewportDefinition: unknown): ValidateResult<ViewportDefinition> {
	if (!isViewportDefinitionValid(viewportDefinition)) return { valid: false, message: `Viewport definition must be an object with required properties, got: ${typeof viewportDefinition}` };

	const idValidation = validateViewportID(viewportDefinition.id);
	if (!idValidation.valid) return idValidation;

	const titleValidation = validateViewportTitle(viewportDefinition.title);
	if (!titleValidation.valid) return titleValidation;

	const workbenchIDValidation = validateWorkbenchID(viewportDefinition.workbenchID);
	if (!workbenchIDValidation.valid) return workbenchIDValidation;

	const renderValidation = validateViewportRender(viewportDefinition.render);
	if (!renderValidation.valid) return renderValidation;

	return { valid: true, value: viewportDefinition as ViewportDefinition };
}