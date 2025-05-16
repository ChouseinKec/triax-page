import { memo, ReactElement, useState, useMemo, useCallback } from 'react';

// Styles
import CSS from '@/components/Select/Options/styles.module.css';

// Components
import OptionItem from '@/components/Select/Options/Item/component';

// Types
import { OPTIONS_SELECT } from '@/components/Select/Options/types';
import { OPTIONS_SELECT_OPTION } from '@/components/Select/Options/types';

// Hooks
import { useDebouncedValue } from '@/hooks/hooks';

/**
 * OptionsSelect Component
 * 
 * A reusable component for displaying and selecting options from a list. It supports search functionality,
 * option grouping, and selection handling.
 * 
 * @param {OPTIONS_SELECT} props - The component props.
 * @param {string} props.value - The currently selected value.
 * @param {Array<OPTIONS_SELECT_OPTION>} props.options - The list of options to display in the dropdown.
 * @param {(value: string) => void} props.onChange - Callback function triggered when an option is selected or cleared.
 * @param {boolean} [props.hasSearch=false] - Whether the options should be searchable.
 * @param {boolean} [props.isGrouped=false] - Whether the options should be grouped by category.
 * @returns {ReactElement} - The rendered options component.
 * 
 * @example
 * <OptionsSelect 
 *   value="option1"
 *   options={[{ name: 'Option 1', value: 'option1' }, { name: 'Option 2', value: 'option2' }]}
 *   onChange={(value) => setSelectedValue(value)}
 * />
 */
const OptionsSelect: React.FC<OPTIONS_SELECT> = ({ value, options, onChange, hasSearch, isGrouped }: OPTIONS_SELECT): ReactElement | ReactElement[] => {
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
     * @returns {Array<OPTIONS_SELECT_OPTION>} - The filtered list of options.
    */
    const filteredOptions = useMemo(() => {
        if (!hasSearch) return options;

        return options.filter((option) =>
            option.name && option.name.toLowerCase().includes(debouncedSearch.toString().toLowerCase())
        );

    },
        [debouncedSearch, hasSearch, options]
    );

    /**
     * Groups the filtered options by category if grouping is enabled.
     * Memoized to optimize performance when filtered options change.
     * 
     * @returns {Record<string, OPTIONS_SELECT_OPTION[]> | null} - The grouped options or null.
    */
    const groupedOptions = useMemo(() => {
        return isGrouped
            ? Object.groupBy(filteredOptions, ({ category }) => category || 'uncategorized')
            : null;
    }, [filteredOptions, isGrouped]
    );



    /**
    * Renders the search input element if search is enabled and there are more than 10 options.
    * Memoized to avoid unnecessary re-renders.
    * 
    * @returns {ReactElement | null} - The rendered search input element.
    */
    const renderSearchElement = useMemo((): ReactElement | null => {
        if (!hasSearch || options.length < 10) return null;
        return (
            <input
                className={CSS.OptionsSelect_Search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='SEARCH'
            />
        );
    }, [handleSearch, hasSearch, options.length]
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
            const columns = Object.keys(groupedOptions).map(() => 'auto').join(' ');
            const style = { "--category-columns": columns } as React.CSSProperties;

            return (
                <div className={CSS.OptionsSelect_Categories} style={style}>
                    {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                        <div key={category} className={CSS.OptionsSelect_Category}>
                            <span className={CSS.OptionsSelect_CategoryTitle}>{category}</span>

                            <div className={CSS.OptionsSelect_CategoryItems}>
                                {categoryOptions?.map((option: OPTIONS_SELECT_OPTION, index) => {
                                    return (
                                        <OptionItem
                                            key={index}
                                            {...option}
                                            isSelected={value.length > 0 && option.value.startsWith(value)}
                                            onChange={handleChange}
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
        return (filteredOptions.map((option: OPTIONS_SELECT_OPTION, index) => {
            return (
                <OptionItem
                    key={index}
                    {...option}
                    isSelected={value === option.value}
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