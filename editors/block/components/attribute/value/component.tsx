"use client";

import { memo, useCallback, useMemo } from "react";

// Types
import type { ValueProps } from "./type";


// Utilities
import { devLog } from "@/utilities/dev";

// Components
import String from "./string/component";
import Number from "./number/component";
import List from "./list/component";
import Boolean from "./boolean/component";

/**
 * Value Component
 * Main entry for rendering a HTML property value editor.
 *
 * @param property - The HTML property definition (with syntaxSet and syntaxNormalized)
 * @param value - The current value string for the property (e.g., "auto 10px")
 * @param onChange - Callback to update the value
 * @returns ReactElement - The rendered value editor UI for the property.
 */
const Value: React.FC<ValueProps> = (props: ValueProps) => {
    const { property, value, onChange } = props;

    // Guard Clause
    if (property == null) {
        devLog.error("[Value] No property provided");
        return null;
    }

    if (value == null) {
        devLog.error("[Value] Invalid value provided, expected a string");
        return null;
    }

    const handleChange = useCallback((newValue: string) => {
        onChange(newValue);
    }, [onChange]);

    return useMemo(() => {
        switch (property.syntax.type) {
            case "string":
                return <String value={value} onChange={handleChange} />;
            case "number":
                return <Number value={value} onChange={handleChange} />;
            case "list":
                return <List value={value} onChange={handleChange} options={property.syntax.options} />;
            case "boolean":
                return <Boolean value={value} onChange={handleChange} options={property.syntax.options} />;
            default:
                return null;
        }
    }, [property.name, value, handleChange]);

};

export default memo(Value);

