// Types
import type { ViewportDefinition, ViewportRender, ViewportID, ViewportTitle } from '@/src/page-builder/core/editor/viewport/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isViewportDefinitionValid, isViewportIDValid, isViewportTitleValid, isViewportRenderValid } from '@/src/page-builder/core/editor/viewport/utilities/viewport';

// Helpers
import { validateWorkbenchID } from '@/src/page-builder/services/helpers/validate';

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
