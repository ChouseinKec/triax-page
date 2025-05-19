import { memo, useCallback, ReactElement } from 'react';

// Components 
import DynamicInput from '@/components/Input/Dynamic/component';
import MultiValueInput from '@/components/Input/Multi/components';

// Types
import { FUNCTION_INPUT } from '@/components/Input/Function/types';

// Utilities
import { getStyleOptionByValue, splitSyntaxIdentifiers, extractValue, extractFunction, extractSeparator, splitMultiValue } from '@/editors/style/utilities/style';


const FunctionInput: React.FC<FUNCTION_INPUT> = ({ value, onChange, options }: FUNCTION_INPUT): ReactElement => {
    const extractedValue = extractValue(value);
    const extractedFunc = extractFunction(value);
    const extractedSepa = extractSeparator(extractedValue) || ' ';
    const splitedValues = splitMultiValue(extractedValue, extractedSepa);


    /**
     * Handle changes to the input value.
     * Memoized to prevent unnecessary re-creations.
     * 
     * @param {string} newValue - The new input value
     */
    const handleChange = useCallback((value: string, func: string) => {
        const finalValue = func.length >= 1 ? `${func}(${value})` : value;
        onChange(finalValue);
    }, [onChange]
    );

    const option = getStyleOptionByValue(value, options);
    if (!option) {
        return <p>No option found</p>;
    }

    const identifiers = splitSyntaxIdentifiers(option.syntax);
    if (!identifiers) {
        return (
            <input
                type="text"
                placeholder="Option not supported"
                value={value}
                onChange={(e) => handleChange(e.target.value, extractedFunc)}
            />
        );
    }


    const inputElements = splitedValues.map((value, index) =>
        <DynamicInput option={option} key={index} value={value} identifier={identifiers[index]} onChange={(value: string) => handleChange(value, extractedFunc)} />
    );



    return (
        <MultiValueInput onChange={(value: string) => handleChange(value, extractedFunc)} value={extractedValue} separator={extractedSepa}>
            {inputElements}
        </MultiValueInput>
    )

};

export default memo(FunctionInput);
