"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { TooltipRevealProps } from "./types";

// Components
import FloatReveal from "@/shared/components/reveal/float/component";

// Hooks
import useHover from "@/shared/hooks/interface/useHover";

/**
 * TooltipReveal Component
 *
 * A hover-triggered tooltip component that displays contextual information with automatic positioning.
 * Provides a simple, accessible way to show tooltips on hover with customizable delay and positioning.
 * Internally uses FloatReveal for positioning and rendering logic.
 *
 * @param  props - Component properties
 * @param  props.targetRef - Reference to the target element for hover detection and positioning
 * @param  props.children - Content to render inside the tooltip
 * @param  props.anchor="top" - Preferred anchor position relative to target ("top" | "bottom" | "left" | "right")
 * @param  props.hoverDelay=200 - Milliseconds to delay showing/hiding tooltip on hover enter/leave
 * @param  props.className="" - Additional CSS class for custom tooltip styling
 * @returns Rendered tooltip container or null when not hovered
 *
 * @note Requires the target element to be mounted for proper hover detection and positioning
 */
const TooltipReveal: React.FC<TooltipRevealProps> = ({
    children,
    targetRef,
    anchor = "top",
    hoverDelay = 200,
    className = "",
}) => {

    // Hover state management
    const isHovered = useHover(targetRef, hoverDelay);

    return (
        <FloatReveal
            targetRef={targetRef}
            anchor={anchor}
            isOpen={isHovered}
            className={`${CSS.TooltipReveal} ${className}`}
        >
            {children}
        </FloatReveal>
    );
};

TooltipReveal.displayName = "TooltipReveal";
export default memo(TooltipReveal);