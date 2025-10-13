"use client";
import React, { useCallback, memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import GenericInput from "@/src/shared/components/input/generic/component";
import SelectDropdown from "@/src/shared/components/select/dropdown/component";

// Types
import { BlockStylesValueNumberProps } from "@/src/page-builder/ui/inspectors/block/types";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

// Constants
import { STYLE_ICON_DEFINITIONS } from "@/src/page-builder/core/block/style/constants/icon";


/**
 * BlockStylesValueNumber Component
 * A controlled input component for CSS numeric values with optional alternative options.
 * Provides float number input validation with support for special CSS values (auto, inherit, etc.).
 * Automatically formats decimal numbers and validates range constraints.
 *
 * @param props - BlockStylesValueNumberProps containing value, options, and onChange callback
 * @returns The rendered number input component with optional dropdown
 */
const BlockStylesValueNumber: React.FC<BlockStylesValueNumberProps> = ({ value, onChange, options, forceInteger }) => {
    // Validate input props
    if (!options || !Array.isArray(options) || options.length === 0) return devRender.error("[BlockStylesValueNumber] No options provided", { options });
    if (value == null) return devRender.error("[BlockStylesValueNumber] Invalid value provided, expected a string", { value });
    if (!onChange || typeof onChange !== "function") return devRender.error("[BlockStylesValueNumber] Invalid onChange callback provided, expected a function", { onChange });

    // Extract min and max values from options for validation
    const valueRange = useMemo(() => {
        const option = options.find(opt => opt.name === "number" || opt.name === "integer");

        // Ensure min and max are valid numbers if present
        const validMin = (option && "min" in option && typeof option.min === "number") ? option.min : -Infinity;
        const validMax = (option && "max" in option && typeof option.max === "number") ? option.max : Infinity;

        // Return the valueRange as an object
        return {
            min: validMin,
            max: validMax
        };
    }, [options]
    );

    // Validate numeric input and return error messages
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
        if (valueRange.min > -Infinity && numericValue < valueRange.min) {
            return {
                status: false,
                message: `Value must be at least ${valueRange.min}`
            };
        }

        // Check maximum value constraint
        if (valueRange.max < Infinity && numericValue > valueRange.max) {
            return {
                status: false,
                message: `Value must be at most ${valueRange.max}`
            };
        }

        return { status: true, message: "" };
    },
        [valueRange]
    );

    // Handle numeric input changes and format values
    const handleNumberChange = useCallback((inputValue: string): void => {
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

    // Handle dropdown option selection changes
    const handleOptionChange = useCallback((selectedOption: string): void => {
        if (!selectedOption) return onChange("");

        onChange(selectedOption);
    },
        [onChange]
    );

    // Determine if dropdown should be shown based on available options
    const showDropdown = useMemo(() => {
        return options.length > 1;
    }, [options.length]
    );

    return (
        <div className={CSS.BlockStylesValueNumber} role="presentation" data-has-dropdown={showDropdown} >

            {/* Main numeric input field */}
            <GenericInput
                value={value}
                min={valueRange.min}
                max={valueRange.max}
                placeholder="0.0"
                type="number"
                onValidate={validateNumber}
                onChange={handleNumberChange}
                title="Enter Numeric Value"
                className="NumberInput"
            />

            {/* Optional dropdown for alternative value types */}
            {showDropdown && (
                <SelectDropdown
                    options={options}
                    value={"number"}
                    onChange={handleOptionChange}
                    searchable={true}
                    groupable={true}
                    placeholder={STYLE_ICON_DEFINITIONS.number || "NUM"}
                    forcePlaceholder={true}
                    isDisabled={options.length <= 1}
                    title="Change Value Type"
                    className="NumberDropdown"
                />
            )}

        </div>
    );
};

export default memo(BlockStylesValueNumber);
