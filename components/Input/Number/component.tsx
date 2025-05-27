import React, { useCallback, ReactElement, memo } from 'react';

// Components
import GenericInput from '@/components/Input/Generic/component';

// Types
import { NUMBER_INPUT } from '@/components/Input/Number/types';

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
const NumberInput: React.FC<NUMBER_INPUT> = (props: NUMBER_INPUT): ReactElement => {
	const {
		value = '',
		onChange = () => { },
		minValue = 0,
		maxValue = Infinity,
		onFocus = () => { },
		onBlur = () => { },
	} = props;

	/**
	 * Callback function to validate the input value
	 * @param {string} value - The input value to validate
	 * @returns {{ status: boolean; message: string }} - Validation result with status and message
	*/
	const validate = useCallback((value: string): { status: boolean; message: string } => {
		// Allow empty input for optional fields
		if (value.trim() === '') {
			return {
				status: true,
				message: ''
			};
		}

		const numValue = parseFloat(value);

		if (isNaN(numValue)) {
			return {
				status: false,
				message: 'Please enter a valid number'
			};
		}

		if (numValue < minValue || numValue > maxValue) {
			return {
				status: false,
				message: `Value must be between ${minValue} and ${maxValue}`
			};
		}

		return {
			status: true,
			message: ''
		};
	}, [minValue, maxValue]);


	return (
		<GenericInput
			type="number"
			value={value}
			min={minValue}
			max={maxValue}

			validate={validate}
			placeholder='0'
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
};


export default memo(NumberInput);
