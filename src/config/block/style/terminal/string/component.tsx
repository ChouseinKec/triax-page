"use client";
import React, { memo } from "react";

// Components
import GenericInput from "@/shared/components/input/generic/component";

// Types
import type { TerminalComponentProps } from "@/core/block/style/types";


/**
 * TokenString Component
 *
 * A text input for CSS `<string>` values. Strips the surrounding quotes for
 * editing and re-wraps the result in double quotes on change.
 */
const TokenString: React.FC<TerminalComponentProps> = ({ value, onChangeValue }) => {
    // Strip surrounding quotes for the raw input display
    const inner = value.replace(/^["']|["']$/g, '');

    return (
        <GenericInput
            type="text"
            value={inner}
            onChange={(raw) => onChangeValue(`"${raw}"`)}
            placeholder="string"
        />
    );
};

TokenString.displayName = "TokenString";
export default memo(TokenString);
