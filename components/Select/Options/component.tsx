import { memo, ReactElement, useState, useMemo, useCallback } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Option from '@/components/select/options/option/component';

// Types
import type { OptionsSelectProps } from './types';
import type { OptionData } from '@/types/option';

// Hooks
import { useDebouncedValue } from '@/hooks/hooks';

/**
 * OptionsSelect Component
 * 
 * A reusable component for displaying and selecting options from a list. It supports search functionality,
 * option grouping, and selection handling.
 * 
 * @param {OptionsSelectProps} props - The component props.
 * @param {string} props.value - The currently selected value.
 * @param {Array<Option>} props.options - The list of options to display in the dropdown.
 * @param {(value: string) => void} props.onChange - Callback function triggered when an option is selected or cleared.
 * @param {boolean} [props.searchable=false] - Whether the options should be searchable.
 * @param {boolean} [props.grouped=false] - Whether the options should be grouped by category.
 * @returns {ReactElement} - The rendered options component.
 *
*/
const OptionsSelect: React.FC<OptionsSelectProps> = (props: OptionsSelectProps): ReactElement | ReactElement[] => {
    const {
        value,
        options,
        onChange,
        searchable = false,
        grouped = false,
        prioritizeIcons = false
    } = props;


    const [getSearch, setSearch] = useState<string>('');
    const debouncedSearch = useDebouncedValue(getSearch, 100);


    /**
     * Handles the selection of an option.
     * Memoized to prevent unnecessary re-creations.
     * 
     * @param {string} option - The value of the selected option.
    */
    const handleChange = useCallback((option: string): void => {
        if (value === option) {
            onChange('');  // Clear selection if the same option is clicked
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
            option.name && option.name.toLowerCase().includes(debouncedSearch.toString().toLowerCase())
        );

    },
        [debouncedSearch, searchable, options]
    );

    /**
     * Groups the filtered options by category if grouping is enabled.
     * Memoized to optimize performance when filtered options change.
     * 
     * @returns {Record<string, Option[]> | null} - The grouped options or null.
    */
    const groupedOptions = useMemo(() => {
        return grouped
            ? Object.groupBy(filteredOptions, ({ category }) => category || 'uncategorized')
            : null;
    }, [filteredOptions, grouped]
    );

    /**
    * Renders the search input element if search is enabled and there are more than 10 options.
    * Memoized to avoid unnecessary re-renders.
    * 
    * @returns {ReactElement | null} - The rendered search input element.
    */
    const renderSearchElement = useMemo((): ReactElement | null => {
        if (!searchable || options.length < 10) return null;
        return (
            <input
                className={CSS.OptionsSelect_Search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='SEARCH'
            />
        );
    }, [handleSearch, searchable, options.length]
    );

    /**
    * Renders the list of options or grouped options based on the filtered data.
    * 
    * @returns {ReactElement | ReactElement[]} - The rendered options list.
    */
    const childrenElements = (() => {
        // If the search result is null
        if (filteredOptions.length === 0) {
            return <div className={CSS.OptionsSelect_Empty}>No options found.</div>;
        }

        // If options are grouped
        if (groupedOptions) {
            // Count the number of categories
            const categoryCount = Object.keys(groupedOptions).length;
            // Calculate the number of columns based on the number of categories
            const columns = Object.keys(groupedOptions).map(() => 'auto').join(' ');
            // Create a style object for CSS variables
            const style = { "--category-columns": columns } as React.CSSProperties;
            return (
                <div className={CSS.OptionsSelect_Categories} style={style}>
                    {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                        <div key={category} className={CSS.OptionsSelect_Category}>

                            {categoryCount > 1 &&
                                <span className={CSS.OptionsSelect_CategoryTitle}>{category}</span>
                            }

                            <div className={CSS.OptionsSelect_CategoryItems}>
                                {categoryOptions?.map((option: OptionData, index) => {
                                    return (
                                        <Option
                                            key={index}
                                            name={option.name}
                                            value={option.value}
                                            isSelected={value.length > 0 && option.name === value}
                                            onChange={handleChange}
                                            icon={option.icon}
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
        return (filteredOptions.map((option: OptionData, index) => {
            return (
                <Option
                    key={index}

                    name={option.name}
                    value={option.value}
                    icon={option.icon}
                    prioritizeIcons={prioritizeIcons}

                    isSelected={value === option.name}
                    onChange={handleChange}
                />
            )
        }));
    })()

    return (
        <>
            {renderSearchElement}
            {childrenElements}
        </>
    )
};


export default memo(OptionsSelect);