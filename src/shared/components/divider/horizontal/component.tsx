"use client";

import React, { memo } from "react";

// Styles
import CSS from "./style.module.scss";

// Types
import { HorizontalDividerProps } from "./type";

/**
 * HorizontalDivider Component
 * 
 * A semantic horizontal divider/separator element with optional title.
 * Uses CSS custom properties for title display and provides proper accessibility.
 * Rendered as a semantic separator with appropriate ARIA attributes.
 * 
 * @param {HorizontalDividerProps} props - Component properties
 * @param {string} [props.title] - Optional title text displayed on the divider
 * @returns {ReactNode} The rendered HorizontalDivider component
 */
const HorizontalDivider: React.FC<HorizontalDividerProps> = ({ title, className, variation }) => {
    return (
        <span className={`${CSS.HorizontalDivider} ${className}`} data-title={title || null} data-variation={variation}>
            {title ? title : ""}
        </span>
    );
};

export default memo(HorizontalDivider);