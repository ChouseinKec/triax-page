// Types
import type { ViewDefinition, ViewKey, ViewTitle, ViewComponent } from '@/src/core/layout/viewport/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { validateString, validateObject } from '@/src/shared/helpers/validators';
import { validateBenchKey } from '@/src/core/layout/workbench/helpers/validators/bench';

/**
 * Validates a viewport ID for viewport operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param id - The viewport ID to validate
 */
export function validateViewKey(viewportKey: unknown): ValidateResult<ViewKey> {
	const stringValidation = validateString(viewportKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ViewKey };
}

/**
 * Validates a viewport title for viewport operations.
 * Checks if the title is a valid string.
 *
 * @param title - The viewport title to validate
 */
export function validateViewTitle(viewportTitle: unknown): ValidateResult<ViewTitle> {
	const stringValidation = validateString(viewportTitle);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ViewTitle };
}

/**
 * Validates a viewport render for viewport operations.
 * Checks if the render is a valid function.
 *
 * @param render - The viewport render to validate
 */
export function validateViewComponent(viewportComponent: unknown): ValidateResult<ViewComponent> {
	const objectValidation = validateObject(viewportComponent);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: viewportComponent as ViewComponent };
}

/**
 * Validates a viewport definition for viewport operations.
 * Checks if the definition is a valid object with required properties.
 *
 * @param viewport - The viewport definition to validate
 */
export function validateViewDefinition(viewportDefinition: unknown): ValidateResult<ViewDefinition> {
	const objectValidation = validateObject(viewportDefinition, ['key', 'benchKey', 'title', 'component']);
	if (!objectValidation.valid) return objectValidation;

	const keyResult = validateViewKey(objectValidation.value.key);
	if (!keyResult.valid) return keyResult;

	const benchKeyResult = validateBenchKey(objectValidation.value.benchKey);
	if (!benchKeyResult.valid) return benchKeyResult;

	const titleResult = validateViewTitle(objectValidation.value.title);
	if (!titleResult.valid) return titleResult;

	const componentResult = validateViewComponent(objectValidation.value.component);
	if (!componentResult.valid) return componentResult;

	return { valid: true, value: objectValidation.value as unknown as ViewDefinition };
}
