import React, { memo, useCallback, ReactElement } from 'react';

// Styles
import CSS from '@/components/Group/Input/styles.module.css';

// Components
import DropdownReveal from '@/components/Reveal/Dropdown/component';
import SelectDropdown from '@/components/Select/Dropdown/component';
import LengthInput from '@/components/Input/Dimension/component';
import SVG from '@/components/SVG/svg';

// Types
import { INPUT_GROUP } from '@/components/Group/Input/types';

// Utilities 
import { devLog } from '@/utilities/dev';
// import { splitMultiValue } from '@/utilities/style';

/**
 * InputGroup Component
 * 
 * Allows users to manage a dynamic list of style values, with support for
 * custom rendering, add/delete actions, and expandable inputs.
 * 
 * @component
 * @param {INPUT_GROUP} props - Component props
 * @param {string[]} props.values - Current list of input values
 * @param {Function} props.onChange - Callback to update values
 * @param {Array} props.options - Options available for inputs
 * 
 * @returns {ReactElement} - Memoized component rendering an interactive list
 * 
 * @example
 * <InputGroup
 *   values={['10px', 'auto']}
 *   onChange={(value, index) => updateStyle(value, index)}
 *   options={[{ name: '10px', value: '10px', , syntax: 'length' }, { name: 'auto', value: 'auto', type:'keyword',
syntax: 'keyword'}]}
 * />
 */
const InputGroup: React.FC<INPUT_GROUP> = ({ value = '', onChange, options }: INPUT_GROUP): ReactElement => {
    // const values = splitMultiValue(value, ' ');
    const values = [];

    /**
     * Handle input value change at a given index
    */
    const handleChange = useCallback((value: string, index: number) => {
        onChange(value, index);
    }, [onChange]
    );

    /**
     * Delete a value by index by replacing it with an empty string
    */
    const handleDelete = useCallback((index: number, _values: string[]) => {
        if (index < 0 || index >= _values.length) {
            devLog.warn(`Index ${index} is out of bounds. Skipped delete.`);
            return;
        }

        handleChange('', index);
    }, [handleChange]
    );

    /**
     * Append a new value to the list
    */
    const handleAdd = useCallback((value: string, values: string[]) => {
        handleChange(value, values.length);
    }, [handleChange]
    );

    /**
     * Renders a single input wrapped in a DropdownReveal.
     *
     * @component
     * @param {string} value - The input value
     * @param {number} index - Index of the item
     * @param {Function} onChange - Handler to call on change
     * @returns {ReactElement} - Input component
    */
    const renderInputElement = useCallback((value: string, index: number, options: INPUT_GROUP['options']): ReactElement => {
        return (
            <LengthInput value={value} onChange={(val) => handleChange(val, index)} options={options} />
        );
    }, [handleChange]
    );

    /**
     * Renders the "Add" button or a dropdown to select new values.
     * 
     * @param {Function} onAdd - Handler to add a new item
     * @param {INPUT_GROUP['options']} options - Available add options
     * @returns {ReactElement} - Button or dropdown
    */
    const renderAddElement = useCallback((options: INPUT_GROUP['options'], values: string[]): ReactElement => {
        if (options.length > 1) {
            return (
                <SelectDropdown
                    options={options}
                    value=""
                    onChange={(value: string) => { handleAdd(value, values) }}
                    hasSearch={true}
                    isGrouped={true}
                    placeholder="ADD"
                />
            );
        }

        return (
            <button className={CSS.InputGroup_AddButton} onClick={() => handleAdd(options[0].value, values)}>
                ADD
            </button>
        );
    }, [handleAdd]
    );

    /**
      * Renders the "Delete" button to delete values.
      * 
      * @param {number} index - Index of the value
      * @returns {ReactElement} - Button
     */
    const renderDeleteElement = useCallback((index: number, values: string[]): ReactElement => {
        return (
            <button
                className={CSS.InputGroup_DeleteButton}
                onClick={() => handleDelete(index, values)}
            >
                <SVG name="delete" />
            </button>
        )
    }, [handleDelete]
    );



    return (
        <DropdownReveal placeholder="Edit" closeOnChange={false}>

            {/* Render each input and its corresponding delete button */}
            <div className={CSS.InputGroup_Items}>
                {values.map((value, index) => (
                    <div className={CSS.InputGroup_Item} key={index}>
                        {renderInputElement(value, index, options)}
                        {renderDeleteElement(index, values)}
                    </div>
                ))}
            </div>

            {/* Render the add button or dropdown */}
            {renderAddElement(options, values)}

        </DropdownReveal>
    );
};

export default memo(InputGroup);
