"use client";
import React, { memo } from "react";

// Components
import Dimension from "../dimension/component";
import Function from "../function/component";
import Keyword from "../keyword/component";
import Number from "../number/component";
import Link from "../link/component";
import Color from "../color/component";

// Types
import type { BlockStylesSlotProps } from "./types";

// Utilities
import { getValueType, getValueDefaultType } from "@/src/page/core/block/style/utilities";

// CSS
import CSS from "./styles.module.scss";

/**
 * BlockStylesSlot Component
 *
 * A dynamic value editor router that automatically selects and renders the appropriate input component based on CSS value type.
 * Intelligently handles function, keyword, dimension, number, integer, color, and link value types with type detection.
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
const BlockStylesSlot: React.FC<BlockStylesSlotProps> = ({ value, options, onChange }) => {
    // Determine default type when value is empty
    const defaultType = getValueDefaultType(options);

    // Determine the actual value type for this slot
    const valueType = value.length === 0 ? defaultType : getValueType(value);

    // Render the appropriate component based on value type
    const renderValue = () => {
        switch (valueType) {
            case "function":
                return (
                    <Function value={value} options={options} onChange={onChange} />
                );
            case "keyword":
                return (
                    <Keyword value={value} options={options} onChange={onChange} />
                );
            case "dimension":
                return (
                    <Dimension value={value} options={options} onChange={onChange} />
                );
            case "integer":
                return (
                    <Number value={value} options={options} onChange={onChange} forceInteger={true} />
                );
            case "number":
                return (
                    <Number value={value} options={options} onChange={onChange} />
                );
            case "color":
                return (
                    <Color value={value} onChange={onChange} />
                );
            case "link":
                return (
                    <Link value={value} onChange={onChange} />
                );
            default:
                return <span className={CSS.Unsupported}>Unsupported value type</span>;
        }
    };

    // Return the rendered slot component
    return renderValue();
};

export default memo(BlockStylesSlot);
