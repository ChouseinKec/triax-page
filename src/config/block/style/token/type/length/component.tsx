"use client"
import React, { memo, useCallback, useMemo } from "react";

// Types
import type { TokenLengthProps } from "./types";

// Styles
import CSS from "./styles.module.scss";

// Components
import GenericInput from "@/src/shared/components/input/generic/component";
import SelectDropdown from "@/src/shared/components/select/dropdown/component";

// Utilities
import { extractLengthUnit, extractLengthDefaults, extractLengthRange, extractTokenLengths } from "@/src/config/block/style/token/type/length/utilities";
import { devLog } from "@/src/shared/utilities/dev";

/**
 * TokenLength Component
 * Renders a controlled input component for CSS length values with separate numeric and unit editing.
 *
 * @param value - Current CSS length value (e.g., "10px")
 * @param options - Available unit options with categories
 * @param onChange - Callback when the value changes
 * @returns The rendered length input component
 */
const TokenLength: React.FC<TokenLengthProps> = ({ value, options, onChange }) => {
	const extractedDefaults = useMemo(() => extractLengthDefaults(options), [options]);
	const extractedRange = useMemo(() => extractLengthRange(options as Array<{ min?: number; max?: number }>), [options]);
	const extractedValues = extractTokenLengths(value);

	// Validate numeric input with extractedRange constraints
	const validateNumber = useCallback((inputValue: string): { status: boolean; message: string } => {
		// Allow empty values
		if (inputValue === "" || inputValue === null || inputValue === undefined) return { status: true, message: "" };

		// Parse the numeric value
		const numericValue = parseFloat(inputValue);

		// Check if it"s a valid number
		if (isNaN(numericValue) || !isFinite(numericValue)) return { status: false, message: "Please enter a valid number" };

		// Check minimum value constraint
		if (extractedRange.min > -Infinity && numericValue < extractedRange.min) return { status: false, message: `Value must be at least ${extractedRange.min}` };

		// Check maximum value constraint
		if (extractedRange.max < Infinity && numericValue > extractedRange.max) return { status: false, message: `Value must be at most ${extractedRange.max}` };

		// If all checks pass, the input is valid
		return { status: true, message: "" };
	},
		[extractedRange]
	);

	// Handle numeric input changes
	const handleNumberChange = useCallback((inputNumber: string): void => {
		// Handle empty input - clear the entire value
		if (inputNumber === "" || inputNumber === null || inputNumber === undefined) return onChange("");

		// Validate numeric input
		const numericValue = parseFloat(inputNumber);
		if (isNaN(numericValue)) return devLog.warn(`[Dimension] Invalid numeric input "${inputNumber}"`);

		// Use current unit or fallback to default
		const currentUnit = extractedValues.unit || extractedDefaults.unit;
		const newValue = `${inputNumber}${currentUnit}`;

		// Trigger onChange with the new length value
		onChange(newValue);
	},
		[onChange, extractedValues.unit, extractedDefaults.unit]
	);

	// Handle unit dropdown changes
	const handleUnitChange = useCallback((selectedUnit: string): void => {
		// Handle empty selection
		if (!selectedUnit) return onChange("");

		// Find the selected option to determine its category
		const selectedOption = options.find(option => option.value === selectedUnit);
		if (!selectedOption) return devLog.warn(`[Length] Unknown unit option "${selectedUnit}"`);

		// Handle non-length categories (e.g., "auto", "inherit", etc.)
		// For non-lengthal values, use the unit value directly
		if (selectedOption.category !== "length") return onChange(selectedUnit);

		// Extract unit from the selected value (in case of compound values)
		const unitValue = extractLengthUnit(selectedUnit) || selectedUnit;

		// Handle empty unit
		if (!unitValue) return onChange("");

		// Preserve current number or use default
		const currentNumber = extractedValues.number || extractedDefaults.number;
		const newValue = `${currentNumber}${unitValue}`;

		onChange(newValue);
	},
		[onChange, options, extractedValues.number, extractedDefaults.number]
	);

	return (
		<div className={`${CSS.TokenLength} TokenLength`}>
			{/* Numeric input for the value component */}
			<GenericInput
				value={extractedValues.number || ""}
				min={extractedRange.min}
				max={extractedRange.max}
				type="number"
				placeholder="---"
				onValidate={validateNumber}
				onChange={handleNumberChange}
				title="Enter Dimension Value"
			/>

			{/* Unit dropdown for the unit component */}
			<SelectDropdown
				options={options}
				value={extractedValues.unit || "N/A"}
				placeholder="N/A"
				onChange={handleUnitChange}
				searchable={true}
				groupable={true}
				title="Change Value Type"
			/>

		</div>
	);
};

TokenLength.displayName = "TokenLength";
export default memo(TokenLength);
