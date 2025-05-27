import React, { useCallback, ReactElement, memo } from 'react';

// Components
import GenericInput from '@/components/Input/Generic/component';

// Types
import { STRING_INPUT } from '@/components/Input/String/types';

// Utilities
import { isURL } from '@/utilities/string';

/**
 * StringInput Component - A controlled text input with validation capabilities
 * 
 * @param {STRING_INPUT} props - Component props
 * @param {string} props.value - Current input value
 * @param {number} [props.minLength=-Infinity] - Minimum allowed input length
 * @param {number} [props.maxLength=Infinity] - Maximum allowed input length
 * @param {string} [props.pattern] - Special validation pattern ('url' supported)
 * @param {(value: string) => void} [props.onChange=()=>{}] - Callback for value changes
 * @returns {ReactElement} - Text input element with validation
 */
const StringInput: React.FC<STRING_INPUT> = (props: STRING_INPUT): ReactElement => {
	const {
		value = '',
		minLength = 0,
		maxLength = Infinity,
		pattern,
		onChange = () => { }
	} = props;

	/**
	 * Callback function to validate the input value
	 * @param {string} value - The input value to validate
	 * @returns {boolean} - True if valid, false otherwise
	*/
	const validate = useCallback((value: string): { status: boolean; message: string } => {
		const length = value.length;

		// Allow empty input for optional fields
		if (value.trim() === '') {
			return {
				status: true,
				message: ''
			};
		}

		// Validate length constraints
		if (length < minLength || length > maxLength) {
			return {
				status: false,
				message: `Input must be between ${minLength} and ${maxLength} characters`
			};
		}

		// Validate URL pattern if specified
		if (pattern === 'url' && !isURL(value)) {
			return {
				status: false,
				message: "Please enter a valid URL.(https://example.com)"
			};
		}

		return {
			status: true,
			message: ''
		};
	}, [minLength, maxLength, pattern]);


	return (
		<GenericInput
			value={value}
			min={minLength}
			max={maxLength}
			type="text"
			onChange={onChange}
			validate={validate}
		/>
	);
};
export default memo(StringInput);