"use client";
import React, { memo } from "react";

// Types
import type { NodeStyleslotProps } from "./types";

// Utilities
import { getValueType, getValueDefaultType } from "@/core/block/style/utilities";

// Registry
import { getRegisteredTokenTypes } from "@/core/block/style/state/registry";

// CSS
import CSS from "./styles.module.scss";

/**
 * NodeStyleslot Component
 *
 * A dynamic value editor router that automatically selects and renders the appropriate input component based on CSS value type.
 * Intelligently handles function, keyword, length, number, integer, color, and link value types with type detection.
 * Provides a unified interface for editing different CSS property values in the page builder.
 *
 * @param  props - Component properties
 * @param  props.value - Current CSS value to edit
 * @param  props.options - Array of available value type options with constraints
 * @param  props.onChange - Callback triggered when value changes
 * @returns Rendered value editor component appropriate for the detected CSS value type
 *
 * @note Automatically detects value type and falls back to default type for empty values
 */
const NodeStyleslot: React.FC<NodeStyleslotProps> = ({ value, options, onChange }) => {
    const tokenTypeDefinitions = getRegisteredTokenTypes();

    // Determine default type when value is empty
    const defaultType = getValueDefaultType(options);

    // Determine the actual value type for this slot
    const valueType = value.length === 0 ? defaultType : getValueType(value, tokenTypeDefinitions);

    const renderUnsupported = () => <span className={CSS.Unsupported}>Unsupported value type</span>;

    // Render the appropriate component based on value type
    const renderValue = () => {

        // Handle unsupported or undetectable value types
        if (!valueType) return renderUnsupported();

        // Get the current type definition
        const typeDefinition = tokenTypeDefinitions[valueType];
        if (!typeDefinition) return renderUnsupported();

        return typeDefinition.getTokenComponent(value, onChange, options);
    };

    // Return the rendered slot component
    return renderValue();
};

export default memo(NodeStyleslot);
