"use client";
import React, { useRef, useEffect, memo, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { FloatRevealProps } from "./types";

// Hooks
import usePosition from "@/src/shared/hooks/interface/usePosition";


/**
 * FloatReveal Component
 *
 * A controlled floating content revealer that displays content in a positioned overlay relative to a target element.
 * Provides automatic positioning, auto-close functionality, and accessibility features for floating UI elements
 * like tooltips, dropdowns, and popovers.
 *
 * @param  props - Component properties
 * @param  props.targetRef - Reference to the target element for positioning the float
 * @param  props.children - Content to render inside the floating container
 * @param  props.isOpen - Controls visibility of the float (required for controlled rendering)
 * @param  props.anchor="top" - Preferred anchor position relative to target ("top" | "bottom" | "left" | "right")
 * @param  props.offset=5 - Pixel offset from the target element's edge
 * @param  props.autoClose=false - Enables automatic closing on outside interactions
 * @param  props.closeOnEscape=true - Allows closing via Escape key when autoClose is enabled
 * @param  props.className="" - Additional CSS class for custom styling
 * @param  props.onVisibilityChange - Callback triggered on auto-close events
 * @returns Rendered floating container or null when hidden
 *
 * @note Requires the target element to be mounted for proper positioning calculations
 */
const FloatReveal: React.FC<FloatRevealProps> = ({
    children,
    targetRef,
    anchor = "top",
    offset = 5,
    isOpen,
    autoClose = false,
    closeOnEscape = true,
    onVisibilityChange,
    className = "",
}) => {
    const floatRef = useRef<HTMLDivElement | null>(null);
    const position = usePosition(targetRef, floatRef, anchor, isOpen, offset);
    const styles = {
        top: `${position.top}px`,
        left: `${position.left}px`,
    };

    // Handle keyboard events for auto-close
    const handleKeyDown = useCallback((event: KeyboardEvent): void => {
        if (!closeOnEscape || !isOpen || !autoClose) return;

        if (event.key === "Escape") {
            event.preventDefault();
            if (onVisibilityChange) {
                onVisibilityChange(false);
            }
        }

    }, [closeOnEscape, isOpen, autoClose, onVisibilityChange]
    );

    // Effect to handle auto-close on Escape key
    useEffect(() => {
        if (!isOpen || !autoClose) return;

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    },
        [isOpen, autoClose, handleKeyDown]
    );

    // Effect to handle auto-close on outside clicks
    useEffect(() => {
        if (!isOpen || !autoClose) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                floatRef.current && !floatRef.current.contains(event.target as Node) &&
                targetRef.current && !targetRef.current.contains(event.target as Node)
            ) {
                if (onVisibilityChange) {
                    onVisibilityChange(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, autoClose, onVisibilityChange, targetRef]
    );

    // Early return if not visible - prevents unnecessary DOM rendering
    if (!isOpen) return null;

    return (
        <div
            ref={floatRef}
            className={`${CSS.FloatReveal} FloatReveal ${className}`}
            style={styles}
            data-anchor={anchor}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        >
            {children}
        </div>
    );
};

FloatReveal.displayName = "FloatReveal";
export default memo(FloatReveal);