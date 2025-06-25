// External imports
import React, { useCallback, ReactElement, memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import GenericInput from '@/components/Input/Generic/component';
import SelectDropdown from '@/components/Select/Dropdown/component';

// Types
import { NumberValueProps } from './types';



const NumberValue: React.FC<NumberValueProps> = memo((props: NumberValueProps): ReactElement => {
    const {
        value = '',
        onChange = () => { },
        options = [],
        minValue = -Infinity,
        maxValue = Infinity,
        isStrict = false,
    } = props;

    // Default number is '0', used when no numeric value is provided
    const DEFAULT_NUMBER = '0.0';

    // Handle changes to the numeric input
    const handleValueChange = useCallback((input: string): void => {
        if (input === '') {
            onChange(isStrict ? DEFAULT_NUMBER : '');
        }

        // Convert input to float and ensure it has a decimal if it's an integer
        const num = parseFloat(input);
        // If input is integer, add .0
        const formatted = Number.isInteger(num) ? num.toFixed(1) : input;

        onChange(formatted);
    }, [onChange, isStrict]);


    // Handle changes to the unit dropdown
    const handleOptionChange = useCallback((input: string): void => {
        onChange(input);
    }, [onChange]);


    const renderOptionSelect = () => {
        if (options.length <= 1) return null;
        return (
            <SelectDropdown
                options={options}
                value={'number'}
                onChange={(handleOptionChange)}
                searchable={true}
                grouped={true}
            />
        )
    }

    return (
        <div className={CSS.NumberValue}>
            {/* Numeric input for the value part */}
            <GenericInput
                value={value}
                min={minValue}
                max={maxValue}
                type='number'
                onChange={handleValueChange}
            />

            {/* Dropdown for the option part */}
            {renderOptionSelect()}
        </div>
    );
});

export default NumberValue;
