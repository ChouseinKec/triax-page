import React, { useCallback, ReactElement, memo, useState, useRef, useMemo, useReducer } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import FloatReveal from '@/components/reveal/float/component';

// Types
import type { GenericInputProps } from './types';

// Utilities
import { devLog } from '@/utilities/dev';
import { validationReducer } from './reducer';

// Hooks
import { useSafeCallback } from '@/hooks/utility/useSafeCallback';

/**
 * GenericInput Component
 * 
 * A flexible, accessible base input component with comprehensive validation support.
 * Provides real-time validation, error handling, keyboard navigation, and accessibility features.
 * 
 * @param {GenericInputProps} props - Component properties
 * @param {string} [props.value=''] - Current input value
 * @param {string} [props.type='text'] - HTML input type
 * @param {number} [props.min=-Infinity] - Minimum value/length constraint
 * @param {number} [props.max=Infinity] - Maximum value/length constraint
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.ariaLabel] - ARIA label for accessibility
 * @param {string} [props.ariaRole='textbox'] - ARIA role
 * @param {function} [props.validate] - Custom validation function
 * @param {function} [props.onChange] - Value change callback
 * @param {function} [props.onFocus] - Focus event callback
 * @param {function} [props.onBlur] - Blur event callback
 * @param {string|ReactElement} [props.prefix=''] - Prefix element/text
 * @param {string|ReactElement} [props.suffix=''] - Suffix element/text
 * @returns {ReactElement} The rendered GenericInput component
 */
const GenericInput: React.FC<GenericInputProps> = (props: GenericInputProps) => {
    const {
        // Core
        value,
        type = 'text',
        placeholder = `Enter ${type}`,

        // Validation
        min = -Infinity,
        max = Infinity,

        // Accessibility
        ariaLabel = 'Generic Input',
        title = 'Enter Value',

        // Event
        onChange,
        onFocus = () => { },
        onBlur = () => { },
        onValidate,

        // Visual
        prefix = '',
        suffix = '',
    } = props;

    // Guard Clause
    if (value == null) {
        devLog.warn('[GenericInput] Invalid value provided, expected a string');
        return null;
    }

    // Component state management
    const inputRef = useRef<HTMLInputElement>(null);
    const [validationState, validationDispatch] = useReducer(validationReducer, { isError: false, message: '' });

    // Create a "safe" version of the onValidate prop that will never crash the component.
    // It automatically dispatches an exception action if the original onValidate throws an error.
    const safeOnValidate = useSafeCallback(onValidate, () =>
        validationDispatch({ type: 'VALIDATION_EXCEPTION', payload: { message: 'Validation error occurred' } })
    );

    /**
     * Computes accessibility attributes for the input element
     * Ensures proper ARIA roles, labels, and error handling
     * 
     * @returns {Object} Computed accessibility attributes
     */
    const accessibilityAttributes = useMemo(() => {
        return {
            // Accessibility attributes
            'role': 'textbox',
            'aria-label': ariaLabel,
            'aria-invalid': validationState.isError,
            'aria-errormessage': validationState.isError ? validationState.message : undefined,
            'title': title,

            // Data attributes for styling
            'data-iserror': validationState.isError,
            'data-type': type,
        };
    },
        [type, ariaLabel, validationState]
    );

    /**
     * Computes data attributes for styling and debugging
     * Includes error state and input type for easier CSS targeting
     * 
     * @returns {Object} Computed data attributes
     */
    const dataAttributes = useMemo(() => {
        return {
            'data-iserror': validationState.isError,
            'data-type': type,
        };
    },
        [type, validationState]
    );

    /**
     * Computes input attributes based on type and constraints
     * Handles both number and text types with appropriate min/max/length constraints
     * Ensures attributes are only applied when valid
     * 
     * @returns {Object} Computed input attributes
     */
    const inputAttributes = useMemo(() => {
        const isNumberType = type === 'number';
        const isTextType = type === 'text';
        const hasValidMin = min > -Infinity;
        const hasValidMax = max < Infinity;

        return {
            // Number type constraints
            min: isNumberType && hasValidMin ? min : undefined,
            max: isNumberType && hasValidMax ? max : undefined,

            // Text type constraints
            minLength: isTextType && hasValidMin ? min : undefined,
            maxLength: isTextType && hasValidMax ? max : undefined,
            placeholder
        };
    },
        [type, min, max, placeholder]
    );

    /**
     * Resets the input field to its initial value and clears error state
     * Used when user cancels changes (Escape key) or validation fails
     * Ensures UI consistency by reverting to known good state
     * 
     * @returns {void}
     */
    const handleReset = useCallback((): void => {
        const inputElement = inputRef.current;

        // If input element is not found, log a warning and exit
        if (!inputElement) return devLog.warn('[GenericInput] Input element not found during reset');

        // Reset input value to prop value
        inputElement.value = value.toString();

        // Clear error state
        validationDispatch({ type: 'CLEAR' });
    },
        [value]
    );

    /**
     * Validates and commits the current input value
     * Performs validation if validator is provided, then calls onChange
     * Handles validation failures by setting error state and resetting
     * 
     * @returns {void}
     */
    const handleCommit = useCallback((): void => {
        const inputElement = inputRef.current;

        if (!inputElement) return devLog.warn('[GenericInput] Input element not found during commit');


        const inputValue = inputElement.value.trim();
        const validationResult = safeOnValidate(inputValue);

        // If validation doesn't exist or it threw an error, validationResult will be undefined.
        if (validationResult === undefined && onValidate) return;

        // If a validator exists and it failed, dispatch failure.
        if (validationResult && !validationResult.status) {
            validationDispatch({ type: 'VALIDATION_FAILURE', payload: { message: validationResult.message } });
            onChange(''); // Clear the value on validation failure
            devLog.warn(`[GenericInput] Validation failed: ${validationResult.message}`);
            return;
        }

        // On success, clear any existing error state.
        if (validationResult?.status) {
            validationDispatch({ type: 'VALIDATION_SUCCESS' });
        }

        // Only call onChange if value has actually changed
        if (inputValue !== value) {
            onChange(inputValue);
        }

    },
        [onChange, onValidate, value]
    );

    /**
     * Handles keyboard events for enhanced user experience
     * Provides keyboard shortcuts for common actions
     * 
     * @param {React.KeyboardEvent<HTMLInputElement>} event - Keyboard event
     * @returns {void}
     */
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
        switch (event.key) {
            case 'Enter':
                // Commit value on Enter key
                event.preventDefault();
                handleCommit();
                break;

            case 'Escape':
                // Reset and blur on Escape key
                event.preventDefault();
                handleReset();
                inputRef.current?.blur();
                break;

            default:
                // Allow other keys to propagate normally
                break;
        }
    },
        [handleCommit, handleReset]
    );

    /**
     * Handles real-time input changes for validation feedback
     * Provides immediate validation feedback without committing the value
     * Only validates if validator function is provided
     * 
     * @returns {void}
     */
    const handleChange = useCallback((): void => {
        const inputElement = inputRef.current;
        if (!inputElement) return;

        const inputValue = inputElement.value;
        const validationResult = safeOnValidate(inputValue);

        // If validation doesn't exist or it threw an error, do nothing.
        if (validationResult === undefined) return;


        // Dispatch success or failure based on the result.
        if (validationResult.status) {
            validationDispatch({ type: 'VALIDATION_SUCCESS' });
        } else {
            validationDispatch({ type: 'VALIDATION_FAILURE', payload: { message: validationResult.message } });
        }
    },
        [onValidate]
    );

    /**
     * Handles blur events when input loses focus
     * Triggers the external onBlur callback and resets input state
     * Ensures consistent behavior when user finishes interacting
     * 
     * @returns {void}
     */
    const handleBlur = useCallback((): void => {
        // Call external blur handler first
        onBlur();

        // Reset input to original state
        handleReset();
    },
        [handleReset, onBlur]
    );

    return (
        <div className={CSS.GenericInput} role="presentation" >
            {/* Prefix element for visual enhancement */}
            {prefix && (
                <span className={CSS.Prefix} aria-hidden="true">
                    {prefix}
                </span>
            )}

            {/* Main input element with comprehensive attributes */}
            <input
                ref={inputRef}
                type={type}
                defaultValue={value.toString()}
                className={CSS.Input}

                // Spread computed attributes for cleaner code
                {...accessibilityAttributes}
                {...inputAttributes}
                {...dataAttributes}

                // Event handlers
                onBlur={handleBlur}
                onFocus={onFocus}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />

            {/* Suffix element for visual enhancement */}
            {suffix && (
                <span className={CSS.Suffix} aria-hidden="true">
                    {suffix}
                </span>
            )}

            {/* Error message tooltip - only shown when there's an error */}
            <FloatReveal
                position="bottom"
                targetRef={inputRef}
                isOpen={validationState.isError}
                role="alertdialog"
                ariaLabel="Input Validation Error"
            >
                <div className={CSS.ErrorMessage} role="alert">

                    <span className={CSS.ErrorIcon} aria-hidden="true">
                        ✖
                    </span>

                    <span>{validationState.message}</span>
                </div>
            </FloatReveal>
        </div>
    );
};

export default memo(GenericInput);