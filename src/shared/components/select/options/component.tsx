"use client";

import React, { memo, ReactElement, useState, useMemo, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Option from "./option/component";
import GenericInput from "../../input/generic/component";

// Types
import type { OptionsSelectProps } from "./types";

/**
 * OptionsSelect Component
 *
 * A flexible options selection component that displays a list of selectable items with advanced filtering and organization features.
 * Supports real-time search, category-based grouping, and icon prioritization for enhanced user experience.
 * Optimized for performance with memoized filtering and grouping operations.
 *
 * @param  props - Component properties
 * @param  props.value - The currently selected option value
 * @param  props.options - Array of option objects with name, value, category, and icon properties
 * @param  props.onChange - Callback function triggered when an option is selected
 * @param  props.searchable=false - Enables real-time search filtering of options
 * @param  props.groupable=false - Organizes options into category groups when available
 * @param  props.prioritizeIcons=false - Prioritizes icon display over text in option rendering
 * @param  props.className="" - Additional CSS classes for custom styling
 * @returns Rendered options list with optional search input and category groupings
 *
 * @note Search input only appears when searchable is true and there are 10+ options
 */
const OptionsSelect: React.FC<OptionsSelectProps> = ({
    value,
    options,
    onChange,
    searchable = false,
    groupable = false,
    clearable = true,
    prioritizeIcons = false,
}) => {
    const [search, setSearch] = useState<string>("");

    // Handle option selection changes
    const handleChange = useCallback((option: string): void => {
        // Clear selection if the same option is clicked and clearable is enabled
        if (clearable && value === option) return onChange("");

        // Prevent clearing selection if clearable is disabled and empty option is selected
        if (!clearable && (!option || option === '')) return;

        // Otherwise, select the new option
        onChange(option);
    }, [onChange, value, clearable]);

    // Handle search input changes
    const handleSearch = useCallback((input: string): void => {
        setSearch(input);
    }, []);

    // Filter options based on search input
    const filteredOptions = useMemo(() => {
        if (!searchable) return options;

        return options.filter((option) =>
            option.name && option.name.toLowerCase().includes(search.toLowerCase())
        );

    },
        [search, searchable, options]
    );

    // Group options by category if enabled
    const groupedOptions = useMemo(() => {
        return groupable
            ? Object.groupBy(filteredOptions, ({ category }) => category || "uncategorized")
            : null;
    }, [filteredOptions, groupable]
    );

    // Render the search input element if searchable and enough options
    const searchElement = useMemo((): ReactElement | null => {
        if (!searchable || options.length < 10) return null;
        return (
            <div className={`${CSS.Search} Search`}>
                <GenericInput
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search"
                    type="text"
                />
            </div>
        );
    }, [handleSearch, searchable, options.length, search]
    );

    // Render the list of options, grouped or ungrouped
    const optionsElement = useMemo(() => {
        // If the search result is null
        if (filteredOptions.length === 0) {
            return <div className={CSS.Empty}>No options found.</div>;
        }

        // If options are groupable
        if (groupedOptions) {
            // Count the number of categories
            const categoryCount = Object.keys(groupedOptions).length;

            return (
                <div className={`${CSS.Categories} Categories`}>
                    {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                        <div key={category} className={`${CSS.Category} Category`}>

                            {categoryCount > 1 &&
                                <span className={`${CSS.Title} Title`}>{category}</span>
                            }

                            <div className={`${CSS.Items} Items`}>
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
                />
            )
        }));

    }, [filteredOptions, groupedOptions, value, handleChange, prioritizeIcons]
    );

    return (
        <>
            {searchElement}
            {optionsElement}
        </>
    )
};

export default memo(OptionsSelect);