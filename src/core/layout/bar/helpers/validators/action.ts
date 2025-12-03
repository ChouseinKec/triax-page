// Types
import type { BarActionInstance, BarActionID, BarActionOrder, BarActionRender, BarActionTitle,} from '@/src/core/layout/bar/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isBarActionInstanceValid, isBarActionIDValid, isBarActionOrderValid, isBarActionRenderValid, isBarActionTitleValid,} from '@/src/core/layout/bar/utilities';


/**
 * Validates a bar action ID for bar action operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param actionID - The bar action ID to validate
 * @returns ValidateResult containing validity and the validated BarActionID if valid
 *
 * @example
 * validateBarActionID('action-123') → { valid: true, value: 'action-123' }
 */
export function validateBarActionID(actionID: unknown): ValidateResult<BarActionID> {
    if (!isBarActionIDValid(actionID)) return { valid: false, message: `Bar action ID must be a valid string, got: ${actionID}` };
    return { valid: true, value: actionID as BarActionID };
}

/**
 * Validates a bar action title for bar action operations.
 * Checks if the title is a valid string.
 *
 * @param actionTitle - The bar action title to validate
 * @returns ValidateResult containing validity and the validated BarActionTitle if valid
 *
 * @example
 * validateBarActionTitle('Save') → { valid: true, value: 'Save' }
 */
export function validateBarActionTitle(actionTitle: unknown): ValidateResult<BarActionTitle> {
    if (!isBarActionTitleValid(actionTitle)) return { valid: false, message: `Bar action title must be a valid string, got: ${actionTitle}` };
    return { valid: true, value: actionTitle as BarActionTitle };
}

/**
 * Validates a bar action order for bar action operations.
 * Checks if the order is a valid number.
 *
 * @param actionOrder - The bar action order to validate
 * @returns ValidateResult containing validity and the validated BarActionOrder if valid
 *
 * @example
 * validateBarActionOrder(1) → { valid: true, value: 1 }
 */
export function validateBarActionOrder(actionOrder: unknown): ValidateResult<BarActionOrder> {
    if (!isBarActionOrderValid(actionOrder)) return { valid: false, message: `Bar action order must be a valid number, got: ${actionOrder}` };
    return { valid: true, value: actionOrder as BarActionOrder };
}

/**
 * Validates a bar action render for bar action operations.
 * Checks if the render is a valid function or Vue component.
 *
 * @param actionRender - The bar action render to validate
 * @returns ValidateResult containing validity and the validated BarActionRender if valid
 *
 * @example
 * validateBarActionRender(() => <button>Click</button>) → { valid: true, value: () => <button>Click</button> }
 */
export function validateBarActionRender(actionRender: unknown): ValidateResult<BarActionRender> {
    if (!isBarActionRenderValid(actionRender)) return { valid: false, message: `Bar action render must be a valid function or Vue component, got: ${actionRender}` };
    return { valid: true, value: actionRender as BarActionRender };
}

/**
 * Validates a bar action instance for bar action operations.
 * Checks if the instance is a valid bar action object.
 *
 * @param action - The bar action instance to validate
 * @returns ValidateResult containing validity and the validated BarActionInstance if valid
 *
 * @example
 * validateBarActionInstance({ id: 'action-1', title: 'Save', order: 1, render: () => <button>Save</button> }) → { valid: true, value: {...} }
 */
export function validateBarActionInstance(action: unknown): ValidateResult<BarActionInstance> {
    if (!isBarActionInstanceValid(action)) return { valid: false, message: `Bar action instance is not a valid object, got: ${JSON.stringify(action)}` };
    return { valid: true, value: action as BarActionInstance };
}
