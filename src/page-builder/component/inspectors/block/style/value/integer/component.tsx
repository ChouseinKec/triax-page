// External imports
import React, { useCallback, memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import GenericInput from '@/src/shared/components/input/generic/component';
import SelectDropdown from '@/src/shared/components/select/dropdown/component';

// Types
import { IntegerValueProps } from "./types";

/**
 * IntegerValue Component
 *
 * A specialized numeric input component for CSS integer values in the page builder with optional unit selection.
 * Provides controlled integer input with min/max validation and the ability to switch between different value types.
 * Features strict mode for enforcing numeric values and conditional dropdown display.
 *
 * @param  props - Component properties
 * @param  props.value - Current integer value as string
 * @param  props.onChange - Callback triggered when value changes
 * @param  props.options - Array of available value type options
 * @param  props.minValue - Minimum allowed numeric value
 * @param  props.maxValue - Maximum allowed numeric value
 * @param  props.isStrict=false - Enforces strict integer validation and defaults
 * @returns Rendered numeric input with optional unit selector dropdown
 *
 * @note Dropdown only appears when multiple options are available
 */
const IntegerValue: React.FC<IntegerValueProps> = ({ value, onChange, options, minValue, maxValue, isStrict }) => {
    // Default number is '0', used when no numeric value is provided in strict mode
    const DEFAULT_NUMBER = '0';

    // Handle changes to the numeric input
    const handleValueChange = useCallback((input: string): void => {
        if (input === '') return onChange(isStrict ? DEFAULT_NUMBER : '');

        const intValue = String(parseInt(input, 10));
        onChange(intValue);
    }, [onChange, isStrict]
    );

    // Handle changes to the unit dropdown
    const handleOptionChange = useCallback((input: string): void => {
        onChange(input);
    }, [onChange]
    );

    // Determine if dropdown should be shown based on available options
    const showDropdown = useMemo(() => {
        return options.length > 1;
    }, [options.length]
    );

    return (
        <div className={`${CSS.IntegerValue} IntegerValue`}>

            {/* Main numeric input field */}
            <GenericInput
                value={value}
                min={minValue}
                max={maxValue}
                type='number'
                onChange={handleValueChange}
            />

            {/* Optional dropdown for alternative value types */}
            {showDropdown && (
                <SelectDropdown
                    options={options}
                    value={'number'}
                    onChange={(handleOptionChange)}
                    searchable={true}
                    groupable={true}
                />
            )}

        </div>
    );
};

IntegerValue.displayName = "IntegerValue";
export default memo(IntegerValue);
