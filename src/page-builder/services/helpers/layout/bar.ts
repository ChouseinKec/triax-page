// Types
import type { BarActionInstance, BarActionID, BarActionOrder, BarActionRender, BarActionTitle, BarDefinition, BarID, BarTitle, BarPosition, BarSize } from '@/src/page-builder/core/editor/layout/types';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { isBarActionInstanceValid, isBarActionIDValid, isBarActionOrderValid, isBarActionRenderValid, isBarActionTitleValid, isBarDefinitionValid, isBarIDValid, isBarTitleValid, isBarPositionValid, isBarSizeValid } from '@/src/page-builder/core/editor/layout/utilities/bar';

// Helpers
import { validateWorkbenchID } from '@/src/page-builder/services/helpers/workbench/workbench';

/**
 * Validates a bar ID for bar operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param barID - The bar ID to validate
 * @returns ValidationResult containing validity and the validated BarID if valid
 *
 * @example
 * validateBarID('bar-123') → { valid: true, value: 'bar-123' }
 */
export function validateBarID(barID: unknown): ValidationResult<BarID> {
	if (!isBarIDValid(barID)) return { valid: false, message: `Bar ID must be a valid string, got: ${barID}` };
	return { valid: true, value: barID as BarID };
}

/**
 * Validates a bar title for bar operations.
 * Checks if the title is a valid string.
 *
 * @param barTitle - The bar title to validate
 * @returns ValidationResult containing validity and the validated BarTitle if valid
 *
 * @example
 * validateBarTitle('My Bar') → { valid: true, value: 'My Bar' }
 */
export function validateBarTitle(barTitle: unknown): ValidationResult<BarTitle> {
	if (!isBarTitleValid(barTitle)) return { valid: false, message: `Bar title must be a valid string, got: ${barTitle}` };
	return { valid: true, value: barTitle as BarTitle };
}

/**
 * Validates a bar position for bar operations.
 * Checks if the position is a valid position object.
 *
 * @param barPosition - The bar position to validate
 * @returns ValidationResult containing validity and the validated BarPosition if valid
 *
 * @example
 * validateBarPosition({ x: 10, y: 20 }) → { valid: true, value: { x: 10, y: 20 } }
 */
export function validateBarPosition(barPosition: unknown): ValidationResult<BarPosition> {
	if (!isBarPositionValid(barPosition)) return { valid: false, message: `Bar position must be a valid object, got: ${JSON.stringify(barPosition)}` };
	return { valid: true, value: barPosition as BarPosition };
}

/**
 * Validates a bar size for bar operations.
 * Checks if the size is a valid size object.
 *
 * @param barSize - The bar size to validate
 * @returns ValidationResult containing validity and the validated BarSize if valid
 *
 * @example
 * validateBarSize({ width: 100, height: 50 }) → { valid: true, value: { width: 100, height: 50 } }
 */
export function validateBarSize(barSize: unknown): ValidationResult<BarSize> {
	if (!isBarSizeValid(barSize)) return { valid: false, message: `Bar size must be a valid object, got: ${JSON.stringify(barSize)}` };
	return { valid: true, value: barSize as BarSize };
}

/**
 * Validates a complete bar definition for bar operations.
 * Checks if the definition has all required valid properties including ID, title, position, size, and workbench ID.
 *
 * @param barDefinition - The bar definition to validate
 * @returns ValidationResult containing validity and the validated BarDefinition if valid
 *
 * @example
 * validateBarDefinition({ id: 'bar-1', title: 'My Bar', position: { x: 0, y: 0 }, size: { width: 200, height: 50 }, workbenchID: 'wb-1' }) → { valid: true, value: {...} }
 */
export function validateBarDefinition(barDefinition: unknown): ValidationResult<BarDefinition> {
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

/**
 * Validates a bar action ID for bar action operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param actionID - The bar action ID to validate
 * @returns ValidationResult containing validity and the validated BarActionID if valid
 *
 * @example
 * validateBarActionID('action-123') → { valid: true, value: 'action-123' }
 */
export function validateBarActionID(actionID: unknown): ValidationResult<BarActionID> {
	if (!isBarActionIDValid(actionID)) return { valid: false, message: `Bar action ID must be a valid string, got: ${actionID}` };
	return { valid: true, value: actionID as BarActionID };
}

/**
 * Validates a bar action title for bar action operations.
 * Checks if the title is a valid string.
 *
 * @param actionTitle - The bar action title to validate
 * @returns ValidationResult containing validity and the validated BarActionTitle if valid
 *
 * @example
 * validateBarActionTitle('Save') → { valid: true, value: 'Save' }
 */
export function validateBarActionTitle(actionTitle: unknown): ValidationResult<BarActionTitle> {
	if (!isBarActionTitleValid(actionTitle)) return { valid: false, message: `Bar action title must be a valid string, got: ${actionTitle}` };
	return { valid: true, value: actionTitle as BarActionTitle };
}

/**
 * Validates a bar action order for bar action operations.
 * Checks if the order is a valid number.
 *
 * @param actionOrder - The bar action order to validate
 * @returns ValidationResult containing validity and the validated BarActionOrder if valid
 *
 * @example
 * validateBarActionOrder(1) → { valid: true, value: 1 }
 */
export function validateBarActionOrder(actionOrder: unknown): ValidationResult<BarActionOrder> {
	if (!isBarActionOrderValid(actionOrder)) return { valid: false, message: `Bar action order must be a valid number, got: ${actionOrder}` };
	return { valid: true, value: actionOrder as BarActionOrder };
}

/**
 * Validates a bar action render for bar action operations.
 * Checks if the render is a valid function or Vue component.
 *
 * @param actionRender - The bar action render to validate
 * @returns ValidationResult containing validity and the validated BarActionRender if valid
 *
 * @example
 * validateBarActionRender(() => <button>Click</button>) → { valid: true, value: () => <button>Click</button> }
 */
export function validateBarActionRender(actionRender: unknown): ValidationResult<BarActionRender> {
	if (!isBarActionRenderValid(actionRender)) return { valid: false, message: `Bar action render must be a valid function or Vue component, got: ${actionRender}` };
	return { valid: true, value: actionRender as BarActionRender };
}

/**
 * Validates a bar action instance for bar action operations.
 * Checks if the instance is a valid bar action object.
 *
 * @param action - The bar action instance to validate
 * @returns ValidationResult containing validity and the validated BarActionInstance if valid
 *
 * @example
 * validateBarActionInstance({ id: 'action-1', title: 'Save', order: 1, render: () => <button>Save</button> }) → { valid: true, value: {...} }
 */
export function validateBarActionInstance(action: unknown): ValidationResult<BarActionInstance> {
	if (!isBarActionInstanceValid(action)) return { valid: false, message: `Bar action instance is not a valid object, got: ${JSON.stringify(action)}` };
	return { valid: true, value: action as BarActionInstance };
}
