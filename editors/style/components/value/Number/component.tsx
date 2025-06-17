// External imports
import React, { useCallback, ReactElement, memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import InputNumber from '@/components/Input/Number/component';
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
    const DEFAULT_NUMBER = '0';

    // Handle changes to the numeric input
    const handleValueChange = useCallback((input: string): void => {
        if (input === '') {
            onChange(isStrict ? DEFAULT_NUMBER : '');
        }

        onChange(input);
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
            <InputNumber
                value={value}
                minValue={minValue}
                maxValue={maxValue}
                onChange={handleValueChange}
            />

            {/* Dropdown for the option part */}
            {renderOptionSelect()}
        </div>
    );
});

export default NumberValue;
