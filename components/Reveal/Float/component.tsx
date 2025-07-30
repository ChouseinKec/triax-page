"use client";

import React, { useRef, useEffect, memo, useCallback, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import { FloatRevealProps } from "@/components/reveal/float/types";

// Hooks
import useHover from "@/hooks/interface/useHover";
import usePosition from "@/hooks/interface/usePosition";

// Utilities
import { devLog } from "@/utilities/dev";

/**
 * FloatReveal Component
 * 
 * A flexible floating content revealer that can be triggered by hover or controlled externally.
 * Supports automatic positioning relative to a target element with smart overflow handling.
 *
 * @param {FloatRevealProps} props - Component properties
 * @param {React.RefObject<HTMLElement>} props.targetRef - Reference to the trigger element
 * @param {Position} [props.position="top"] - Preferred position relative to target
 * @param {React.ReactNode} props.children - Content to display in the float
 * @param {boolean} [props.isOpen] - External control override (undefined = hover controlled)
 * @param {number} [props.hoverDelay=200] - Delay for hover show/hide in milliseconds
 * @param {boolean} [props.closeOnEscape=true] - Whether to close on Escape key
 * @param {function} [props.onVisibilityChange] - Callback when visibility changes
 * @param {string} [props.role="tooltip"] - ARIA role for semantic meaning
 * @param {string} [props.ariaLabel] - Accessible name for the float
 * @param {boolean} [props.ariaModal=false] - Whether the float is modal
 * @returns {ReactElement|null} The rendered FloatReveal component or null if hidden
 */
const FloatReveal: React.FC<FloatRevealProps> = memo((props: FloatRevealProps) => {
    const {
        // Core
        children,
        targetRef,

        // Positioning
        position = "top",

        // Behavior
        isOpen,
        hoverDelay = 200,
        closeOnEscape = true,
        onVisibilityChange,
        className = "",

    } = props;

    // Refs for DOM elements
    const floatRef = useRef<HTMLDivElement | null>(null);

    // Hover state management with configurable delay
    const hoverState = useHover(hoverDelay);

    // Determine the actual visibility state
    const isVisible = useMemo(() => {
        // Parent-controlled state takes precedence over hover state
        return isOpen !== undefined ? isOpen : hoverState.isHovered;
    },
        [isOpen, hoverState.isHovered]
    );

    // Position management hook
    usePosition(targetRef, floatRef, position, isVisible);


    /**
     * Computes data attributes for styling and debugging
     * Provides context for CSS selectors and development tools
     * 
     * @returns {Object} Computed data attributes
     */
    const dataAttributes = useMemo(() => ({
        "data-position": position,
        "data-controlled": isOpen !== undefined ? "external" : "hover",
    }),
        [position, isOpen]
    );

    /**
     * Computes event handlers based on control mode
     * Only includes hover handlers for hover-controlled mode
     * 
     * @returns {Object} Computed event handlers
     */
    const eventHandlers = useMemo(() => {
        // Parent-controlled: no hover handlers
        if (isOpen !== undefined) {
            return {};
        }

        // Hover-controlled: include hover handlers
        return {
            onMouseEnter: hoverState.handleFloatEnter,
            onMouseLeave: hoverState.handleFloatLeave,
        };
    },
        [isOpen, hoverState.handleFloatEnter, hoverState.handleFloatLeave]
    );

    /**
     * Handles keyboard events for accessibility
     * Supports Escape key to close the float when it"s visible
     * 
     * @param {KeyboardEvent} event - The keyboard event
     */
    const handleKeyDown = useCallback((event: KeyboardEvent): void => {
        if (!closeOnEscape || !isVisible) return;

        if (event.key === "Escape") {
            event.preventDefault();

            // If parent-controlled, notify parent to close
            if (isOpen !== undefined && onVisibilityChange) {
                onVisibilityChange(false);
            }
            // For hover-controlled, we can"t force close, but focus the target
            else if (targetRef.current) {
                targetRef.current.focus();
            }
        }

    }, [closeOnEscape, isVisible, isOpen, onVisibilityChange, targetRef]
    );

    /**
     * Effect to manage keyboard event listeners
     * Adds/removes global keyboard listeners based on visibility state
     */
    useEffect(() => {
        if (!isVisible) return;

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    },
        [isVisible, handleKeyDown]
    );

    /**
     * Effect to handle hover interactions on target element
     * Only applies hover listeners when not parent-controlled
     * Ensures proper cleanup of event listeners
     */
    useEffect(() => {
        // Skip hover setup if parent-controlled
        if (isOpen !== undefined) return;

        const target = targetRef.current;
        if (!target) {
            devLog.warn("[FloatReveal] Target element not found for hover setup");
            return;
        }

        // Add hover event listeners
        target.addEventListener("mouseenter", hoverState.handleTargetEnter);
        target.addEventListener("mouseleave", hoverState.handleTargetLeave);

        // Cleanup function
        return () => {
            target.removeEventListener("mouseenter", hoverState.handleTargetEnter);
            target.removeEventListener("mouseleave", hoverState.handleTargetLeave);
        };
    },
        [targetRef, hoverState.handleTargetEnter, hoverState.handleTargetLeave, isOpen]
    );

    /**
     * Effect to notify parent of visibility changes
     * Enables parent components to react to hover-triggered visibility changes
     */
    useEffect(() => {
        if (onVisibilityChange && isOpen === undefined) {
            onVisibilityChange(isVisible);
        }
    },
        [isVisible, onVisibilityChange, isOpen]
    );

    // Guard Clause
    if (!children) {
        devLog.warn("[FloatReveal] No children provided");
        return null;
    }

    if (!targetRef) {
        devLog.warn("[FloatReveal] Target reference is not provided");
        return null;
    }

    // Early return if not visible - prevents unnecessary DOM rendering
    if (!isVisible) {
        return null;
    }

    // Validate that we have content to show
    if (!children) {
        devLog.warn("[FloatReveal] No children provided for FloatReveal");
        return null;
    }

    return (
        <div
            ref={floatRef}
            className={`${CSS.FloatReveal} ${className}`}
            {...dataAttributes}
            {...eventHandlers}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        >
            {children}
        </div>
    );
});

// Display name for debugging
FloatReveal.displayName = "FloatReveal";

export default FloatReveal;