// External imports
import React, { useCallback, ReactElement, memo, useMemo } from 'react';

// Styles
import CSS from '@/components/Input/Length/styles.module.css';

// Components
import InputNumber from '@/components/Input/Number/component';
import SelectDropdown from '@/components/Select/Dropdown/component';
import Dropdown from '@/components/Reveal/Dropdown/component';
import OptionsSelect from '@/components/Select/Options/component';
import ExpressionInput from '@/components/Input/Expression/components';
import FunctionInput from '@/components/Input/Function/component';

// Types
import { UNIT_INPUT } from '@/components/Input/Length/types';

// Utilities
import { extractNumber, extractLength, isLengthScalable, isLengthKeyword, isLengthFunction, isFunctionVariable, isLengthList, getStyleVariables, isFunctionExpression, isKeywordValid } from '@/utilities/style';

// Constants
import { LENGTH } from '@/editors/style/constants/options';

/**
 * LengthInput Component
 * 
 * A controlled input component that combines a numeric input with a length selector.
 * Supports various length types including scalable lengths (px, %, em), keywords (auto), 
 * functions (calc()), expressions, and CSS variables.
 * 
 * @component
 * @param {UNIT_INPUT} props - Component props
 * @param {string} [props.value=""] - Current value (e.g., "10px", "auto", "calc(...)")
 * @param {(value: string) => void} props.onChange - Change handler
 * @param {string[]} [props.options=LENGTH] - Available length options
 * @param {number} [props.minValue=-Infinity] - Minimum numeric value
 * @param {number} [props.maxValue=Infinity] - Maximum numeric value
 * @param {boolean} [props.isStrict=false] - If true, empty inputs are replaced with defaults
 * 
 * @example
 * <LengthInput value="10px" onChange={setValue} />
 * 
 * @example
 * <LengthInput value="auto" isStrict onChange={setValue} />
 */
const LengthInput: React.FC<UNIT_INPUT> = ({ value = '', minValue = -Infinity, maxValue = Infinity, options = LENGTH, onChange = () => { }, isStrict = false }: UNIT_INPUT): ReactElement => {
	const DEFAULT_UNIT = useMemo(() => extractLength(options[0].value), [options]);
	const DEFAULT_NUMBER = '0';

	const extractedNumber = extractNumber(value);
	const extractedUnit = extractLength(value);

	/**
	 * Determines the input mode based on the value type.
	 * @returns {'scalable' | 'keyword' | 'function' | 'var' | 'expression' | null}
	 */
	const calculatedState = (() => {
		if (isLengthScalable(value) || value === '') return 'scalable';
		if (isLengthKeyword(value)) return 'keyword';
		if (isLengthFunction(value)) {
			if (isFunctionVariable(value)) return 'var';
			if (isFunctionExpression(value)) return 'expression';
			return 'function';
		}
		if (isLengthList(value)) return 'list';

		return null;
	})();

	/**
	 * Handles numeric value changes with validation and fallback handling.
	 * Memoized to prevent unnecessary re-creations.
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
	 * Handles length changes with appropriate parsing and fallback logic.
	 * Memoized to prevent unnecessary re-creations.
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
		if (isLengthFunction(length) || isKeywordValid(length, options)) {
			onChange(length);
			return;
		}

		// Default number + length
		onChange(`${extractedNumber || DEFAULT_NUMBER}${length}`);
	},
		[DEFAULT_UNIT, extractedNumber, isStrict, onChange, options]
	);

	const renderLengthSelect = useMemo(() => {
		return (unit: string) => (
			<SelectDropdown
				options={options}
				value={unit.replace(')', '')}
				onChange={handleUnitChange}
				hasSearch={true}
				isGrouped={true}
				placeholder="length"
			/>
		);
	}, [handleUnitChange, options]);

	/**
	 * Renders the correct combination of inputs based on detected calculatedState.
	*/
	const childrenElements = (() => {
		switch (calculatedState) {
			case 'scalable':
				return (
					<>
						<InputNumber
							value={extractedNumber}
							minValue={minValue}
							maxValue={maxValue}
							onChange={handleValueChange}
							aria-label="Numeric value"
						/>
						{renderLengthSelect(extractedUnit)}
					</>
				);

			case 'keyword':
				return renderLengthSelect(extractedUnit);

			case 'var':
				return (
					<Dropdown value={'VAR'} closeOnChange={false}>
						{renderLengthSelect(extractedUnit)}
						<OptionsSelect
							hasSearch
							onChange={handleUnitChange}
							value={value}
							options={getStyleVariables()}
						/>
					</Dropdown>
				);

			case 'function':
				return (
					<Dropdown value={value} closeOnChange={false}>
						{renderLengthSelect(extractedUnit)}
						<FunctionInput value={value} onChange={(value: string) => onChange(value)} options={options} />
					</Dropdown>
				);

			case 'list':
				return (
					<Dropdown value={value} closeOnChange={false}>
						<FunctionInput value={value} onChange={(value: string) => onChange(value)} options={options} />
					</Dropdown>
				);

			case 'expression':
				return (
					<Dropdown value={'EXPRESSION'} closeOnChange={false}>
						{renderLengthSelect(extractedUnit)}
						<ExpressionInput value={extractedUnit} onChange={handleUnitChange} />
					</Dropdown>
				);

			default:
				return <div>Invalid length value</div>
		}
	})();


	return (
		<div className={CSS.LengthInput} data-state={calculatedState}>
			{childrenElements}
		</div>
	);
};

export default memo(LengthInput);
