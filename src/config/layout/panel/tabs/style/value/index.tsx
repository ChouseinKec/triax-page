"use client";
import { memo } from "react";
// Styles
import CSS from "./styles.module.scss";

// Types
import type { BlockStyleValue } from "./types";

// Utilities
import { splitAdvanced, joinAdvanced } from "@/shared/utilities/string";
import { createOptionTable, getValueTokens, getTokenValues } from "@/core/block/style/instance/utilities";
import { mergeArrays } from "@/shared/utilities/array";
import { devLog } from "@/shared/utilities/dev";
import { getSyntaxParsed, getSyntaxNormalized, getSyntaxSet, getSyntaxSeparators } from '@/core/block/style/instance/utilities/syntax';

// Components
import NodeStyleslots from "@/config/layout/panel/tabs/style/slots";
import GenericInput from "@/shared/components/input/generic/component";

// Registry
import { getRegisteredTokenTypes, getRegisteredTokens, getRegisteredStyles, getRegisteredUnits } from "@/core/block/style/definition/state/registry";

/**
 * BlockStyleValue Component
 *
 * The primary CSS styleDefinition value editor that orchestrates complex syntax parsing and multi-slot editing.
 * Handles CSS styleDefinition syntax normalization, value tokenization, and separator management for advanced properties.
 * Automatically determines appropriate editing UI based on styleDefinition syntax definitions and current values.
 *
 * @param  props - Component properties
 * @param  props.value - Current CSS styleDefinition value string
 * @param  props.styleDefinition - Complete CSS styleDefinition definition with syntax and constraints
 * @param  props.onChange - Callback triggered when styleDefinition value changes
 * @returns Rendered multi-slot value editor with syntax-aware editing capabilities
 *
 * @note Performs complex syntax matching and normalization to maintain valid CSS while providing intuitive editing
 */
const BlockStyleValue: React.FC<BlockStyleValue> = ({ value, onChange, styleDefinition }) => {
    // Get the syntaxSet (all possible tokens for each slot) and normalized variations from the styleDefinition definition
    const syntaxParsed = getSyntaxParsed(styleDefinition.key, styleDefinition.syntax, getRegisteredTokens(), getRegisteredTokenTypes());
    const syntaxSet = getSyntaxSet(styleDefinition.key, syntaxParsed);
    const syntaxNormalized = getSyntaxNormalized(styleDefinition.key, syntaxParsed, getRegisteredTokenTypes());
    const syntaxSeparators = getSyntaxSeparators(styleDefinition.key, syntaxParsed);
    const values = splitAdvanced(value);
    const slotsOptions = createOptionTable(styleDefinition.key, syntaxNormalized, syntaxSet, values, getRegisteredTokenTypes(), getRegisteredTokens(), getRegisteredStyles(), getRegisteredUnits());


    if (!slotsOptions) return <GenericInput className={CSS.fallback} value={value} onChange={onChange} placeholder={`Enter ${styleDefinition.key} value`} />;


    // Handler to update slot values and join with correct separators
    const handleSlotsChange = (input: string[]) => {
        if (!input || (input.length === 1 && input[0] === "")) return onChange("");

        // Normalize updated values to canonical tokens
        const valueTokens = getValueTokens(input, getRegisteredTokenTypes()).join(" ");

        // Find the index of the matching variation with strict matching
        // This will return the index of the variation that matches the updated value tokens
        let variationIndex = syntaxNormalized.findIndex((value) => value === valueTokens)


        // If no matching variation is found,
        // Find the index of the matching variation with non-strict matching
        // This will return the index of the variation that starts with the updated value tokens
        // Needed for variations with tuple values
        if (variationIndex === -1) {
            variationIndex = syntaxParsed.findIndex((value) => value.startsWith(valueTokens));

            // If still no match, return early
            // This will prevent assignment of invalid syntax when the slot is set to "" or empty
            if (variationIndex === -1) return devLog.warn("No matching syntax variation found for value tokens:", { valueTokens, syntaxParsed }), undefined;

            // Rebuild the input array based on the matched variation's full syntax
            // This ensures all required tokens are included
            // For example, if the variation is "<length> <length> <color>" and input is ["10px"],
            // this will expand input to ["10px", "0px", "#ffffff"] using default token values
            const syntax = syntaxNormalized[variationIndex];
            input = mergeArrays(input, getTokenValues(splitAdvanced(syntax), getRegisteredTokens(), getRegisteredTokenTypes()));
        }

        // Get separators for this variation
        const separators = syntaxSeparators[variationIndex]

        // Join values with the determined separators
        const joinedValue = joinAdvanced(input, separators);

        // Trigger the change callback
        onChange(joinedValue);
    }

    // Render the slot-based value editor, passing separators and new onChange
    return <NodeStyleslots values={values} options={slotsOptions} onChange={handleSlotsChange} />
};

BlockStyleValue.displayName = "BlockStyleValue";
export default memo(BlockStyleValue);

