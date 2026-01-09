// Types
import type { ViewportDefinition, ViewportID, ViewportTitle, ViewportComponent } from '@/src/core/layout/viewport/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { validateString, validateObject } from '@/src/shared/helpers/validators';

/**
 * Validates a viewport ID for viewport operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param id - The viewport ID to validate
 */
export function validateViewportID(viewportID: unknown): ValidateResult<ViewportID> {
	const stringValidation = validateString(viewportID);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ViewportID };
}

/**
 * Validates a viewport title for viewport operations.
 * Checks if the title is a valid string.
 *
 * @param title - The viewport title to validate
 */
export function validateViewportTitle(viewportTitle: unknown): ValidateResult<ViewportTitle> {
	const stringValidation = validateString(viewportTitle);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ViewportTitle };
}

/**
 * Validates a viewport render for viewport operations.
 * Checks if the render is a valid function.
 *
 * @param render - The viewport render to validate
 */
export function validateViewportComponent(viewportComponent: unknown): ValidateResult<ViewportComponent> {
	const objectValidation = validateObject(viewportComponent);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: viewportComponent as ViewportComponent };
}

/**
 * Validates a viewport definition for viewport operations.
 * Checks if the definition is a valid object with required properties.
 *
 * @param viewport - The viewport definition to validate
 */
export function validateViewportDefinition(viewportDefinition: unknown): ValidateResult<ViewportDefinition> {
	const objectValidation = validateObject(viewportDefinition, ['id', 'title', 'workbenchKey', 'component']);
	if (!objectValidation.valid) return objectValidation;

	const idResult = validateViewportID(objectValidation.value.id);
	if (!idResult.valid) return idResult;

	const titleResult = validateViewportTitle(objectValidation.value.title);
	if (!titleResult.valid) return titleResult;

	const workbenchIDResult = validateString(objectValidation.value.workbenchKey);
	if (!workbenchIDResult.valid) return workbenchIDResult;

	const componentResult = validateViewportComponent(objectValidation.value.component);
	if (!componentResult.valid) return componentResult;

	return { valid: true, value: objectValidation.value as unknown as ViewportDefinition };
}
