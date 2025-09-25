"use client";

import { memo, ReactElement, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import { OptionProps } from "./types";

/**
 * Option Component
 *
 * Renders a single selectable option for use in dropdowns, radio groups, etc.
 * Handles selection/deselection logic and displays an icon or label.
 *
 * Best practice: Keep this component presentational and stateless, relying on props for state and actions.
 * Use memoization to avoid unnecessary re-renders.
 *
 * @param {OptionProps} props - The props for the option item.
 * @returns {ReactElement} - The rendered option element.
 */
const Option: React.FC<OptionProps> = (props: OptionProps): ReactElement => {
    const {
        name,
        value,
        icon,
        isSelected,
        onChange,
        category = "other",
        prioritizeIcons = false,
        className = "Option"
    } = props;

    /**
     * Handles the selection or deselection of this option.
     *
     * Best practice: Use useCallback to memoize event handlers for performance.
     *
     * If the option is already selected, clicking will deselect it (calls onChange with "").
     * Otherwise, clicking will select it (calls onChange with the option"s value).
     *
     * @param {string} value - The value of the option to select/deselect.
     */
    const handleChange = useCallback((value: string): void => {
        if (isSelected) {
            onChange(""); // Deselect the option if it"s already selected
            return;
        }
        onChange(value); // Select the option if it"s not already selected
    }, [isSelected, onChange]
    );

    const iconElement = icon ? icon : "";
    const textElement = prioritizeIcons ? null : <span>{name}</span>;
    return (
        <button
            className={`${CSS.Option} ${className}`}
            onClick={() => handleChange(value)}
            data-is-selected={isSelected}
            title={name}
            aria-label={`Select ${name}`}
            data-category={category}
        >

            {iconElement}
            {textElement}
        </button>
    )
};


export default memo(Option); // Best practice: memoize presentational components for performance