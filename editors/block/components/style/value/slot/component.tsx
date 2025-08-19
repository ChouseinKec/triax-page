"use client";

import React, { useMemo } from "react";

// Components
import Dimension from "../dimension/component";
import Function from "../function/component";
import Keyword from "../keyword/component";
import Number from "../number/component";
import Link from "../link/component";
import Color from "../color/component";
import Error from "../error/component";

// Types
import type { SlotProps } from "./types";

// Utilities
import { getValueType } from "@/utilities/style/value";
import { devLog } from "@/utilities/dev";

/**
 * Slot Component
 * Renders the appropriate input component for a single value slot based on its type.
 * Handles function, keyword, dimension, number, integer, color, and link value types.
 *
 * @param props - SlotProps containing value, options, and onChange callback
 * @returns ReactElement - The rendered input for the slot
 */
const Slot: React.FC<SlotProps> = (props: SlotProps) => {
    const { value, options, onChange } = props;

    // Guard Clause
    if (!options || options.length === 0) {
        devLog.error("[Slot] No options provided");
        return null;
    }

    if (value == null) {
        devLog.error("[Slot] Invalid value provided, expected a string");
        return null;
    }

    /**
     * Compute all unique types available in the options.
     */
    const allTypes = useMemo(() => {
        return new Set(options.flat().map(option => option.type))
    }, [options]
    );

    /**
     * Determine the default type to use when value is empty.
     * Priority: dimension > keyword > color > function  first available type.
     * If no types are available, fallback to the first option"s type.
     * Because the value can be empty, we need to determine a default type based on available options.
     */
    const defaultType = useMemo(() => {
        if (allTypes.has("dimension")) return "dimension";
        if (allTypes.has("keyword")) return "keyword";
        if (allTypes.has("color")) return "color";
        if (allTypes.has("function")) return "function";
        return options[0]?.type;
    }, [allTypes, options]
    );

    /**
     * Determine the value type for this slot.
     * If value is empty, use the default type.
     */
    const valueType = value.length === 0 ? defaultType : getValueType(value);

    const slot = useMemo(() => {
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
                return (
                    <Error message={`[Slot] Unknown value type: ${String(valueType)}`} />
                );
        }
    }, [valueType, value, onChange, options]
    );

    return (
        slot
    );
};

export default Slot;
