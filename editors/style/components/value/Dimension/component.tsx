// External imports
import React, { useCallback, ReactElement, memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import InputNumber from '@/components/Input/Number/component';
import SelectDropdown from '@/components/Select/Dropdown/component';

// Types
import { DimensionInputProps } from './types';

// Utilities
import { extractNumber, extractUnit } from '@/utilities/style/dimension';


/**
 * DimensionValue Component
 * A controlled input for CSS dimension values (e.g., '10px', '2rem').
 * Splits the value into number and unit, and allows editing both parts.
 * @component
 * @param {DimensionInputProps} props - The properties for the DimensionValue component.
 * @param {string} [props.value=''] - The current value of the dimension input.
 * @param {function} [props.onChange=() => {}] - Callback function to handle value changes.
 * @param {Array<{ label: string, value: string }>} [props.options=[]] - List of unit options for the dropdown.
 * @param {number} [props.minValue=-Infinity] - Minimum numeric value allowed.
 * @param {number} [props.maxValue=Infinity] - Maximum numeric value allowed.
 * @param {boolean} [props.isStrict=false] - If true, enforces a valid value format (number + unit).
 * @return {ReactElement} The rendered DimensionValue component.
 */
const DimensionValue: React.FC<DimensionInputProps> = memo((props: DimensionInputProps): ReactElement => {
	const {
		value = '',
		onChange = () => {},
		options = [],
		minValue = -Infinity,
		maxValue = Infinity,
		isStrict = false,
	} = props;

	// Default unit is the first option's value (e.g., 'px'), fallback to empty string
	const DEFAULT_UNIT = useMemo(() => options[0]?.value || '', [options]);
	// Default number is '0', used when no numeric value is provided
	const DEFAULT_NUMBER = '0';

	// Extract the numeric part and unit part from the value string
	const extractedNumber = extractNumber(value);
	const extractedUnit = extractUnit(value);

	// Handle changes to the numeric input
	const handleValueChange = useCallback((input: string): void => {
		if (input === '') {
			// If strict, always provide a valid value; otherwise allow empty
			onChange(isStrict ? `${DEFAULT_NUMBER}${DEFAULT_UNIT}` : '');
			return;
		}
		
		// Combine new number with current or default unit
		onChange(`${input}${extractedUnit || DEFAULT_UNIT}`);
	}, [onChange, extractedUnit, DEFAULT_UNIT, isStrict]);

	// Handle changes to the unit dropdown
	const handleUnitChange = useCallback((input: string): void => {
		if (input === '') {
			onChange(isStrict ? `${DEFAULT_NUMBER}${DEFAULT_UNIT}` : '');
			return;
		}
		// Combine current or default number with new unit
		onChange(`${extractedNumber || DEFAULT_NUMBER}${input}`);
	}, [DEFAULT_UNIT, extractedNumber, isStrict, onChange]);

	return (
		<div className={CSS.LengthInput}>
			{/* Numeric input for the value part */}
			<InputNumber
				value={extractedNumber || ''}
				minValue={minValue}
				maxValue={maxValue}
				onChange={handleValueChange}
				aria-label="Numeric value"
			/>

			{/* Dropdown for the unit part */}
			<SelectDropdown
				options={options}
				value={extractedUnit || ''}
				onChange={handleUnitChange}
				searchable={true}
				grouped={true}
				placeholder="length"
			/>
		</div>
	);
});

export default DimensionValue;
