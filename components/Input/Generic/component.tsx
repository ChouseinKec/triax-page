import React, { useCallback, ReactElement, memo, useState, useRef } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import FloatReveal from '@/components/Reveal/Float/component';

// Types
export interface GENERIC_INPUT {
    value: string;
    min?: number;
    max?: number;
    type?: 'text' | 'number';
    placeholder?: string;
    validate?: (value: string) => {
        status: boolean;
        message: string;
    };
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

/**
 * GenericInput Component - Base component for input fields with validation
 * 
 * @param {GENERIC_INPUT} props - Component props
 * @returns {ReactElement} - Input element with validation
 */
const GenericInput: React.FC<GENERIC_INPUT> = (props: GENERIC_INPUT): ReactElement => {
    const {
        value = '',
        min = -Infinity,
        max = Infinity,
        type = 'text',
        placeholder,
        validate,
        onChange = () => { },
        onFocus = () => { },
        onBlur = () => { },
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Resets the input field to its initial value and clears any error state
     * This is useful for resetting the input after validation or when the user cancels changes.
     * @returns {void}
     */
    const handleReset = useCallback(() => {
        const inputEl = inputRef.current;
        if (!inputEl) return;

        inputEl.value = value;
        setIsError(false);
        setErrorMessage('');
    }, [value]);

    /**
     * Commits the current input value after validation
     * If the input is empty or invalid, it resets the input or calls onChange with an empty string.
     * @param {boolean} resetInput - Whether to reset the input field after committing
     * @returns {void}
     */
    const handleCommit = useCallback(() => {
        const inputEl = inputRef.current;
        const inputValue = inputEl?.value.trim() || '';

        // Validate the input value if a validation function is provided
        // If validation fails, set error state and reset input if required
        if (validate) {
            const validationResult = validate(inputValue);
            if (!validationResult.status) {
                setIsError(true);
                setErrorMessage(validationResult.message);
                onChange('');
                return;
            }
        }

        if (inputValue !== value) {
            onChange(inputValue);
        }
    }, [onChange, validate, value]
    );

    /**
     * Handles key down events for the input field
     * - On 'Enter', commits the current value
     * - On 'Escape', blurs the input field
     * @param {React.KeyboardEvent} e - The keyboard event
     * @return {void}
     */
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommit();
        } else if (e.key === 'Escape') {
            inputRef.current?.blur();
        }
    }, [handleCommit]
    );

    /**
     * Handles input changes and validates the current value
     * If validation fails, sets an error state and message.
     * @param {React.ChangeEvent} e - The change event
     * @return {void}
    */
    const handleChange = useCallback(() => {
        if (!validate) return;
        const inputValue = inputRef.current?.value || '';
        const validationResult = validate(inputValue);
        setIsError(!validationResult.status);
        setErrorMessage(validationResult.message);
    }, [validate]
    );

    /**
     * Handles blur events for the input field
     * Resets the error state and commits the current value.
     * @return {void}
     */
    const handleBlur = useCallback(() => {
        onBlur();
        handleReset();
    }, [handleReset]
    );


    return (
        <>

            <input
                type={type}
                defaultValue={value.toString()}
                className={CSS.Input}
                placeholder={placeholder || `Enter ${type}`}
                ref={inputRef}

                min={type === 'number' && min > -Infinity ? min : undefined}
                max={type === 'number' && max < Infinity ? max : undefined}
                minLength={type === 'text' && min > -Infinity ? min : undefined}
                maxLength={type === 'text' && max < Infinity ? max : undefined}

                data-iserror={isError}

                onBlur={handleBlur}
                onFocus={onFocus}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />


            {/* Render error message if input is in error state */}
            <FloatReveal position='bottom' targetRef={inputRef} isOpen={isError}>
                <p className={CSS.ErrorMessage}><i className={CSS.ErrorIcon}>✖</i>{errorMessage}</p>
            </FloatReveal>

        </>

    );
};

export default memo(GenericInput);