import React, { useCallback, ReactElement, memo, useState, useRef, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import FloatReveal from '@/components/reveal/float/component';

// Types
import type { GenericInputProps } from './types';

// Utilities
import { devLog } from '@/utilities/dev';

/**
 * GenericInput Component
 * 
 * A flexible, accessible base input component with comprehensive validation support.
 * Provides real-time validation, error handling, keyboard navigation, and accessibility features.
 * Supports various input types with appropriate constraints and visual enhancements.
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
const GenericInput: React.FC<GenericInputProps> = (props: GenericInputProps): ReactElement => {
    const {
        // Core
        value = '',
        type = 'text',
        placeholder = `Enter ${type}`,

        // Validation
        min = -Infinity,
        max = Infinity,
        validate,

        // Accessibility
        ariaLabel = 'Generic Input',
        title = 'Enter Value',

        // Event
        onChange = () => { },
        onFocus = () => { },
        onBlur = () => { },

        // Visual
        prefix = '',
        suffix = '',
    } = props;

    // Component state management
    const inputRef = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

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
            'aria-invalid': isError,
            'aria-errormessage': isError ? errorMessage : undefined,
            'title': title,

            // Data attributes for styling
            'data-iserror': isError,
            'data-type': type,
        };
    },
        [type, ariaLabel, isError, errorMessage]
    );

    /**
     * Computes data attributes for styling and debugging
     * Includes error state and input type for easier CSS targeting
     * 
     * @returns {Object} Computed data attributes
     */
    const dataAttributes = useMemo(() => {
        return {
            'data-iserror': isError,
            'data-type': type,
        };
    },
        [type, isError]
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

        if (!inputElement) {
            devLog.warn('[GenericInput] Input element not found during reset');
            return;
        }

        // Reset input value to prop value
        inputElement.value = value.toString();

        // Clear error state
        setIsError(false);
        setErrorMessage('');

        devLog.info('[GenericInput] Input reset to original value');
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

        if (!inputElement) {
            devLog.warn('[GenericInput] Input element not found during commit');
            return;
        }

        const inputValue = inputElement.value.trim();

        // Perform validation if validator function is provided
        if (validate) {
            try {
                const validationResult = validate(inputValue);

                if (!validationResult.status) {
                    // Validation failed - set error state and clear value
                    setIsError(true);
                    setErrorMessage(validationResult.message || 'Invalid input');
                    onChange(''); // Clear the value on validation failure
                    devLog.warn(`[GenericInput] Validation failed: ${validationResult.message}`);
                    return;
                }

                // Clear any existing error state on successful validation
                setIsError(false);
                setErrorMessage('');
            } catch (error) {
                devLog.error('[GenericInput] Validation function threw an error:', error);
                setIsError(true);
                setErrorMessage('Validation error occurred');
                return;
            }
        }

        // Only call onChange if value has actually changed
        if (inputValue !== value) {
            onChange(inputValue);
        }

    },
        [onChange, validate, value]
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
        // Only perform real-time validation if validator is provided
        if (!validate) return;

        const inputElement = inputRef.current;
        if (!inputElement) return;

        const inputValue = inputElement.value;

        try {
            const validationResult = validate(inputValue);
            setIsError(!validationResult.status);
            setErrorMessage(validationResult.message || '');
        } catch (error) {
            devLog.error('[GenericInput] Real-time validation error:', error);
            setIsError(true);
            setErrorMessage('Validation error');
        }
    },
        [validate]
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
                isOpen={isError}
                role="alertdialog"
                ariaLabel="Input validation error"
            >
                <div className={CSS.ErrorMessage} role="alert">

                    <span className={CSS.ErrorIcon} aria-hidden="true">
                        ✖
                    </span>

                    <span>{errorMessage}</span>
                </div>
            </FloatReveal>
        </div>
    );
};

export default memo(GenericInput);