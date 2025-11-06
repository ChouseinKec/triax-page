// Types
import type { InfoDataInstance, InfoDataID, InfoDataOrder, InfoDataRender, InfoDefinition, InfoID, InfoTitle, InfoPosition, InfoSize, InfoGrid } from '@/src/page-builder/core/editor/layout/types/info';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isInfoDataInstanceValid, isInfoDataIDValid, isInfoDataOrderValid, isInfoDataRenderValid, isInfoDefinitionValid, isInfoIDValid, isInfoTitleValid, isInfoPositionValid, isInfoSizeValid, isInfoGridValid } from '@/src/page-builder/core/editor/layout/utilities/info';

// Helpers
import { validateWorkbenchID } from '@/src/page-builder/services/helpers/validate';

/**
 * Validates an info ID for info operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param infoID - The info ID to validate
 * @returns ValidateResult containing validity and the validated InfoID if valid
 *
 * @example
 * validateInfoID('info-123') → { valid: true, value: 'info-123' }
 */
export function validateInfoID(infoID: unknown): ValidateResult<InfoID> {
	if (!isInfoIDValid(infoID)) return { valid: false, message: `Info ID must be a valid string, got: ${infoID}` };
	return { valid: true, value: infoID as InfoID };
}

/**
 * Validates an info title for info operations.
 * Checks if the title is a valid string.
 *
 * @param infoTitle - The info title to validate
 * @returns ValidateResult containing validity and the validated InfoTitle if valid
 *
 * @example
 * validateInfoTitle('My Info') → { valid: true, value: 'My Info' }
 */
export function validateInfoTitle(infoTitle: unknown): ValidateResult<InfoTitle> {
	if (!isInfoTitleValid(infoTitle)) return { valid: false, message: `Info title must be a valid string, got: ${infoTitle}` };
	return { valid: true, value: infoTitle as InfoTitle };
}

/**
 * Validates an info position for info operations.
 * Checks if the position is a valid position object.
 *
 * @param infoPosition - The info position to validate
 * @returns ValidateResult containing validity and the validated InfoPosition if valid
 *
 * @example
 * validateInfoPosition({ top: '10px', left: '20px' }) → { valid: true, value: { top: '10px', left: '20px' } }
 */
export function validateInfoPosition(infoPosition: unknown): ValidateResult<InfoPosition> {
	if (!isInfoPositionValid(infoPosition)) return { valid: false, message: `Info position must be a valid object, got: ${JSON.stringify(infoPosition)}` };
	return { valid: true, value: infoPosition as InfoPosition };
}

/**
 * Validates an info size for info operations.
 * Checks if the size is a valid size object.
 *
 * @param infoSize - The info size to validate
 * @returns ValidateResult containing validity and the validated InfoSize if valid
 *
 * @example
 * validateInfoSize({ width: '100px', height: '50px' }) → { valid: true, value: { width: '100px', height: '50px' } }
 */
export function validateInfoSize(infoSize: unknown): ValidateResult<InfoSize> {
	if (!isInfoSizeValid(infoSize)) return { valid: false, message: `Info size must be a valid object, got: ${JSON.stringify(infoSize)}` };
	return { valid: true, value: infoSize as InfoSize };
}

/**
 * Validates an info grid for info operations.
 * Checks if the grid has valid columns and rows.
 *
 * @param grid - The info grid to validate
 * @returns ValidateResult containing validity and the validated InfoGrid if valid
 *
 * @example
 * validateInfoGrid({ columns: 3, rows: 2 }) → { valid: true, value: { columns: 3, rows: 2 } }
 */
export function validateInfoGrid(grid: unknown): ValidateResult<InfoGrid> {
	if (!isInfoGridValid(grid)) return { valid: false, message: `Info grid must have valid positive integer columns and rows, got: ${JSON.stringify(grid)}` };
	return { valid: true, value: grid as InfoGrid };
}

/**
 * Validates a complete info definition for info operations.
 * Checks if the definition has all required valid properties including ID, title, position, size, grid, and workbench ID.
 *
 * @param infoDefinition - The info definition to validate
 * @returns ValidateResult containing validity and the validated InfoDefinition if valid
 *
 * @example
 * validateInfoDefinition({ id: 'info-1', title: 'My Info', position: { top: '0px', left: '0px' }, size: { width: '200px', height: '50px' }, grid: { columns: 1, rows: 1 }, workbenchID: 'wb-1' }) → { valid: true, value: {...} }
 */
export function validateInfoDefinition(infoDefinition: unknown): ValidateResult<InfoDefinition> {
	if (!isInfoDefinitionValid(infoDefinition)) return { valid: false, message: `Info definition is not a valid object, got: ${JSON.stringify(infoDefinition)}` };

	const idValidation = validateInfoID(infoDefinition.id);
	if (!idValidation.valid) return { valid: false, message: idValidation.message };

	const titleValidation = validateInfoTitle(infoDefinition.title);
	if (!titleValidation.valid) return { valid: false, message: titleValidation.message };

	const positionValidation = validateInfoPosition(infoDefinition.position);
	if (!positionValidation.valid) return { valid: false, message: positionValidation.message };

	const sizeValidation = validateInfoSize(infoDefinition.size);
	if (!sizeValidation.valid) return { valid: false, message: sizeValidation.message };

	const gridValidation = validateInfoGrid(infoDefinition.grid);
	if (!gridValidation.valid) return { valid: false, message: gridValidation.message };

	const workbenchIDValidation = validateWorkbenchID(infoDefinition.workbenchID);
	if (!workbenchIDValidation.valid) return { valid: false, message: workbenchIDValidation.message };

	return { valid: true, value: infoDefinition as InfoDefinition };
}

/**
 * Validates an info data ID for info data operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param dataID - The info data ID to validate
 * @returns ValidateResult containing validity and the validated InfoDataID if valid
 *
 * @example
 * validateInfoDataID('data-123') → { valid: true, value: 'data-123' }
 */
export function validateInfoDataID(dataID: unknown): ValidateResult<InfoDataID> {
	if (!isInfoDataIDValid(dataID)) return { valid: false, message: `Info data ID must be a valid string, got: ${dataID}` };
	return { valid: true, value: dataID as InfoDataID };
}

/**
 * Validates an info data order for info data operations.
 * Checks if the order is a valid number.
 *
 * @param dataOrder - The info data order to validate
 * @returns ValidateResult containing validity and the validated InfoDataOrder if valid
 *
 * @example
 * validateInfoDataOrder(1) → { valid: true, value: 1 }
 */
export function validateInfoDataOrder(dataOrder: unknown): ValidateResult<InfoDataOrder> {
	if (!isInfoDataOrderValid(dataOrder)) return { valid: false, message: `Info data order must be a valid number, got: ${dataOrder}` };
	return { valid: true, value: dataOrder as InfoDataOrder };
}

/**
 * Validates an info data render for info data operations.
 * Checks if the render is a valid function.
 *
 * @param dataRender - The info data render to validate
 * @returns ValidateResult containing validity and the validated InfoDataRender if valid
 *
 * @example
 * validateInfoDataRender(() => <div>Content</div>) → { valid: true, value: () => <div>Content</div> }
 */
export function validateInfoDataRender(dataRender: unknown): ValidateResult<InfoDataRender> {
	if (!isInfoDataRenderValid(dataRender)) return { valid: false, message: `Info data render must be a valid function, got: ${dataRender}` };
	return { valid: true, value: dataRender as InfoDataRender };
}

/**
 * Validates an info data instance for info data operations.
 * Checks if the instance is a valid info data object.
 *
 * @param dataInstance - The info data instance to validate
 * @returns ValidateResult containing validity and the validated InfoDataInstance if valid
 *
 * @example
 * validateInfoDataInstance({ id: 'data-1', order: 1, render: () => <div>Content</div> }) → { valid: true, value: {...} }
 */
export function validateInfoDataInstance(dataInstance: unknown): ValidateResult<InfoDataInstance> {
	if (!isInfoDataInstanceValid(dataInstance)) return { valid: false, message: `Info data instance is not a valid object, got: ${JSON.stringify(dataInstance)}` };
	return { valid: true, value: dataInstance as InfoDataInstance };
}
