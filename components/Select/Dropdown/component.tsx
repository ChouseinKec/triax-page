import React, { memo, ReactElement, useCallback } from 'react';
// Styles
import CSS from './styles.module.css';

// Types
import { DropdownSelectProps } from '@/components/select/dropdown/types';


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
 * @example
 * <DropdownSelect 
 *   value="option1"
 *   options={[{ name: 'Option 1', value: 'option1' }, { name: 'Option 2', value: 'option2' }]}
 *   onChange={(value) => setSelectedValue(value)}
 * />
 */
const DropdownSelect: React.FC<DropdownSelectProps> = (props: DropdownSelectProps): ReactElement => {
    const {
        value,
        options,
        onChange,
        placeholder = 'N/A',
        forcePlaceholder = false,
        grouped = false,
        searchable = false,
        buttonStyle = {},
        buttonTitle = 'Toggle Dropdown',
    } = props;

    /**
    * Handles the onChange event for when an option is selected from the dropdown.
    * Memoized to prevent unnecessary re-creations.
    */
    const handleOptionChange = useCallback((selectedValue: string) => {
        onChange(selectedValue);
    }, [onChange]);



    return (
        <DropdownReveal value={value} forcePlaceholder={forcePlaceholder} placeholder={placeholder} buttonStyle={buttonStyle} buttonTitle={buttonTitle}>
            <div className={CSS.DropdownSelect_Options}>
                <Options searchable={searchable} grouped={grouped} value={value} options={options} onChange={handleOptionChange} />
            </div>
        </DropdownReveal>
    );
};

export default memo(DropdownSelect);