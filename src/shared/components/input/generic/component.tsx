"use client";

import React, { memo, useRef, useReducer, useEffect, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import FloatReveal from "@/shared/components/reveal/float/component";

// Types
import type { GenericInputProps } from "./types";

// Utilities
import { validationReducer } from "./reducer";


/**
 * GenericInput Component
 *
 * A sophisticated, controlled input component with built-in validation, error handling,
 * and user experience enhancements. Supports both text and number inputs with automatic
 * constraint handling and real-time validation feedback.
 *
 * @param props - Component properties
 * @param props.value - Current input value (required)
 * @param props.onChange - Callback fired when value changes (required)
 * @param props.type - Input type: 'text' (default) or 'number'
 * @param props.placeholder - Placeholder text when input is empty
 * @param props.min - Minimum value (numbers) or minimum length (text)
 * @param props.max - Maximum value (numbers) or maximum length (text)
 * @param props.title - Tooltip title for additional context
 * @param props.className - Additional CSS classes for styling
 * @param props.onValidate - Custom validation function returning {status, message}
 * @param props.onFocus - Callback when input receives focus
 * @param props.onBlur - Callback when input loses focus
 * @returns The rendered GenericInput component with validation UI
 */
const GenericInput: React.FC<GenericInputProps> = ({
    value,
    type = "text",
    placeholder = `Enter ${type}`,
    min = -Infinity,
    max = Infinity,
    title = "Enter Value",
    className = "",
    onChange,
    onFocus = () => { },
    onBlur = () => { },
    onValidate,
}) => {
    const [internalValue, setInternalValue] = useState(value ?? "");
    const inputRef = useRef<HTMLInputElement>(null);
    const [validationState, validationDispatch] = useReducer(validationReducer, { isError: false, message: "" });

    // Sync internal value with prop when value changes (e.g. block switch)
    useEffect(() => {
        setInternalValue(value ?? "");
    }, [value]
    );

    // Data attributes for styling
    const dataAttributes = {
        "title": title,
        "data-is-error": validationState.isError,
        "data-type": type,
    };

    // Input attributes
    const inputAttributes = (() => {
        const isNumberType = type === "number";
        const isTextType = type === "text";
        const hasValidMin = min > -Infinity;
        const hasValidMax = max < Infinity;

        return {
            min: isNumberType && hasValidMin ? min : undefined,
            max: isNumberType && hasValidMax ? max : undefined,
            minLength: isTextType && hasValidMin ? min : undefined,
            maxLength: isTextType && hasValidMax ? max : undefined,
            placeholder
        };
    })();

    // Reset input to prop value and clear error
    const handleReset = (): void => {
        setInternalValue(value ?? "");
        validationDispatch({ type: "CLEAR" });
    }

    // Commit value to parent (on blur/enter)
    const handleCommit = (): void => {
        const inputValue = internalValue.trim();

        const validationResult = onValidate?.(inputValue);

        if (validationResult && !validationResult.status) {
            validationDispatch({ type: "VALIDATION_FAILURE", payload: { message: validationResult.message } });
            return;
        }

        if (validationResult?.status) validationDispatch({ type: "VALIDATION_SUCCESS" });
        if (inputValue !== value) onChange(inputValue);
    };

    // Keyboard events
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        switch (event.key) {
            case "Enter":
                event.preventDefault();
                handleCommit();
                break;
            case "Escape":
                event.preventDefault();
                handleReset();
                break;
            default:
                break;
        }
    }

    // Real-time validation on change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = e.target.value;
        setInternalValue(newValue);

        if (!onValidate) return;

        const validationResult = onValidate(newValue);

        if (validationResult.status) {
            validationDispatch({ type: "VALIDATION_SUCCESS" });
        } else {
            validationDispatch({ type: "VALIDATION_FAILURE", payload: { message: validationResult.message } });
        }
    }

    // Blur handler: commit and reset
    const handleBlur = (): void => {
        onBlur();
        handleCommit();
    };

    return (
        <>
            <input
                className={`${CSS.GenericInput} GenericInput ${className}`}
                ref={inputRef}
                type={type}
                value={internalValue}
                {...inputAttributes}
                {...dataAttributes}
                onBlur={handleBlur}
                onFocus={onFocus}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />

            {/* Error message tooltip - only shown when there's an error */}
            <FloatReveal
                anchor="bottom"
                targetRef={inputRef}
                isOpen={validationState.isError}
            >
                <span className={`${CSS.ErrorMessage} ErrorMessage`}>
                    <span className={`${CSS.ErrorIcon} ErrorIcon`}>✖</span>
                    {validationState.message}
                </span>
            </FloatReveal>
        </>
    );
};

GenericInput.displayName = "GenericInput";
export default memo(GenericInput);