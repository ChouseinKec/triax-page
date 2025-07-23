"use client";

// External imports
import React, { memo, useCallback, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import GenericInput from "@/components/input/generic/component";
import SelectDropdown from "@/components/select/dropdown/component";

// Types
import { DimensionValueProps } from "./types";

// Utilities
import { extractNumber, extractUnit } from "@/utilities/style/dimension";
import { devLog } from "@/utilities/dev";

/**
 * DimensionValue Component
 * 
 * A controlled input component for CSS dimension values (e.g., "10px", "2rem", "100%").
 * Intelligently splits values into numeric and unit components for separate editing.
 * Supports grouped unit categories and validation for numeric ranges.
 *
 * @component
 * @param {DimensionValueProps} props - Component properties
 * @param {string} [props.value=""] - Current CSS dimension value (e.g., "10px")
 * @param {function} [props.onChange] - Callback for value changes
 * @param {Array} [props.options=[]] - Available unit options with categories
 * @param {number} [props.min=-Infinity] - Minimum allowed numeric value
 * @param {number} [props.max=Infinity] - Maximum allowed numeric value
 * @returns {ReactElement} The rendered DimensionValue component
 */
const DimensionValue: React.FC<DimensionValueProps> = (props: DimensionValueProps) => {
	const {
		// Core
		value,
		onChange,
		options,

	} = props;


	// Guard Clause
	if (!options || options.length === 0) {
		devLog.error("[DimensionValue] No options provided");
		return null;
	}

	if (value == null) {
		devLog.error("[DimensionValue] Invalid value provided, expected a string");
		return null;
	}

	/**
	 * Finds the first dimension category unit as default, fallback to "px"
	 */
	const defaults = useMemo(() => {
		const unit = options.find(option => option.category === "dimension")?.name || "px";
		const number = "0";

		return { unit, number };
	},
		[options]
	);

	/**
	 * Computes the valid numeric range based on the first option"s min/max values
	 * Defaults to -Infinity and Infinity if not specified
	 * 
	 * @returns {object} Range object with min and max properties
	*/
	const range = useMemo(() => {
		// Find the first option that is a number or integer
		const option = options[0];

		// Ensure min and max are valid numbers if present
		const validMin = (option && "min" in option && typeof option.min === "number") ? option.min : -Infinity;
		const validMax = (option && "max" in option && typeof option.max === "number") ? option.max : Infinity;

		return {
			min: validMin,
			max: validMax
		};
	}, [options]
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
	* Validates numeric input and provides user-friendly error messages
	* Checks for valid numbers, range constraints, and handles edge cases
	* 
	* @param {string} inputValue - The input value to validate
	* @returns {object} Validation result with status and message
	*/
	const validateNumber = useCallback((inputValue: string): { status: boolean; message: string } => {
		// Allow empty values
		if (inputValue === "" || inputValue === null || inputValue === undefined) {
			return { status: true, message: "" };
		}

		// Parse the numeric value
		const numericValue = parseFloat(inputValue);

		// Check if it"s a valid number
		if (isNaN(numericValue) || !isFinite(numericValue)) {
			return {
				status: false,
				message: "Please enter a valid number"
			};
		}

		// Check minimum value constraint
		if (range.min > -Infinity && numericValue < range.min) {
			return {
				status: false,
				message: `Value must be at least ${range.min}`
			};
		}

		// Check maximum value constraint
		if (range.max < Infinity && numericValue > range.max) {
			return {
				status: false,
				message: `Value must be at most ${range.max}`
			};
		}

		return { status: true, message: "" };
	},
		[range]
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
		if (inputNumber === "" || inputNumber === null || inputNumber === undefined) {
			onChange("");
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
			onChange("");
			return;
		}

		// Find the selected option to determine its category
		const selectedOption = options.find(option => option.value === selectedUnit);

		if (!selectedOption) {
			devLog.warn(`[DimensionValue] Unknown unit option "${selectedUnit}"`);
			return;
		}

		// Handle non-dimension categories (e.g., "auto", "inherit", etc.)
		if (selectedOption.category !== "dimension") {
			// For non-dimensional values, use the unit value directly
			onChange(selectedUnit);
			return;
		}

		// Extract unit from the selected value (in case of compound values)
		const unitValue = extractUnit(selectedUnit) || selectedUnit;

		// Handle empty unit
		if (!unitValue) {
			onChange("");
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
		<div className={CSS.DimensionValue} role="representation">
			{/* Numeric input for the value component */}
			<GenericInput
				value={extractedValue.number || ""}
				min={range.min}
				max={range.max}
				type="number"
				placeholder="N/A"
				onValidate={validateNumber}
				onChange={handleNumberChange}
				title="Enter Dimension Value"
			/>


			{/* Unit dropdown for the unit component */}
			<SelectDropdown
				options={options}
				value={extractedValue.unit || "N/A"}
				placeholder="N/A"
				onChange={handleUnitChange}
				searchable={true}
				grouped={true}
				ariaLabel="Change Value Type"
				title="Change Value Type"
			/>

		</div>
	);
};

export default memo(DimensionValue);
