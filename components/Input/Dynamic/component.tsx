import { memo, useCallback, ReactElement } from 'react';

// Styles
import CSS from '@/components/Input/Dynamic/styles.module.css';

// Components 
import LengthInput from '@/components/Input/Length/component';
import NumberInput from '@/components/Input/Number/component';
import ColorSelect from '@/components/Select/Color/component';
import DropdownSelect from '@/components/Select/Dropdown/component';


// Types
import { DYNAMIC_INPUT } from '@/components/Input/Dynamic/types';
import { MULTI_INPUT_CHILD } from '@/components/Input/Multi/types';
import { STYLE_VALUE } from '@/editors/style/constants/types';
import { devLog } from '@/utilities/dev';


/**
 * DynamicInput Component
 * 
 * Renders dynamic input fields based on the provided input syntax.
 * The component adapts to different input types like 'length', 'number', or 'color'.
 * 
 * @component
 * @param {DYNAMIC_INPUT} props - Component props
 * @param {string} props.value - The current input value string
 * @param {(value: string) => void} props.onChange - Callback to update the value
 * @param {STYLE_VALUE[]} props.options - Available style options to match the input format
 * @returns {ReactElement} - Dynamic input field(s) based on the value's syntax
 */
const DynamicInput: React.FC<DYNAMIC_INPUT> = ({ value, type, onChange, option }: DYNAMIC_INPUT): ReactElement => {
    /**
     * Handle changes to the input value.
     * Memoized to prevent unnecessary re-creations.
     * 
     * @param {string} newValue - The new input value
     */
    const handleChange = useCallback((value: string) => {
        onChange(value);
    }, [onChange]
    );

    /**
     * Creates an input field based on the input type (e.g., length, number, color).
     * Memoized to prevent unnecessary re-creations.
     * 
     * @param {string} value - Value passed to component (e.g., "fit-content(10px)")
     * @param {string} extractedValue - Extracted value from original value (e.g., "10px")
     * @param {string} extractedFunc - Extracted function from original value (e.g., "fit-content")
     * @param {string} type - Type of input (e.g., "length")
     * @param {number} key - React key index
     * @param {STYLE_VALUE} option - Current matched style option definition
     * @returns {ReactElement} - Input field element
     */
    const renderInputElement = useCallback((value: string, type: string, option?: STYLE_VALUE): ReactElement<MULTI_INPUT_CHILD> => {
        switch (type) {
            case 'keyword':
                return (
                    <DropdownSelect
                        value={value}
                        onChange={handleChange}
                        options={option?.lengths ?? []}
                    />
                )
            case 'length':
                return (
                    <LengthInput
                        value={value}
                        onChange={handleChange}
                        isStrict={true}
                        options={option?.lengths}
                    />
                );
            case 'number':
                return (
                    <NumberInput
                        value={value}
                        onChange={handleChange}
                    />
                );
            case 'color':
                return (
                    <ColorSelect
                        value={value}
                        onChange={handleChange}
                    />
                );
            default:
                devLog.error(`[DynamicInput] Unsupported input type '${type}'`)
                return <></>
        }
    }, [handleChange]
    );



    return renderInputElement(value, type, option)
};

export default memo(DynamicInput);
