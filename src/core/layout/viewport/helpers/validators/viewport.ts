// Types
import type { ViewportDefinition, ViewportID, ViewportTitle, ViewportRender } from '@/src/core/layout/viewport/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { validateString, validateFunction, validateObject } from '@/src/shared/helpers/validators';

/**
 * Validates a viewport ID for viewport operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param id - The viewport ID to validate
 */
export function validateViewportID(id: unknown): ValidateResult<ViewportID> {
	const stringValidation = validateString(id);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ViewportID };
}

/**
 * Validates a viewport title for viewport operations.
 * Checks if the title is a valid string.
 *
 * @param title - The viewport title to validate
 */
export function validateViewportTitle(title: unknown): ValidateResult<ViewportTitle> {
	const stringValidation = validateString(title);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ViewportTitle };
}

/**
 * Validates a viewport render for viewport operations.
 * Checks if the render is a valid function.
 *
 * @param render - The viewport render to validate
 */
export function validateViewportRender(render: unknown): ValidateResult<ViewportRender> {
	const functionValidation = validateFunction(render);
	if (!functionValidation.valid) return functionValidation;

	return { valid: true, value: functionValidation.value as ViewportRender };
}

/**
 * Validates a viewport definition for viewport operations.
 * Checks if the definition is a valid object with required properties.
 *
 * @param viewport - The viewport definition to validate
*/
export function validateViewportDefinition(viewport: unknown): ValidateResult<ViewportDefinition> {
	const objectValidation = validateObject(viewport, ['id', 'title', 'workbenchID', 'render']);
	if (!objectValidation.valid) return objectValidation;

	const idResult = validateViewportID(objectValidation.value.id);
	if (!idResult.valid) return idResult;

	const titleResult = validateViewportTitle(objectValidation.value.title);
	if (!titleResult.valid) return titleResult;

	const workbenchIDResult = validateString(objectValidation.value.workbenchID);
	if (!workbenchIDResult.valid) return workbenchIDResult;

	const renderResult = validateViewportRender(objectValidation.value.render);
	if (!renderResult.valid) return renderResult;

	return { valid: true, value: objectValidation.value as unknown as ViewportDefinition };
}
