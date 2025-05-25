import { memo, useCallback, ReactElement } from 'react';

// Components 
import DynamicInput from '@/components/Input/Dynamic/component';
import MultiInput from '@/components/Input/Multi/component';

// Types
import { FUNCTION_INPUT } from '@/components/Input/Function/types';

// Utilities
import { getOptionByValue, extractSyntaxTypes, extractValue, extractFunction, extractSeparator, splitMultiValue, updateMultiValue } from '@/utilities/style';
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
    const option = getOptionByValue(value, options);
    // Early return if no valid option found
    if (!option) {
        devLog.error('[FunctionInput]: No matching style option found for value:', value);
        return <></>;
    }

    // Split syntax into syntaxTypes (e.g., ["number", "length"] for repeat(number,length))
    const syntaxTypes = extractSyntaxTypes(option.syntax);
    // Fallback for unsupported syntax
    if (!syntaxTypes) {
        devLog.error('[FunctionInput]: Unsupported syntax format in option:', option.syntax);
        return <></>
    }

    const inputElements = syntaxTypes.map((syntaxType, index) => (
        <DynamicInput
            key={`${syntaxType}-${index}`}
            option={option}
            type={syntaxType}
        />
    ));

    return (
        <div>
            <MultiInput
                onChange={(val) => handleChange(val, extractedFunc)}
                value={extractedValue}
                separator={extractedSepa}
            >
                {inputElements}
            </MultiInput>
        </div>
    );
};

export default memo(FunctionInput);
