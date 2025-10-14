"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { HorizontalDividerProps } from "./types";

/**
 * HorizontalDivider Component
 *
 * A flexible horizontal divider/separator component that provides visual separation
 * between content sections. Supports optional titles and different visual styles.
 *
 * @param props - Component properties
 * @param props.title - Optional title text displayed centered on the divider line
 * @param props.className - Additional CSS classes for custom styling
 * @param props.variation - Visual style variant: 'solid' (default) or 'dashed'
 * @returns The rendered HorizontalDivider component
 */
const HorizontalDivider: React.FC<HorizontalDividerProps> = ({ title, className, variation }) => {
    return (
        <span
            className={`${CSS.HorizontalDivider} HorizontalDivider ${className}`}
            data-title={title || null}
            data-variation={variation}
        >
            {title}
        </span>
    );
};

HorizontalDivider.displayName = "HorizontalDivider";
export default memo(HorizontalDivider);