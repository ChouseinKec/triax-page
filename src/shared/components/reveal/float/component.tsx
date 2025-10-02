"use client";

import React, { useRef, useEffect, memo, useCallback, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import { FloatRevealProps } from "@/src/shared/components/reveal/float/types";

// Hooks
import usePosition from "@/src/shared/hooks/interface/usePosition";

// Utilities
import { devLog } from "@/src/shared/utilities/dev";

/**
 * FloatReveal Component
 * 
 * A controlled floating content revealer that supports automatic positioning relative to a target element.
 * Supports optional auto-close on outside clicks and keyboard events.
 *
 * @param {FloatRevealProps} props - Component properties
 * @param {React.RefObject<HTMLElement>} props.targetRef - Reference to the trigger element
 * @param {Position} [props.position="top"] - Preferred position relative to target
 * @param {React.ReactNode} props.children - Content to display in the float
 * @param {boolean} props.isOpen - Controls whether the float is visible
 * @param {boolean} [props.autoClose] - Whether to automatically close on outside clicks
 * @param {boolean} [props.closeOnEscape=true] - Whether to close on Escape key
 * @param {function} [props.onVisibilityChange] - Callback when auto-close occurs
 * @param {string} [props.className] - Optional class name for styling
 * @returns {ReactElement|null} The rendered FloatReveal component or null if hidden
 */
const FloatReveal: React.FC<FloatRevealProps> = memo((props: FloatRevealProps) => {
    const {
        children,
        targetRef,
        anchor = "top",
        isOpen,
        autoClose = false,
        closeOnEscape = true,
        onVisibilityChange,
        className = "",

    } = props;

    // Refs for DOM elements
    const floatRef = useRef<HTMLDivElement | null>(null);

    // Position management hook
    const position = usePosition(targetRef, floatRef, anchor, isOpen);

    // Convert position to CSS styles
    const positionStyles = useMemo(() => ({
        top: `${position.top}px`,
        left: `${position.left}px`,
    }), [position]);

    /**
     * Handles keyboard events for accessibility
     * Supports Escape key to close the float when auto-close is enabled
     * 
     * @param {KeyboardEvent} event - The keyboard event
     */
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

    /**
     * Effect to manage keyboard event listeners
     * Adds/removes global keyboard listeners based on visibility state
     */
    useEffect(() => {
        if (!isOpen || !autoClose) return;

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    },
        [isOpen, autoClose, handleKeyDown]
    );

    /**
     * Effect to handle auto-close on outside clicks
     * Closes the float when clicking outside if autoClose is enabled
     */
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
    if (!isOpen) {
        return null;
    }

    return (
        <div
            ref={floatRef}
            className={`${CSS.FloatReveal} ${className}`}
            style={positionStyles}
            data-position={anchor}
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