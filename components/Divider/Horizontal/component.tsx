"use client";

import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import { HorizontalDividerProps } from "./types";

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
const HorizontalDivider: React.FC<HorizontalDividerProps> = (props: HorizontalDividerProps) => {
    const {
        title,
        className = "HorizontalDivider"
    } = props;

    return (
        <span className={`${CSS.HorizontalDivider} ${className}`} data-title={title || null}>
            {title ? title : ""}
        </span>
    );
};

export default memo(HorizontalDivider);