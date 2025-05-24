import { memo, isValidElement, cloneElement, Children, ReactElement, useCallback } from 'react';

// Styles 
import componentStyle from '@/components/Input/Multi/styles.module.css';

// Types
import { MULTI_INPUT } from '@/components/Input/Multi/types';

// Utilities
import { updateMultiValue, splitMultiValue } from '@/utilities/style';
import { devLog } from '@/utilities/dev';

/**
 * MultiInput Component
 * 
 * A controlled component that manages multiple child inputs as a single delimited string value.
 * Distributes individual splitedValues to each child and consolidates changes back into a delimited string.
 * 
 * @component
 * @param {MULTI_INPUT} props - Component props
 * @param {string} [props.value=""] - The combined delimited string (e.g., "10px 20px 30px")
 * @param {ReactElement|ReactElement[]} props.children - Input components (must accept value/onChange)
 * @param {string} [props.separator=" "] - Character to split/join splitedValues (space, comma, etc.)
 * @param {function} [props.onChange=()=>{}] - Callback when combined value changes
 * 
 * @example 
 * // Basic usage with space separator
 * <MultiInput value="10px 20px" onChange={updateValue}>
 *   <LengthInput />
 *   <LengthInput />
 * </MultiInput>
 * 
 * @example
 * // Comma-separated splitedValues
 * <MultiInput value="red,blue" separator="," onChange={handleChange}>
 *   <ColorInput />
 *   <ColorInput />
 * </MultiInput>
 */
const MultiInput: React.FC<MULTI_INPUT> = ({ value = '', children, separator, onChange = () => { } }: MULTI_INPUT): ReactElement | null => {
    const splitedValues = splitMultiValue(value, separator);

    /**
     * Handles individual input changes and updates the delimited value.
     * Memoized to prevent unnecessary re-creations.
     * 
     * @param {string} newValue - The updated value for the input
     * @param {number} index - The index of the changed input
     */
    const handleChange = useCallback((input: string, value: string, index: number): void => {
        const updatedValue = updateMultiValue(value, input, index, separator);
        onChange(updatedValue);
    }, [onChange, separator]
    );

    const childrenElements = Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
            devLog.warn(`Invalid child element at index ${index}`);
            return null;
        }

        return cloneElement(child, {
            value: splitedValues[index] ?? '',
            onChange: (val: string) => handleChange(val, value, index),
            key: `multi-input-${index}`,
        });
    });

    return (
        <div className={componentStyle.MultiInput} role="group" aria-label="Multi-value input group">
            {childrenElements}
        </div>
    );
};

export default memo(MultiInput);
