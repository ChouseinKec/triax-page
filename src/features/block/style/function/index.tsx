"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { FunctionValueProps } from "./types";
import type { StyleKey } from "@/src/core/block/style/types";

// Components
import DropdownReveal from "@/src/shared/components/reveal/dropdown/component";
import DropdownSelect from "@/src/shared/components/select/dropdown/component";
import BlockStyleValue from "@/src/features/block/style";

// Constants
import { createProperty } from "@/src/core/block/style/constants";

// Utilities
import { filterFunctionOptions, matchFunctionOption, extractFunctionValue } from "@/src/core/block/style/utilities";
import { devRender } from "@/src/shared/utilities/dev";

/**
 * FunctionValue Component
 *
 * An advanced CSS function value editor for the page builder that provides separate controls for function selection and argument editing.
 * Parses CSS function syntax (e.g., "repeat(2, 1fr)") and allows users to change function types while preserving arguments.
 * Features dropdown selection for function types and integrated value editing for arguments.
 *
 * @param  props - Component properties
 * @param  props.value - Current CSS function value with syntax like "function(args)"
 * @param  props.options - Array of available CSS function options with categories and syntax
 * @param  props.onChange - Callback triggered when function value changes
 * @returns Rendered function editor with type selector and argument input
 */
const FunctionValue: React.FC<FunctionValueProps> = ({ value, options, onChange }) => {
    const functionOptions = filterFunctionOptions(options);
    const currentOption = matchFunctionOption(functionOptions, value);
    const createdProperty = currentOption ? createProperty(currentOption.name as StyleKey, currentOption.syntax) : undefined;
    const extractedValue = extractFunctionValue(value);

    // Handle changes to CSS function value arguments
    // Updates only the arguments part of the function, preserving the function name
    // If input is cleared, the entire value is cleared
    // If function name is missing, no action is taken
    // Example: "repeat(2, 1fr)" with newValue "3, 2fr" becomes "repeat(3, 2fr)"
    const handleValueChange = (newValue: string): void => {
        // Check if function name is available
        if (!extractedValue.name) return;

        // Clear value if input is empty
        if (newValue === "" || newValue === null || newValue === undefined) return onChange("");

        // Build new function value with updated arguments
        const newFunctionValue = `${extractedValue.name}(${newValue})`;

        onChange(newFunctionValue);
    };

    // Handle changes when user selects a different CSS function type
    // If no function is selected (cleared), the entire value is cleared
    const handleFunctionChange = (newOptionValue: string): void => {
        // Clear value if no option selected
        if (!newOptionValue) return onChange("");

        // Update to new function value
        onChange(newOptionValue);
    }

    if (!extractedValue.name || !extractedValue.value) return devRender.error("[FunctionValue] Malformed function value - missing name or arguments.", { value, extractedValue });
    if (!currentOption) return devRender.error("[FunctionValue] No valid function option available.", { options, functionOptions });
    if (!createdProperty) return devRender.error("[FunctionValue] No valid property available for the current function option.", { currentOption });

    return (
        <DropdownReveal
            closeOnChange={false}
            placeholder={`${extractedValue.name}()`}
            title="Edit Function"
        >

            <div className={`${CSS.FunctionValue} FunctionValue`} >

                {/* Function selection dropdown */}
                <DropdownSelect
                    options={options}
                    value={currentOption.name}
                    onChange={handleFunctionChange}
                    title="Change Value Type"
                    placeholder="↺"
                    forcePlaceholder={true}
                    groupable={true}
                />

                {/* Visual separator */}
                <span className={CSS.Separator} aria-hidden="true">⇄</span>

                {/* Function arguments editor */}
                <BlockStyleValue
                    value={extractedValue.value}
                    property={createdProperty}
                    onChange={handleValueChange}
                />

            </div>
        </DropdownReveal>
    );
};

FunctionValue.displayName = "FunctionValue";
export default memo(FunctionValue);
