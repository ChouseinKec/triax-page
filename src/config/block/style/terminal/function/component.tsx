"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { TerminalComponentProps } from "@/core/block/style/types";
import type { StyleKey } from "@/core/block/style/types";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";
import StyleValue from "@/config/layout/panel/tabs/style/value/component";

// Utilities
import { matchFunctionOption, extractFunctionValue, deriveConstraint } from "@/core/block/style/utilities";
import { devRender } from "@/shared/utilities/dev";
import { getNonTerminalDefinitions } from "@/core/block/style/managers";

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
const FunctionValue: React.FC<TerminalComponentProps> = ({ value, options, onChangeValue, onChangeOption }) => {
    const nonTerminalDefinitions = getNonTerminalDefinitions();
    const currentOption = matchFunctionOption(options, value);
    const constraint = currentOption?.syntax
        ? deriveConstraint(currentOption.syntax as string, nonTerminalDefinitions)
        : undefined;
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
        if (newValue === "" || newValue === null || newValue === undefined) return onChangeValue(null);

        // Build new function value with updated arguments
        const newFunctionValue = `${extractedValue.name}(${newValue})`;
        onChangeValue(newFunctionValue);
    };

    // Handle changes when user selects a different CSS function type
    // If no function is selected (cleared), the entire value is cleared
    const handleFunctionChange = (newOptionValue: string): void => {
        // Clear value if no option selected
        if (!newOptionValue) return onChangeOption(null);

        // Update to new function value (type switch)
        onChangeOption(newOptionValue);
    };

    if (!extractedValue.name || !extractedValue.value) return devRender.error("[FunctionValue] Malformed function value - missing name or arguments.", { value, extractedValue });
    if (!currentOption) return devRender.error("[FunctionValue] No valid function option available.", { currentOption });
    if (!constraint) return devRender.error("[FunctionValue] No valid constraint available for the current function option.", { currentOption });

    return (
        <div className={`${CSS.FunctionValue} FunctionValue`}>

            {/* Function selection dropdown */}
            <DropdownSelect
                options={options}
                value={currentOption.name}
                onChange={handleFunctionChange}
                title="Change Value Type"
                groupable={true}
            />


            {/* Function arguments editor */}
            <StyleValue
                value={extractedValue.value}
                styleKey={currentOption.name as StyleKey}
                constraint={constraint}
                onChange={handleValueChange}
            />

        </div>
    );
};

FunctionValue.displayName = "FunctionValue";
export default memo(FunctionValue);
