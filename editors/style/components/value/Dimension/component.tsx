// External imports
import React, { ReactElement, useCallback, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import GenericInput from '@/components/input/generic/component';
import SelectDropdown from '@/components/select/dropdown/component';

// Types
import { DimensionValueProps } from './types';

// Utilities
import { extractNumber, extractUnit } from '@/utilities/style/dimension';
import { devLog } from '@/utilities/dev';

/**
 * DimensionValue Component
 * 
 * A controlled input component for CSS dimension values (e.g., '10px', '2rem', '100%').
 * Intelligently splits values into numeric and unit components for separate editing.
 * Supports grouped unit categories and validation for numeric ranges.
 *
 * @component
 * @param {DimensionValueProps} props - Component properties
 * @param {string} [props.value=''] - Current CSS dimension value (e.g., '10px')
 * @param {function} [props.onChange] - Callback for value changes
 * @param {Array} [props.options=[]] - Available unit options with categories
 * @param {number} [props.minValue=-Infinity] - Minimum allowed numeric value
 * @param {number} [props.maxValue=Infinity] - Maximum allowed numeric value
 * @returns {ReactElement} The rendered DimensionValue component
 */
const DimensionValue: React.FC<DimensionValueProps> = (props: DimensionValueProps): ReactElement => {
	const {
		value = '',
		onChange = () => { },
		options = [],
		minValue = -Infinity,
		maxValue = Infinity,
	} = props;

	// Validate props and provide warnings for development
	if (options.length === 0) {
		devLog.warn('[DimensionValue] No unit options provided, component may not function correctly');
	}

	/**
	 * Finds the first dimension category unit as default, fallback to 'px'
	 */
	const defaults = useMemo(() => {
		const unit = options.find(option => option.category === 'dimension')?.name || 'px';
		const number = '0';

		return { unit, number };
	},
		[options]
	);

	/**
	 * Extracts numeric and unit components from the current value
	 */
	const extractedValue = useMemo(() => {
		const extractedNumber = extractNumber(value);
		const extractedUnit = extractUnit(value);

		return {
			number: extractedNumber,
			unit: extractedUnit
		};
	},
		[value]
	);

	/**
	 * Handles changes to the numeric input component
	 * Preserves the current unit while updating the numeric value
	 * Validates input and handles edge cases (empty values, etc.)
	 * 
	 * @param {string} inputNumber - The new numeric value from input
	 */
	const handleNumberChange = useCallback((inputNumber: string): void => {
		// Handle empty input - clear the entire value
		if (inputNumber === '' || inputNumber === null || inputNumber === undefined) {
			onChange('');
			return;
		}

		// Validate numeric input
		const numericValue = parseFloat(inputNumber);
		if (isNaN(numericValue)) {
			devLog.warn(`[DimensionValue] Invalid numeric input "${inputNumber}"`);
			return;
		}

		// Use current unit or fallback to default
		const currentUnit = extractedValue.unit || defaults.unit;
		const newValue = `${inputNumber}${currentUnit}`;

		onChange(newValue);
	},
		[onChange, extractedValue.unit, defaults.unit]
	);

	/**
	 * Handles changes to the unit dropdown selection
	 * Preserves the current numeric value while updating the unit
	 * Handles special categories (non-dimension units) appropriately
	 * 
	 * @param {string} selectedUnit - The new unit value from dropdown
	 */
	const handleUnitChange = useCallback((selectedUnit: string): void => {
		// Handle empty selection
		if (!selectedUnit) {
			onChange('');
			return;
		}

		// Find the selected option to determine its category
		const selectedOption = options.find(option => option.value === selectedUnit);

		if (!selectedOption) {
			devLog.warn(`[DimensionValue] Unknown unit option "${selectedUnit}"`);
			return;
		}

		// Handle non-dimension categories (e.g., 'auto', 'inherit', etc.)
		if (selectedOption.category !== 'dimension') {
			// For non-dimensional values, use the unit value directly
			onChange(selectedUnit);
			return;
		}

		// Extract unit from the selected value (in case of compound values)
		const unitValue = extractUnit(selectedUnit) || selectedUnit;

		// Handle empty unit
		if (!unitValue) {
			onChange('');
			return;
		}

		// Preserve current number or use default
		const currentNumber = extractedValue.number || defaults.number;
		const newValue = `${currentNumber}${unitValue}`;

		onChange(newValue);
	},
		[onChange, options, extractedValue.number, defaults.number]
	);

	return (
		<div
			className={CSS.DimensionValue}
			role="representation"
		>
			{/* Numeric input for the value component */}
			<GenericInput
				value={extractedValue.number || ''}
				min={minValue}
				max={maxValue}
				type="number"
				placeholder="N/A"
				onChange={handleNumberChange}
				title="Enter Dimension Value"
				ariaLabel="Enter Dimension Value"
			/>

			{/* Unit dropdown for the unit component */}
			<SelectDropdown
				options={options}
				value={extractedValue.unit || ''}
				placeholder="N/A"
				onChange={handleUnitChange}
				searchable={true}
				grouped={true}
				ariaLabel="Select Dimension Unit"
				title="Select Dimension Unit"
			/>
		</div>
	);
};

export default DimensionValue;
