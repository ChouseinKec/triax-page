// Types
import type { BarDefinition, BarID, BarTitle, BarPosition, BarSize } from '@/src/core/layout/bar/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isBarDefinitionValid, isBarIDValid, isBarTitleValid, isBarPositionValid, isBarSizeValid } from '@/src/core/layout/bar/utilities';

// Helpers
import { validateWorkbenchID } from '@/src/core/layout/workbench/helpers';

/**
 * Validates a bar ID for bar operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param barID - The bar ID to validate
 */
export function validateBarID(barID: unknown): ValidateResult<BarID> {
	if (!isBarIDValid(barID)) return { valid: false, message: `Bar ID must be a valid string, got: ${barID}` };
	return { valid: true, value: barID as BarID };
}

/**
 * Validates a bar title for bar operations.
 * Checks if the title is a valid string.
 *
 * @param barTitle - The bar title to validate
 */
export function validateBarTitle(barTitle: unknown): ValidateResult<BarTitle> {
	if (!isBarTitleValid(barTitle)) return { valid: false, message: `Bar title must be a valid string, got: ${barTitle}` };
	return { valid: true, value: barTitle as BarTitle };
}

/**
 * Validates a bar position for bar operations.
 * Checks if the position is a valid position object.
 *
 * @param barPosition - The bar position to validate
 */
export function validateBarPosition(barPosition: unknown): ValidateResult<BarPosition> {
	if (!isBarPositionValid(barPosition)) return { valid: false, message: `Bar position must be a valid object, got: ${JSON.stringify(barPosition)}` };
	return { valid: true, value: barPosition as BarPosition };
}

/**
 * Validates a bar size for bar operations.
 * Checks if the size is a valid size object.
 *
 * @param barSize - The bar size to validate
 */
export function validateBarSize(barSize: unknown): ValidateResult<BarSize> {
	if (!isBarSizeValid(barSize)) return { valid: false, message: `Bar size must be a valid object, got: ${JSON.stringify(barSize)}` };
	return { valid: true, value: barSize as BarSize };
}

/**
 * Validates a complete bar definition for bar operations.
 * Checks if the definition has all required valid properties including ID, title, position, size, and workbench ID.
 *
 * @param barDefinition - The bar definition to validate
 */
export function validateBarDefinition(barDefinition: unknown): ValidateResult<BarDefinition> {
	if (!isBarDefinitionValid(barDefinition)) return { valid: false, message: `Bar definition is not a valid object, got: ${JSON.stringify(barDefinition)}` };

	const idValidation = validateBarID(barDefinition.id);
	if (!idValidation.valid) return { valid: false, message: idValidation.message };

	const titleValidation = validateBarTitle(barDefinition.title);
	if (!titleValidation.valid) return { valid: false, message: titleValidation.message };

	const positionValidation = validateBarPosition(barDefinition.position);
	if (!positionValidation.valid) return { valid: false, message: positionValidation.message };

	const sizeValidation = validateBarSize(barDefinition.size);
	if (!sizeValidation.valid) return { valid: false, message: sizeValidation.message };

	const workbenchIDValidation = validateWorkbenchID(barDefinition.workbenchID);
	if (!workbenchIDValidation.valid) return { valid: false, message: workbenchIDValidation.message };

	return { valid: true, value: barDefinition as BarDefinition };
}
