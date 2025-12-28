"use client";
import React, { memo } from "react";

// Components
import Dimension from "@/src/config/block/style/token/type/length/component";
import Function from "@/src/config/block/style/token/type/function/component";
import Keyword from "@/src/config/block/style/token/type/keyword/component";
import Number from "@/src/config/block/style/token/type/number/component";
import Link from "@/src/config/block/style/token/type/link/component";
import Color from "@/src/config/block/style/token/type/color/component";

// Types
import type { BlockStyleSlotProps } from "./types";

// Utilities
import { getValueType, getValueDefaultType } from "@/src/core/block/style/utilities";

// Registry
import { getRegisteredTokenTypes } from "@/src/core/block/style/registries";

// CSS
import CSS from "./styles.module.scss";

/**
 * BlockStyleSlot Component
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
const BlockStyleSlot: React.FC<BlockStyleSlotProps> = ({ value, options, onChange }) => {
    const registeredTokenTypes = getRegisteredTokenTypes();

    // Determine default type when value is empty
    const defaultType = getValueDefaultType(options);

    // Determine the actual value type for this slot
    const valueType = value.length === 0 ? defaultType : getValueType(value, registeredTokenTypes);

    console.log(valueType);

    const renderUnsupported = () => <span className={CSS.Unsupported}>Unsupported value type</span>;

    // Render the appropriate component based on value type
    const renderValue = () => {

        // Handle unsupported or undetectable value types
        if (!valueType) return renderUnsupported();

        // Get the current type definition
        const typeDefinition = registeredTokenTypes[valueType];
        if (!typeDefinition) return renderUnsupported();

        return typeDefinition.renderComponent(value, onChange, options);

    };

    // Return the rendered slot component
    return renderValue();
};

export default memo(BlockStyleSlot);
