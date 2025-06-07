import React, { memo, ReactElement, useCallback } from 'react';
// Styles
import CSS from '@/components/Select/Dropdown/styles.module.css';

// Types
import { DROPDOWN_SELECT } from '@/components/Select/Dropdown/types';


// Components
import Dropdown from '@/components/Reveal/Dropdown/component';
import Options from '@/components/Select/Options/component';

/**
 * DropdownSelect Component
 * 
 * A reusable dropdown select component that allows users to select an option from a list.
 * It includes features such as search and grouping options for the dropdown content.
 * 
 * @param {DROPDOWN_SELECT} props - The component props.
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
const DropdownSelect: React.FC<DROPDOWN_SELECT> = ({ value, options, buttonStyle, onChange, placeholder = 'Select', grouped, searchable }: DROPDOWN_SELECT): ReactElement => {

    /**
    * Handles the onChange event for when an option is selected from the dropdown.
    * Memoized to prevent unnecessary re-creations.
    */
    const handleOptionChange = useCallback((selectedValue: string) => {
        onChange(selectedValue);
    }, [onChange]);

    return (
        <Dropdown value={value || placeholder} buttonStyle={buttonStyle}        >
            <div className={CSS.DropdownSelect_Options}>
                <Options searchable={searchable} grouped={grouped} value={value} options={options} onChange={handleOptionChange} />
            </div>
        </Dropdown>
    );
};

export default memo(DropdownSelect);