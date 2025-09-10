"use client";
import React, { memo } from "react";

// Styles
import CSS from "@/editors/block/components/style/value/function/styles.module.scss";

// Types
import type { StylesEditorValueFunctionProps } from "@/editors/block/types/component";
import type { StyleKeys } from "@/editors/block/types/core/style/style";

// Components
import DropdownReveal from "@/components/reveal/dropdown/component";
import DropdownSelect from "@/components/select/dropdown/component";
import StylesEditorValue from "@/editors/block/components/style/value/component";

// Constants
import { createProperty } from "@/constants/style/style";

// Utilities
import { filterFunctionOptions, matchFunctionOption, extractFunctionValue } from "@/editors/block/utilities/style/function";
import { devRender } from "@/utilities/dev";

/**
 * StylesEditorValueFunction Component
 * Renders a controlled input component for CSS function values with separate controls for function selection and arguments.
 *
 * @param value - Current CSS function value (e.g., "repeat(2, 1fr)")
 * @param options - Available function options with categories and syntax
 * @param onChange - Callback for value changes
 * @returns The rendered function input component
 */
const StylesEditorValueFunction: React.FC<StylesEditorValueFunctionProps> = ({ value, options, onChange }) => {
    if (typeof value !== "string") return devRender.error("[StylesEditorValueFunction] No value provided", { value });
    if (!options || !Array.isArray(options) || options.length === 0) return devRender.error("[StylesEditorValueFunction] No options provided", { options });
    if (!onChange || typeof onChange !== "function") return devRender.error("[StylesEditorValueFunction] Invalid onChange callback", { onChange });

    const functionOptions = filterFunctionOptions(options);
    const currentOption = matchFunctionOption(functionOptions, value);
    const createdProperty = createProperty(currentOption.name as StyleKeys, currentOption.syntax);
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

    if (!extractedValue.name || !extractedValue.value) return devRender.error("[StylesEditorValueFunction] Malformed function value - missing name or arguments.", { value, extractedValue });
    if (!currentOption) return devRender.error("[StylesEditorValueFunction] No valid function option available.", { options, functionOptions });
    if (!createdProperty) return devRender.error("[StylesEditorValueFunction] No valid property available for the current function option.", { currentOption });

    return (
        <DropdownReveal closeOnChange={false} placeholder={`${extractedValue.name}()`} title="Edit Function">

            <div className={CSS.StylesEditorValueFunction} role="presentation">
                {/* Function selection dropdown */}
                <DropdownSelect
                    options={options}
                    value={currentOption.name}
                    onChange={handleFunctionChange}
                    title="Change Value Type"
                    placeholder="↺"
                    forcePlaceholder={true}
                    groupable={true}
                    className="FunctionSelect"
                />

                {/* Visual separator */}
                <span className={CSS.StylesEditorValueFunction__Separator} aria-hidden="true">⇄</span>

                {/* Function arguments editor */}
                <StylesEditorValue
                    value={extractedValue.value}
                    property={createdProperty}
                    onChange={handleValueChange}
                />

            </div>
        </DropdownReveal>
    );
};

export default memo(StylesEditorValueFunction);
