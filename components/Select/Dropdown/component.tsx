import React, { memo, ReactElement, useCallback, useMemo } from 'react';
// Styles
import CSS from './styles.module.css';

// Types
import { DropdownSelectProps } from '@/components/select/dropdown/types';

// Utilities
import { devLog } from '@/utilities/dev';

// Components
import DropdownReveal from '@/components/reveal/dropdown/component';
import Options from '@/components/select/options/component';

/**
 * DropdownSelect Component
 * 
 * A reusable dropdown select component that allows users to select an option from a list.
 * It includes features such as search and grouping options for the dropdown content.
 * 
 * @param {DropdownSelectProps} props - The component props.
 * @param {Array<{ name: string, value: string }>} props.options - The list of options to display in the dropdown.
 * @param {string} props.value - The currently selected value.
 * @param {(value: string) => void} props.onChange - Callback function triggered when an option is selected.
 * @param {string} props.placeholder - Placeholder text to display when no value is selected.
 * @param {boolean} [props.grouped=false] - Whether the options should be grouped.
 * @param {boolean} [props.searchable=false] - Whether the options should be searchable.
 * @returns {ReactElement} - The rendered dropdown select component.
 *
 */
const DropdownSelect: React.FC<DropdownSelectProps> = (props: DropdownSelectProps) => {
    const {
        // Core
        value,
        options,
        onChange,

        placeholder = 'N/A',
        forcePlaceholder = false,
        grouped = false,
        searchable = false,
        isDisabled = false,

        // Accessibility
        title = 'Toggle Dropdown',
        ariaLabel = 'Dropdown select',
    } = props;

    // Guard Clause
    if (!options || options.length === 0) {
        devLog.warn('[DropdownSelect] No options provided');
        return null;
    }

    if (value == null) {
        devLog.warn('[DropdownSelect] Invalid value provided, expected a string');
        return null;
    }


    /**
     * Handles option selection with validation and error handling
     * Ensures the selected value exists in the options array
     * 
     * @param {string} selectedValue - The value of the selected option
     */
    const handleOptionChange = useCallback((selectedValue: string): void => {
        // If no value is selected, clear the selection
        if (selectedValue === '') return onChange('');

        // Validate that the selected value exists in options
        const isValidOption = options.some(option => option.value === selectedValue);

        if (!isValidOption) {
            devLog.warn(`[DropdownSelect] Invalid option selected: ${selectedValue}`);
            return;
        }

        onChange(selectedValue);
    }, [options, onChange]
    );

    /**
     * Options container props for performance
     * Reduces re-renders when parent component updates
     */
    const optionsProps = useMemo(() => ({
        searchable,
        grouped,
        value,
        options,
        onChange: handleOptionChange
    }), [searchable, grouped, value, options, handleOptionChange]
    );

    /**
     * Dropdown properties for the reveal component
    */
    const dropdownProps = useMemo(() => ({
        value,
        placeholder: forcePlaceholder ? placeholder : value || 'N/A',
        title,
    }), [value, placeholder, title]
    );

    return (
        <DropdownReveal ariaLabel={ariaLabel} {...dropdownProps} isDisabled={isDisabled}>
            <div className={CSS.Options}>
                <Options {...optionsProps} />
            </div>
        </DropdownReveal>
    );
};

export default memo(DropdownSelect);