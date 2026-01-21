"use client";
import React, { useCallback, memo, useMemo } from "react";

// Types
import { TokenIntegerProps } from "./types";

// Styles
import CSS from "./styles.module.scss";

// Components
import GenericInput from "@/shared/components/input/generic/component";
import SelectDropdown from "@/shared/components/select/dropdown/component";

/**
 * TokenInteger Component
 *
 * A comprehensive numeric input component for CSS values with validation, range constraints, and alternative type selection.
 * Supports decimal with automatic formatting and min/max validation.
 * Provides dropdown access to alternative CSS values (auto, inherit, etc.) when multiple options are available.
 *
 * @param  props - Component properties
 * @param  props.value - Current numeric value as string
 * @param  props.onChange - Callback triggered when value changes
 * @param  props.options - Array of available value type options with validation ranges
 * @returns Rendered numeric input with optional alternative value selector
 */
const TokenInteger: React.FC<TokenIntegerProps> = ({ value, onChange, options }) => {
    // Extract min and max values from options for validation
    const valueRange = useMemo(() => {
        const option = options.find(opt => opt.name === "integer");

        // Ensure min and max are valid numbers if present
        const validMin = (option && "min" in option && typeof option.min === "number") ? option.min : -Infinity;
        const validMax = (option && "max" in option && typeof option.max === "number") ? option.max : Infinity;

        // Return the valueRange as an object
        return { min: validMin, max: validMax };
    }, [options]
    );

    // Validate numeric input and return error messages
    const validateNumber = useCallback((inputValue: string): { status: boolean; message: string } => {
        // Allow empty values
        if (inputValue === "" || inputValue === null || inputValue === undefined) return { status: true, message: "" };

        // Parse the numeric value
        const numericValue = parseInt(inputValue);

        // Check if it"s a valid number
        if (isNaN(numericValue) || !isFinite(numericValue)) return { status: false, message: "Please enter a valid number" };

        // Check minimum value constraint
        if (valueRange.min > -Infinity && numericValue < valueRange.min) return { status: false, message: `Value must be at least ${valueRange.min}` };

        // Check maximum value constraint
        if (valueRange.max < Infinity && numericValue > valueRange.max) return { status: false, message: `Value must be at most ${valueRange.max}` };

        // If all checks pass, return valid status
        return { status: true, message: "" };
    },
        [valueRange]
    );

    // Handle numeric input changes and format values
    const handleNumberChange = useCallback((inputValue: string): void => {
        // Allow empty values
        if (inputValue === "" || inputValue === null || inputValue === undefined) return onChange("");

        // Convert to integer, fallback to empty if invalid
        const intValue = parseInt(inputValue);
        const safeValue = isNaN(intValue) ? "" : intValue.toString();

        // Trigger onChange with formatted value
        onChange(safeValue);
    },
        [onChange]
    );

    // Handle dropdown option selection changes
    const handleOptionChange = useCallback((selectedOption: string): void => {
        // Allow empty selection
        if (!selectedOption) return onChange("");

        // Trigger onChange with selected option
        onChange(selectedOption);
    },
        [onChange]
    );

    // Determine if dropdown should be shown based on available options
    const showDropdown = useMemo(() => { return options.length > 1; }, [options.length]);

    return (
        <div className={CSS.TokenInteger} role="presentation" data-has-dropdown={showDropdown} >

            <GenericInput
                value={value}
                min={valueRange.min}
                max={valueRange.max}
                placeholder="0"
                type="number"
                onValidate={validateNumber}
                onChange={handleNumberChange}
                title="Enter Numeric Value"
            />

            {/* Optional dropdown for alternative value types */}
            {showDropdown && (
                <SelectDropdown
                    options={options}
                    value={"number"}
                    onChange={handleOptionChange}
                    searchable={true}
                    groupable={true}
                    placeholder={"NUM"}
                    forcePlaceholder={true}
                    isDisabled={options.length <= 1}
                    title="Change Value Type"
                />
            )}

        </div>
    );
};

TokenInteger.displayName = "TokenInteger";
export default memo(TokenInteger);
