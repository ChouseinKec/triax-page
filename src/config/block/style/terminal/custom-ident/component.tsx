"use client";
import React, { memo } from "react";

// Components
import GenericInput from "@/shared/components/input/generic/component";

// Types
import type { TerminalComponentProps } from "@/core/block/style/types";


const TokenCustomIdent: React.FC<TerminalComponentProps> = ({ value, onChangeValue }) => {
    return (
        <GenericInput
            type="text"
            value={value}
            onChange={onChangeValue}
            placeholder="identifier"
        />
    );
};

TokenCustomIdent.displayName = "TokenCustomIdent";
export default memo(TokenCustomIdent);
