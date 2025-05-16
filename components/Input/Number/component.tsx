import React, { useCallback, ChangeEvent, ReactElement, memo } from 'react';

// Styles
import CSS from '@/components/Input/Number/styles.module.css';

// Components
import { useDebouncedCallback } from '@/hooks/hooks';

// Types
import { NUMBER_INPUT } from '@/components/Input/Number/types';

// Utilities
import { devLog } from '@/utilities/dev';

/**
 * NumberInput Component
 *
 * A controlled numeric input component with validation, range clamping, and debounced updates.
 * Handles string-based numeric values to avoid floating-point precision issues.
 *
 * @component
 * @param {NUMBER_INPUT} props - Component props
 * @param {string} props.value - Current numeric value as string
 * @param {(value: string) => void} props.onChange - Callback for value updates
 * @param {number} [props.minValue=-Infinity] - Minimum allowed value
 * @param {number} [props.maxValue=Infinity] - Maximum allowed value
 * @returns {ReactElement} - A numeric input field with constraints
 *
 * @example
 * <NumberInput value="25" onChange={handleUpdate} minValue={0} maxValue={100} />
 */
const NumberInput: React.FC<NUMBER_INPUT> = ({ value = '', minValue = -Infinity, maxValue = Infinity, onChange = () => { }, }: NUMBER_INPUT): ReactElement => {

	/**
	 * Debounced change handler to limit update frequency.
	 * Memoized to prevent unnecessary re-creations.
	*/
	const debouncedOnChange = useDebouncedCallback(onChange, 10);

	/**
	 * Handles value changes from the input field.
	 * Memoized to prevent unnecessary re-creations.
	*/
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value.trim();

		// Allow empty input (useful for clearing the field)
		if (newValue === '') {
			debouncedOnChange('');
			return;
		}

		// Validate numeric input
		const numericValue = Number(newValue);
		if (isNaN(numericValue)) {
			devLog.warn(`NumberInput: Expected numeric value, got "${newValue}"`);
			return;
		}

		// Check value boundaries
		if (numericValue < minValue) {
			devLog.warn(`NumberInput: Value ${numericValue} is below minimum ${minValue}`);
			return;
		}

		if (numericValue > maxValue) {
			devLog.warn(`NumberInput: Value ${numericValue} exceeds maximum ${maxValue}`);
			return;
		}

		debouncedOnChange(newValue);
	}, [minValue, maxValue, debouncedOnChange]
	);

	return (
		<input
			type="number"
			value={value}
			min={minValue}
			max={maxValue}
			onChange={handleChange}
			className={CSS.NumberInput}
			placeholder="0"
			aria-label="Numeric input"
		/>
	);
};

export default memo(NumberInput);
