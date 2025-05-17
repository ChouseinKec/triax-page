import React, { useCallback, ChangeEvent, ReactElement, memo } from 'react';

// Styles
import CSS from '@/components/Input/Number/styles.module.css';

// Types
import { TEXT_INPUT } from '@/components/Input/Text/types';

// Utilities
import { devLog } from '@/utilities/dev';


/**
 * StringInput Component
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
 * <StringInput value="25" onChange={handleUpdate} minValue={0} maxValue={100} />
 */
const StringInput: React.FC<TEXT_INPUT> = ({ value = '', minLength = -Infinity, maxLength = Infinity, pattern, onChange = () => { }, }: TEXT_INPUT): ReactElement => {

	const isValuedValid = useCallback((value: string): boolean => {
		const _length = value.length;

		// Check value boundaries
		if (_length < minLength || _length > maxLength) {
			devLog.warn(`StringInput: Invalid value ${value}. Must be between: ${minLength} - ${maxLength} range.`);
			return false;
		}

		if (pattern === 'url') {
			return false;
		}

		return true;

	}, [minLength, maxLength, pattern]);


	/**
	 * Handles value changes from the input field.
	 * Memoized to prevent unnecessary re-creations.
	*/
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const _input = event.target.value.trim();

		// Allow empty input (useful for clearing the field)
		if (_input === '') { onChange(''); return; }

		// Validate input
		if (!isValuedValid(_input)) {
			devLog.warn(`StringInput: Invalid value: '${_input}'.`);
			return;
		}

		onChange(_input);
	}, [onChange]
	);

	return (
		<input
			type="text"
			value={value}
			onChange={handleChange}
			className={CSS.StringInput}
			placeholder="Your Text"
			minLength={minLength}
			maxLength={maxLength}
		/>
	);
};

export default memo(StringInput);
