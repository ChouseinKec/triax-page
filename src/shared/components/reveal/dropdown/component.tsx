"use client";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { DropdownRevealProps } from "./types";

// Components
import FloatReveal from "@/shared/components/reveal/float/component"

// Hooks
import useSize from "@/shared/hooks/interface/useSize";

/**
 * DropdownReveal Component
 *
 * A flexible dropdown component that displays content in a floating panel with
 * customizable positioning and interaction behaviors. Features automatic outside-click
 * closing, optional content-change closing, and responsive design that adapts to
 * container size.
 *
 * @param props - Component properties
 * @param props.children - Content to display in the dropdown panel
 * @param props.placeholder - Text displayed on the toggle button (default: "Toggle")
 * @param props.closeOnChange - Whether to close when children content changes (default: true)
 * @param props.isDisabled - Whether the dropdown is disabled (default: false)
 * @param props.title - Tooltip text for the toggle button (default: "Toggle Dropdown")
 * @param props.className - Additional CSS classes for styling
 * @param props.anchor - Position anchor for the floating panel: 'top', 'bottom', 'left', 'right' (default: 'bottom')
 * @param props.offset - Distance in pixels from the anchor position (default: 5)
 * @returns The rendered DropdownReveal component
 */
const DropdownReveal: React.FC<DropdownRevealProps> = ({
    children,
    placeholder = "Toggle",
    closeOnChange,
    isDisabled,
    isActive,
    title = "Toggle Dropdown",
    className = "",
    anchor = "bottom",
    offset = 5,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { size } = useSize(dropdownRef);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Add event listener when the dropdown is open
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]
    );

    // Closes the dropdown when the children element changes, if enabled.
    useEffect(() => {
        if (closeOnChange === false) return;
        setIsOpen(false);
    }, [children, closeOnChange]
    )

    // Toggles the dropdown open/closed state.
    const handleToggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []
    );

    // Determine if the dropdown is collapsed based on its width
    const isCollapsed = size.width ? size.width < 25 : false;

    return (
        <div className={`${CSS.DropdownReveal} DropdownReveal ${className}`} ref={dropdownRef}>
            {/* Toggle button to open/close the dropdown */}
            <button
                className={`${CSS.Toggle} Toggle`}
                onClick={handleToggle}
                data-is-selected={isOpen}
                data-is-active={isActive}
                data-is-disabled={isDisabled}
                data-is-open={isOpen}
                data-anchor={anchor}
                title={title}
            >

                {!isCollapsed &&
                    <span className="Placeholder">
                        {placeholder}
                    </span>
                }
            </button>

            {/* Conditionally render the dropdown content */}
            {isDisabled !== true && (
                <FloatReveal
                    targetRef={dropdownRef}
                    anchor={anchor}
                    offset={offset}
                    isOpen={isOpen}
                >
                    {children}
                </FloatReveal>
            )}
        </div>
    );
};

DropdownReveal.displayName = "DropdownReveal";
export default memo(DropdownReveal);