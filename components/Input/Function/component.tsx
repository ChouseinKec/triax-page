import { memo, useCallback, ReactElement } from 'react';

// Components 
import DynamicInput from '@/components/Input/Dynamic/component';
import MultiValueInput from '@/components/Input/Multi/components';

// Types
import { FUNCTION_INPUT } from '@/components/Input/Function/types';

// Utilities
import { getStyleOptionByValue, extractSyntaxTypes, extractValue, extractFunction, extractSeparator, splitMultiValue, updateMultiValue } from '@/editors/style/utilities/style';
import { devLog } from '@/utilities/dev';


/**
 * A component that handles function-style CSS input values (e.g., `fit-content(10px)`, `repeat(1,20px)`).
 * Supports both single values and multi-value functions with automatic syntax validation.
 *
 * @param {object} props - Component props
 * @param {string} props.value - Current function value (e.g., "fit-content(10px)")
 * @param {Function} props.onChange - Callback when value changes
 * @param {Array} props.options - Available style options for validation
 */
const FunctionInput: React.FC<FUNCTION_INPUT> = ({ value = '', onChange = () => { }, options = [] }: FUNCTION_INPUT): ReactElement => {
    // Extract components from function string
    const extractedValue = extractValue(value);
    const extractedFunc = extractFunction(value);
    const extractedSepa = extractSeparator(extractedValue) || ' ';
    const splitedValues = splitMultiValue(extractedValue, extractedSepa);

    /**
     * Handles value changes and reconstructs the function string
     * @param {string} newValue - The new inner value (without function wrapper)
     * @param {string} func - The function name (e.g., "rgb", "calc")
     */
    const handleChange = useCallback((newValue: string, func: string) => {
        const finalValue = func ? `${func}(${newValue})` : newValue;
        onChange(finalValue);
    }, [onChange]
    );

    // Find matching style option
    const option = getStyleOptionByValue(value, options);
    // Early return if no valid option found
    if (!option) {
        devLog.error('[FunctionInput]: No matching style option found for value:', value);
        return <></>;
    }

    // Split syntax into identifiers (e.g., ["number", "length"] for repeat(number,length))
    const identifiers = extractSyntaxTypes(option.syntax);
    // Fallback for unsupported syntax
    if (!identifiers) {
        devLog.error('[FunctionInput]: Unsupported syntax format in option:', option.syntax);
        return <></>
    }

    return (
        <div>
            <MultiValueInput
                onChange={(val) => handleChange(val, extractedFunc)}
                value={extractedValue}
                separator={extractedSepa}
            >
                {identifiers.map((id, i) => (
                    <DynamicInput
                        key={`${id}-${i}`}
                        option={option}
                        value={splitedValues[i] || ''}
                        identifier={id}
                        onChange={(val) => handleChange(
                            updateMultiValue(extractedValue, val, i, extractedSepa),
                            extractedFunc
                        )}
                    />
                ))}
            </MultiValueInput>
        </div>
    );
};

export default memo(FunctionInput);
