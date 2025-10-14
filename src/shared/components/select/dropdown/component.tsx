"use client";
import React, { memo, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { DropdownSelectProps } from "./types";

// Components
import DropdownReveal from "@/src/shared/components/reveal/dropdown/component";
import Options from "@/src/shared/components/select/options/component";

/**
 * DropdownSelect Component
 *
 * A controlled dropdown select component that provides a user-friendly interface for selecting options from a list.
 * Features validation, search, grouping, and accessibility support with customizable display options.
 * Internally uses DropdownReveal for the dropdown behavior and Options for the selectable list.
 *
 * @param  props - Component properties
 * @param  props.value - The currently selected option value
 * @param  props.options - Array of selectable options with value/label structure
 * @param  props.onChange - Callback function triggered when selection changes
 * @param  props.placeholder="N/A" - Text displayed when no value is selected
 * @param  props.forcePlaceholder=false - Forces placeholder display even with selected value
 * @param  props.searchable=false - Enables search/filtering functionality in options
 * @param  props.groupable=false - Groups options by category if supported
 * @param  props.isDisabled=false - Disables the dropdown interaction
 * @param  props.title="Toggle Dropdown" - Tooltip text for the dropdown button
 * @param  props.className="DropdownSelect" - Additional CSS classes for styling
 * @returns Rendered dropdown select with toggle button and floating options panel
 *
 * @note Validates selections against available options
 */
const DropdownSelect: React.FC<DropdownSelectProps> = ({
    value,
    options,
    onChange,
    placeholder = "N/A",
    forcePlaceholder = false,
    groupable = false,
    searchable = false,
    isDisabled = false,
    title = "Toggle Dropdown",
    className = "DropdownSelect"
}) => {

    // Handle option selection changes
    const handleOptionChange = useCallback((selectedValue: string): void => {
        onChange(selectedValue);
    }, [onChange]
    );

    return (
        <DropdownReveal
            className={className}
            placeholder={forcePlaceholder ? placeholder : value || "N/A"}
            title={title}
            isDisabled={isDisabled}
        >
            {
                options && options.length > 0
                    ? <Options
                        searchable={searchable}
                        groupable={groupable}
                        options={options}
                        value={value}
                        onChange={handleOptionChange}
                    />
                    : <span className={CSS.Empty}>No options available</span>
            }
        </DropdownReveal>
    );
};

DropdownSelect.displayName = "DropdownSelect";
export default memo(DropdownSelect);