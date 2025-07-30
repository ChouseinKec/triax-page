"use client";

import React, { useCallback, useState, useMemo, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { ButtonRevealProps } from "./types";

/**
 * ButtonReveal Component
 *
 * An expand/collapse component that toggles visibility of content.
 *
 * @component
 * @param  props.children - Content displayed inside the expandable section
 * @param  props.title="" - Optional title for the expand section
 * @param  props.icon=null - Optional icon to display in the button
 * @param  props.className="ButtonReveal" - Additional className(s) for the root element
 * @param props.isSelected=false - Whether the button is in a selected state
 * @param  props.onClick - Callback when the button is clicked
 * @returns The rendered ButtonReveal component
 */
const ButtonReveal: React.FC<ButtonRevealProps> = ({
    children,
    title = "",
    icon = null,
    className = "ButtonReveal",
    isSelected = false,
    onButtonClick = () => { },
    onArrowClick = () => { },
}) => {

    // State for open/collapse
    const [isOpen, setIsOpen] = useState(false);

    // Toggle handler for expanding/collapsing content
    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, [setIsOpen]
    );

    // Data attributes for state and content presence
    const dataAttributes = useMemo(
        () => ({
            "data-is-open": isOpen,
            "data-has-children": !!children,
        }),
        [isOpen, children]
    );

    return (
        <div className={`${CSS.ButtonReveal} ${className}`} {...dataAttributes}>
            {/* Toggle button to expand/collapse the content */}
            <button
                className={CSS.Button}
                onClick={handleToggle}
                data-is-selected={isSelected}
                type="button"
            >
                <span>
                    {icon}
                    {title}
                </span>
            </button>

            {/* Render expandable content if open */}
            {isOpen && children}
        </div>
    );
};

export default memo(ButtonReveal);