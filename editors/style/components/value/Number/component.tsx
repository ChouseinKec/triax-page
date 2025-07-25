"use client";

// External imports
import React, { useCallback, memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import GenericInput from "@/components/input/generic/component";
import SelectDropdown from "@/components/select/dropdown/component";

// Types
import { NumberValueProps } from "./types";

// Utilities
import { devLog } from "@/utilities/dev";

// Constants
import { StyleIconDefinitions } from "@/constants/style/icon";


/**
 * NumberValue Component
 * 
 * A controlled input component for CSS numeric values with optional alternative options.
 * Provides float number input validation with support for special CSS values (auto, inherit, etc.).
 * Automatically formats decimal numbers and validates range constraints.
 * 
 * @param {NumberValueProps} props - Component properties
 * @param {string} [props.value=""] - Current numeric value as string
 * @param {function} [props.onChange] - Callback for value changes
 * @param {Array} [props.options=[]] - Available alternative options (keywords, etc.)
 * @param {number} [props.min=-Infinity] - Minimum allowed numeric value
 * @param {number} [props.max=Infinity] - Maximum allowed numeric value
 * @param {boolean} [props.forceInteger=false] - Whether the value should be treated as an integer
 * @returns {ReactElement} Memoized NumberValue component
 */
const NumberValue: React.FC<NumberValueProps> = memo((props: NumberValueProps) => {
    const {
        value = "",
        onChange = () => { },
        options = [],
        forceInteger = false,
    } = props;


    if (!options || options.length === 0) {
        devLog.error("[NumberValue] No options provided");
        return null;
    }

    if (value == null) {
        devLog.error("[NumberValue] Invalid value provided, expected a string");
        return null;
    }


    // Extracts min and max from options if available, otherwise defaults to -Infinity and Infinity
    const range = useMemo(() => {
        const option = options.find(opt => opt.name === "number" || opt.name === "integer");
        // Ensure min and max are valid numbers if present
        const validMin = (option && "min" in option && typeof option.min === "number") ? option.min : -Infinity;
        const validMax = (option && "max" in option && typeof option.max === "number") ? option.max : Infinity;

        // Return the range as an object
        return {
            min: validMin,
            max: validMax
        };
    }, [options]
    );

    /**
    * Validates numeric input and provides user-friendly error messages
    * Checks for valid numbers, range constraints, and handles edge cases
    * 
    * @param {string} inputValue - The input value to validate
    * @returns {object} Validation result with status and message
    */
    const validateNumber = useCallback((inputValue: string): { status: boolean; message: string } => {
        // Allow empty values
        if (inputValue === "" || inputValue === null || inputValue === undefined) {
            return { status: true, message: "" };
        }

        // Parse the numeric value
        const numericValue = parseFloat(inputValue);

        // Check if it"s a valid number
        if (isNaN(numericValue) || !isFinite(numericValue)) {
            return {
                status: false,
                message: "Please enter a valid number"
            };
        }

        // Check minimum value constraint
        if (range.min > -Infinity && numericValue < range.min) {
            return {
                status: false,
                message: `Value must be at least ${range.min}`
            };
        }

        // Check maximum value constraint
        if (range.max < Infinity && numericValue > range.max) {
            return {
                status: false,
                message: `Value must be at most ${range.max}`
            };
        }

        return { status: true, message: "" };
    },
        [range]
    );

    /**
     * Handles changes to the numeric input component
     * Formats valid numeric input and delegates validation to GenericInput
     * 
     * @param {string} inputValue - The new numeric value from input
     */
    const handleNumberChange = useCallback((inputValue: string): void => {
        // Handle empty input
        if (inputValue === "" || inputValue === null || inputValue === undefined) return onChange("");


        let safeValue: string;
        if (forceInteger) {
            // Convert to integer, fallback to empty if invalid
            const intValue = parseInt(inputValue, 10);
            safeValue = isNaN(intValue) ? "" : intValue.toString();
        } else {
            // Convert to float with one decimal (0.0), fallback to empty if invalid
            const floatValue = parseFloat(inputValue);
            safeValue = isNaN(floatValue) ? "" : floatValue.toFixed(1);
        }

        onChange(safeValue);
    },
        [onChange]
    );

    /**
     * Handles changes to the options dropdown selection
     * Allows selection of alternative CSS values (keywords, etc.)
     * 
     * @param {string} selectedOption - The new option value from dropdown
     */
    const handleOptionChange = useCallback((selectedOption: string): void => {
        if (!selectedOption) {
            onChange("");
            return;
        }

        onChange(selectedOption);
    },
        [onChange]
    );

    const showDropdown = useMemo(() => {
        // Show dropdown only if there are multiple options available   
        return options.length > 1;
    }, [options.length]);

    return (
        <div className={CSS.NumberValue} role="presentation" data-has-dropdown={showDropdown} >

            {/* Numeric input for float values */}
            <GenericInput
                value={value}
                min={range.min}
                max={range.max}
                placeholder="0.0"
                type="number"
                onValidate={validateNumber}
                onChange={handleNumberChange}
                title="Enter Numeric Value"
            />

            {/* Options dropdown for alternative values */}

            {showDropdown && (
                <SelectDropdown
                    options={options}
                    value={"number"}
                    onChange={handleOptionChange}
                    searchable={true}
                    grouped={true}
                    placeholder={StyleIconDefinitions.number || "NUM"}
                    forcePlaceholder={true}
                    isDisabled={options.length <= 1}
                    ariaLabel="Change Value Type"
                    title="Change Value Type"
                />
            )}

        </div>
    );
});

export default NumberValue;
