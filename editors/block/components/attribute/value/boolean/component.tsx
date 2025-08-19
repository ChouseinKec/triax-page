"use client";

import { memo, useCallback, useMemo } from "react";

// Types
import type { BooleanProps } from "./type";


// Utilities
import { devLog } from "@/utilities/dev";

// Components
import InputToggle from "@/components/input/toggle/component";

/**
 * Value Component
 * Main entry for rendering a HTML property value editor.
 * Handles parsing, slotting, and incremental UI for property values.
 *
 * @param property - The HTML property definition (with syntaxSet and syntaxNormalized)
 * @param value - The current value string for the property (e.g., "auto 10px")
 * @param onChange - Callback to update the value
 * @returns ReactElement - The rendered value editor UI for the property.
 */
const Boolean: React.FC<BooleanProps> = (props: BooleanProps) => {
    const { value, onChange, options } = props;

    // Guard Clause
    if (value == null) {
        devLog.error("[Value] Invalid value provided, expected a string");
        return null;
    }

    const handleChange = useCallback((newValue: string) => {
        onChange(newValue);
    }, [onChange]);

    return (
        <InputToggle
            value={value}
            onChange={handleChange}
            options={options}
        />
    );


};

export default memo(Boolean);

