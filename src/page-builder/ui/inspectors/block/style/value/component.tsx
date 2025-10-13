"use client";

import { memo } from "react";

// Types
import type { BlockStylesValue } from "@/src/page-builder/ui/inspectors/block/types";

// Constants
import { VALUE_SEPARATOR_DEFAULTS } from "@/src/page-builder/core/block/style/constants";

// Utilities
import { splitAdvanced, joinAdvanced } from "@/src/shared/utilities/string";
import { createOptionTable, getValueTokens, getTokenValues } from "@/src/page-builder/core/block/style/utilities";
import { mergeArrays } from "@/src/shared/utilities/array";
import { devRender } from "@/src/shared/utilities/dev";

// Components
import BlockStylesSlots from "@/src/page-builder/ui/inspectors/block/style/value/slots/component";


/**
 * BlockStylesValue Component
 * Main entry for rendering a CSS property value editor.
 * Handles parsing, slotting, and incremental UI for property values.
 *
 * @param blockID - The ID of the block
 * @param propertyName - The CSS property key
 * @returns ReactElement - The rendered value editor UI for the property.
 */
const BlockStylesValue: React.FC<BlockStylesValue> = ({ value, onChange, property }) => {
    if (typeof value !== "string") return devRender.error("[BlockStylesValue] No value provided", { value });
    if (!property || typeof property !== "object") return devRender.error("[BlockStylesValue] No property provided", { property });
    if (!onChange || typeof onChange !== "function") return devRender.error("[BlockStylesValue] Invalid onChange callback", { onChange });

    // Get the syntaxSet (all possible tokens for each slot) and normalized variations from the property definition
    const syntaxSet = property.syntaxSet;
    const syntaxParsed = property.syntaxParsed;
    const syntaxNormalized = property.syntaxNormalized;
    const syntaxSeparators = property.syntaxSeparators;

    // Split the value string into slots (e.g., ["10px", "auto"])
    const values = splitAdvanced(value, [...VALUE_SEPARATOR_DEFAULTS]);

    // Compute the possible slot options for each slot, based on current values and property syntax
    const slotsOptions = createOptionTable(syntaxNormalized, syntaxSet, values, property.name);

    // Handler to update slot values and join with correct separators
    const handleSlotsChange = (input: string[]) => {
        if (!input || (input.length === 1 && input[0] === "")) return onChange("");

        // Normalize updated values to canonical tokens
        const valueTokens = getValueTokens(input).join(" ");

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
            input = mergeArrays(input, getTokenValues(syntax.split(" ")));
        }

        // Get separators for this variation, or fallback to spaces
        const separators = syntaxSeparators[variationIndex]

        // Join values with the determined separators
        const joinedValue = joinAdvanced(input, separators);

        // Trigger the change callback
        onChange(joinedValue);
    }

    // Render the slot-based value editor, passing separators and new onChange
    return <BlockStylesSlots values={values} options={slotsOptions} onChange={handleSlotsChange} />
};

export default memo(BlockStylesValue);

