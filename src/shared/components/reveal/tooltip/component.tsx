"use client";

import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import { TooltipRevealProps } from "./types";

// Components
import FloatReveal from "@/src/shared/components/reveal/float/component";

// Hooks
import useHover from "@/src/shared/hooks/interface/useHover";

/**
 * TooltipReveal Component
 *
 * A tooltip component that shows content on hover with automatic positioning.
 * Wraps FloatReveal with hover logic for simple tooltip use cases.
 *
 * @param {TooltipRevealProps} props - Component properties
 * @param {React.RefObject<HTMLElement>} props.targetRef - Reference to the trigger element
 * @param {Position} [props.position="top"] - Preferred position relative to target
 * @param {React.ReactNode} props.children - Content to display in the tooltip
 * @param {number} [props.hoverDelay=200] - Delay for hover show/hide in milliseconds
 * @param {string} [props.className] - Optional class name for styling
 * @returns {ReactElement|null} The rendered TooltipReveal component or null if hidden
 */
const TooltipReveal: React.FC<TooltipRevealProps> = memo((props: TooltipRevealProps) => {
    const {
        children,
        targetRef,
        anchor = "top",
        hoverDelay = 200,
        className = "",
    } = props;

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
});

// Display name for debugging
TooltipReveal.displayName = "TooltipReveal";

export default TooltipReveal;