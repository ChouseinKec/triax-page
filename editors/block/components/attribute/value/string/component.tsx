"use client";

import { memo, useCallback, useMemo } from "react";

// Types
import type { StringProps } from "./type";


// Utilities
import { devLog } from "@/utilities/dev";

// Components
import InputGeneric from "@/components/input/generic/component";

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
const String: React.FC<StringProps> = (props: StringProps) => {
    const { value, onChange } = props;

    // Guard Clause
    if (value == null) {
        devLog.error("[Value] Invalid value provided, expected a string");
        return null;
    }

    const handleChange = useCallback((newValue: string) => {
        onChange(newValue);
    }, [onChange]);

    return (
        <InputGeneric
            value={value}
            onChange={handleChange}
            type="text"
        />
    );


};

export default memo(String);

