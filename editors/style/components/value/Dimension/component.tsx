// External imports
import React, { useCallback, ReactElement, memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import NumberInput from '@/components/Input/Number/component';
import SelectDropdown from '@/components/Select/Dropdown/component';

// Types
import { DimensionValueProps } from './types';

// Utilities
import { extractNumber, extractUnit } from '@/utilities/style/dimension';


/**
 * DimensionValue Component
 * A controlled input for CSS dimension values (e.g., '10px', '2rem').
 * Splits the value into number and unit, and allows editing both parts.
 * @component
 * @param {DimensionValueProps} props - The properties for the DimensionValue component.
 * @param {string} [props.value=''] - The current value of the dimension input.
 * @param {function} [props.onChange=() => {}] - Callback function to handle value changes.
 * @param {Array<{ label: string, value: string }>} [props.options=[]] - List of unit options for the dropdown.
 * @param {number} [props.minValue=-Infinity] - Minimum numeric value allowed.
 * @param {number} [props.maxValue=Infinity] - Maximum numeric value allowed.
 * @param {boolean} [props.isStrict=false] - If true, enforces a valid value format (number + unit).
 * @return {ReactElement} The rendered DimensionValue component.
 */
const DimensionValue: React.FC<DimensionValueProps> = memo((props: DimensionValueProps): ReactElement => {
	const {
		value = '',
		onChange = () => { },
		options = [],
		minValue = -Infinity,
		maxValue = Infinity,
		isStrict = false,
	} = props;

	// Default unit is the first option's value (e.g., 'px'), fallback to empty string
	const DEFAULT_UNIT = 'px';

	// Default number is '0', used when no numeric value is provided
	const DEFAULT_NUMBER = '0';

	// Extract the numeric part and unit part from the value string
	const extractedNumber = extractNumber(value);
	const extractedUnit = extractUnit(value);

	// Handle changes to the numeric input
	const handleValueChange = useCallback((number: string, unit: string): void => {
		if (number === '') {
			// If strict, always provide a valid value; otherwise allow empty
			onChange(isStrict ? `${number}${unit}` : '');
			return;
		}

		// Combine new number with current or default unit
		onChange(`${number}${unit}`);
	}, [onChange, isStrict]);


	// Handle changes to the unit dropdown
	const handleOptionChange = useCallback((unit: string, number: string): void => {
		// If the input is a keyword, just pass it through
		const category = options.find(option => option.value === unit)?.category;
		if (category === 'keyword' || category === 'number') {
			onChange(unit);
			return;
		}

		unit = extractUnit(unit) || '';

		// If input is empty, reset to default number and unit
		if (unit === '') {
			onChange(isStrict ? `${number}${unit}` : '');
			return;
		}

		// Combine current or default number with new unit
		onChange(`${number}${unit}`);
	}, [isStrict, onChange]);

	return (
		<div className={CSS.DimensionValue}>
			{/* Numeric input for the value part */}
			<NumberInput
				value={extractedNumber || ''}
				minValue={minValue}
				maxValue={maxValue}
				onChange={(number) => handleValueChange(number, extractedUnit || DEFAULT_UNIT)}
			/>

			{/* Dropdown for the unit part */}
			<SelectDropdown
				options={options}
				value={extractedUnit || 'px'}
				onChange={(unit) => handleOptionChange(unit, extractedNumber || DEFAULT_NUMBER)}
				searchable={true}
				grouped={true}
			/>
		</div>
	);
});

export default DimensionValue;
