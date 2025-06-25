// External imports
import React, { ReactElement } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import GenericInput from '@/components/Input/Generic/component';
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
const DimensionValue: React.FC<DimensionValueProps> = (props: DimensionValueProps): ReactElement => {
	const {
		value = '',
		onChange = () => { },
		options = [],
		minValue = -Infinity,
		maxValue = Infinity,
		isStrict = false,
	} = props;

	const DEFAULT_UNIT = options.find(option => option.category === 'dimension')?.name || 'px';
	const DEFAULT_NUMBER = '0';

	const extractedNumber = extractNumber(value);
	const extractedUnit = extractUnit(value);

	// Handle changes to the numeric input (unit is always from latest extractedUnit)
	function handleValueChange(number: string): void {
		const unit = extractedUnit || DEFAULT_UNIT;
		if (number === '') {
			onChange(isStrict ? `${number}${unit}` : '');
			return;
		}
		onChange(`${number}${unit}`);
	}

	// Handle changes to the unit dropdown (number is always from latest extractedNumber)
	function handleOptionChange(unit: string): void {
		const category = options.find(option => option.value === unit)?.category;
		if (category !== 'dimension') {
			onChange(unit);
			return;
		}


		unit = extractUnit(unit) || '';
		const number = extractedNumber || DEFAULT_NUMBER;
		if (unit === '') {
			onChange(isStrict ? `${number}${unit}` : '');
			return;
		}
		onChange(`${number}${unit}`);
	}

	return (
		<div className={CSS.DimensionValue}>
			{/* Numeric input for the value part */}
			<GenericInput
				value={extractedNumber}
				min={minValue}
				max={maxValue}
				type='number'
				placeholder='0'
				onChange={handleValueChange}
			/>

			{/* Dropdown for the unit part */}
			<SelectDropdown
				options={options}
				value={extractedUnit || DEFAULT_UNIT}
				onChange={handleOptionChange}
				searchable={true}
				grouped={true}
			/>
		</div>
	);
};

export default DimensionValue;
