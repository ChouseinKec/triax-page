"use client";

import React, { memo, ReactElement, useState, useMemo, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Option from "./option/component";
import GenericInput from "../../input/generic/component";

// Types
import type { OptionsSelectProps } from "./types";

// Utilities
import { devLog } from "@/src/shared/utilities/dev";

/**
 * OptionsSelect Component
 * 
 * A comprehensive options selection component with advanced filtering and grouping capabilities.
 * Supports real-time search, category-based grouping.
 * Optimized for performance with memoization and debounced search functionality.
 * 
 * @param {OptionsSelectProps} props - Component properties
 * @param {string} props.value - Currently selected option value
 * @param {OptionDefinition[]} props.options - Array of selectable options with name/value/category
 * @param {function} props.onChange - Callback fired when selection changes (value or empty string)
 * @param {boolean} [props.searchable=false] - Enable search/filter functionality for large option sets
 * @param {boolean} [props.groupable=false] - Group options by category for better organization
 * @param {boolean} [props.prioritizeIcons=false] - Display icons prominently over text labels
 * @param {string} [props.ariaRole="radio"] - ARIA role for individual options (radio/option/menuitem)
 * @returns {ReactElement} Memoized OptionsSelect component
 */
const OptionsSelect: React.FC<OptionsSelectProps> = (props: OptionsSelectProps) => {
    const {
        value,
        options,
        onChange,
        searchable = false,
        groupable = false,
        prioritizeIcons = false,
        className = "",
    } = props;

    const [search, setSearch] = useState<string>("");

    /**
     * Handles the selection of an option.
     * Memoized to prevent unnecessary re-creations.
     * 
     * @param {string} option - The value of the selected option.
    */
    const handleChange = useCallback((option: string): void => {
        if (value === option) {
            onChange("");  // Clear selection if the same option is clicked
            return;
        }
        onChange(option); // Otherwise, select the new option
    }, [onChange, value]
    );

    /**
     * Updates the search term in the state.
     * Memoized to prevent unnecessary re-creations.
     * 
     * @param {string} input - The new search input value.
    */
    const handleSearch = useCallback((input: string): void => {
        setSearch(input);
    }, []
    );

    /**
     * Filters the options based on the search term (if search is enabled).
     * Memoized to optimize performance when search term or options change.
     * 
     * @returns {Array<Option>} - The filtered list of options.
    */
    const filteredOptions = useMemo(() => {
        if (!searchable) return options;

        return options.filter((option) =>
            option.name && option.name.toLowerCase().includes(search.toLowerCase())
        );

    },
        [search, searchable, options]
    );

    /**
     * Groups the filtered options by category if grouping is enabled.
     * Memoized to optimize performance when filtered options change.
     * 
     * @returns {Record<string, Option[]> | null} - The groupable options or null.
    */
    const groupedOptions = useMemo(() => {
        return groupable
            ? Object.groupBy(filteredOptions, ({ category }) => category || "uncategorized")
            : null;
    }, [filteredOptions, groupable]
    );

    /**
    * Renders the search input element if search is enabled and there are more than 10 options.
    * Memoized to avoid unnecessary re-renders.
    * 
    * @returns {ReactElement | null} - The rendered search input element.
    */
    const searchElement = useMemo((): ReactElement | null => {
        if (!searchable || options.length < 10) return null;
        return (

            <GenericInput
                value={search}
                onChange={handleSearch}
                placeholder="Search"
                type="text"
                style={{ width: "100%" }}
            />
        );
    }, [handleSearch, searchable, options.length, search]
    );

    /**
    * Renders the list of options or groupable options based on the filtered data.
    * 
    * @returns {ReactElement | ReactElement[]} - The rendered options list.
    */
    const optionElements = useMemo(() => {
        // If the search result is null
        if (filteredOptions.length === 0) {
            return <div className={CSS.Empty}>No options found.</div>;
        }

        // If options are groupable
        if (groupedOptions) {
            // Count the number of categories
            const categoryCount = Object.keys(groupedOptions).length;

            return (
                <div className={CSS.Categories}>
                    {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                        <div key={category} className={CSS.Category}>

                            {categoryCount > 1 &&
                                <span className={CSS.CategoryTitle}>{category}</span>
                            }

                            <div className={CSS.CategoryItems}>
                                {categoryOptions?.map((option, index) => {
                                    return (
                                        <Option
                                            key={index}
                                            name={option.name}
                                            value={option.value}
                                            isSelected={value.length > 0 && option.name === value}
                                            onChange={handleChange}
                                            icon={option.icon}
                                            prioritizeIcons={prioritizeIcons}
                                            category={category}
                                            className={`${className}Option`}
                                        />
                                    )
                                }) ?? []}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        // If options are basic
        // E.g for a simple list of options without grouping like radio buttons
        return (filteredOptions.map((option, index) => {
            return (
                <Option
                    key={index}
                    name={option.name}
                    value={option.value}
                    icon={option.icon}
                    prioritizeIcons={prioritizeIcons}
                    isSelected={value === option.name || value === option.value}
                    onChange={handleChange}
                    className={`${className}Option`}
                />
            )
        }));

    }, [filteredOptions, groupedOptions, value, handleChange, prioritizeIcons, className]
    );

    // Guard clauses for required props
    if (!options || options.length === 0) {
        devLog.warn("[DropdownSelect] No options provided");
        return;
    }

    if (value == null) {
        devLog.warn("[DropdownSelect] Invalid value provided, expected a string");
        return;
    }

    return (
        <>
            {searchElement}
            {optionElements}
        </>
    )
};

export default memo(OptionsSelect);