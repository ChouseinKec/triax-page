// External imports
import React, { useCallback, ReactElement, memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import GenericInput from '@/components/input/generic/component';
import SelectDropdown from '@/components/select/dropdown/component';

// Types
import { NumberValueProps } from './types';

/**
 * NumberValue Component
 * 
 * A controlled input component for CSS numeric values with optional alternative options.
 * Provides float number input validation with support for special CSS values (auto, inherit, etc.).
 * Automatically formats decimal numbers and validates range constraints.
 * 
 * @param {NumberValueProps} props - Component properties
 * @param {string} [props.value=''] - Current numeric value as string
 * @param {function} [props.onChange] - Callback for value changes
 * @param {Array} [props.options=[]] - Available alternative options (keywords, etc.)
 * @param {number} [props.min=-Infinity] - Minimum allowed numeric value
 * @param {number} [props.max=Infinity] - Maximum allowed numeric value
 * @param {boolean} [props.isInteger=false] - Whether the value should be treated as an integer
 * @returns {ReactElement} Memoized NumberValue component
 */
const NumberValue: React.FC<NumberValueProps> = memo((props: NumberValueProps): ReactElement => {
    const {
        value = '',
        onChange = () => { },
        options = [],
        min = -Infinity,
        max = Infinity,
        isInteger = false,
    } = props;


    /**
     * Determines whether to show the options dropdown based on available choices
     * 
     * @returns {boolean} Whether the options dropdown should be rendered
     */
    const shouldShowOptions = useMemo(() => {
        return options.length > 1;
    },
        [options.length]
    );

    /**
    * Validates numeric input and provides user-friendly error messages
    * Checks for valid numbers, range constraints, and handles edge cases
    * 
    * @param {string} inputValue - The input value to validate
    * @returns {object} Validation result with status and message
    */
    const validateNumber = useCallback((inputValue: string): { status: boolean; message: string } => {
        // Allow empty values
        if (inputValue === '' || inputValue === null || inputValue === undefined) {
            return { status: true, message: '' };
        }

        // Parse the numeric value
        const numericValue = parseFloat(inputValue);

        // Check if it's a valid number
        if (isNaN(numericValue) || !isFinite(numericValue)) {
            return {
                status: false,
                message: 'Please enter a valid number'
            };
        }

        // Check minimum value constraint
        if (min > -Infinity && numericValue < min) {
            return {
                status: false,
                message: `Value must be at least ${min}`
            };
        }

        // Check maximum value constraint
        if (max < Infinity && numericValue > max) {
            return {
                status: false,
                message: `Value must be at most ${max}`
            };
        }

        return { status: true, message: '' };
    },
        [min, max]
    );

    /**
     * Handles changes to the numeric input component
     * Formats valid numeric input and delegates validation to GenericInput
     * 
     * @param {string} inputValue - The new numeric value from input
     */
    const handleNumberChange = useCallback((inputValue: string): void => {
        // Handle empty input
        if (inputValue === '' || inputValue === null || inputValue === undefined) {
            onChange('');
            return;
        }

        let safeValue = inputValue;

        // If the input should be integer  
        if (isInteger === true) {
            const integerValue = parseInt(inputValue, 10);
            safeValue = integerValue.toString();
        }

        // For decimals, preserve the original input
        onChange(safeValue);
    },
        [onChange]
    );

    /**
     * Handles changes to the options dropdown selection
     * Allows selection of alternative CSS values (keywords, etc.)
     * 
     * @param {string} selectedOption - The new option value from dropdown
     */
    const handleOptionChange = useCallback((selectedOption: string): void => {
        if (!selectedOption) {
            onChange('');
            return;
        }

        onChange(selectedOption);
    },
        [onChange]
    );

    return (
        <div className={CSS.NumberValue} role="presentation">

            {/* Numeric input for float values */}
            <GenericInput
                value={value}
                min={min}
                max={max}
                placeholder="0.0"
                type="number"
                validate={validateNumber}
                onChange={handleNumberChange}
                title="Enter Numeric Value"
                ariaLabel="Enter Numeric Value"
            />

            {/* Options dropdown for alternative values */}
            {shouldShowOptions &&
                <SelectDropdown
                    options={options}
                    value={"number"}
                    onChange={handleOptionChange}
                    searchable={true}
                    grouped={true}
                    placeholder="NUM"
                    forcePlaceholder={true}
                    title="Select Value Type"
                    ariaLabel="Select Value Type"
                />
            }

        </div>
    );
});

export default NumberValue;
