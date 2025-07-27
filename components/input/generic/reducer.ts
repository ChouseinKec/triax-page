// Define the shape of the validation state and the actions that can change it
export type ValidationState = {
    isError: boolean;
    message: string;
};

export type ValidationAction =
    | { type: 'VALIDATION_SUCCESS' }
    | { type: 'VALIDATION_FAILURE'; payload: { message: string } }
    | { type: 'VALIDATION_EXCEPTION'; payload: { message: string } }
    | { type: 'CLEAR' };

/**
 * A reducer function to manage all validation-related state transitions.
 * @param state - The current validation state.
 * @param action - The action to perform.
 * @returns The new validation state.
 */
export const validationReducer = (state: ValidationState, action: ValidationAction): ValidationState => {
    switch (action.type) {
        case 'VALIDATION_SUCCESS':
            return { isError: false, message: '' };
        case 'VALIDATION_FAILURE':
            return { isError: true, message: action.payload.message || 'Invalid input' };
        case 'VALIDATION_EXCEPTION':
            return { isError: true, message: action.payload.message };
        case 'CLEAR':
            return { isError: false, message: '' };
        default:
            return state;
    }
};