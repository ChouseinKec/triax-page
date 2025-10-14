"use client";

import React, { useState, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import HorizontalDivider from "@/src/shared/components/divider/horizontal/component";

// Types
import type { ExpandRevealProps } from "./types";


/**
 * DividerReveal Component
 *
 * An expandable content container that uses a horizontal divider as an interactive toggle button.
 * Provides a clean, accessible way to show/hide content sections with visual feedback through
 * dynamic button titles that indicate the current state.
 *
 * @param props - Component properties
 * @param props.children - Content to be shown/hidden within the expandable section
 * @param props.title - Optional base title for the divider (will show state suffix)
 * @param props.className - Additional CSS classes for custom styling
 * @returns The rendered DividerReveal component
 */
const DividerReveal: React.FC<ExpandRevealProps> = ({ children, title = "", className }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Handle toggle action
    const handleToggle = () => setIsOpen((prevState) => !prevState);

    // Determine dynamic title based on state
    const dividerTitle = title
        ? `${title} ${isOpen ? "(Expanded)" : "(Collapsed)"}`
        : (isOpen ? "Collapse" : "Expand");

    return (
        <div className={`${CSS.DividerReveal} DividerReveal ${className}`}>
            <>
                {/* Toggle button to expand/collapse the content */}
                <button
                    className={`${CSS.Toggle} Toggle`}
                    onClick={handleToggle}
                >
                    <HorizontalDivider title={dividerTitle} />
                </button>

                {/* Conditionally render content when expanded */}
                {isOpen && (
                    <>
                        {children}
                    </>
                )}
            </>
        </div>
    );
};

DividerReveal.displayName = "DividerReveal";
export default memo(DividerReveal);