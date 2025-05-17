import React, { useCallback, ReactElement, memo, useState, useRef } from 'react';

// Styles
import CSS from '@/components/Input/String/styles.module.css';

// Types
import { STRING_INPUT } from '@/components/Input/String/types';

// Utilities
import { isURL } from '@/utilities/string';
import { devLog } from '@/utilities/dev';

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
const StringInput: React.FC<STRING_INPUT> = ({ value = '', minLength = -Infinity, maxLength = Infinity, pattern, onChange = () => { } }: STRING_INPUT): ReactElement => {
	const inputRef = useRef<HTMLInputElement>(null); // Reference to the DOM input element
	const [isError, setIsError] = useState(false); // Tracks input validation state

	/**
	 * Validates the input value against constraints
	 * @param {string} value - Input value to validate
	 * @returns {boolean} - True if value is valid
	 */
	const validateValue = useCallback((value: string): boolean => {
		const length = value.length;

		// Validate length constraints
		if (length < minLength || length > maxLength) {
			devLog.warn(`(StringInput) Invalid length '${value}'. Must be between ${minLength} and ${maxLength}`);
			return false;
		}

		// Validate URL pattern if specified
		if (pattern === 'url' && !isURL(value)) {
			devLog.warn(`(StringInput) Invalid URL '${value}'`);
			return false;
		}

		return true;
	}, [minLength, maxLength, pattern]
	);

	/**
	 * Commits the current input value after validation
	 */
	const handleCommit = useCallback(() => {
		const inputValue = inputRef.current?.value.trim() || '';
		const isValid = validateValue(inputValue);
		setIsError(!isValid);

		if (!isValid) {
			// Reset input and parent state if invalid
			if (inputRef.current) inputRef.current.value = '';
			onChange('');
			return;
		}

		// Only update parent if value changed
		if (inputValue !== value) {
			onChange(inputValue);
		}
	}, [onChange, validateValue, value]
	);

	/**
	 * Handles keyboard events
	 * @param {React.KeyboardEvent} e - Keyboard event
	 */
	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault(); // Prevent default form submission
			handleCommit(); // Commit current value
		} else if (e.key === 'Escape') {
			inputRef.current?.blur(); // Remove focus on Escape
		}
	}, [handleCommit]
	);

	/**
	 * Handles input changes and updates error state
	 */
	const handleChange = useCallback(() => {
		// Update error state based on current input value
		setIsError(!validateValue(inputRef.current?.value || ''));
	}, [validateValue]
	);

	return (
		<input
			ref={inputRef}
			type="text"
			className={`${CSS.StringInput} ${isError ? CSS.isError : ''}`}
			placeholder={pattern ? `Enter ${pattern}` : 'Enter text'}
			minLength={minLength > 0 ? minLength : undefined}
			maxLength={maxLength < Infinity ? maxLength : undefined}
			defaultValue={value}
			onBlur={handleCommit}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
	);
};

export default memo(StringInput);