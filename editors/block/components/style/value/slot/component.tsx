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
import type { StylesEditorSlotProps } from "@/editors/block/types/component";

// Utilities
import { getValueType, getValueDefaultType } from "@/editors/block/utilities/style/value";
import { devRender } from "@/utilities/dev";


/**
 * StylesEditorSlot Component
 * Renders the appropriate input component for a single value slot based on its type.
 * Handles function, keyword, dimension, number, integer, color, and link value types.
 *
 * @param props - StylesEditorSlotProps containing value, options, and onChange callback
 * @returns The rendered input for the slot
 */
const StylesEditorSlot: React.FC<StylesEditorSlotProps> = ({ value, options, onChange }) => {
    if (!options || !Array.isArray(options) || options.length === 0) return devRender.error("[StylesEditorSlot] No options provided", { options });
    if (value == null || typeof value !== "string") return devRender.error("[StylesEditorSlot] Invalid value provided", { value });
    if (!onChange || typeof onChange !== "function") return devRender.error("[StylesEditorSlot] Invalid onChange callback", { onChange });

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
                return devRender.error(`[StylesEditorSlot] Unsupported or undefined value type "${valueType}"`, { value, options, valueType });
        }
    };

    // Return the rendered slot component
    return renderValue();
};

export default memo(StylesEditorSlot);
