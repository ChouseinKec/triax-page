"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { ActionGroupProps } from "./types";

/**
 * ActionGroup Component
 *
 * A flexible container component for grouping related action buttons, controls, or interactive
 * elements together. Provides consistent layout and spacing for UI toolbars, button clusters,
 * and control panels throughout the application.
 *
 * @param props - Component properties
 * @param props.children - Action buttons, controls, or elements to group together
 * @param props.direction - Layout direction: 'horizontal' (default) or 'vertical'
 * @param props.className - Additional CSS classes for custom styling
 * @returns The rendered ActionGroup component
 */
const ActionGroup: React.FC<ActionGroupProps> = ({ children, direction, className = "" }) => {
    return (
        <div
            className={`${CSS.ActionGroup} ActionGroup ${className}`}
            data-direction={direction}
        >
            {children}
        </div>
    );
};

ActionGroup.displayName = "ActionGroup";
export default memo(ActionGroup);