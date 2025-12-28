"use client";

import { memo } from "react";

// Types
import type { BlockStyleValue } from "./types";


// Utilities
import { splitAdvanced, joinAdvanced } from "@/src/shared/utilities/string";
import { createOptionTable, getValueTokens, getTokenValues } from "@/src/core/block/style/utilities";
import { mergeArrays } from "@/src/shared/utilities/array";
import { getSyntaxSet, getSyntaxNormalized, getSyntaxParsed, getSyntaxSeparators } from "@/src/core/block/style/utilities/syntax";

// Components
import BlockStyleSlots from "@/src/features/block/style/slots/component";

// Registry
import { getRegisteredTokenTypes, getRegisteredTokens } from "@/src/core/block/style/registries";

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
    const syntaxParsed = getSyntaxParsed(styleDefinition.syntax, getRegisteredTokens());
    const syntaxSet = getSyntaxSet(syntaxParsed);
    const syntaxNormalized = getSyntaxNormalized(syntaxParsed);
    const syntaxSeparators = getSyntaxSeparators(syntaxParsed);

    // Split the value string into slots (e.g., ["10px", "auto"])
    const values = splitAdvanced(value);

    // Compute the possible slot options for each slot, based on current values and styleDefinition syntax
    const slotsOptions = createOptionTable(syntaxNormalized, syntaxSet, values, getRegisteredTokenTypes());

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
            if (variationIndex === -1) return;
            const syntax = syntaxNormalized[variationIndex];
            input = mergeArrays(input, getTokenValues(syntax.split(" "), getRegisteredTokens()));
        }

        // Get separators for this variation, or fallback to spaces
        const separators = syntaxSeparators[variationIndex]

        // Join values with the determined separators
        const joinedValue = joinAdvanced(input, separators);

        // Trigger the change callback
        onChange(joinedValue);
    }

    // Render the slot-based value editor, passing separators and new onChange
    return <BlockStyleSlots values={values} options={slotsOptions} onChange={handleSlotsChange} />
};

BlockStyleValue.displayName = "BlockStyleValue";
export default memo(BlockStyleValue);

