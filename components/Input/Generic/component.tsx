"use client";

import React, { useCallback, memo, useRef, useMemo, useReducer, useEffect, useState } from "react";

// Styles
import CSS from "./style.module.scss";

// Components
import FloatReveal from "@/components/reveal/float/component";

// Types
import type { GenericInputProps } from "./type";

// Utilities
import { devLog } from "@/utilities/dev";
import { validationReducer } from "./reducer";

// Hooks
import { useSafeCallback } from "@/hooks/utility/useSafeCallback";

/**
 * GenericInput Component (Controlled, idiomatic React)
 */
const GenericInput: React.FC<GenericInputProps> = (props: GenericInputProps) => {
    const {
        // Core
        value,
        type = "text",
        placeholder = `Enter ${type}`,
        style = {},
        // Validation
        min = -Infinity,
        max = Infinity,

        // Accessibility
        title = "Enter Value",
        className = "GenericInput",

        // Event
        onChange,
        onFocus = () => { },
        onBlur = () => { },
        onValidate,
    } = props;

    // Internal state for editing
    const [internalValue, setInternalValue] = useState(value ?? "");
    const inputRef = useRef<HTMLInputElement>(null);
    const [validationState, validationDispatch] = useReducer(validationReducer, { isError: false, message: "" });

    // Safe validator
    const safeOnValidate = useSafeCallback(onValidate, () =>
        validationDispatch({ type: "VALIDATION_EXCEPTION", payload: { message: "Validation error occurred" } })
    );

    // Sync internal value with prop when value changes (e.g. block switch)
    useEffect(() => {
        setInternalValue(value ?? "");
    }, [value]
    );


    // Data attributes for styling
    const dataAttributes = useMemo(() => ({
        "title": title,
        "data-is-error": validationState.isError,
        "data-type": type,
    }), [type, validationState, title]
    );

    // Input attributes
    const inputAttributes = useMemo(() => {
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
    }, [type, min, max, placeholder]
    );

    // Reset input to prop value and clear error
    const handleReset = useCallback((): void => {
        setInternalValue(value ?? "");
        validationDispatch({ type: "CLEAR" });
    }, [value]
    );

    // Commit value to parent (on blur/enter)
    const handleCommit = useCallback((): void => {
        const inputValue = internalValue.trim();
        const validationResult = safeOnValidate(inputValue);

        // If input is empty, clear the value
        if (inputValue === "") return onChange("");

        if (validationResult === undefined && onValidate) return;

        if (validationResult && !validationResult.status) {
            validationDispatch({ type: "VALIDATION_FAILURE", payload: { message: validationResult.message } });
            onChange("");
            devLog.warn(`[GenericInput] Validation failed: ${validationResult.message}`);
            return;
        }

        if (validationResult?.status) validationDispatch({ type: "VALIDATION_SUCCESS" });
        if (inputValue !== value) onChange(inputValue);

    }, [internalValue, value, onChange, onValidate, safeOnValidate]
    );

    // Keyboard events
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
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
    }, [handleCommit, handleReset]
    );

    // Real-time validation on change
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = e.target.value;
        setInternalValue(newValue);

        const validationResult = safeOnValidate(newValue);
        if (validationResult === undefined) return;

        if (validationResult.status) {
            validationDispatch({ type: "VALIDATION_SUCCESS" });
        } else {
            validationDispatch({ type: "VALIDATION_FAILURE", payload: { message: validationResult.message } });
        }
    }, [safeOnValidate]
    );

    // Blur handler: commit and reset
    const handleBlur = useCallback((): void => {
        onBlur();
        handleCommit();
    }, [onBlur, handleCommit]
    );

    // Guard Clause
    if (value == null) {
        devLog.warn("[GenericInput] Invalid value provided, expected a string");
        return null;
    }

    return (
        <>
            <input
                ref={inputRef}
                type={type}
                value={internalValue}
                className={`${CSS.GenericInput} ${className}`}
                {...inputAttributes}
                {...dataAttributes}
                onBlur={handleBlur}
                onFocus={onFocus}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={style}
            />

            {/* Error message tooltip - only shown when there's an error */}
            <FloatReveal
                position="bottom"
                targetRef={inputRef}
                isOpen={validationState.isError}
            >
                <span className={CSS.ErrorMessage} role="alert">
                    <span className={CSS.ErrorIcon} aria-hidden="true">✖</span>
                    {validationState.message}
                </span>
            </FloatReveal>
        </>
    );
};

export default memo(GenericInput);