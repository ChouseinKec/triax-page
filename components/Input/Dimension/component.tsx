// External imports
import React, { useCallback, ReactElement, memo, useMemo } from 'react';

// Styles
import CSS from '@/components/Input/Length/styles.module.css';

// Components
import InputNumber from '@/components/Input/Number/component';
import SelectDropdown from '@/components/Select/Dropdown/component';

// Types
import { DimensionValueProps } from '@/components/Input/Dimension/types';



/**
 * LengthInput Component
 * 
 * A controlled input component that combines a numeric input with a length selector.
 * Supports various length types including scalable lengths (px, %, em), keywords (auto), 
 * functions (calc()), expressions, and CSS variables.
 * 
 * @component
 * @param {DimensionValueProps} props - Component props
 * @param {string} [props.value=""] - Current value (e.g., "10px", "auto", "calc(...)")
 * @param {(value: string) => void} props.onChange - Change handler
 * @param {string[]} [props.options=LENGTH] - Available length options
 * @param {number} [props.minValue=-Infinity] - Minimum numeric value
 * @param {number} [props.maxValue=Infinity] - Maximum numeric value
 * @param {boolean} [props.isStrict=false] - If true, empty inputs are replaced with defaults
 * @param {React.RefObject<HTMLDivElement | null>} [props.ref] - Optional ref for the input container
 * @returns {ReactElement} Rendered LengthInput component
 * @example
 * <LengthInput value="10px" onChange={setValue} />
 * <LengthInput value="auto" isStrict onChange={setValue} />
 */
const LengthInput: React.FC<DimensionValueProps> = (props: DimensionValueProps): ReactElement => {

	const {
		value = '',
		onChange = () => { },
		options = [],
		minValue = -Infinity,
		maxValue = Infinity,
		isStrict = false,
	} = props;

	// Default unit is the first option's value, extracted for consistency
	const DEFAULT_UNIT = useMemo(() => options[0].value, [options]);
	// Default number is '0', used when no numeric value is provided
	const DEFAULT_NUMBER = '0';

	const extractedNumber = extractNumber(value);
	// Extract the unit from the value.
	const extractedUnit = extractLength(value);


	/**
	 * Handles numeric value changes with appropriate parsing and fallback logic.
	 * Memoized to prevent unnecessary re-creations.
	 * @param {string} value - The new numeric value
	 */
	const handleValueChange = useCallback((value: string): void => {
		// If value is empty
		if (value === '') {
			// If empty-string is not allowed force it to default values, otherwise set to empty
			if (isStrict) {
				onChange(`${DEFAULT_NUMBER}${DEFAULT_UNIT}`);
			} else {
				onChange('');
			}
			return;
		}

		// Default number + length
		onChange(`${value}${extractedUnit || DEFAULT_UNIT}`);
	},
		[onChange, extractedUnit, DEFAULT_UNIT, isStrict]
	);

	/**
	 * Handles unit changes, including empty values, functions, and keywords.
	 * Memoized to prevent unnecessary re-creations.
	 * @param {string} length - The new length unit
	*/
	const handleUnitChange = useCallback((length: string): void => {
		// If length is empty
		if (length === '') {
			// If empty-string is not allowed force it to default values, otherwise set to empty
			if (isStrict) {
				onChange(`${DEFAULT_NUMBER}${DEFAULT_UNIT}`);
			} else {
				onChange('');
			}
			return;
		}

		// If it's function or keyword
		if (isValueFunction(length) || isValueKeyword(length)) {
			onChange(length);
			return;
		}

		// Default number + length
		onChange(`${extractedNumber || DEFAULT_NUMBER}${length}`);
	},
		[DEFAULT_UNIT, extractedNumber, isStrict, onChange, options]
	);

	return (
		<div className={CSS.LengthInput} >
			<InputNumber
				value={extractedNumber}
				minValue={minValue}
				maxValue={maxValue}
				onChange={handleValueChange}
				aria-label="Numeric value"
			/>
			<SelectDropdown
				options={options}
				value={unit.replace(')', '')}
				onChange={handleUnitChange}
				searchable={true}
				grouped={true}
				placeholder="length"
			/>

		</div>
	);
};

export default memo(LengthInput);
