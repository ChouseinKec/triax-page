"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { BlockStylesValueFunctionProps } from "@/src/page-builder/ui/inspectors/block/types";
import type { StyleKeys } from "@/src/page-builder/core/block/style/types";

// Components
import DropdownReveal from "@/src/shared/components/reveal/dropdown/component";
import DropdownSelect from "@/src/shared/components/select/dropdown/component";
import BlockStylesValue from "@/src/page-builder/ui/inspectors/block/style/value/component";

// Constants
import { createProperty } from "@/src/page-builder/core/block/style/constants";

// Utilities
import { filterFunctionOptions, matchFunctionOption, extractFunctionValue } from "@/src/page-builder/core/block/style/utilities";
import { devRender } from "@/src/shared/utilities/dev";

/**
 * BlockStylesValueFunction Component
 * Renders a controlled input component for CSS function values with separate controls for function selection and arguments.
 *
 * @param value - Current CSS function value (e.g., "repeat(2, 1fr)")
 * @param options - Available function options with categories and syntax
 * @param onChange - Callback for value changes
 * @returns The rendered function input component
 */
const BlockStylesValueFunction: React.FC<BlockStylesValueFunctionProps> = ({ value, options, onChange }) => {
    if (typeof value !== "string") return devRender.error("[BlockStylesValueFunction] No value provided", { value });
    if (!options || !Array.isArray(options) || options.length === 0) return devRender.error("[BlockStylesValueFunction] No options provided", { options });
    if (!onChange || typeof onChange !== "function") return devRender.error("[BlockStylesValueFunction] Invalid onChange callback", { onChange });

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

    if (!extractedValue.name || !extractedValue.value) return devRender.error("[BlockStylesValueFunction] Malformed function value - missing name or arguments.", { value, extractedValue });
    if (!currentOption) return devRender.error("[BlockStylesValueFunction] No valid function option available.", { options, functionOptions });
    if (!createdProperty) return devRender.error("[BlockStylesValueFunction] No valid property available for the current function option.", { currentOption });

    return (
        <DropdownReveal closeOnChange={false} placeholder={`${extractedValue.name}()`} title="Edit Function">

            <div className={CSS.BlockStylesValueFunction} role="presentation">
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
                <span className={CSS.BlockStylesValueFunction__Separator} aria-hidden="true">⇄</span>

                {/* Function arguments editor */}
                <BlockStylesValue
                    value={extractedValue.value}
                    property={createdProperty}
                    onChange={handleValueChange}
                />

            </div>
        </DropdownReveal>
    );
};

export default memo(BlockStylesValueFunction);
