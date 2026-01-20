"use client";

import { memo, ReactElement, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { OptionProps } from "./types";

/**
 * Option Component
 *
 * A presentational component that renders a single selectable option with icon and text display.
 * Handles click interactions for selection/deselection and provides accessibility features.
 * Optimized for performance with memoization and designed for use in lists, dropdowns, and radio groups.
 *
 * @param  props - Component properties
 * @param  props.name - Display text for the option
 * @param  props.value - Underlying value associated with the option
 * @param  props.icon - Optional icon element to display alongside the text
 * @param  props.category="other" - Category grouping for organizational purposes
 * @param  props.isSelected - Whether this option is currently selected
 * @param  props.onChange - Callback function triggered when option is clicked
 * @param  props.prioritizeIcons=false - Hides text when true, showing only the icon
 * @param  props.className="" - Additional CSS classes for custom styling
 * @returns Rendered option button with icon, text, and selection state
 *
 * @note Clicking a selected option deselects it; clicking unselected option selects it
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
        className = ""
    } = props;

    // Handle option selection changes
    const handleChange = useCallback((value:string): void => {
        onChange(value);
    }, [onChange, value]
    );


    return (
        <button
            className={`${CSS.Option} Option ${className}`}
            onClick={() => handleChange(value)}
            data-is-selected={isSelected}
            title={name}
            aria-label={`Select ${name}`}
            data-category={category}
        >

            {icon}

            {prioritizeIcons
                ? null
                : <span>{name}</span>
            }
        </button>
    )
};

Option.displayName = "Option";
export default memo(Option); 